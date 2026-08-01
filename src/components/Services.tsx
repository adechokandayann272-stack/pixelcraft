import { Globe, Palette, Smartphone, Zap, Search, ShieldCheck, Code2, BarChart3 } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Sites Vitrine',
    description: 'Des sites élégants qui captent l\'attention et convertissent vos visiteurs en clients.',
    color: 'from-blue-500 to-indigo-500',
    shadow: 'shadow-blue-500/20',
  },
  {
    icon: Palette,
    title: 'Design UI/UX',
    description: 'Des interfaces intuitives et visuellement captivantes, pensées pour l\'utilisateur.',
    color: 'from-purple-500 to-pink-500',
    shadow: 'shadow-purple-500/20',
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Des expériences parfaites sur tous les appareils : mobile, tablette et desktop.',
    color: 'from-emerald-500 to-teal-500',
    shadow: 'shadow-emerald-500/20',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Sites ultra-rapides optimisés pour un chargement instantané et un SEO optimal.',
    color: 'from-yellow-500 to-orange-500',
    shadow: 'shadow-yellow-500/20',
  },
  {
    icon: Search,
    title: 'SEO & Référencement',
    description: 'Stratégies de référencement pour vous positionner en tête des résultats Google.',
    color: 'from-orange-500 to-red-500',
    shadow: 'shadow-orange-500/20',
  },
  {
    icon: ShieldCheck,
    title: 'Maintenance & Sécurité',
    description: 'Mises à jour régulières, sauvegardes et protection contre les menaces web.',
    color: 'from-rose-500 to-purple-500',
    shadow: 'shadow-rose-500/20',
  },
  {
    icon: Code2,
    title: 'Développement Sur Mesure',
    description: 'Des fonctionnalités et applications web personnalisées adaptées à vos besoins métier.',
    color: 'from-cyan-500 to-blue-500',
    shadow: 'shadow-cyan-500/20',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    description: 'Suivi des performances, tableaux de bord et rapports pour piloter votre croissance digitale.',
    color: 'from-violet-500 to-indigo-500',
    shadow: 'shadow-violet-500/20',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-mesh relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-4">
            <Zap size={14} className="text-primary-500" />
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">Nos Services</span>
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Des solutions <span className="text-gradient">sur mesure</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Nous offrons une gamme complète de services pour transformer votre vision digitale en réalité.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="group relative rounded-2xl glass p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/5"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} shadow-lg ${service.shadow} mb-5 transition-transform duration-300 group-hover:scale-110`}>
                <service.icon size={22} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
