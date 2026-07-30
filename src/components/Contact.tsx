import { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: 'site-vitrine',
    budget: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-gray-50 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-[250px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-500 font-medium text-sm tracking-wider uppercase">Contact</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mt-4">
            Lancez votre{' '}
            <span className="text-gradient">projet</span>{' '}
            aujourd'hui
          </h2>
          <p className="mt-6 text-gray-500 text-lg">
            Parlez-nous de votre projet et recevez un devis personnalisé sous 24h.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="font-display text-2xl font-semibold text-gray-900 mb-4">Discutons de votre projet</h3>
              <p className="text-gray-500 leading-relaxed">
                Que vous ayez une idée précise ou que vous souhaitiez explorer les possibilités, nous sommes là pour vous guider.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-gray-900 font-medium">adechokandayann272@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Téléphone</p>
                  <p className="text-gray-900 font-medium">+33 06 02 47 77 68</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Adresse</p>
                  <p className="text-gray-900 font-medium">Paris, France</p>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <CheckCircle className="w-5 h-5 text-accent-500" />
                Devis gratuit sous 24h
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500 mt-3">
                <CheckCircle className="w-5 h-5 text-accent-500" />
                Sans engagement
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500 mt-3">
                <CheckCircle className="w-5 h-5 text-accent-500" />
                Accompagnement personnalisé
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center p-12 rounded-2xl bg-white border border-gray-200 text-center min-h-[500px] shadow-lg shadow-black/5">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-500 to-emerald-400 flex items-center justify-center mb-6 animate-count-up">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-gray-900 mb-3">Message envoyé !</h3>
                <p className="text-gray-500 max-w-sm">
                  Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-white border border-gray-200 space-y-6 shadow-lg shadow-black/5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2 font-medium">Nom complet *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jean Dupont"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2 font-medium">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jean@exemple.fr"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2 font-medium">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+33 6 12 34 56 78"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2 font-medium">Type de projet *</label>
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all text-sm appearance-none"
                    >
                      <option value="site-vitrine">Site vitrine</option>
                      <option value="e-commerce">E-commerce</option>
                      <option value="application-web">Application web</option>
                      <option value="refonte">Refonte de site</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-medium">Budget estimé</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all text-sm appearance-none"
                  >
                    <option value="">Sélectionnez votre budget</option>
                    <option value="500-1000">500€ - 1 000€</option>
                    <option value="1000-3000">1 000€ - 3 000€</option>
                    <option value="3000-5000">3 000€ - 5 000€</option>
                    <option value="5000-10000">5 000€ - 10 000€</option>
                    <option value="10000+">10 000€ +</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-medium">Décrivez votre projet *</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Parlez-nous de votre projet, vos objectifs, vos délais..."
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full group py-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary-600/30 hover:shadow-primary-500/40 flex items-center justify-center gap-2"
                >
                  Envoyer ma demande
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
