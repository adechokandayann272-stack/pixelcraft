'use client';

import React, { useState } from 'react';
import { Menu, X, Github, ArrowRight } from 'lucide-react';

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

          <div className="flex flex-col justify-center leading-none font-black text-[#8B5CF6] text-lg tracking-tight">
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
            <Github className="w-4 h-4" />
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
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* MENU MOBILE BURGER */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-800" />
            ) : (
              <Menu className="w-6 h-6 text-slate-800" />
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
              <Github className="w-4 h-4" />
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
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
