"use client"
import React from 'react'
import UploadForm from './_components/UploadForm'

function upload() {
    return (
            <div className='p-5 px-8'>
            <h2 className='text-[24px] text-center m-5'>Start 
                <strong className='text-primary font-extrabold'> Uploading </strong>File and 
                <strong className='text-primary font-extrabold'> Share</strong> it</h2>
            <UploadForm />
        </div>
    )
}

export default upload
