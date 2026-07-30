import { Globe, ShoppingCart, Search, Smartphone, Palette, Zap, Code, BarChart3 } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Sites Vitrine',
    description: 'Un site web élégant et professionnel qui reflète votre image de marque et capte l\'attention de vos visiteurs.',
    color: 'from-blue-500 to-cyan-400',
    shadowColor: 'shadow-blue-500/20',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    description: 'Des boutiques en ligne performantes avec paiement sécurisé, gestion de stock et expérience d\'achat optimisée.',
    color: 'from-purple-500 to-pink-400',
    shadowColor: 'shadow-purple-500/20',
  },
  {
    icon: Code,
    title: 'Applications Web',
    description: 'Des applications web sur mesure avec des fonctionnalités avancées pour digitaliser votre activité.',
    color: 'from-primary-500 to-violet-400',
    shadowColor: 'shadow-primary-500/20',
  },
  {
    icon: Search,
    title: 'SEO & Référencement',
    description: 'Optimisation technique et sémantique pour positionner votre site en tête des résultats Google.',
    color: 'from-accent-500 to-teal-400',
    shadowColor: 'shadow-accent-500/20',
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Des interfaces parfaitement adaptées à tous les écrans : mobile, tablette et desktop.',
    color: 'from-orange-500 to-amber-400',
    shadowColor: 'shadow-orange-500/20',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Des designs modernes et intuitifs pensés pour offrir la meilleure expérience utilisateur possible.',
    color: 'from-rose-500 to-pink-400',
    shadowColor: 'shadow-rose-500/20',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Des sites ultra-rapides optimisés pour le chargement, la performance et les Core Web Vitals.',
    color: 'from-yellow-500 to-orange-400',
    shadowColor: 'shadow-yellow-500/20',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Suivi',
    description: 'Intégration d\'outils de suivi pour mesurer et améliorer les performances de votre site en continu.',
    color: 'from-emerald-500 to-green-400',
    shadowColor: 'shadow-emerald-500/20',
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-gray-50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/5 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[180px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-primary-500 font-medium text-sm tracking-wider uppercase">Nos Services</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mt-4">
            Tout ce qu'il faut pour{' '}
            <span className="text-gradient">réussir en ligne</span>
          </h2>
          <p className="mt-6 text-gray-500 text-lg">
            De la conception au déploiement, nous maîtrisons chaque étape pour créer le site web qui propulsera votre activité.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative p-6 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-black/5 transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 shadow-lg ${service.shadowColor} group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="font-display text-lg font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
