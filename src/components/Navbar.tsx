'use client';

import React, { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 antialiased">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO PIXELCRAFT */}
        <a href="/" className="flex items-center gap-3.5 group transition-opacity hover:opacity-90">
          <div className="w-9 h-9 flex-shrink-0 text-[#9B82F6]">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              <rect x="12" y="8" width="32" height="40" rx="16" />
              <rect x="56" y="8" width="32" height="40" rx="16" />
              <rect x="12" y="52" width="32" height="40" rx="16" />
              <rect x="56" y="52" width="32" height="40" rx="16" />
            </svg>
          </div>

          <div className="flex flex-col justify-center leading-none font-black text-[#8B5CF6] text-lg tracking-tight font-sans">
            <span>PIXEL</span>
            <span className="mt-0.5">CRAFT</span>
          </div>
        </a>

        {/* NAVIGATION DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#services" className="text-slate-900 font-semibold hover:text-[#8B5CF6] transition-colors">
            Services
          </a>
          <a href="#features" className="hover:text-[#8B5CF6] transition-colors">
            Fonctionnalités
          </a>
          <a href="#templates" className="hover:text-[#8B5CF6] transition-colors">
            Templates
          </a>
          <a href="#pricing" className="hover:text-[#8B5CF6] transition-colors">
            Tarifs
          </a>
          <a 
            href="https://github.com/adechokandayann272-stack/pixelcraft" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#8B5CF6] transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>
        </nav>

        {/* BOUTON D'ACTION (CTA) */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://www.pixelcraft.email"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-xl transition-all duration-200 shadow-sm shadow-purple-200"
          >
            <span>{"Ouvrir l'éditeur"}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </a>
        </div>

        {/* BOUTON MENU MOBILE */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* DROPDOWN MENU MOBILE */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-6 py-6 space-y-4 shadow-lg">
          <nav className="flex flex-col space-y-4 text-base font-medium text-slate-700">
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#8B5CF6]">
              Services
            </a>
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#8B5CF6]">
              Fonctionnalités
            </a>
            <a href="#templates" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#8B5CF6]">
              Templates
            </a>
            <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#8B5CF6]">
              Tarifs
            </a>
            <a 
              href="https://github.com/adechokandayann272-stack/pixelcraft" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#8B5CF6]"
            >
              <span>GitHub</span>
            </a>
          </nav>
          
          <div className="pt-4 border-t border-slate-100">
            <a
              href="https://www.pixelcraft.email"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#8B5CF6] rounded-xl"
            >
              <span>{"Ouvrir l'éditeur"}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
