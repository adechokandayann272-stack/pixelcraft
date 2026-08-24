import React, { useState } from 'react';
import { Menu, X, Github, ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 antialiased">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* ==================== LOGO PIXELCRAFT ==================== */}
        <a href="/" className="flex items-center gap-3.5 group transition-opacity hover:opacity-90">
          {/* SVG reproduisant fidèlement l'icône à 4 ovales de votre logo */}
          <div className="w-9 h-9 flex-shrink-0 text-[#9B82F6]">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              <rect x="8" y="8" width="38" height="38" rx="19" />
              <rect x="54" y="8" width="38" height="38" rx="19" />
              <rect x="8" y="54" width="38" height="38" rx="19" />
              <rect x="54" y="54" width="38" height="38" rx="19" />
            </svg>
          </div>

          {/* Alternative si vous utilisez directement le fichier image de votre logo :
          <img src="/pixelcraft-logo.png" alt="Pixelcraft Logo" className="h-9 w-auto object-contain" /> 
          */}

          {/* Typographie du logo Pixelcraft */}
          <div className="flex flex-col justify-center leading-none tracking-tight font-black text-[#8B5CF6] text-lg font-sans">
            <span className="tracking-wider">PIXEL</span>
            <span className="tracking-wider mt-0.5">CRAFT</span>
          </div>
        </a>

        {/* ==================== NAVIGATION DESKTOP ==================== */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a 
            href="#services" 
            className="text-slate-900 font-semibold hover:text-[#8B5CF6] transition-colors"
          >
            Services
          </a>
          <a 
            href="#features" 
            className="hover:text-[#8B5CF6] transition-colors"
          >
            Fonctionnalités
          </a>
          <a 
            href="#templates" 
            className="hover:text-[#8B5CF6] transition-colors"
          >
            Templates
          </a>
          <a 
            href="#pricing" 
            className="hover:text-[#8B5CF6] transition-colors"
          >
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

        {/* ==================== BOUTONS D'ACTION (CTA) ==================== */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://www.pixelcraft.email"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-xl transition-all duration-200 shadow-sm shadow-purple-200 hover:shadow-md hover:shadow-purple-300"
          >
            <span>Ouvrir l'éditeur</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* ==================== BOUTON MENU MOBILE ==================== */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-800" />
            ) : (
              <Menu className="w-6 h-6 text-slate-800" />
            )}
          </button>
        </div>

      </div>

      {/* ==================== DROPDOWN MENU MOBILE ==================== */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-6 py-6 space-y-4 shadow-lg animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-4 text-base font-medium text-slate-700">
            <a 
              href="#services" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#8B5CF6] transition-colors"
            >
              Services
            </a>
            <a 
              href="#features" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#8B5CF6] transition-colors"
            >
              Fonctionnalités
            </a>
            <a 
              href="#templates" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#8B5CF6] transition-colors"
            >
              Templates
            </a>
            <a 
              href="#pricing" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#8B5CF6] transition-colors"
            >
              Tarifs
            </a>
            <a 
              href="https://github.com/adechokandayann272-stack/pixelcraft" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#8B5CF6] transition-colors"
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
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#8B5CF6] rounded-xl shadow-sm"
            >
              <span>Ouvrir l'éditeur</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
