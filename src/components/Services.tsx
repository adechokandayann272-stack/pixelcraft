import React from 'react';
import { Code2, Send, Zap, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: Code2,
      title: "Design & Intégration HTML Email",
      description: "Conception de templates HTML responsive, ultra-légers et testés sur plus de 50 clients de messagerie (Gmail, Outlook, Apple Mail, Yahoo).",
      tag: "HTML / MJML"
    },
    {
      icon: Send,
      title: "Connexion ESP & API Webhooks",
      description: "Intégration transparente et rapide avec vos routeurs d'envoi favoris : Resend, SendGrid, Mailchimp, Postmark ou AWS SES.",
      tag: "Intégration"
    },
    {
      icon: Zap,
      title: "Optimisation de Délivrabilité",
      description: "Structure de code propre et compression des assets pour garantir un passage direct en boîte de réception principale.",
      tag: "Performance"
    },
    {
      icon: ShieldCheck,
      title: "Compatibilité Outlook & Legacy",
      description: "Prise en charge native des moteurs de rendu complexes comme Microsoft Outlook sans dégrader le visuel mobile.",
      tag: "Fiabilité"
    }
  ];

  return (
    <section id="services" className="py-24 bg-white text-slate-800 antialiased">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* En-tête de section minimaliste */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-slate-100 pb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8B5CF6] mb-3">
              Nos Services
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
              Une infrastructure complète pour vos e-mails transactionnels & newsletters.
            </h2>
          </div>
          <p className="text-slate-500 text-base max-w-md font-normal leading-relaxed">
            Nous éliminons la complexité du code e-mail pour vous concentrer sur ce qui compte : votre message et vos conversions.
          </p>
        </div>

        {/* Grille de cartes épurées */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative p-8 md:p-10 rounded-2xl bg-slate-50/50 border border-slate-200/70 hover:bg-white hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100/50 text-[#8B5CF6] flex items-center justify-center group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-slate-900 mb-3 tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-slate-500 text-sm md:text-base leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200/40 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-[#8B5CF6] transition-colors">
                  <span>En savoir plus</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
