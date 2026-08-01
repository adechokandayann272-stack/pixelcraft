import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

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
          {/* Brand */}
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-purple-500 shadow-lg shadow-primary-600/30">
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">
                Pixel<span className="text-primary-400">Craft</span>
              </span>
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
