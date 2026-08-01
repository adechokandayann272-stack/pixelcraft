import { ExternalLink, Layers } from 'lucide-react';

const projects = [
  {
    title: 'ATELIER',
    subtitle: 'Architecture & Design',
    description: 'Site vitrine élégant pour un studio d\'architecture. Design minimaliste avec palette stone et typographie soignée.',
    url: 'https://tattoo-artist-five.vercel.app/',
    tags: ['Site Vitrine', 'Architecture', 'Minimaliste'],
    gradient: 'from-stone-600 to-stone-800',
  },
  {
    title: 'ENCRE NOIRE',
    subtitle: 'Tatoueur',
    description: 'Site immersif pour un artiste tatoueur. Ambiance sombre et raffinée avec galerie de réalisations.',
    url: 'https://tattoo-eight-zeta.vercel.app/',
    tags: ['Portfolio', 'Tatouage', 'Dark Theme'],
    gradient: 'from-neutral-700 to-neutral-900',
  },
  {
    title: 'CarroExpert',
    subtitle: 'Pièces de Carrosserie Automobile',
    description: 'Plateforme moderne pour un spécialiste en pièces auto. Interface dynamique avec catalogue produit.',
    url: 'https://architect-puce-five.vercel.app/',
    tags: ['E-Commerce', 'Automobile', 'Catalogue'],
    gradient: 'from-orange-500 to-orange-700',
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-4">
            <Layers size={14} className="text-primary-500" />
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">Portfolio</span>
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Nos <span className="text-gradient">réalisations</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Explorez nos projets de portfolio — des concepts web réalisés pour mettre en avant notre expertise.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10 flex flex-col"
            >
              {/* Live preview */}
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <iframe
                  src={project.url}
                  title={project.title}
                  className="w-[1440px] h-[900px] origin-top-left pointer-events-none border-0"
                  style={{ transform: 'scale(0.25)', transformOrigin: 'top left' }}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-xl">
                    <ExternalLink size={14} />
                    Visiter le site
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${project.gradient}`} />
                  <span className="text-xs font-medium text-primary-500 uppercase tracking-wider">
                    {project.subtitle}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full glass-dark px-3 py-1 text-xs font-medium text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom bar */}
              <div className="px-6 py-3 border-t border-gray-50 bg-gray-50/50 flex items-center justify-between">
                <span className="text-xs text-gray-400 truncate">
                  {project.url.replace('https://', '')}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary-500 group-hover:text-primary-600 transition-colors">
                  Voir
                  <ExternalLink size={10} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
