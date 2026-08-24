import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

// Import du logo situe dans src/logo.png
import logoImg from '../logo.png';

const legalLinks = [
  { label: 'Politique de confidentialité', to: '/politique-de-confidentialite' },
  { label: 'Mentions légales', to: '/politique-de-confidentialite#mentions' },
];

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-gray-300 overflow-hidden">
      {/* Decorative gradient on top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

      {/* Decorative blobs */}
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-primary-500/5 rounded-full blur-[150px]" />
      <div className="absolute top-0 right-10 w-60 h-60 bg-purple-500/5 rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          {/* Brand avec le Logo */}
          <div className="max-w-sm">
            <Link 
              to="/" 
              className="inline-flex items-center mb-4 bg-white px-3.5 py-2 rounded-xl border border-white/10 shadow-sm"
            >
              <img
                src={logoImg}
                alt="PixelCraft"
                className="h-10 w-auto object-contain mix-blend-multiply"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Studio créatif spécialisé dans la conception de sites web modernes, performants et sur mesure.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Légal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-white group"
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
