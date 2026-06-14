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
        <main className="relative min-h-[100dvh] w-full overflow-x-hidden bg-[linear-gradient(180deg,#f7fbff_0%,#eef7ff_55%,#ffffff_100%)] flex items-center justify-center p-0 sm:p-6 lg:p-8">
            {/* Grid overlay & blur decoration */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#c6d6e61f_1px,transparent_1px),linear-gradient(to_bottom,#c6d6e61f_1px,transparent_1px)] bg-[size:22px_22px]" />
            <div className="absolute -left-40 -top-32 -z-10 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
            <div className="absolute -bottom-32 -right-24 -z-10 h-80 w-80 rounded-full bg-cyan-100 blur-3xl" />

            <div className="flex w-full max-w-5xl h-[100dvh] sm:h-[calc(100vh-4rem)] sm:max-h-[720px] sm:min-h-[580px] overflow-hidden sm:rounded-[36px] border-0 sm:border border-slate-200/80 bg-transparent sm:bg-white/85 shadow-none sm:shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur-none sm:backdrop-blur">

                {/* Left side: branding/illustration — desktop only */}
                <section className="relative hidden lg:flex lg:w-1/2 h-full flex-col justify-between overflow-hidden bg-[linear-gradient(155deg,#041a31_0%,#0a3357_42%,#0b6ec0_100%)] p-8 text-white xl:p-10">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:34px_34px]" />
                    </div>
                    <div className="absolute -right-20 -top-16 h-44 w-44 rounded-full bg-cyan-300/25 blur-3xl" />
                    <div className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />

                    <div className="relative z-10 flex items-center gap-3">
                        <Image src="/logo.svg" alt="Swift Send" width={60} height={38} unoptimized />
                        <div>
                            <p className="text-lg font-bold tracking-wide leading-none">Swift Send</p>
                            <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-100/80 mt-1">Secure File Sharing</p>
                        </div>
                    </div>

                    <div className="relative z-10 my-auto py-4 space-y-5">
                        <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-medium backdrop-blur">
                            Built for fast, private sharing
                        </div>
                        <div className="max-w-lg">
                            <h1 className="text-2xl xl:text-3xl font-semibold leading-[1.15]">
                                One account for every upload, share, and secure delivery.
                            </h1>
                            <p className="mt-2.5 text-xs xl:text-sm leading-relaxed text-blue-100/90">
                                Keep your Clerk auth flow, but inside a screen that feels like part of your product instead of a default modal.
                            </p>
                        </div>
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

                {/* Right side: Auth form */}
                <section className="w-full lg:w-1/2 h-full flex flex-col overflow-y-auto bg-transparent">

                    {/* Top bar */}
                    <div className="flex items-center justify-between w-full px-6 sm:px-8 pt-6 sm:pt-7 shrink-0">
                        <div className="flex items-center gap-2.5 lg:hidden">
                            <Image src="/logo.svg" alt="Swift Send" width={36} height={24} unoptimized />
                            <span className="text-sm font-bold text-slate-900">Swift Send</span>
                        </div>
                        <div className="hidden lg:block" />
                        <Link
                            href="/"
                            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                        >
                            Back Home
                        </Link>
                    </div>

                    {/* Form area */}
                    <div className="flex-1 flex flex-col items-center lg:justify-center px-6 sm:px-8 pt-6 pb-6 lg:py-6">

                        <div className="w-full max-w-[400px]">
                            {/* Custom header — mobile only */}
                            <div className="mb-5 lg:hidden">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-primary">
                                    Join Swift Send
                                </p>
                                <h2 className="mt-1.5 text-[1.65rem] font-semibold leading-tight text-slate-900">
                                    Create an account
                                </h2>
                                <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">
                                    Start sharing your files securely in seconds.
                                </p>
                            </div>

                            {/* Clerk card */}
                            {mounted ? (
                                <SignUp
                                    path="/sign-up"
                                    routing="path"
                                    signInUrl="/sign-in"
                                    appearance={{
                                        elements: {
                                            rootBox: 'w-full overflow-visible max-sm:shadow-none',
                                            cardBox: 'w-full overflow-visible max-sm:shadow-none max-sm:border-none max-sm:bg-transparent',
                                            card: 'w-full overflow-visible max-sm:shadow-none max-sm:border-none max-sm:bg-transparent max-sm:p-0',
                                            header: 'max-sm:hidden',
                                            dividerLine: 'bg-slate-100',
                                            dividerText: 'text-[9px] font-semibold uppercase tracking-[0.24em] text-slate-400',
                                            socialButtonsBlockButton:
                                                'h-10 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 shadow-none transition hover:border-slate-300 hover:bg-white',
                                            socialButtonsBlockButtonText: 'text-xs font-semibold',
                                            socialButtonsIconButton:
                                                'h-10 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 shadow-none transition hover:border-slate-300 hover:bg-white',
                                            formFieldLabel:
                                                'mb-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500',
                                            formFieldInput:
                                                'h-10 rounded-xl border border-slate-200 bg-white px-3 text-slate-900 shadow-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100',
                                            formButtonPrimary:
                                                'mt-1.5 h-10 rounded-xl bg-primary text-xs font-semibold text-white shadow-none transition hover:bg-sky-600',
                                            footerAction: 'pt-2',
                                            footerActionText: 'text-xs text-slate-500',
                                            footerActionLink: 'text-xs font-semibold text-primary hover:text-sky-700',
                                            identityPreviewText: 'text-slate-700',
                                            formResendCodeLink: 'text-xs font-semibold text-primary hover:text-sky-700',
                                            otpCodeFieldInput:
                                                'h-10 w-10 rounded-xl border border-slate-200 text-slate-900 shadow-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100',
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

                    {/* Footer */}
                    <div className="px-6 sm:px-8 pb-5 sm:pb-8 shrink-0 text-center">
                        <p className="text-[9px] text-slate-400 select-none">
                            &copy; {new Date().getFullYear()} Swift Send. All rights reserved.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    )
}