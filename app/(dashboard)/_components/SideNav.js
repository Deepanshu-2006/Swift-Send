"use client"
import { Files, icons, Shield, Upload } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'

function SideNav() {
    const [ActiveIndex, setActiveIndex] = useState(0);
    const menuList = [
        {
            id: 1,
            name: 'Upload',
            icon: Upload,
            path: '/upload'
        },
        {
            id: 2,
            name: 'Files',
            icon: Files,
            path: '/files'
        },
        {
            id: 3,
            name: 'Upgrade',
            icon: Shield,
            path: '/upgrade'
        },

    ]
    return (
        <div>
        <div className='flex items-center'>
            <Image src='/logo.svg' width={80} height={50} alt='logo' unoptimized />
            <span className='text-2xl text-cyan-700 text-shadow-cyan-500 font-extrabold font-serif font-stretch-95% '>Swift Send</span>
        </div>
        <div className='flex flex-col mt-10 float-left font-bold '>
        {menuList.map((item, index)=>(
            <button key={item.id} className={`flex gap-5 pl-2 py-4 hover:bg-gray-200 w-63 ${ActiveIndex === index ? 'bg-blue-50 text-primary' : ''}`}
            onClick={() => setActiveIndex(index)}
            >
                
                <item.icon />
                <h2>{item.name}</h2>
            </button>
        ))}
        </div>
        </div>
    )
}

export default SideNav
