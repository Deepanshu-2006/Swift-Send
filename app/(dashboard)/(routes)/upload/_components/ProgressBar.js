import React from 'react'

function ProgressBar({ progress = 0 }) {
    return (
        <div className='w-200 items-center bg-gray-200 h-5 rounded-full mt-5 overflow-hidden'>
            <div
                className='bg-primary h-full rounded-full transition-all duration-300 flex items-center justify-end text-[12px] font-bold text-white pr-3'
                style={{ width: `${progress}%` }}
            >
                {progress > 10 && `${Math.round(progress)}%`}
            </div>
        </div>
    )
}

export default ProgressBar
