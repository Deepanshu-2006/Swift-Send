"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useUser } from '@clerk/nextjs' // 1. Import useUser
import app from '../../../../../FirebaseConfig'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Copy, Key, Mail, Check, FileText, ExternalLink } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function FilePreview() {
    const params = useParams();
    const router = useRouter();
    const { user } = useUser(); // 2. Initialize user
    const db = getFirestore(app);
    const fileId = params['file-ID'];

    const [fileInfo, setFileInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [password, setPassword] = useState('');
    const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
    const [email, setEmail] = useState('');
    const [sendingEmail, setSendingEmail] = useState(false); // 3. Track email loading state

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
                if (data.password) {
                    setIsPasswordEnabled(true);
                    setPassword(data.password);
                } else {
                    if (typeof window !== 'undefined') {
                        const defaultPwdEnabled = localStorage.getItem('swift_share_password_enabled') === 'true';
                        if (defaultPwdEnabled) {
                            const defaultPwd = localStorage.getItem('swift_share_default_password') || '';
                            setIsPasswordEnabled(true);
                            setPassword(defaultPwd);
                        }
                    }
                }
            } else {
                console.log("No such document!");
                router.push('/upload');
            }
        } catch (error) {
            console.error("Error fetching file info:", error);
        } finally {
            setLoading(false);
        }
    }

    const copyToClipboard = () => {
        if (!fileInfo) return;
        navigator.clipboard.writeText(fileInfo.shortUrl);
        setCopied(true);
        toast.success("Copied to Clipboard!");
        setTimeout(() => setCopied(false), 2000);
    }

    const savePassword = async () => {
        try {
            const docRef = doc(db, "uploadedFile", fileId);
            await updateDoc(docRef, {
                password: isPasswordEnabled ? password : ''
            });
            toast.success("Password Saved!");
        } catch (error) {
            console.error("Error updating password:", error);
            toast.error("Failed to save password.");
        }
    }

    const sendEmail = async () => {
        if (!email) {
            toast.error("Please enter a recipient email address.");
            return;
        }
        setSendingEmail(true);
        try {
            let customName = user?.fullName || 'Someone';
            let customNote = '';
            if (typeof window !== 'undefined') {
                const savedName = localStorage.getItem('swift_share_uploader_name');
                if (savedName) customName = savedName;
                customNote = localStorage.getItem('swift_share_sharing_note') || '';
            }

            const response = await fetch('/api/upload/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emailToSend: email,
                    userName: customName,
                    fileName: fileInfo?.fileName,
                    fileSize: fileInfo?.fileSize,
                    fileType: fileInfo?.fileType,
                    shortUrl: fileInfo?.shortUrl,
                    message: customNote
                })
            });

            const data = await response.json();
            
            if (response.ok) {
                toast.success("Email Shared Successfully!");
                setEmail('');
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('swift_share_sharing_note');
                }
            } else {
                // Handle Resend restrictions or custom errors
                toast.error("Failed to share link via email: " + (data.error?.message || data.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Error sending email:", error);
            toast.error("Failed to send email. Check developer console.");
        } finally {
            setSendingEmail(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[70vh]">
                <p className="text-primary font-bold text-lg animate-pulse">Loading file details...</p>
            </div>
        )
    }

    const previewFilesList = fileInfo?.files || [
        {
            fileName: fileInfo?.fileName,
            fileSize: fileInfo?.fileSize,
            fileType: fileInfo?.fileType,
            fileUrl: fileInfo?.fileUrl
        }
    ];

    return (
        <div className="w-full px-0 py-4 sm:p-5 sm:px-8 max-w-5xl mx-auto">
            <Link href="/upload" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition font-bold mb-6 px-4 sm:px-0">
                <ArrowLeft className="w-5 h-5" />
                Go Back to Upload
            </Link>

            <div className="w-full flex flex-col md:flex-row items-stretch gap-6 md:gap-10 p-4 sm:p-8 border border-gray-200 bg-white rounded-2xl shadow-xl animate-fade-in-up">
                
                {/* Left Column: File Details Card */}
                <div className="flex flex-col p-4 sm:p-6 bg-slate-50 border border-slate-150 rounded-xl flex-1 text-center w-full min-w-0 md:min-w-[280px]">
                    <div className="w-24 h-24 relative mb-4 mx-auto">
                        <Image 
                            src="/folder.png" 
                            fill
                            alt="Folder icon"
                            className="object-contain"
                            unoptimized
                        />
                    </div>
                    
                    <h2 className="text-lg font-bold text-gray-800 break-all leading-tight max-w-[250px] mx-auto">
                        {fileInfo?.fileName}
                    </h2>
                    
                    <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-wider">
                        {fileInfo?.fileType} • {(fileInfo?.fileSize / 1024 / 1024).toFixed(2)} MB
                    </p>

                    <div className="mt-6 border-t border-slate-200 pt-4 w-full text-left max-h-[280px] overflow-y-auto pr-1 space-y-2.5">
                        <h4 className="text-xs font-bold text-gray-450 uppercase tracking-wider pl-1">Batch Files ({previewFilesList.length})</h4>
                        {previewFilesList.map((file, index) => (
                            <div key={index} className="bg-white border border-slate-150 p-3 rounded-xl shadow-sm flex items-center justify-between gap-3">
                                <div className="truncate flex-1">
                                    <p className="text-sm font-bold text-gray-800 break-all truncate">{file.fileName}</p>
                                    <p className="text-xs text-gray-400 mt-0.5 font-medium truncate">
                                        {(file.fileSize / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                                <a 
                                    href={file.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-slate-100 hover:bg-primary hover:text-white transition p-1.5 rounded-lg text-gray-500 shrink-0"
                                    title="Open raw file in new tab"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Share Settings */}
                <div className="flex-1 w-full flex flex-col justify-between space-y-6">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-700">Share settings</h3>
                        <p className="text-sm text-gray-400 mt-1">Configure security or send directly to a friend</p>
                    </div>

                    {/* 1. Link Box */}
                    <div>
                        <label className="text-sm font-bold text-gray-600 block mb-2">Short Link</label>
                        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-2.5 shadow-sm">
                            <input 
                                type="text" 
                                readOnly 
                                value={fileInfo?.shortUrl || ''}
                                className="bg-transparent outline-none flex-1 text-sm text-gray-700 select-all pr-2 min-w-0"
                            />
                            <button 
                                onClick={copyToClipboard}
                                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-md transition text-primary shrink-0"
                            >
                                {copied ? <Check className="w-4.5 h-4.5 text-green-600 animate-scale-up" /> : <Copy className="w-4.5 h-4.5" />}
                            </button>
                        </div>
                    </div>

                    {/* 2. Password Toggle */}
                    <div className="border-t border-slate-100 pt-5">
                        <label className="flex items-center gap-2.5 cursor-pointer mb-3">
                            <input 
                                type="checkbox" 
                                checked={isPasswordEnabled}
                                onChange={(e) => {
                                    setIsPasswordEnabled(e.target.checked);
                                    if (!e.target.checked) setPassword('');
                                }}
                                className="w-4 h-4 text-primary rounded focus:ring-primary"
                            />
                            <span className="text-sm font-bold text-gray-600">Enable Password Protection</span>
                        </label>

                        {isPasswordEnabled && (
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mt-2 animate-fade-in-up">
                                <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-2.5 shadow-sm flex-1">
                                    <Key className="w-4.5 h-4.5 text-gray-400 shrink-0" />
                                    <input 
                                        type="password" 
                                        placeholder="Set custom password..."
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="outline-none flex-1 text-sm bg-transparent min-w-0"
                                    />
                                </div>
                                <button 
                                    onClick={savePassword}
                                    className="bg-primary hover:bg-blue-600 text-white font-bold px-5 py-2.5 text-sm rounded-lg shadow-sm transition w-full sm:w-auto shrink-0"
                                >
                                    Save
                                </button>
                            </div>
                        )}
                    </div>

                    {/* 3. Share Email */}
                    <div className="border-t border-slate-100 pt-5">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                            <label className="text-sm font-bold text-gray-600">Send Link via Email</label>
                            <Link href={`/settings?redirect=/file-preview/${fileId}`} className="text-xs text-primary hover:text-blue-600 transition font-bold">
                                Want to add a custom message? Click here
                            </Link>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-2.5 shadow-sm flex-1">
                                <Mail className="w-4.5 h-4.5 text-gray-400 shrink-0" />
                                <input 
                                    type="email" 
                                    placeholder="recipient@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="outline-none flex-1 text-sm bg-transparent min-w-0"
                                />
                            </div>
                            <button 
                                disabled={sendingEmail}
                                onClick={sendEmail}
                                className="bg-primary hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold px-5 py-2.5 text-sm rounded-lg shadow-sm transition w-full sm:w-auto shrink-0"
                            >
                                {sendingEmail ? 'Sending...' : 'Send'}
                            </button>
                        </div>
                    </div>

                </div>

            </div>
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
        </div>
    )
}

export default FilePreview
