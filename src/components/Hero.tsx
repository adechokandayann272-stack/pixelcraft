import { ArrowRight, Sparkles, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-mesh">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-600/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/8 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[200px]" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Floating Elements */}
      <div className="absolute top-32 right-[15%] animate-float hidden lg:block">
        <div className="glass rounded-2xl px-4 py-3 flex items-center gap-2 shadow-lg shadow-black/5">
          <div className="w-3 h-3 rounded-full bg-accent-400" />
          <span className="text-sm text-gray-600">Site en ligne !</span>
        </div>
      </div>
      <div className="absolute bottom-40 left-[10%] animate-float-delayed hidden lg:block">
        <div className="glass rounded-2xl px-4 py-3 flex items-center gap-2 shadow-lg shadow-black/5">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm text-gray-600">5.0 — 120+ avis</span>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-gray-600 mb-8 animate-slide-up shadow-sm">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span>Agence de création web premium</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-[1.05] tracking-tight animate-slide-up" style={{ animationDelay: '0.15s' }}>
            Créons votre{' '}
            <span className="text-gradient">site web</span>{' '}
            <br className="hidden sm:block" />
            sur mesure
          </h1>

          {/* Subtitle */}
          <p className="mt-6 md:mt-8 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Des sites web modernes, performants et optimisés pour convertir vos visiteurs en clients. 
            Design unique, développement sur mesure, résultats garantis.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.45s' }}>
            <a
              href="#contact"
              className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white font-semibold rounded-full transition-all shadow-xl shadow-primary-600/30 hover:shadow-primary-500/40 hover:-translate-y-1 flex items-center gap-2"
            >
              Obtenir un devis gratuit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-all"
            >
              Découvrir nos services
            </a>
          </div>


        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
