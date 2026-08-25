import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-mesh pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Retour à l'accueil
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-4">
            <Shield size={14} className="text-primary-500" />
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">Légal</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Politique de <span className="text-gradient">confidentialité</span>
          </h1>
          <p className="mt-4 text-gray-500">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="prose-custom space-y-10">
          <Section title="1. Introduction">
            <p>
              Bienvenue sur PixelCraft Studio 
              <a
                href="https://pixelcraft-bay.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 underline underline-offset-4 hover:text-primary-600"
              >
                
              </a>
              . La protection de vos données personnelles est une priorité pour nous. Cette politique
              de confidentialité explique quelles informations nous collectons, comment nous les
              utilisons et quels sont vos droits.
            </p>
          </Section>

          <Section title="2. Données collectées">
            <p>Nous pouvons collecter les types de données suivants :</p>
            <ul>
              <li>
                <strong>Données de contact :</strong> nom, adresse email, numéro de téléphone
                lorsque vous utilisez notre formulaire de contact.
              </li>
              <li>
                <strong>Données de navigation :</strong> adresse IP, type de navigateur, pages
                visitées, durée de la visite via des cookies analytiques.
              </li>
              <li>
                <strong>Données de projet :</strong> informations que vous partagez volontairement
                dans le cadre d'une demande de devis ou de collaboration.
              </li>
            </ul>
          </Section>

          <Section title="3. Utilisation des données">
            <p>Vos données sont utilisées exclusivement pour :</p>
            <ul>
              <li>Répondre à vos demandes de contact et de devis.</li>
              <li>Améliorer l'expérience utilisateur de notre site.</li>
              <li>Établir des statistiques anonymes de fréquentation.</li>
              <li>
                Vous envoyer des informations relatives à nos services, uniquement avec votre
                consentement.
              </li>
            </ul>
          </Section>

          <Section title="4. Cookies">
            <p>
              Notre site peut utiliser des cookies pour améliorer votre expérience de navigation.
              Les cookies sont de petits fichiers texte stockés sur votre appareil. Vous pouvez à
              tout moment configurer votre navigateur pour refuser les cookies.
            </p>
            <p>Types de cookies utilisés :</p>
            <ul>
              <li>
                <strong>Cookies essentiels :</strong> nécessaires au bon fonctionnement du site.
              </li>
              <li>
                <strong>Cookies analytiques :</strong> nous aident à comprendre comment les
                visiteurs interagissent avec le site.
              </li>
            </ul>
          </Section>

          <Section title="5. Partage des données">
            <p>
              Nous ne vendons, n'échangeons ni ne louons vos données personnelles à des tiers. Vos
              informations peuvent être partagées uniquement dans les cas suivants :
            </p>
            <ul>
              <li>Avec votre consentement explicite.</li>
              <li>Pour se conformer à une obligation légale.</li>
              <li>
                Avec des prestataires de confiance (hébergement Vercel, analytiques) qui s'engagent
                à respecter la confidentialité de vos données.
              </li>
            </ul>
          </Section>

          <Section title="6. Sécurité des données">
            <p>
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles
              appropriées pour protéger vos données contre tout accès non autorisé, modification,
              divulgation ou destruction. 
            </p>
          </Section>

          <Section title="7. Vos droits (RGPD)">
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez
              des droits suivants :
            </p>
            <ul>
              <li>
                <strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles.
              </li>
              <li>
                <strong>Droit de rectification :</strong> corriger des données inexactes.
              </li>
              <li>
                <strong>Droit à l'effacement :</strong> demander la suppression de vos données.
              </li>
              <li>
                <strong>Droit à la portabilité :</strong> recevoir vos données dans un format
                structuré.
              </li>
              <li>
                <strong>Droit d'opposition :</strong> vous opposer au traitement de vos données.
              </li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à :{' '}
              <strong>dayann@pixelcraft.mail</strong>
            </p>
          </Section>

          <Section title="8. Conservation des données">
            <p>
              Vos données personnelles sont conservées uniquement pendant la durée nécessaire aux
              finalités pour lesquelles elles ont été collectées, et en tout état de cause,
              conformément aux délais légaux en vigueur.
            </p>
          </Section>

          <Section title="9. Contact">
            <p>
              Pour toute question relative à cette politique de confidentialité, vous pouvez nous
              contacter :
            </p>
            <ul>
              <li>
                <strong>Email :</strong> dayann@pixelcraft.email
              </li>
              <li>
                <strong>Site :</strong>{' '}
                <a
                  href="https://www.pixelcraft.email/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 underline underline-offset-4 hover:text-primary-600"
                >
                  https://www.pixelcraft.email/
                </a>
              </li>
            </ul>
          </Section>
        </div>

        {/* Back to top */}
        <div className="mt-16 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:shadow-primary-500/50 hover:-translate-y-0.5"
          >
            <ArrowLeft size={16} />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="text-sm text-gray-600 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:text-gray-600 [&_a]:text-primary-500 [&_a]:underline [&_a:hover]:text-primary-600">
        {children}
      </div>
    </div>
  );
}
