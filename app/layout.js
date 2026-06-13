import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Swift Send - Share Files Securely",
  description: "Upload, save, and easily share your files in one place with password protection and email sharing.",
};

// ...existing code...
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Make body relative so the background covers it properly */}
      <body className="min-h-full flex flex-col relative">
        
        {/* GLOBAL BACKGROUND ADDED HERE */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_2px,transparent_2px),linear-gradient(to_bottom,#8080800a_2px,transparent_2px)] bg-size-[14px_24px]"></div>
        
        <ClerkProvider>
          {children}
        </ClerkProvider>
        
      </body>
    </html>
  );
}