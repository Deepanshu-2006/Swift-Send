import { AlertCircleIcon } from 'lucide-react'
import React from 'react'

function AlertMesaage({msg}) {
    return (
        <div className='justify-center flex'>
        <div className='mt-5 flex gap-4 text-[21px] bg-red-500 w-140 text-white p-4 rounded-lg items-center justify-center'> 
            <AlertCircleIcon />
            {msg}
        </div>
        </div>
    )
}

export default AlertMesaage
