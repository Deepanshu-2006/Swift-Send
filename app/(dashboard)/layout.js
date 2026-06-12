import React from 'react'
import SideNav from './_components/SideNav'
import { UserButton } from '@clerk/nextjs' 

function layout({ children }) {
    return (
        <div>
            <div className='h-full w-64 flex-col fixed inset-y-0 z-50 bg-transparent border-r border-gray-300'>
                <SideNav />
            </div>

            <div className='ml-64'>
                <header className="p-4 border-b border-gray-300 flex justify-end bg-transparent">
                    <UserButton afterSignOutUrl="/" />
                </header>

                <main className="p-4">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default layout