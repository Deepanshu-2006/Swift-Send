"use client"
import React, { useEffect, useState } from 'react'
import { User, Lock, Mail, Settings, Key, Calendar } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function SettingsPage() {
    const [uploaderName, setUploaderName] = useState('')
    const [sharingNote, setSharingNote] = useState('')
    const [expirationTime, setExpirationTime] = useState('none')
    const [isPasswordEnabled, setIsPasswordEnabled] = useState(false)
    const [defaultPassword, setDefaultPassword] = useState('')

    // Load settings from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUploaderName(localStorage.getItem('swift_share_uploader_name') || '')
            setSharingNote(localStorage.getItem('swift_share_sharing_note') || '')
            setExpirationTime(localStorage.getItem('swift_share_expiration_time') || 'none')
            setIsPasswordEnabled(localStorage.getItem('swift_share_password_enabled') === 'true')
            setDefaultPassword(localStorage.getItem('swift_share_default_password') || '')
        }
    }, [])

    const handleSave = () => {
        try {
            localStorage.setItem('swift_share_uploader_name', uploaderName)
            localStorage.setItem('swift_share_sharing_note', sharingNote)
            localStorage.setItem('swift_share_expiration_time', expirationTime)
            localStorage.setItem('swift_share_password_enabled', isPasswordEnabled.toString())
            localStorage.setItem('swift_share_default_password', isPasswordEnabled ? defaultPassword : '')
            
            toast.success("Settings Saved Successfully!")
        } catch (error) {
            console.error("Failed to save settings to localStorage:", error)
            toast.error("Failed to save settings.")
        }
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
                    <Settings className="w-8 h-8 text-primary shrink-0" />
                    Settings
                </h1>
                <p className="text-sm text-gray-500 mt-1">Configure default settings and custom templates for your shares</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 sm:p-8 space-y-8 animate-fade-in-up">
                {/* Section 1: Sharing Profile */}
                <div>
                    <h2 className="text-lg font-bold text-gray-700 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                        <User className="w-5 h-5 text-primary shrink-0" />
                        Uploader Profile
                    </h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-bold text-gray-600 block mb-2">Uploader Display Name (Alias)</label>
                            <div className="flex items-center gap-2.5 bg-white border border-gray-300 rounded-xl px-4 py-3 shadow-sm max-w-lg">
                                <User className="w-5 h-5 text-gray-400 shrink-0" />
                                <input 
                                    type="text" 
                                    placeholder="Use custom display name..."
                                    value={uploaderName}
                                    onChange={(e) => setUploaderName(e.target.value)}
                                    className="bg-transparent outline-none text-sm w-full"
                                />
                            </div>
                            <span className="text-xs text-gray-400 mt-1.5 block">Overrides your standard authentication name on shared download pages.</span>
                        </div>

                        <div>
                            <label className="text-sm font-bold text-gray-600 block mb-2">Default Email Custom Note</label>
                            <div className="flex items-start gap-2.5 bg-white border border-gray-300 rounded-xl px-4 py-3 shadow-sm max-w-lg">
                                <Mail className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                                <textarea 
                                    placeholder="Write a custom note to recipient..."
                                    value={sharingNote}
                                    onChange={(e) => setSharingNote(e.target.value)}
                                    rows={3}
                                    className="bg-transparent outline-none text-sm w-full resize-none"
                                />
                            </div>
                            <span className="text-xs text-gray-400 mt-1.5 block">Pre-fills the message text when sharing file links via email.</span>
                        </div>
                    </div>
                </div>

                {/* Section 2: Security & Expiration Defaults */}
                <div>
                    <h2 className="text-lg font-bold text-gray-700 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-primary shrink-0" />
                        Upload defaults
                    </h2>

                    <div className="space-y-6">
                        {/* Expiration Default select */}
                        <div className="hidden">
                            <label className="text-sm font-bold text-gray-600 block mb-2">Default Expiration Period</label>
                            <div className="flex items-center gap-2.5 bg-white border border-gray-305 rounded-xl px-4 py-3 shadow-sm max-w-xs">
                                <Calendar className="w-5 h-5 text-gray-400 shrink-0" />
                                <select 
                                    value={expirationTime}
                                    onChange={(e) => setExpirationTime(e.target.value)}
                                    className="bg-transparent outline-none text-sm w-full cursor-pointer"
                                >
                                    <option value="none">Never Expire</option>
                                    <option value="1">1 Day</option>
                                    <option value="7">7 Days</option>
                                    <option value="30">30 Days</option>
                                </select>
                            </div>
                        </div>

                        {/* Password Defaults toggler */}
                        <div>
                            <label className="flex items-center gap-2.5 cursor-pointer max-w-max mb-4">
                                <input 
                                    type="checkbox" 
                                    checked={isPasswordEnabled}
                                    onChange={(e) => {
                                        setIsPasswordEnabled(e.target.checked)
                                        if (!e.target.checked) setDefaultPassword('')
                                    }}
                                    className="w-4 h-4 text-primary rounded focus:ring-primary"
                                />
                                <span className="text-sm font-bold text-gray-650">Enable Password Protection by Default</span>
                            </label>

                            {isPasswordEnabled && (
                                <div className="flex flex-col gap-1 mt-2 animate-fade-in-up">
                                    <label className="text-xs font-bold text-gray-500">Default Password</label>
                                    <div className="flex items-center gap-2.5 bg-white border border-gray-300 rounded-xl px-4 py-3 shadow-sm max-w-sm">
                                        <Key className="w-5 h-5 text-gray-400 shrink-0" />
                                        <input 
                                            type="password" 
                                            placeholder="Enter default secure password..."
                                            value={defaultPassword}
                                            onChange={(e) => setDefaultPassword(e.target.value)}
                                            className="bg-transparent outline-none text-sm w-full"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Save settings action button */}
                <div className="pt-4 flex justify-end">
                    <button 
                        onClick={handleSave}
                        className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-md transition text-sm text-center"
                    >
                        Save Settings
                    </button>
                </div>
            </div>

            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
        </div>
    )
}

export default SettingsPage
