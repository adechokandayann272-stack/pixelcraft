import React from 'react';

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-white text-slate-800 antialiased">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* EN-TÊTE DE SECTION MINIMALISTE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-slate-100 pb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8B5CF6] mb-3">
              Nos Services
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
              {"Une infrastructure complète pour vos e-mails transactionnels & newsletters."}
            </h2>
          </div>
          <p className="text-slate-500 text-base max-w-md font-normal leading-relaxed">
            {"Nous éliminons la complexité du code e-mail pour vous concentrer sur ce qui compte : votre message et vos conversions."}
          </p>
        </div>

        {/* GRILLE DE SERVICES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Service 1 */}
          <div className="group relative p-8 md:p-10 rounded-2xl bg-slate-50/50 border border-slate-200/70 hover:bg-white hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100/50 text-[#8B5CF6] flex items-center justify-center group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                  </svg>
                </div>
                <span className="text-xs font-medium text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100">
                  HTML / MJML
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3 tracking-tight">
                Design & Intégration HTML Email
              </h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-normal">
                Conception de templates HTML responsive, ultra-légers et testés sur plus de 50 clients de messagerie (Gmail, Outlook, Apple Mail, Yahoo).
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-200/40 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-[#8B5CF6] transition-colors">
              <span>En savoir plus</span>
              <svg className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </div>
          </div>

          {/* Service 2 */}
          <div className="group relative p-8 md:p-10 rounded-2xl bg-slate-50/50 border border-slate-200/70 hover:bg-white hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100/50 text-[#8B5CF6] flex items-center justify-center group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                </div>
                <span className="text-xs font-medium text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100">
                  Intégration
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3 tracking-tight">
                Connexion ESP & API Webhooks
              </h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-normal">
                Intégration transparente et rapide avec vos routeurs d'envoi favoris : Resend, SendGrid, Mailchimp, Postmark ou AWS SES.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-200/40 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-[#8B5CF6] transition-colors">
              <span>En savoir plus</span>
              <svg className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </div>
          </div>

          {/* Service 3 */}
          <div className="group relative p-8 md:p-10 rounded-2xl bg-slate-50/50 border border-slate-200/70 hover:bg-white hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100/50 text-[#8B5CF6] flex items-center justify-center group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <span className="text-xs font-medium text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100">
                  Performance
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3 tracking-tight">
                Optimisation de Délivrabilité
              </h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-normal">
                Structure de code propre et compression des assets pour garantir un passage direct en boîte de réception principale.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-200/40 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-[#8B5CF6] transition-colors">
              <span>En savoir plus</span>
              <svg className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </div>
          </div>

          {/* Service 4 */}
          <div className="group relative p-8 md:p-10 rounded-2xl bg-slate-50/50 border border-slate-200/70 hover:bg-white hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100/50 text-[#8B5CF6] flex items-center justify-center group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <span className="text-xs font-medium text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100">
                  Fiabilité
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3 tracking-tight">
                Compatibilité Outlook & Legacy
              </h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-normal">
                Prise en charge native des moteurs de rendu complexes comme Microsoft Outlook sans dégrader le visuel mobile.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-200/40 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-[#8B5CF6] transition-colors">
              <span>En savoir plus</span>
              <svg className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
