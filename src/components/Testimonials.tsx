import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sophie Martin',
    role: 'Fondatrice, La Table d\'Or',
    avatar: 'SM',
    content: 'PixelCraft a transformé notre présence en ligne. Notre nouveau site a augmenté nos réservations de 40% en seulement 3 mois. Un travail remarquable !',
    rating: 5,
  },
  {
    name: 'Thomas Dubois',
    role: 'CEO, CloudFlow',
    avatar: 'TD',
    content: 'L\'équipe est incroyablement professionnelle et créative. Ils ont parfaitement compris notre vision et l\'ont traduite en une interface utilisateur exceptionnelle.',
    rating: 5,
  },
  {
    name: 'Marie Lefèvre',
    role: 'Directrice, ModaStyle',
    avatar: 'ML',
    content: 'Notre boutique en ligne est magnifique et performante. Le taux de conversion a doublé depuis le lancement. Je recommande PixelCraft à 100% !',
    rating: 5,
  },
  {
    name: 'Jean-Pierre Moreau',
    role: 'Directeur, ImmoPrestige',
    avatar: 'JM',
    content: 'Un site professionnel qui nous démarque de la concurrence. L\'équipe a su intégrer toutes nos demandes spécifiques avec brio. Service après-vente impeccable.',
    rating: 5,
  },
  {
    name: 'Camille Bernard',
    role: 'Photographe indépendante',
    avatar: 'CB',
    content: 'Mon portfolio en ligne est une véritable œuvre d\'art. PixelCraft a su mettre en valeur mon travail de façon élégante et moderne. Merci !',
    rating: 5,
  },
  {
    name: 'Alexandre Petit',
    role: 'Fondateur, FitnessPro',
    avatar: 'AP',
    content: 'De la conception au lancement, tout s\'est déroulé parfaitement. Le site est rapide, beau et mes clients adorent la facilité de réservation en ligne.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32 bg-mesh overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-[250px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-primary-400 font-medium text-sm tracking-wider uppercase">Témoignages</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4">
            Ce que disent{' '}
            <span className="text-gradient">nos clients</span>
          </h2>
          <p className="mt-6 text-gray-400 text-lg">
            La satisfaction de nos clients est notre priorité. Découvrez leurs retours sur notre collaboration.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary-500/20 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{testimonial.name}</p>
                  <p className="text-gray-500 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
