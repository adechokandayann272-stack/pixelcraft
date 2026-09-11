import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

// Renseigne ici ton URL publique Formspree lorsque tu l'auras créée.
// Exemple : 'https://formspree.io/f/xxxxxxxx'
const FORMSPREE_URL = 'https://formspree.io/f/maeykvan';

const CONTACT_EMAIL = 'dayann@pixelcraft.email';
const COOLDOWN_MS = 60_000;
const LAST_SENT_KEY = 'pixelcraft-contact-last-sent';

function readLastSent(): number {
  try {
    const value = Number(localStorage.getItem(LAST_SENT_KEY));

    return Number.isFinite(value) && value > 0 ? value : 0;
  } catch {
    return 0;
  }
}

function saveLastSent(timestamp: number): void {
  try {
    localStorage.setItem(LAST_SENT_KEY, String(timestamp));
  } catch {
    // Le formulaire reste utilisable si le stockage est indisponible.
  }
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const submitting = useRef(false);
  const lastSent = useRef(0);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitting.current) return;

    setError('');
    setSent(false);

    const form = e.currentTarget;

    if (!form.reportValidity()) return;

    // Champ piège invisible pour certains robots.
    const trap = new FormData(form).get('_gotcha');

    if (typeof trap === 'string' && trap.trim()) {
      return;
    }

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setError('Merci de compléter tous les champs.');
      return;
    }

    if (!FORMSPREE_URL) {
      setError(
        `Le formulaire n’est pas encore disponible. Écrivez-nous à ${CONTACT_EMAIL}.`
      );
      return;
    }

    const previous = Math.max(lastSent.current, readLastSent());
    const elapsed = Date.now() - previous;

    if (elapsed >= 0 && elapsed < COOLDOWN_MS) {
      const remaining = Math.ceil((COOLDOWN_MS - elapsed) / 1000);

      setError(
        `Merci de patienter ${remaining} seconde(s) avant un nouvel envoi.`
      );
      return;
    }

    submitting.current = true;
    setSending(true);

    const controller = new AbortController();

    const timeout = window.setTimeout(() => {
      controller.abort();
    }, 15_000);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _gotcha: '',
        }),
        signal: controller.signal,
      });

      if (response.status === 429) {
        setError(
          'Trop de demandes ont été effectuées. Réessayez plus tard ou contactez-nous par email.'
        );
        return;
      }

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      const timestamp = Date.now();

      lastSent.current = timestamp;
      saveLastSent(timestamp);

      setSent(true);
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch {
      setError(
        `L’envoi n’a pas pu être confirmé. Votre texte a été conservé. Réessayez plus tard ou écrivez à ${CONTACT_EMAIL}.`
      );
    } finally {
      window.clearTimeout(timeout);
      submitting.current = false;
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-4">
            <Mail size={14} className="text-primary-500" />
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">
              Contact
            </span>
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Parlons de votre <span className="text-gradient">projet</span>
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Prêt à donner vie à votre vision ? Contactez-nous pour un devis
            gratuit.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Restons en contact
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                N'hésitez pas à nous écrire pour toute question ou demande de
                devis. Nous répondons sous 24h.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center">
                  <Mail size={18} className="text-primary-500" />
                </div>

                <div>
                  <div className="text-xs text-gray-400">Email</div>
                  <a
                    href="mailto:dayann@pixelcraft.email"
                    className="text-sm font-medium text-gray-700"
                  >
                    dayann@pixelcraft.email
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center">
                  <Phone size={18} className="text-primary-500" />
                </div>

                <div>
                  <div className="text-xs text-gray-400">Téléphone</div>
                  <a
                    href="tel:+33602477768"
                    className="text-sm font-medium text-gray-700"
                  >
                    +33 6 02 47 77 68
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center">
                  <MapPin size={18} className="text-primary-500" />
                </div>

                <div>
                  <div className="text-xs text-gray-400">Localisation</div>
                  <div className="text-sm font-medium text-gray-700">
                    Paris, France
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div hidden aria-hidden="true">
              <label htmlFor="contact-company-website">
                Ne pas remplir ce champ
              </label>
              <input
                id="contact-company-website"
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <input
                id="contact-name"
                name="name"
                type="text"
                aria-label="Votre nom"
                autoComplete="name"
                placeholder="Votre nom"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setSent(false);
                }}
                maxLength={100}
                disabled={sending}
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <div>
              <input
                id="contact-email"
                name="email"
                type="email"
                aria-label="Votre email"
                autoComplete="email"
                placeholder="Votre email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setSent(false);
                }}
                maxLength={254}
                disabled={sending}
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <div>
              <textarea
                id="contact-message"
                name="message"
                aria-label="Décrivez votre projet"
                placeholder="Décrivez votre projet..."
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  setSent(false);
                }}
                maxLength={5000}
                disabled={sending}
                required
                rows={5}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              aria-busy={sending}
              className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-purple-500 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-primary-500/30 transition-all hover:shadow-primary-500/50 hover:-translate-y-0.5"
            >
              {sending ? (
                'Envoi en cours…'
              ) : sent ? (
                'Message envoyé ✓'
              ) : (
                <>
                  Envoyer le message
                  <Send
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>

            {error && (
              <div role="alert" className="text-sm text-red-600">
                {error}
              </div>
            )}

            <span role="status" aria-live="polite" className="sr-only">
              {sending
                ? 'Envoi en cours.'
                : sent
                  ? 'Votre message a été transmis.'
                  : ''}
            </span>
          </form>
        </div>
      </div>
    </section>
  );
}
