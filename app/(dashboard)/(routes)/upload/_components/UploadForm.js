import React, { useState } from 'react'
import { Upload } from 'lucide-react'
import AlertMesaage from './AlertMesaage';
import FilePreview from './FilePreview';
import { useUpload } from '../../../_context/UploadContext';

function UploadForm({uploadBtnClick}) {
    const { files, setFiles } = useUpload();
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
            <div className="flex items-center justify-center w-full px-4">
                <label 
                    htmlFor="dropzone-file" 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center w-full max-w-xl min-h-[220px] sm:min-h-[260px] border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 p-4 sm:p-6 text-center ${
                        dragActive 
                            ? 'border-blue-600 bg-blue-100 scale-[1.01]' 
                            : 'bg-blue-50 border-primary border-default-strong hover:bg-slate-100'
                    }`}
                >
                    <div className="flex flex-col items-center justify-center text-body py-4 sm:py-6">
                        <svg className="w-12 h-12 sm:w-14 sm:h-14 mb-3 sm:mb-4 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2" /></svg>
                        <p className="mb-2 text-sm px-2">
                            <strong className='text-primary font-extrabold text-base sm:text-lg block sm:inline-block'>Click to upload </strong>
                            <span className='text-base sm:text-lg font-medium text-gray-550 block sm:inline-block'> or drag and drop</span>
                        </p>
                        <p className="text-xs sm:text-[13px] text-gray-400">SVG, PNG, JPG or GIF (Max 2MB per file)</p>
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

            <div className="flex justify-center mt-6 sm:mt-8">
                <button 
                    disabled={!hasFiles} 
                    className={`inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-full font-extrabold text-base sm:text-lg transition-all duration-200 shadow-md ${
                        !hasFiles
                            ? 'bg-gray-300 text-white border border-gray-300 cursor-not-allowed'
                            : 'bg-primary hover:bg-blue-600 text-white border border-primary cursor-pointer active:scale-[0.98]'
                    }`} 
                    onClick={() => uploadBtnClick(files)}
                >
                    {hasFiles ? (
                        <>
                            <Upload className="w-5 h-5 shrink-0" />
                            <span>Upload {files.length} {files.length === 1 ? 'File' : 'Files'}</span>
                        </>
                    ) : (
                        <span>Upload</span>
                    )}
                </button>
            </div>
        </div >
    )
}

export default UploadForm
