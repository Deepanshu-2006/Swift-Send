"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Show, UserButton } from '@clerk/nextjs'

function Header() {
  const [activeSection, setActiveSection] = React.useState('home');
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    if (window.location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sectionIds = ['home', 'features', 'about', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.05
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id);
          
          // Dynamically replace the browser URL path/hash without page jump or history pollution
          if (typeof window !== 'undefined') {
            const hash = id === 'home' ? '/' : `/#${id}`;
            window.history.replaceState(null, '', hash);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>

      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 flex items-center ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm h-16 mx-0' 
          : 'bg-transparent border-b border-transparent h-18 ml-10 mr-6'
      }`}>
        {!isScrolled && (
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_2px,transparent_2px),linear-gradient(to_bottom,#8080800a_2px,transparent_2px)] bg-size-[14px_24px] rounded-r-2xl"></div>
        )}
        <div className="flex h-full w-full items-center justify-between gap-8 px-4 sm:px-6 lg:pl-8 lg:pr-4">

          <Link href="/" className="flex items-center shrink-0">
            <Image src='/logo.svg' width={48} height={30} alt='logo' className="shrink-0" unoptimized />
            <span className='text-2xl text-cyan-700 text-shadow-cyan-500 font-extrabold font-serif font-stretch-95% whitespace-nowrap ml-2'>Swift Send</span>
          </Link>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm font-bold">
                <li>
                  <Link 
                    className={`transition-colors duration-200 ${
                      activeSection === 'home' 
                        ? 'text-primary' 
                        : 'text-gray-500 hover:text-primary'
                    }`} 
                    href="/"
                  > 
                    Home 
                  </Link>
                </li>

                <li>
                  <Link className="text-gray-500 transition hover:text-primary" href="/upload"> Upload </Link>
                </li>

                <li>
                  <Link 
                    className={`transition-colors duration-200 ${
                      activeSection === 'features' 
                        ? 'text-primary' 
                        : 'text-gray-500 hover:text-primary'
                    }`} 
                    href="/#features"
                  > 
                    Features 
                  </Link>
                </li>

                <li>
                  <Link 
                    className={`transition-colors duration-200 ${
                      activeSection === 'about' 
                        ? 'text-primary' 
                        : 'text-gray-500 hover:text-primary'
                    }`} 
                    href="/#about"
                  > 
                    About Us 
                  </Link>
                </li>

                <li>
                  <Link 
                    className={`transition-colors duration-200 ${
                      activeSection === 'contact' 
                        ? 'text-primary' 
                        : 'text-gray-500 hover:text-primary'
                    }`} 
                    href="/#contact"
                  > 
                    Contact Us 
                  </Link>
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
                  <div className="ml-8 mt-1 flex scale-155 items-end origin-right mr-3">
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
