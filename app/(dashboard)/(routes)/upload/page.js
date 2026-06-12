"use client"
import React, { useState } from 'react'
import UploadForm from './_components/UploadForm'
import ProgressBar from './_components/ProgressBar'
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useUser } from '@clerk/nextjs';
import app from '../../../../FirebaseConfig';
import { useRouter } from 'next/navigation';

function Upload() {
    const { user } = useUser();
    const router = useRouter();
    const db = getFirestore(app);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const generateShortId = () => {
        return Math.random().toString(36).substring(2, 8);
    };

    const UploadFile = async (filesList) => {
        if (!filesList || filesList.length === 0) return;
        setUploading(true);
        setProgress(0);

        const formData = new FormData();
        filesList.forEach((file) => {
            formData.append('files', file);
        });

        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                setProgress(percentComplete);
            }
        };

        xhr.onload = async () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                if (data.success && data.files) {
                    const id = generateShortId();
                    
                    // Sum up total sizes
                    const totalSize = data.files.reduce((acc, f) => acc + f.fileSize, 0);
                    
                    await setDoc(doc(db, "uploadedFile", id), {
                        id: id,
                        files: data.files, // List of files uploaded in this batch
                        
                        // Top-level fields (for backward-compatibility and summaries)
                        fileName: data.files[0].fileName + (data.files.length > 1 ? ` (+${data.files.length - 1} more)` : ''),
                        fileSize: totalSize,
                        fileType: data.files.length > 1 ? 'Batch Upload' : data.files[0].fileType,
                        fileUrl: data.files[0].fileUrl,
                        
                        userEmail: user?.primaryEmailAddress?.emailAddress,
                        userName: user?.fullName,
                        password: '',
                        shortUrl: window.location.origin + '/f/' + id
                    });

                    router.push('/file-preview/' + id);
                } else {
                    alert("Upload failed: " + (data.error || "Unknown error"));
                }
            } else {
                alert("Upload failed: " + xhr.status);
            }
            setUploading(false);
        };

        xhr.onerror = () => {
            alert("An error occurred during upload.");
            setUploading(false);
        };

        xhr.open('POST', '/api/upload', true);
        xhr.send(formData);
    }

    return (
        <div className='p-2 px-8'>
            <h2 className='text-[24px] text-center m-5'>Start
                <strong className='text-primary font-extrabold'> Uploading </strong>Files and
                <strong className='text-primary font-extrabold'> Share</strong> them
            </h2>
            <UploadForm uploadBtnClick={(files) => UploadFile(files)} />
            {uploading && (
                <div className="flex justify-center w-full mt-4">
                    <div className="w-200">
                        <ProgressBar progress={progress} />
                    </div>
                </div>
            )}
        </div>
    )

}

export default Upload;
