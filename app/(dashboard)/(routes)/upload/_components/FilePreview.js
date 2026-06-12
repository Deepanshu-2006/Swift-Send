import React from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

function FilePreview({file}) {
    return (
        <div className='justify-center flex'>
            <div className='flex items-center  w-100 h-30 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg mt-5'>
                <div className='ml-10 flex gap-3 justify-center items-center '>
                    <Image src='/filepreview.png' width={60} height={30} alt='folder' />
                    <div>
                        <h2 className='font-semibold text-[18px] mt-2'>{file.name}</h2>
                        <h2 className='text-[15px] text-gray-500 font-medium'>{file?.type} / {(file.size/1024/1024).toFixed(2)}MB</h2>
                    </div>
                    <span className='ml-15 text-red-500 '><X /></span>
                </div>
            </div>
        </div>
    )
}

export default FilePreview
