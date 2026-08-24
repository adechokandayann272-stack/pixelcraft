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
