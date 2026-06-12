import React from 'react'
import { X, FileText } from 'lucide-react'

function FilePreview({files = [], onRemoveFile}) {
    if (files.length === 0) return null;
    
    return (
        <div className='flex flex-col gap-3 mt-6 max-w-lg mx-auto w-full px-4'>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">Selected Files ({files.length})</h3>
            <div className="max-h-[200px] overflow-y-auto pr-1 space-y-2">
                {files.map((file, index) => (
                    <div key={index} className='flex items-center justify-between bg-slate-50 border border-gray-200 rounded-xl p-3 shadow-sm w-full'>
                        <div className='flex items-center gap-3 truncate'>
                            <div className="w-9 h-9 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div className='truncate'>
                                <h2 className='font-bold text-sm text-gray-800 truncate'>{file.name}</h2>
                                <h2 className='text-xs text-gray-400 font-medium mt-0.5 truncate'>
                                    {file.type || 'unknown'} • {(file.size / 1024 / 1024).toFixed(2)} MB
                                </h2>
                            </div>
                        </div>
                        <button 
                            type="button"
                            onClick={() => onRemoveFile(index)} 
                            className='text-gray-450 hover:text-red-500 transition p-1 cursor-pointer shrink-0'
                            title="Remove file"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FilePreview
