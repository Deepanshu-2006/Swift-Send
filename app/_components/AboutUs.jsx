import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

function AboutUs() {
  const points = [
    "Secure Cloud Storage powered by Cloudinary API integration",
    "Real-time database and security configurations using Google Firebase Firestore",
    "User authentication managed securely via Clerk Sign-In/Sign-Up",
    "Responsive, interactive user dashboard styled with modern Tailwind CSS v4"
  ]

  return (
    <section id="about" className="py-24 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text */}
          <ScrollReveal className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-primary mb-5">
              <span>Our Story</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-serif leading-tight">
              A Platform Built on <span className="text-primary">Speed, Simplicity, and Trust</span>
            </h2>
            <p className="text-gray-500 mt-6 leading-relaxed font-semibold text-sm sm:text-base">
              Swift Send was built to solve a simple problem: sharing files should be effortless, secure, and fast. Traditional file sharing sites restrict your bandwidth, force you to look at cluttered ads, or make you sign up for bulky packages.
            </p>
            <p className="text-gray-500 mt-4 leading-relaxed text-sm sm:text-base">
              We offer a clean, clutter-free alternative. Whether you are sending design files to a client, sharing high-res vacation photos with friends, or keeping PDFs organized, we offer direct cloud transfers with security options (like custom passwords) that protect your privacy.
            </p>

            <ul className="mt-8 space-y-3">
              {points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Right Column: Visual Element */}
          <ScrollReveal className="lg:col-span-5 relative" delay={200}>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-cyan-500/10 rounded-3xl -rotate-3 blur-sm"></div>
            <div className="relative bg-white border border-gray-200 rounded-3xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 font-serif">Why Swift Send?</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-gray-700">Ad-Free Workspace</h4>
                  <p className="text-xs text-gray-450 mt-1 leading-relaxed">No tracking, no popups, and no visual clutter. Just your files and your client's needs.</p>
                </div>
                <div className="border-t border-gray-150 pt-4">
                  <h4 className="text-sm font-bold text-gray-700">Encrypted Metadata</h4>
                  <p className="text-xs text-gray-455 mt-1 leading-relaxed">Secure Firestore document management prevents unauthorized URL snooping.</p>
                </div>
                <div className="border-t border-gray-150 pt-4">
                  <h4 className="text-sm font-bold text-gray-700">Universal Formats</h4>
                  <p className="text-xs text-gray-450 mt-1 leading-relaxed">Supports raw files, documents, archives, high-quality audio files, and video uploads.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
