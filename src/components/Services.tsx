import { Globe, Star, Mail, Smartphone, Layers, Zap, Video, User } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Site Web',
    description: 'Des sites élégants et ultra-rapides qui convertissent vos visiteurs en clients.',
    gradient: 'from-blue-500 to-indigo-600',
    borderHover: 'group-hover:border-indigo-500/40',
  },
  {
    icon: Star,
    title: 'Avis Google Maps',
    description: 'Boostez votre réputation locale et attirez plus de flux grâce à une note optimale.',
    gradient: 'from-amber-400 to-orange-500',
    borderHover: 'group-hover:border-orange-500/40',
  },
  {
    icon: Mail,
    title: 'Newsletter Automatique',
    description: 'Des séquences emails automatisées et ciblées pour fidéliser votre audience.',
    gradient: 'from-emerald-400 to-teal-600',
    borderHover: 'group-hover:border-emerald-500/40',
  },
  {
    icon: Smartphone,
    title: 'Applications',
    description: 'Des applications web et mobiles sur-mesure, pensées pour la conversion.',
    gradient: 'from-purple-500 to-pink-500',
    borderHover: 'group-hover:border-purple-500/40',
  },
  {
    icon: Layers,
    title: 'Workflow Notion',
    description: 'Structurez et automatisez vos processus internes avec des espaces clés en main.',
    gradient: 'from-cyan-400 to-blue-600',
    borderHover: 'group-hover:border-cyan-500/40',
  },
  {
    icon: Zap,
    title: 'Automatisation',
    description: 'Éliminez les tâches répétitives et gagnez des heures précieuses chaque semaine.',
    gradient: 'from-rose-500 to-violet-600',
    borderHover: 'group-hover:border-rose-500/40',
  },
  {
    icon: Video,
    title: 'Montage Vidéo',
    description: 'Des formats courts et percutants pour capter l’attention sur les réseaux.',
    gradient: 'from-orange-500 to-red-600',
    borderHover: 'group-hover:border-orange-500/40',
  },
  {
    icon: User,
    title: 'Tutorat LinkedIn',
    description: 'Développez votre marque personnelle et générez des opportunités qualifiées.',
    gradient: 'from-violet-600 to-indigo-600',
    borderHover: 'group-hover:border-violet-500/40',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-28 bg-[#FAFAFA] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-5">
            <Zap size={13} className="fill-indigo-600 stroke-indigo-600" />
            <span>Nos expertises</span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
            Des solutions <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">sur mesure</span> pour accélérer.
          </h2>
          
          <p className="mt-5 text-lg font-medium text-slate-600 max-w-xl leading-relaxed">
            Nous combinons design percutant et automatisation intelligente pour propulser votre activité.
          </p>
        </div>

        {/* Grille de cartes */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className={`group relative flex flex-col justify-between p-7 rounded-2xl bg-white border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${service.borderHover}`}
            >
              <div>
                {/* Icône avec dégradé et taille renforcée */}
                <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} text-white shadow-md transition-transform duration-300 group-hover:scale-105`}>
                  <service.icon size={22} strokeWidth={2.3} />
                </div>
                
                {/* Titre gras et net */}
                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight mb-2">
                  {service.title}
                </h3>
                
                {/* Description lisible */}
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
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
