"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'
import app from '../../../../FirebaseConfig'
import Link from 'next/link'
import { FileText, Search, Download, Copy, Check, Info, FolderOpen, Trash2, Loader2 } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Files() {
    const { user, isLoaded } = useUser();
    const db = getFirestore(app);
    const [files, setFiles] = useState([]);
    const [filteredFiles, setFilteredFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedId, setCopiedId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [deleteConfirmFile, setDeleteConfirmFile] = useState(null);

    // Prevent background scrolling when confirmation modal is open
    useEffect(() => {
        if (deleteConfirmFile) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [deleteConfirmFile]);

    // Close modal on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && deleteConfirmFile && deletingId !== deleteConfirmFile.id) {
                setDeleteConfirmFile(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [deleteConfirmFile, deletingId]);

    useEffect(() => {
        if (isLoaded && user) {
            getFiles();
        }
    }, [isLoaded, user]);

    const getFiles = async () => {
        setLoading(true);
        try {
            const email = user?.primaryEmailAddress?.emailAddress;
            if (!email) return;

            const q = query(
                collection(db, "uploadedFile"),
                where("userEmail", "==", email)
            );
            const querySnapshot = await getDocs(q);
            const filesList = [];
            querySnapshot.forEach((doc) => {
                filesList.push({ id: doc.id, ...doc.data() });
            });

            // Sort files alphabetically or by name by default
            filesList.sort((a, b) => a.fileName.localeCompare(b.fileName));

            setFiles(filesList);
            setFilteredFiles(filesList);
        } catch (error) {
            console.error("Error fetching files:", error);
            toast.error("Failed to load your files.");
        } finally {
            setLoading(false);
        }
    };

    // Filter files based on search query
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredFiles(files);
        } else {
            const lowerQuery = searchQuery.toLowerCase();
            const filtered = files.filter(file => 
                file.fileName.toLowerCase().includes(lowerQuery)
            );
            setFilteredFiles(filtered);
        }
    }, [searchQuery, files]);

    const copyToClipboard = (file) => {
        if (!file.shortUrl) return;
        navigator.clipboard.writeText(file.shortUrl);
        setCopiedId(file.id);
        toast.success("Short link copied to clipboard!");
        setTimeout(() => setCopiedId(null), 2000);
    };

    const parseCloudinaryUrl = (url) => {
        try {
            const parts = url.split('/');
            const uploadIndex = parts.indexOf('upload');
            if (uploadIndex === -1) return null;
            
            const resourceType = parts[uploadIndex - 1]; // e.g. 'image', 'raw'
            const versionIndex = uploadIndex + 1;
            let publicIdParts = parts.slice(versionIndex + 1);
            let publicId = publicIdParts.join('/');
            
            if (resourceType !== 'raw') {
                const dotIndex = publicId.lastIndexOf('.');
                if (dotIndex !== -1) {
                    publicId = publicId.substring(0, dotIndex);
                }
            }
            
            return { publicId, resourceType };
        } catch (e) {
            console.error("Failed to parse Cloudinary URL:", e);
            return null;
        }
    };

    const handleDelete = async (file) => {
        setDeletingId(file.id);
        try {
            let targetFiles = file.files;
            let targetPublicId = file.publicId;
            let targetResourceType = file.resourceType;

            // Backward compatibility for single file uploads without metadata fields
            if (!targetFiles && !targetPublicId && file.fileUrl) {
                const parsed = parseCloudinaryUrl(file.fileUrl);
                if (parsed) {
                    targetPublicId = parsed.publicId;
                    targetResourceType = parsed.resourceType;
                }
            }

            const response = await fetch('/api/files/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: file.id,
                    files: targetFiles,
                    publicId: targetPublicId,
                    resourceType: targetResourceType
                })
            });

            if (response.ok) {
                toast.success("File deleted successfully!");
                setFiles(prev => prev.filter(item => item.id !== file.id));
                setDeleteConfirmFile(null);
            } else {
                const data = await response.json();
                toast.error("Failed to delete file: " + (data.error || "Unknown error"));
                setDeleteConfirmFile(null);
            }
        } catch (error) {
            console.error("Deletion error:", error);
            toast.error("Failed to delete file.");
            setDeleteConfirmFile(null);
        } finally {
            setDeletingId(null);
        }
    };

    const formatSize = (bytes) => {
        if (!bytes || isNaN(bytes)) return '0 Bytes';
        const kb = bytes / 1024;
        if (kb < 1024) {
            return kb.toFixed(2) + ' KB';
        }
        const mb = kb / 1024;
        return mb.toFixed(2) + ' MB';
    };

    const getTotalSpace = () => {
        const totalBytes = files.reduce((acc, file) => acc + (file.fileSize || 0), 0);
        return formatSize(totalBytes);
    };

    if (!isLoaded || loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium mt-4 animate-pulse text-sm">Fetching your files...</p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800">My Files</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage, share, and track all your uploaded assets</p>
                </div>
                
                {/* Stats Dashboard */}
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="bg-white border border-gray-200 rounded-xl px-5 py-3.5 shadow-sm flex items-center gap-3.5 flex-1 md:flex-initial min-w-[150px]">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary shrink-0">
                            <FolderOpen className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Total Files</p>
                            <h3 className="text-lg font-bold text-gray-800">{files.length}</h3>
                        </div>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-xl px-5 py-3.5 shadow-sm flex items-center gap-3.5 flex-1 md:flex-initial min-w-[150px]">
                        <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Storage Used</p>
                            <h3 className="text-lg font-bold text-gray-800">{getTotalSpace()}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter and Actions Row */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-3 py-2 shadow-sm flex-1 max-w-md">
                    <Search className="w-5 h-5 text-gray-400 shrink-0" />
                    <input 
                        type="text" 
                        placeholder="Search files by name..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent outline-none text-sm w-full"
                    />
                </div>

                <Link 
                    href="/upload" 
                    className="bg-primary hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-md transition text-center text-sm"
                >
                    Upload New File
                </Link>
            </div>

            {/* Table / Grid list */}
            {filteredFiles.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 bg-white border border-gray-200 rounded-2xl shadow-sm text-center">
                    <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-gray-400 mb-4 animate-bounce">
                        <FolderOpen className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">No files found</h3>
                    <p className="text-gray-450 text-sm mt-1 max-w-sm">
                        {files.length === 0 
                            ? "You haven't uploaded any files yet. Upload files to get secure links!"
                            : "No files match your search criteria. Try a different query."}
                    </p>
                    {files.length === 0 && (
                        <Link 
                            href="/upload" 
                            className="mt-6 bg-primary hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition text-sm animate-pulse"
                        >
                            Upload Your First File
                        </Link>
                    )}
                </div>
            ) : (
                <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-gray-200 text-gray-600 text-xs font-bold uppercase tracking-wider">
                                    <th className="py-4 px-6">File Name</th>
                                    <th className="py-4 px-6 hidden md:table-cell">Type</th>
                                    <th className="py-4 px-6">Size</th>
                                    <th className="py-4 px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                                {filteredFiles.map((file) => (
                                    <tr key={file.id} className="hover:bg-slate-50/80 transition-colors">
                                        {/* File Name */}
                                        <td className="py-4 px-6 font-medium text-gray-900 max-w-[200px] sm:max-w-[320px] truncate">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div className="truncate">
                                                    <Link 
                                                        href={`/file-preview/${file.id}`}
                                                        className="hover:text-primary transition font-bold block truncate"
                                                    >
                                                        {file.fileName}
                                                    </Link>
                                                    <span className="text-[11px] text-gray-400 font-mono mt-0.5 block md:hidden truncate">
                                                        {file.fileType}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        {/* Type */}
                                        <td className="py-4 px-6 text-gray-500 hidden md:table-cell font-mono text-xs">
                                            {file.fileType || 'unknown'}
                                        </td>
                                        
                                        {/* Size */}
                                        <td className="py-4 px-6 font-medium">
                                            {formatSize(file.fileSize)}
                                        </td>
                                        
                                        {/* Actions */}
                                        <td className="py-4 px-6">
                                            <div className="flex items-center justify-center gap-2">
                                                {/* View Detail Link */}
                                                <Link 
                                                    href={`/file-preview/${file.id}`}
                                                    className="inline-flex items-center gap-1 bg-slate-100 hover:bg-primary hover:text-white transition px-3 py-1.5 rounded-lg text-xs font-bold text-gray-600"
                                                    title="View share settings"
                                                >
                                                    <Info className="w-3.5 h-3.5" />
                                                    <span className="hidden sm:inline">Details</span>
                                                </Link>

                                                {/* Copy Short Link */}
                                                <button 
                                                    onClick={() => copyToClipboard(file)}
                                                    className="inline-flex items-center gap-1 bg-slate-100 hover:bg-green-600 hover:text-white transition p-1.5 rounded-lg text-gray-600"
                                                    title="Copy short share link"
                                                >
                                                    {copiedId === file.id ? (
                                                        <Check className="w-3.5 h-3.5 text-green-600" />
                                                    ) : (
                                                        <Copy className="w-3.5 h-3.5" />
                                                    )}
                                                </button>

                                                {/* Download Link */}
                                                <a 
                                                    href={file.fileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 bg-slate-100 hover:bg-blue-600 hover:text-white transition p-1.5 rounded-lg text-gray-600"
                                                    title="Download original file"
                                                >
                                                    <Download className="w-3.5 h-3.5" />
                                                </a>

                                                {/* Delete button */}
                                                <button 
                                                    onClick={() => setDeleteConfirmFile(file)}
                                                    disabled={deletingId === file.id}
                                                    className="inline-flex items-center gap-1 bg-slate-100 hover:bg-red-600 hover:text-white transition p-1.5 rounded-lg text-red-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                                    title="Delete file completely"
                                                >
                                                    {deletingId === file.id ? (
                                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            
            {/* Custom confirmation dialog with smooth animations */}
            {deleteConfirmFile && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0" 
                        onClick={() => {
                            if (deletingId !== deleteConfirmFile.id) {
                                setDeleteConfirmFile(null);
                            }
                        }} 
                    />
                    
                    {/* Dialog Container */}
                    <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 max-w-sm w-full mx-auto animate-scale-up overflow-hidden">
                        {/* Red visual edge accent */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 to-pink-500"></div>
                        
                        <div className="flex flex-col items-center text-center mt-2">
                            {/* Alert Icon (Trash with pulsing effect) */}
                            <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 mb-4 animate-pulse">
                                <div className="absolute inset-0 rounded-full bg-red-100 opacity-75 animate-ping duration-1000"></div>
                                <Trash2 className="relative w-8 h-8" />
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-800">Delete File?</h3>
                            <p className="text-sm text-gray-500 mt-2 px-1">
                                Are you sure you want to permanently delete <strong className="text-gray-700 font-semibold break-all">"{deleteConfirmFile.fileName}"</strong>? This action cannot be undone and will delete it completely from cloud storage.
                            </p>
                            
                            {/* Inner feedback if active deletion is happening */}
                            {deletingId === deleteConfirmFile.id && (
                                <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-red-500 bg-red-50/50 px-3 py-1.5 rounded-full border border-red-100 animate-pulse">
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    Deleting file from cloud...
                                </div>
                            )}
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex gap-3 mt-6">
                            <button
                                disabled={deletingId === deleteConfirmFile.id}
                                onClick={() => setDeleteConfirmFile(null)}
                                className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={deletingId === deleteConfirmFile.id}
                                onClick={() => handleDelete(deleteConfirmFile)}
                                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold hover:from-red-700 hover:to-pink-700 hover:shadow-lg hover:shadow-red-500/10 active:scale-95 transition text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {deletingId === deleteConfirmFile.id ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    "Delete"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
        </div>
    );
}

export default Files;
