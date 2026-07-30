import { Check, Star } from 'lucide-react';

const plans = [
  {
    name: 'Essentiel',
    price: '990',
    description: 'Parfait pour les indépendants et petites entreprises qui souhaitent une présence en ligne professionnelle.',
    features: [
      'Site vitrine jusqu\'à 5 pages',
      'Design responsive mobile',
      'Formulaire de contact',
      'Optimisation SEO de base',
      'Hébergement 1 an offert',
      'Certificat SSL inclus',
    ],
    popular: false,
    color: 'from-blue-500 to-cyan-400',
  },
  {
    name: 'Professionnel',
    price: '2 490',
    description: 'La solution idéale pour les PME qui veulent se démarquer et convertir plus de visiteurs.',
    features: [
      'Site jusqu\'à 15 pages',
      'Design premium personnalisé',
      'Animations & interactions',
      'Blog intégré',
      'SEO avancé',
      'Intégration réseaux sociaux',
      'Tableau de bord admin',
      'Support prioritaire 6 mois',
    ],
    popular: true,
    color: 'from-primary-500 to-purple-500',
  },
  {
    name: 'E-commerce',
    price: '4 990',
    description: 'Tout ce qu\'il faut pour lancer et développer votre boutique en ligne avec succès.',
    features: [
      'Boutique en ligne complète',
      'Catalogue produits illimité',
      'Paiement sécurisé (CB, PayPal)',
      'Gestion des stocks',
      'Espace client',
      'Emails transactionnels',
      'SEO e-commerce',
      'Formation administration',
      'Support 12 mois',
    ],
    popular: false,
    color: 'from-accent-500 to-emerald-400',
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32 bg-gray-50 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-[250px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-primary-500 font-medium text-sm tracking-wider uppercase">Nos Tarifs</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mt-4">
            Des offres{' '}
            <span className="text-gradient">adaptées</span>{' '}
            à vos besoins
          </h2>
          <p className="mt-6 text-gray-500 text-lg">
            Chaque projet est unique. Choisissez la formule qui correspond le mieux à votre activité et vos ambitions.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 ${
                plan.popular
                  ? 'bg-gradient-to-b from-primary-50 to-purple-50 border-2 border-primary-300 shadow-2xl shadow-primary-600/10'
                  : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl hover:shadow-black/5'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-primary-500/30">
                  <Star className="w-3.5 h-3.5 fill-white" />
                  Le plus populaire
                </div>
              )}

              {/* Plan Name */}
              <h3 className="font-display text-xl font-semibold text-gray-900">{plan.name}</h3>
              
              {/* Price */}
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-400 text-lg">€</span>
              </div>
              <p className="mt-3 text-gray-500 text-sm leading-relaxed">{plan.description}</p>

              {/* Features */}
              <ul className="mt-8 space-y-3.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className={`mt-8 block text-center py-3.5 rounded-full font-semibold text-sm transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white shadow-lg shadow-primary-600/30 hover:shadow-primary-500/40'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                Choisir cette offre
              </a>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-gray-400 text-sm mt-10">
          Besoin d'un projet personnalisé ? <a href="#contact" className="text-primary-500 hover:text-primary-600 underline underline-offset-4">Contactez-nous</a> pour un devis sur mesure.
        </p>
      </div>
    </section>
  );
}
