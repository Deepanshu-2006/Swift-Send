"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Show, UserButton } from '@clerk/nextjs'

function Header() {
  return (
    <div>

      <header className="border-b bg-transparent mx-10 absolute inset-x-0 top-0 z-50 h-18">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_2px,transparent_2px),linear-gradient(to_bottom,#8080800a_2px,transparent_2px)] bg-size-[14px_24px]"></div>
        <div className="mx-auto  flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8 ">

          <div className="flex items-center ">
            <Image src='/logo.svg' width={80} height={50} alt='logo' unoptimized />
            <span className='text-2xl text-cyan-700 text-shadow-cyan-500 font-extrabold font-serif font-stretch-95% '>Swift Send</span>
          </div>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-l font-bold">
                <li>
                  <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Home </a>
                </li>

                <li>
                  <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Upload </a>
                </li>

                <li>
                  <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> About Us </a>
                </li>

                <li>
                  <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Contact Us </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">

                <Show when="signed-out">
                  <Link href="/sign-in" className="relative inline-block text-lg group">
                    <span className="relative z-10 block px-5 py-3 overflow-hidden font-bold leading-tight text-primary transition-colors duration-300 ease-out border-2 border-primary rounded-lg group-hover:text-white">
                      <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                      <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
                      <span className="relative">Get Started</span>
                    </span>
                    <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-primary rounded-lg group-hover:mb-0 group-hover:mr-0 hover:font-extrabold" data-rounded="rounded-lg"></span>
                  </Link>
                </Show>

                <Show when="signed-in">
                  <div className="ml-8 mt-1 flex scale-155 items-end origin-center">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </Show>

              </div>

              <button className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                <span className="sr-only">Toggle menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
