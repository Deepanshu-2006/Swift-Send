'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SignUp } from '@clerk/nextjs'

export default function Page() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <main className="relative h-screen w-screen overflow-hidden bg-[linear-gradient(180deg,#f7fbff_0%,#eef7ff_55%,#ffffff_100%)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Grid overlay & blur decoration */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#c6d6e61f_1px,transparent_1px),linear-gradient(to_bottom,#c6d6e61f_1px,transparent_1px)] bg-[size:22px_22px]" />
            <div className="absolute -left-40 -top-32 -z-10 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
            <div className="absolute -bottom-32 -right-24 -z-10 h-80 w-80 rounded-full bg-cyan-100 blur-3xl" />

            <div className="flex w-full max-w-5xl h-[calc(100vh-4rem)] max-h-[720px] min-h-[580px] overflow-hidden rounded-[36px] border border-slate-200/80 bg-white/85 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur">
                {/* Left side: branding/illustration */}
                <section className="relative hidden lg:flex lg:w-1/2 h-full flex-col justify-between overflow-hidden bg-[linear-gradient(155deg,#041a31_0%,#0a3357_42%,#0b6ec0_100%)] p-8 text-white xl:p-10">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:34px_34px]" />
                    </div>
                    <div className="absolute -right-20 -top-16 h-44 w-44 rounded-full bg-cyan-300/25 blur-3xl" />
                    <div className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />

                    {/* Logo & Header */}
                    <div className="relative z-10 flex items-center gap-3">
                        <Image src="/logo.svg" alt="Swift Send" width={60} height={38} unoptimized />
                        <div>
                            <p className="text-lg font-bold tracking-wide leading-none">Swift Send</p>
                            <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-100/80 mt-1">
                                Secure File Sharing
                            </p>
                        </div>
                    </div>

                    {/* Content text */}
                    <div className="relative z-10 my-auto py-4 space-y-5">
                        <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-medium backdrop-blur">
                            Built for fast, private sharing
                        </div>
                        <div className="max-w-lg">
                            <h1 className="text-2xl xl:text-3xl font-semibold leading-[1.15]">
                                One account for every upload, share, and secure delivery.
                            </h1>
                            <p className="mt-2.5 text-xs xl:text-sm leading-relaxed text-blue-100/90">
                                Keep your Clerk auth flow, but inside a screen that feels like
                                part of your product instead of a default modal.
                            </p>
                        </div>

                        {/* Metrics grid */}
                        <div className="grid gap-2.5 grid-cols-3">
                            <div className="rounded-xl border border-white/12 bg-white/10 p-2.5 backdrop-blur">
                                <p className="text-lg font-bold leading-none">10x</p>
                                <p className="text-[10px] text-blue-100/80 mt-1 leading-none">Faster sharing</p>
                            </div>
                            <div className="rounded-xl border border-white/12 bg-white/10 p-2.5 backdrop-blur">
                                <p className="text-lg font-bold leading-none">100%</p>
                                <p className="text-[10px] text-blue-100/80 mt-1 leading-none">Secure transfer</p>
                            </div>
                            <div className="rounded-xl border border-white/12 bg-white/10 p-2.5 backdrop-blur">
                                <p className="text-lg font-bold leading-none">1 place</p>
                                <p className="text-[10px] text-blue-100/80 mt-1 leading-none">For files</p>
                            </div>
                        </div>
                    </div>

                    {/* Illustration at the bottom */}
                    <div className="relative z-10 flex justify-center">
                        <Image
                            src="/Image.svg"
                            alt="File sharing illustration"
                            width={380}
                            height={220}
                            priority
                            unoptimized
                            className="h-auto w-full max-w-[200px] xl:max-w-[240px]"
                        />
                    </div>
                </section>

                {/* Right side: SignUp components */}
                <section className="w-full lg:w-1/2 h-full flex flex-col justify-between p-6 sm:p-8 bg-white/30 backdrop-blur-sm lg:bg-transparent overflow-y-auto">
                    {/* Top bar: home and mobile logo */}
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3 lg:hidden">
                            <Image src="/logo.svg" alt="Swift Send" width={44} height={28} unoptimized />
                            <span className="text-md font-bold text-slate-900">Swift Send</span>
                        </div>
                        <div className="hidden lg:block" />
                        <Link
                            href="/"
                            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                        >
                            Back Home
                        </Link>
                    </div>

                    {/* Centered card and info */}
                    <div className="my-auto mx-auto w-full max-w-[380px] flex flex-col py-4">
                        <div className="mb-4">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-primary">
                                Get Started
                            </p>
                            <h2 className="mt-1.5 text-2xl font-semibold leading-tight text-slate-900">
                                Create your account
                            </h2>
                            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                                Access your uploads, manage secure links, and keep sharing.
                            </p>
                        </div>

                        <div className="w-full">
                            {mounted ? (
                                <SignUp
                                    path="/sign-up"
                                    routing="path"
                                    signInUrl="/sign-in"
                                    appearance={{
                                        elements: {
                                            rootBox: 'w-full shadow-none',
                                            cardBox: 'w-full shadow-none border-0 bg-transparent p-0',
                                            card: 'w-full border-0 bg-transparent p-0 shadow-none',
                                            header: 'hidden',
                                            dividerLine: 'bg-slate-100',
                                            dividerText: 'text-[9px] font-semibold uppercase tracking-[0.24em] text-slate-400',
                                            socialButtonsBlockButton:
                                                'h-9 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 shadow-none transition hover:border-slate-300 hover:bg-white',
                                            socialButtonsBlockButtonText: 'text-xs font-semibold',
                                            formFieldLabel:
                                                'mb-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500',
                                            formFieldInput:
                                                'h-9 rounded-xl border border-slate-200 bg-white px-3 text-slate-900 shadow-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100',
                                            formButtonPrimary:
                                                'mt-1.5 h-9 rounded-xl bg-primary text-xs font-semibold text-white shadow-none transition hover:bg-sky-600',
                                            footerAction: 'pt-2',
                                            footerActionText: 'text-xs text-slate-500',
                                            footerActionLink: 'text-xs font-semibold text-primary hover:text-sky-700',
                                            identityPreviewText: 'text-slate-700',
                                            formResendCodeLink: 'text-xs font-semibold text-primary hover:text-sky-700',
                                            otpCodeFieldInput:
                                                'h-9 w-9 rounded-xl border border-slate-200 text-slate-900 shadow-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100',
                                        },
                                        layout: {
                                            socialButtonsPlacement: 'top',
                                            socialButtonsVariant: 'blockButton',
                                        },
                                    }}
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center space-y-3 py-6 border border-slate-200/80 rounded-2xl bg-white shadow-sm min-h-[300px]">
                                    <div className="h-6 w-6 animate-spin rounded-full border-3 border-slate-200 border-t-primary" />
                                    <p className="text-[10px] text-slate-400 animate-pulse font-medium">Securing session...</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-[9px] text-slate-400 text-center select-none">
                        &copy; {new Date().getFullYear()} Swift Send. All rights reserved.
                    </div>
                </section>
            </div>
        </main>
    )
}