import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden bg-mesh">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/20 rounded-full blur-[150px] animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/15 rounded-full blur-[180px] animate-pulse-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-400/10 rounded-full blur-[250px]" />

      {/* Floating shapes */}
      <div className="absolute top-32 right-20 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-purple-400 opacity-[0.04] animate-float" />
      <div className="absolute bottom-40 left-20 w-20 h-20 rounded-full bg-gradient-to-br from-accent-400 to-primary-400 opacity-[0.04] animate-float-delayed" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-8 animate-fade-in">
            <Sparkles size={14} className="text-primary-500" />
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">
              Studio créatif digital
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] animate-slide-up">
            <span className="text-gray-900">Créons votre </span>
            <br />
            <span className="text-gradient">présence digitale</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            PixelCraft Studio conçoit des sites web modernes, performants et sur mesure pour propulser votre activité en ligne.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-purple-500 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-primary-500/30 transition-all hover:shadow-primary-500/50 hover:-translate-y-1"
            >
              Démarrer un projet
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-full glass px-8 py-3.5 text-sm font-semibold text-gray-700 transition-all hover:bg-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
            >
              Voir nos réalisations
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-6 max-w-xs mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {[
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gradient animate-count-up">{stat.value}</div>
                <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
