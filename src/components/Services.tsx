import { Globe, Star, Mail, Smartphone, Layers, Zap, Video, User } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Site Web',
    description: 'Des sites élégants et ultra-rapides qui convertissent vos visiteurs en clients.',
    gradient: 'from-blue-500 to-indigo-600',
    accentHover: 'group-hover:text-indigo-600',
    borderHover: 'hover:border-indigo-500/30',
  },
  {
    icon: Star,
    title: 'Avis Google Maps',
    description: 'Boostez votre réputation locale et attirez plus de flux grâce à une note optimale.',
    gradient: 'from-amber-400 to-orange-500',
    accentHover: 'group-hover:text-orange-600',
    borderHover: 'hover:border-orange-500/30',
  },
  {
    icon: Mail,
    title: 'Newsletter Automatique',
    description: 'Des séquences emails automatisées et ciblées pour fidéliser votre audience.',
    gradient: 'from-emerald-400 to-teal-500',
    accentHover: 'group-hover:text-emerald-600',
    borderHover: 'hover:border-emerald-500/30',
  },
  {
    icon: Smartphone,
    title: 'Applications',
    description: 'Des applications web et mobiles sur-mesure, pensées pour la conversion.',
    gradient: 'from-purple-500 to-pink-500',
    accentHover: 'group-hover:text-purple-600',
    borderHover: 'hover:border-purple-500/30',
  },
  {
    icon: Layers,
    title: 'Workflow Notion',
    description: 'Structurez et automatisez vos processus internes avec des espaces clés en main.',
    gradient: 'from-cyan-400 to-blue-500',
    accentHover: 'group-hover:text-blue-600',
    borderHover: 'hover:border-blue-500/30',
  },
  {
    icon: Zap,
    title: 'Automatisation',
    description: 'Éliminez les tâches répétitives et gagnez des heures précieuses chaque semaine.',
    gradient: 'from-rose-500 to-purple-600',
    accentHover: 'group-hover:text-rose-600',
    borderHover: 'hover:border-rose-500/30',
  },
  {
    icon: Video,
    title: 'Montage Vidéo',
    description: 'Des formats courts et percutants pour capter l’attention sur les réseaux.',
    gradient: 'from-orange-500 to-red-500',
    accentHover: 'group-hover:text-red-600',
    borderHover: 'hover:border-red-500/30',
  },
  {
    icon: User,
    title: 'Tutorat LinkedIn',
    description: 'Développez votre marque personnelle et générez des opportunités qualifiées.',
    gradient: 'from-violet-600 to-indigo-600',
    accentHover: 'group-hover:text-violet-600',
    borderHover: 'hover:border-violet-500/30',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#F8FAFC] antialiased">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* En-tête */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-[12px] font-semibold uppercase tracking-wider mb-4">
            <Zap size={13} className="fill-indigo-600 stroke-indigo-600" />
            <span>Nos expertises</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-[-0.02em] leading-[1.15]">
            Des solutions <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">sur mesure</span> pour accélérer.
          </h2>
          
          <p className="mt-4 text-lg font-normal text-slate-600 max-w-xl leading-relaxed">
            Nous combinons design percutant et automatisation intelligente pour propulser votre activité.
          </p>
        </div>

        {/* Grille de services */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className={`group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-200 ease-out ${service.borderHover}`}
            >
              <div>
                {/* Icône */}
                <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} text-white shadow-sm transition-transform duration-200 group-hover:scale-105`}>
                  <service.icon size={22} strokeWidth={2} />
                </div>
                
                {/* Titre : font-semibold (Moins gras, très raffiné & ultra-net) */}
                <h3 className={`text-[17px] font-semibold text-slate-900 tracking-[-0.01em] leading-snug mb-2.5 transition-colors duration-200 ${service.accentHover}`}>
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-[14px] font-normal text-slate-500 leading-relaxed">
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
