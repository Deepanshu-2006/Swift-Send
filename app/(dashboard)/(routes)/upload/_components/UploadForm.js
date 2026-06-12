import React, { useState } from 'react'
import { AlertCircleIcon, Upload } from 'lucide-react'
import AlertMesaage from './AlertMesaage';
import FilePreview from './FilePreview';

function UploadForm() {
    const [file, setFile] = useState();
    const [error, setError] = useState();

    const onFileSelect = (selectedFile) => {
        console.log('Selected file:', selectedFile);
        if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
            console.log('File size exceeds 2MB. Please select a smaller file.');
            setError('File size exceeds 2MB. Please select a smaller file.');
            return;
        }
        setError(null);
        setFile(selectedFile);
    }

    return (
        <div>

            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-200 h-100 bg-blue-50 border-2 border-dashed border-primary border-default-strong rounded-lg cursor-pointer hover:bg-neutral-tertiary-medium">
                    <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                        <svg className="w-14 h-14 mb-4 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2" /></svg>
                        <p className="mb-2 text-sm"><strong className='text-primary font-extrabold text-[18px]'>Click to upload</strong><span className='text-[18px] font-medium'> or drag and drop</span></p>
                        <p className="text-[13px]">SVG, PNG, JPG or GIF (Max Size: 2MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden"
                        onChange={(event) => onFileSelect(event.target.files[0])} />
                </label>
            </div>

            {error ? <AlertMesaage  msg={error} />:null}

            {file ? <FilePreview file={file} />:null}

            <div className="flex justify-center mt-8">
                <button disabled={!file} className={`relative inline-flex items-center justify-center p-4 px-8 py-2 overflow-hidden font-medium transition duration-300 ease-out border-2 rounded-full shadow-md ${!file
                    ? 'bg-gray-300 text-white border-gray-300 cursor-not-allowed'
                    : 'group text-primary border-blue-400 hover:border-primary'}`}>{file ? (
                        <>
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary group-hover:translate-x-0 ease">
                                <Upload className="w-6 h-6" />
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-primary transition-all duration-300 transform group-hover:translate-x-full ease font-extrabold text-[18px]">Upload</span>
                            <span className="relative invisible text-[18px]">Upload</span>
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
