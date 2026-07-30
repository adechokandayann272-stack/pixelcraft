import { MessageSquare, PenTool, Code2, Rocket } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    step: '01',
    title: 'Échange & Brief',
    description: 'Nous discutons de votre projet, vos objectifs et vos besoins pour définir ensemble la meilleure stratégie.',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    icon: PenTool,
    step: '02',
    title: 'Design & Maquettes',
    description: 'Nous créons les maquettes visuelles de votre site que vous pouvez valider et ajuster à votre convenance.',
    color: 'from-purple-500 to-pink-400',
  },
  {
    icon: Code2,
    step: '03',
    title: 'Développement',
    description: 'Nous transformons les maquettes en un site web fonctionnel, performant et optimisé pour le référencement.',
    color: 'from-primary-500 to-violet-400',
  },
  {
    icon: Rocket,
    step: '04',
    title: 'Lancement & Suivi',
    description: 'Nous mettons votre site en ligne et assurons un suivi continu pour garantir ses performances.',
    color: 'from-accent-500 to-teal-400',
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-primary-500 font-medium text-sm tracking-wider uppercase">Notre Processus</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mt-4">
            Comment ça{' '}
            <span className="text-gradient">marche ?</span>
          </h2>
          <p className="mt-6 text-gray-500 text-lg">
            Un processus simple et transparent en 4 étapes pour donner vie à votre projet web.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={item.step} className="relative group">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-40px)] h-[2px] bg-gradient-to-r from-gray-200 to-gray-100" />
              )}

              <div className="relative p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-xl hover:shadow-black/5 transition-all duration-500 text-center group-hover:-translate-y-2">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-primary-500/30">
                  {item.step}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="font-display text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
