import { NextResponse } from 'next/server';
import cloudinary from '../../../../CloudinaryConfig';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import app from '../../../../FirebaseConfig';

export async function POST(req) {
    try {
        const body = await req.json();
        const { id, files, publicId, resourceType } = body;

        if (!id) {
            return NextResponse.json({ error: 'Firestore document ID is required' }, { status: 400 });
        }

        // 1. Delete assets from Cloudinary in parallel
        const cloudinaryDeletePromises = [];

        if (files && files.length > 0) {
            files.forEach((file) => {
                if (file.publicId) {
                    cloudinaryDeletePromises.push(
                        cloudinary.uploader.destroy(file.publicId, {
                            resource_type: file.resourceType || 'image',
                        })
                    );
                }
            });
        } else if (publicId) {
            cloudinaryDeletePromises.push(
                cloudinary.uploader.destroy(publicId, {
                    resource_type: resourceType || 'image',
                })
            );
        }

        // Run all Cloudinary destructions
        const deleteResults = await Promise.all(cloudinaryDeletePromises);
        console.log('Cloudinary destroy results:', deleteResults);

        // 2. Delete document record from Firestore
        const db = getFirestore(app);
        await deleteDoc(doc(db, "uploadedFile", id));

        return NextResponse.json({
            success: true,
            message: 'Assets and metadata document deleted successfully.',
        });
    } catch (error) {
        console.error('File deletion API error:', error);
        return NextResponse.json({ error: error.message || 'Deletion failed' }, { status: 500 });
    }
}
