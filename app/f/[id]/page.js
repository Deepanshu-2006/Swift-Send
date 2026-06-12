"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import app from '../../../FirebaseConfig'
import Image from 'next/image'
import { ShieldAlert, Lock, ArrowDownToLine, Eye, EyeOff } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function SharePage() {
    const params = useParams();
    const db = getFirestore(app);
    const fileId = params.id;

    const [fileInfo, setFileInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [passwordInput, setPasswordInput] = useState('');
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (fileId) {
            getFileInfo();
        }
    }, [fileId]);

    const getFileInfo = async () => {
        setLoading(true);
        try {
            const docRef = doc(db, "uploadedFile", fileId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setFileInfo(data);
                
                // If there's no password, unlock immediately
                if (!data.password || data.password === '') {
                    setIsUnlocked(true);
                }
            } else {
                toast.error("File does not exist or link expired.");
            }
        } catch (error) {
            console.error("Error fetching shared file:", error);
            toast.error("An error occurred while loading this file.");
        } finally {
            setLoading(false);
        }
    }

    const verifyPassword = () => {
        if (!fileInfo) return;
        if (fileInfo.password === passwordInput) {
            setIsUnlocked(true);
            toast.success("Access Granted!");
        } else {
            toast.error("Incorrect Password!");
        }
    }

    const renderPreview = (file) => {
        const type = file.fileType || '';
        
        if (type.startsWith('image/')) {
            return (
                <div className="relative w-full max-h-[300px] overflow-hidden rounded-xl border border-gray-100 shadow-sm mb-4 bg-slate-50 flex items-center justify-center">
                    <img 
                        src={file.fileUrl} 
                        alt={file.fileName}
                        className="max-w-full max-h-[300px] object-contain rounded-xl"
                    />
                </div>
            );
        }
        
        if (type.startsWith('video/')) {
            return (
                <video 
                    src={file.fileUrl} 
                    controls 
                    className="w-full max-h-[300px] rounded-xl border border-gray-150 shadow-sm mb-4 bg-black"
                />
            );
        }

        if (type.startsWith('audio/')) {
            return (
                <div className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl mb-4">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Audio Preview</p>
                    <audio 
                        src={file.fileUrl} 
                        controls 
                        className="w-full"
                    />
                </div>
            );
        }

        if (type === 'application/pdf') {
            return (
                <iframe 
                    src={file.fileUrl} 
                    title={file.fileName}
                    className="w-full h-[360px] rounded-xl border border-gray-200 shadow-sm mb-4 bg-slate-50"
                />
            );
        }

        // Default: display file/folder icon
        return (
            <div className="w-20 h-20 relative mb-4 mx-auto flex items-center justify-center bg-blue-50/50 rounded-2xl border border-blue-50">
                <Image 
                    src="/folder.png" 
                    width={48} 
                    height={48}
                    alt="File icon"
                    className="object-contain"
                    unoptimized
                />
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <p className="text-primary font-bold text-lg animate-pulse">Loading secure sharing link...</p>
            </div>
        )
    }

    if (!fileInfo) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-5 text-center">
                <ShieldAlert className="w-20 h-20 text-red-500 animate-bounce" />
                <h2 className="text-2xl font-bold text-gray-800 mt-5">File Not Found</h2>
                <p className="text-gray-400 mt-2 max-w-sm">The link is either invalid, has expired, or the file was deleted by the owner.</p>
                <a href="/" className="mt-6 bg-primary text-white py-2 px-6 rounded-lg font-bold shadow-md hover:bg-blue-600 transition">
                    Go to Home
                </a>
            </div>
        )
    }

    const fileList = fileInfo.files || [
        {
            fileName: fileInfo.fileName,
            fileSize: fileInfo.fileSize,
            fileType: fileInfo.fileType,
            fileUrl: fileInfo.fileUrl
        }
    ];

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 p-5 relative">
            {/* Global background pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_2px,transparent_2px),linear-gradient(to_bottom,#8080800a_2px,transparent_2px)] bg-size-[14px_24px]"></div>

            <div className={`w-full transition-all duration-300 bg-white border border-gray-200 rounded-2xl shadow-xl p-8 animate-fade-in-up ${
                isUnlocked ? 'max-w-2xl' : 'max-w-md'
            }`}>
                
                {/* 1. Locked State: Prompt for password */}
                {!isUnlocked ? (
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-4">
                            <Lock className="w-10 h-10 text-red-500 animate-pulse" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 text-center">Protected File</h2>
                        <p className="text-sm text-gray-400 text-center mt-1">This link is encrypted. Enter the password below to download.</p>

                        <div className="w-full mt-6 space-y-4">
                            <div className="flex items-center gap-2 bg-slate-50 border border-gray-300 rounded-lg p-3 shadow-sm w-full">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Enter file password..."
                                    value={passwordInput}
                                    onChange={(e) => setPasswordInput(e.target.value)}
                                    className="outline-none flex-1 text-sm bg-transparent"
                                    onKeyDown={(e) => e.key === 'Enter' && verifyPassword()}
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 hover:text-gray-600 transition"
                                >
                                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                                </button>
                            </div>

                            <button 
                                onClick={verifyPassword}
                                className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition"
                            >
                                Access File
                            </button>
                        </div>
                    </div>
                ) : (
                    // 2. Unlocked State: Download Details & Previews
                    <div className="flex flex-col w-full">
                        <div className="w-full bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-6 text-center">
                            <p className="text-[13px] text-blue-600 font-medium leading-relaxed">
                                Shared securely by <br />
                                <strong className="text-blue-800 font-bold">{fileInfo.userName || 'Anonymous'}</strong>
                            </p>
                        </div>

                        <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-2">
                            {fileList.map((file, index) => (
                                <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                                    {renderPreview(file)}
                                    
                                    <div className="text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
                                        <div className="truncate text-center sm:text-left flex-1">
                                            <h3 className="text-base font-bold text-gray-800 break-all truncate">
                                                {file.fileName}
                                            </h3>
                                            <p className="text-xs text-gray-400 mt-1 font-medium">
                                                {file.fileType || 'Unknown'} • {(file.fileSize / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                        
                                        <a 
                                            href={file.fileUrl} 
                                            download={file.fileName}
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="w-full sm:w-auto bg-primary hover:bg-blue-600 text-white font-bold py-2.5 px-5 rounded-xl text-center shadow-md flex items-center justify-center gap-2 transition text-sm shrink-0"
                                        >
                                            <ArrowDownToLine className="w-4 h-4" />
                                            Download
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="text-[11px] text-gray-400 text-center mt-6 italic">
                            Ensure you trust the sender before downloading external files.
                        </p>
                    </div>
                )}

            </div>

            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
        </div>
    )
}

export default SharePage
