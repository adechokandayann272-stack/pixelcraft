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
    title: 'Lancement',
    description: 'Nous mettons votre site en ligne.',
    color: 'from-accent-500 to-teal-400',
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-4">
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">
              Notre processus
            </span>
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Comment ça <span className="text-gradient">marche</span>
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Un processus simple et transparent pour transformer votre idée en un site web professionnel.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.step}
                className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white`}
                >
                  <Icon size={24} />
                </div>

                <span className="text-sm font-bold text-gray-400">
                  {item.step}
                </span>

                <h3 className="mt-2 text-xl font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
