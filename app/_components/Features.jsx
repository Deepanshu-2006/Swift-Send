import React from 'react'
import { Shield, Sparkles, Zap, Share2 } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

function Features() {
  const featuresList = [
    {
      icon: Zap,
      title: "Lightning Fast Uploads",
      description: "Upload multiple files of any format in parallel. Experience zero speed throttling."
    },
    {
      icon: Shield,
      title: "End-to-End Security",
      description: "Secure your shared links with passwords, ensuring only authorized people can view your assets."
    },
    {
      icon: Share2,
      title: "Direct Email Sharing",
      description: "Send file sharing details directly to your friend's inbox with pre-designed custom email templates."
    },
    {
      icon: Sparkles,
      title: "Premium Browser Previews",
      description: "View images, play videos and audio, and read PDFs directly in the browser before downloading."
    }
  ]

  return (
    <section id="features" className="py-20 bg-slate-50/50 border-t border-b border-gray-150">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 font-serif">
              Designed for <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-600">Secure & Instant</span> Sharing
            </h2>
            <p className="text-gray-555 mt-4 font-semibold text-sm sm:text-base">
              Swift Send is packed with tools that make sending, receiving, and managing files simple, direct, and completely secure.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresList.map((feature, idx) => (
            <ScrollReveal key={idx} delay={idx * 120}>
              <div className="bg-white border border-gray-150 rounded-2xl p-6 h-full shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
