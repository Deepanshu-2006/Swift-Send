"use client"
import React from 'react'
import { Mail, MapPin, Phone, MessageSquare, Send } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

function ContactUs() {
  return (
    <section id="contact" className="py-20 bg-slate-50/50 border-t border-gray-150 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 font-serif">
              Get in <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-600">Touch</span>
            </h2>
            <p className="text-gray-550 mt-4 font-semibold text-sm sm:text-base">
              Have questions about Swift Send? Reach out to our support or developer team, and we'll get back to you shortly.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info */}
          <ScrollReveal className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6 font-serif">Contact Information</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                We're here to help. Reach out to us via email, phone, or visit us at our offices. We try to respond to all inquiries within 24 hours.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Email Us</p>
                    <a href="mailto:support@swiftsend.com" className="text-sm font-bold text-gray-700 hover:text-primary transition">support@swiftsend.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Call Us</p>
                    <a href="tel:+18005550199" className="text-sm font-bold text-gray-700 hover:text-primary transition">+1 (800) 555-0199</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Our Headquarters</p>
                    <p className="text-sm font-bold text-gray-700">100 Swift Way, Suite 400, San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex gap-4">
                <a href="#_" className="text-gray-400 hover:text-primary transition text-xs font-semibold">Privacy Policy</a>
                <span className="text-gray-300">•</span>
                <a href="#_" className="text-gray-400 hover:text-primary transition text-xs font-semibold">Terms of Service</a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Interactive Form */}
          <ScrollReveal className="lg:col-span-7" delay={200}>
            <div className="bg-white border border-gray-250 rounded-3xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 font-serif">
                <MessageSquare className="w-5 h-5 text-primary" />
                Send a Message
              </h3>

              <form onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); e.target.reset(); }} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe" 
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-550 uppercase tracking-wider mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="john@example.com" 
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Subject</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Inquiry about storage limit" 
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-550 uppercase tracking-wider mb-2">Message</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Hello, I would like to know..." 
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary focus:bg-white transition resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/10 active:scale-98 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
