import React, { useState } from 'react'
import { Upload } from 'lucide-react'
import AlertMesaage from './AlertMesaage';
import FilePreview from './FilePreview';

function UploadForm({uploadBtnClick}) {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState();
    const [dragActive, setDragActive] = useState(false);

    const onFileSelect = (selectedFiles) => {
        const fileList = Array.from(selectedFiles);
        if (fileList.length === 0) return;

        // Verify size for each selected file (max 2MB)
        const oversizedFile = fileList.find(file => file.size > 2 * 1024 * 1024);
        if (oversizedFile) {
            setError(`File "${oversizedFile.name}" exceeds the 2MB size limit.`);
            return;
        }

        setError(null);
        setFiles(prev => [...prev, ...fileList]);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onFileSelect(e.dataTransfer.files);
        }
    };

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const hasFiles = files.length > 0;

    return (
        <div>
            <div className="flex items-center justify-center w-full">
                <label 
                    htmlFor="dropzone-file" 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center w-200 h-100 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
                        dragActive 
                            ? 'border-blue-600 bg-blue-100 scale-[1.01]' 
                            : 'bg-blue-50 border-primary border-default-strong hover:bg-slate-100'
                    }`}
                >
                    <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                        <svg className="w-14 h-14 mb-4 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2" /></svg>
                        <p className="mb-2 text-sm">
                            <strong className='text-primary font-extrabold text-[18px]'>Click to upload</strong>
                            <span className='text-[18px] font-medium'> or drag and drop</span>
                        </p>
                        <p className="text-[13px] text-gray-400">SVG, PNG, JPG or GIF (Max 2MB per file)</p>
                    </div>
                    <input 
                        id="dropzone-file" 
                        type="file" 
                        multiple 
                        className="hidden"
                        onChange={(event) => onFileSelect(event.target.files)} 
                    />
                </label>
            </div>

            {error ? <AlertMesaage msg={error} /> : null}

            {hasFiles ? (
                <FilePreview files={files} onRemoveFile={removeFile} />
            ) : null}

            <div className="flex justify-center mt-8">
                <button 
                    disabled={!hasFiles} 
                    className={`relative inline-flex items-center justify-center p-4 px-8 py-2 overflow-hidden font-medium transition duration-300 ease-out border-2 rounded-full shadow-md ${
                        !hasFiles
                            ? 'bg-gray-300 text-white border-gray-300 cursor-not-allowed'
                            : 'group text-primary border-blue-400 hover:border-primary cursor-pointer'
                    }`} 
                    onClick={() => uploadBtnClick(files)}
                >
                    {hasFiles ? (
                        <>
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary group-hover:translate-x-0 ease">
                                <Upload className="w-6 h-6" />
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-primary transition-all duration-300 transform group-hover:translate-x-full ease font-extrabold text-[18px]">
                                Upload {files.length} {files.length === 1 ? 'File' : 'Files'}
                            </span>
                            <span className="relative invisible text-[18px]">
                                Upload {files.length} {files.length === 1 ? 'File' : 'Files'}
                            </span>
                        </>
                    ) : (
                        <span className="relative font-extrabold text-[18px]">Upload</span>
                    )}
                </button>
            </div>
        </div >
    )
}

export default UploadForm
