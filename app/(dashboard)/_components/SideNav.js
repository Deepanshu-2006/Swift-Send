"use client"
import { Files, Shield, Upload, Settings } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function SideNav() {
    const pathname = usePathname();
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
            name: 'Settings',
            icon: Settings,
            path: '/settings'
        },
    ]

    return (
        <div className="w-full">
            <Link href="/" className='flex items-center gap-3 p-5 border-b border-gray-200 hover:opacity-90 transition-opacity cursor-pointer'>
                <Image src='/logo.svg' width={48} height={30} alt='logo' className="shrink-0" unoptimized />
                <span className='text-2xl text-cyan-700 text-shadow-cyan-500 font-extrabold font-serif font-stretch-95% whitespace-nowrap'>Swift Send</span>
            </Link>
            <div className='flex flex-col mt-8 font-bold w-full'>
                {menuList.map((item) => {
                    const isActive = pathname === item.path || (item.path === '/upload' && pathname === '/');
                    return (
                        <Link 
                            key={item.id} 
                            href={item.path} 
                            className={`flex gap-5 px-6 py-4 transition-all duration-300 ease-in-out items-center w-full border-r-4 group ${
                                isActive 
                                    ? 'bg-blue-50/60 text-primary border-primary font-extrabold shadow-inner' 
                                    : 'text-gray-500 border-transparent hover:text-gray-800 hover:bg-slate-50/80 hover:pl-8'
                            }`}
                        >
                            <item.icon className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${
                                isActive ? 'text-primary' : 'text-gray-450 group-hover:text-gray-650'
                            }`} />
                            <h2 className="transition-all duration-300">{item.name}</h2>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default SideNav

