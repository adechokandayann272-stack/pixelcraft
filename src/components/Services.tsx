import { Globe, Star, Mail, Smartphone, Layers, Zap, Video, User } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Site Web',
    description: 'Des sites élégants qui captent l\'attention et convertissent vos visiteurs en clients.',
  },
  {
    icon: Star,
    title: 'Avis Google Maps',
    description: 'Boostez votre réputation locale et attirez plus de clients grâce à une meilleure note.',
  },
  {
    icon: Mail,
    title: 'Newsletter Automatique',
    description: 'Des campagnes automatisées et personnalisées pour fidéliser durablement votre audience.',
  },
  {
    icon: Smartphone,
    title: 'Applications',
    description: 'Des applications web et mobile sur-mesure, pensées pour la performance.',
  },
  {
    icon: Layers,
    title: 'WorkFlow Notion',
    description: 'Structurez et optimisez votre organisation grâce à des espaces clés en main.',
  },
  {
    icon: Zap,
    title: 'Automatisation',
    description: 'Automatisez vos tâches répétitives et gagnez un temps précieux au quotidien.',
  },
  {
    icon: Video,
    title: 'Montage Vidéo',
    description: 'Des formats percutants et rythmés pour maximiser votre image de marque.',
  },
  {
    icon: User,
    title: 'Tutorat LinkedIn',
    description: 'Maîtrisez LinkedIn pour développer votre réseau et votre visibilité professionnelle.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-neutral-50/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-extrabold uppercase tracking-widest text-neutral-400 mb-3">
            Services
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight">
            Des solutions conçues <br className="hidden sm:inline" />
            pour performer.
          </h2>
          <p className="mt-4 text-base sm:text-lg font-medium text-neutral-600 leading-relaxed">
            Une approche ciblée et sur-mesure pour transformer vos opérations et booster votre croissance.
          </p>
        </div>

        {/* Grid minimaliste */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative flex flex-col justify-between p-7 rounded-2xl bg-white border border-neutral-200/70 hover:border-neutral-950 transition-all duration-200"
            >
              <div>
                <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900 group-hover:bg-neutral-950 group-hover:text-white transition-colors duration-200">
                  <service.icon size={20} strokeWidth={2.2} />
                </div>
                
                <h3 className="text-lg font-bold text-neutral-950 tracking-tight mb-2">
                  {service.title}
                </h3>
                
                <p className="text-sm font-medium text-neutral-500 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
