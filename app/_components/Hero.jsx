import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Show } from '@clerk/nextjs'

function Hero() {
    return (
        <div id="home">
            <section className="lg:grid lg:h-screen lg:place-content-center">
                <div className="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32">
                    <div className="max-w-prose text-left">
                        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl font-serif ">
                            <strong className="text-primary"> Upload, Save  </strong>
                            and easily
                            <strong className="text-primary"> Share </strong>
                            your files in one place
                        </h1>

                        <p className="mt-4 text-base text-pretty text-gray-500 font-bold sm:text-lg/relaxed">
                            Drag and drop your file directly on our cloud and share it with your friends securely with password and send it on email
                        </p>

                        <div className="mt-4 flex items-center gap-4 sm:mt-6">
                            
                            {/* Shows ONLY if user is LOGGED OUT */}
                            <Show when="signed-out">
                                <Link href="/sign-in" className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-primary transition-all duration-150 ease-in-out rounded-lg border-gray-200 shadow-inner group hover:pl-10 hover:pr-6 bg-gray-50">
                                    <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-primary group-hover:h-full hover:font-extrabold"></span>
                                    <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </span>
                                    <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </span>
                                    <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white font-bold ">Get Started</span>
                                </Link>
                            </Show>

                            {/* Shows ONLY if user is LOGGED IN */}
                            <Show when="signed-in">
                                <Link href="/upload" className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-primary transition-all duration-150 ease-in-out rounded-lg border-gray-200 shadow-inner group hover:pl-10 hover:pr-6 bg-gray-50">
                                    <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-primary group-hover:h-full hover:font-extrabold"></span>
                                    <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </span>
                                    <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </span>
                                    <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white font-bold ">Go to Upload</span>
                                </Link>
                            </Show>

                            <a href="#features" className="rounded-lg relative inline-flex group items-center justify-center px-3.5 py-3 m-1 cursor-pointer border-b-4 border-l-2 shadow-lg bg-primary border-primary font-bold text-white">
                                <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 hover:font-extrabold opacity-10"></span>
                                <span className="relative">Learn More</span>
                            </a>
                        </div>
                    </div>
                    <Image src='/Image.svg' width={800} height={270} alt='Hero Illustration' unoptimized />
                </div>
            </section>
        </div>
    )
}

export default Hero
