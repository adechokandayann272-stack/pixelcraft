import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-600/8 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-gray-600 mb-8 shadow-sm">
          <Sparkles className="w-4 h-4 text-primary-500" />
          <span>Prêt à démarrer ?</span>
        </div>

        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Votre site web de rêve{' '}
          <span className="text-gradient">commence ici</span>
        </h2>
        <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto">
          Rejoignez nos 150+ clients satisfaits et donnez à votre entreprise la présence en ligne qu'elle mérite.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white font-semibold rounded-full transition-all shadow-xl shadow-primary-600/30 hover:shadow-primary-500/40 hover:-translate-y-1 flex items-center gap-2"
          >
            Demander un devis gratuit
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <span className="text-gray-400 text-sm">Réponse garantie sous 24h</span>
        </div>
      </div>
    </section>
  );
}
