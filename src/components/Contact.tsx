import { useState } from 'react';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-4">
            <Mail size={14} className="text-primary-500" />
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">Contact</span>
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Parlons de votre <span className="text-gradient">projet</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Prêt à donner vie à votre vision ? Contactez-nous pour un devis gratuit.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Restons en contact</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                N'hésitez pas à nous écrire pour toute question ou demande de devis. Nous répondons sous 24h.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center">
                  <Mail size={18} className="text-primary-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Email</div>
                  <div className="text-sm font-medium text-gray-700">contact@pixelcraft.studio</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center">
                  <Phone size={18} className="text-primary-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Téléphone</div>
                  <div className="text-sm font-medium text-gray-700">+33 1 23 45 67 89</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center">
                  <MapPin size={18} className="text-primary-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Localisation</div>
                  <div className="text-sm font-medium text-gray-700">Paris, France</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                placeholder="Votre nom"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Votre email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div>
              <textarea
                placeholder="Décrivez votre projet..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none"
              />
            </div>
            <button
              type="submit"
              className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-purple-500 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-primary-500/30 transition-all hover:shadow-primary-500/50 hover:-translate-y-0.5"
            >
              {sent ? 'Message envoyé ✓' : (
                <>
                  Envoyer le message
                  <Send size={16} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
