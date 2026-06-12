import { NextResponse } from 'next/server';
import cloudinary from '../../../CloudinaryConfig';

export async function POST(req) {
    try {
        const formData = await req.formData();
        const files = formData.getAll('files');

        if (!files || files.length === 0) {
            return NextResponse.json({ error: 'No files provided' }, { status: 400 });
        }

        // Upload all files in parallel
        const uploadPromises = files.map(async (file) => {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const isImage = file.type.startsWith('image/');
            const isVideo = file.type.startsWith('video/');
            const isAudio = file.type.startsWith('audio/');
            
            // Determine resource_type
            let resourceType = 'raw';
            if (isImage) resourceType = 'image';
            else if (isVideo || isAudio) resourceType = 'video';

            // Generate clean unique filename for Cloudinary
            const fileExtension = file.name.split('.').pop() || '';
            const cleanName = file.name
                .replace(`.${fileExtension}`, '')
                .replace(/[^a-zA-Z0-9]/g, '_')
                .substring(0, 50);
            
            const uniqueId = `${Date.now()}-${cleanName}`;
            // Raw files require extension in public_id
            const publicId = resourceType === 'raw' ? `${uniqueId}.${fileExtension}` : uniqueId;

            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: resourceType,
                        folder: 'file-share-app',
                        public_id: publicId,
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(buffer);
            });

            return {
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
                fileUrl: result.secure_url,
                publicId: result.public_id,
                resourceType: resourceType
            };
        });

        const uploadedFiles = await Promise.all(uploadPromises);

        return NextResponse.json({
            success: true,
            files: uploadedFiles
        });
    } catch (error) {
        console.error('Cloudinary API upload error:', error);
        return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
    }
}
