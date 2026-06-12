"use client"
import React, { useState } from 'react'
import SideNav from './_components/SideNav'
import { UserButton } from '@clerk/nextjs' 
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

function layout({ children }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div>
            {/* Mobile Sidebar Backdrop Overlay */}
            {isSidebarOpen && (
                <div 
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/45 backdrop-blur-xs md:hidden animate-fade-in"
                />
            )}

            {/* Sidebar container with responsive placement */}
            <div className={`h-full w-64 flex-col fixed inset-y-0 z-50 bg-white md:bg-transparent border-r border-gray-300 transition-transform duration-300 ease-in-out md:translate-x-0 ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                {/* Close drawer button for mobile */}
                <div className="absolute top-5 right-5 md:hidden">
                    <button 
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-1 rounded-lg hover:bg-slate-100 transition"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>
                <SideNav />
            </div>

            {/* Main view frame */}
            <div className='md:ml-64 min-h-screen flex flex-col bg-slate-50/10'>
                {/* Top header navigation */}
                <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-transparent sticky top-0 z-30 h-16">
                    {/* Hamburger menu toggle button for mobile */}
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 rounded-lg hover:bg-slate-100 transition md:hidden shrink-0"
                    >
                        <Menu className="w-6 h-6 text-gray-600" />
                    </button>

                    {/* Right-aligned Profile User button */}
                    <div className="flex-1 flex justify-end">
                        <UserButton 
                            afterSignOutUrl="/" 
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10 border-2 border-slate-100 shadow-sm hover:scale-105 hover:border-blue-400 transition-all duration-200"
                                }
                            }}
                        />
                    </div>
                </header>

                {/* Main page content area with re-mounting slide-up transitions */}
                <main key={pathname} className="p-6 flex-1 animate-slide-up-fade">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default layout