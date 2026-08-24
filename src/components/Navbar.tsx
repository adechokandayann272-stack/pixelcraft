import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 antialiased">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO PIXELCRAFT */}
        <a href="/" className="flex items-center gap-3.5 group transition-opacity hover:opacity-90">
          <img src="/logo.png" alt="PixelCraft Logo" className="h-10 w-auto object-contain" />
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
          <a href="#faq" className="hover:text-[#8B5CF6] transition-colors">
            FAQ
          </a>
        </nav>

        {/* ACTION CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full bg-[#8B5CF6] text-white font-medium text-sm hover:bg-[#7C3AED] transition-all shadow-sm hover:shadow-md"
          >
            Démarrer un projet
          </a>
        </div>

        {/* BOUTON MENU MOBILE */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* MENU MOBILE */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-6 py-4 flex flex-col gap-4 text-slate-600 font-medium text-sm">
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
            href="#faq"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-[#8B5CF6] transition-colors"
          >
            FAQ
          </a>
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 text-center px-5 py-2.5 rounded-full bg-[#8B5CF6] text-white font-medium hover:bg-[#7C3AED] transition-all"
          >
            Démarrer un projet
          </a>
        </div>
      )}
    </header>
  );
}
