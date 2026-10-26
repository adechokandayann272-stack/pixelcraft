# 05 — Vérification des emails

> But : ne jamais envoyer vers des emails invalides (= rebonds = réputation détruite).
> À faire **APRÈS tous les enrichissements** (`04`), sur `email_final` complet.

## Procédure

1. `Code.gs` → `exporterEmailsAVerifier` → onglet `A_VERIFIER` (emails **uniques**, minuscules + n° de ligne).
2. Copier la colonne A → la coller dans l'outil de vérification → lancer.
3. Récupérer les résultats → coller dans `VERIF_RESULT` : **A = email, B = statut brut**.
4. `Code.gs` → `importerStatuts` → match **insensible à la casse**, normalise les statuts, remplit `email_status` (P), loggue les sans-correspondance dans `_logs`.

## Normalisation des statuts (par le script)

| Statut outil (exemples) | → `email_status` | Conduite |
|---|---|---|
| `deliverable`, `valid`, `ok` | `valid` | ✅ Envoi normal |
| `accept-all`, `catch-all` | `catch-all` | ⚠️ Envoi prudent (petit volume/jour, surveille rebonds) |
| `risky`, `unknown` | `catch-all` (v2) | ⚠️ Idem |
| `undeliverable`, `invalid`, `bounce` | `invalid` | ⛔ Jamais d'email (bascule call/RS) |
| (pas d'email) | `missing` | 📞 Call / RS / archive selon tél & réseaux |
| (email non retrouvé dans VERIF) | `à vérifier` | 🔁 Revérifier |

## Outils (prix indicatifs 2026, à confirmer)

| Outil | Repère prix | Notes |
|---|---|---|
| **Bouncer** | ~8-15 € / 1 000 crédits | Bon rapport qualité/prix, catch-all détecté |
| ZeroBounce | ~10-18 € / 1 000 | Référence, scoring + sous-statuts |
| MillionVerifier | ~5-8 € / 1 000 | Le moins cher, correct |
| Emailable / NeverBounce | ~8-15 € / 1 000 | Alternatives solides |
| **Brevo** (si tu y envoies) | Vérif incluse/option | Pratique si Brevo = plateforme principale |

Budget run 2 : ~750-800 emails → **~5-12 €**.

## ⚠️ Leçons du run 1

- Au run 1, les emails n'ont **jamais été vérifiés** (confirmé) : `valid` = juste « email présent », pas « délivrable ».
  En v2 : **on ne supprime plus**, on route (A/B/C/D/RS…) — une ligne `invalid` + tél + sans site reste un lead call à ~71/100 (cas Hivelin : 10+50+6+5).
- Toujours vérifier sur emails **minuscules + dédupliqués** (sinon tu paies 2× : la casse `LORIS@...` du run 1).
- Garde `VERIF_RESULT` : c'est ta preuve/traçabilité (utile si un outil conteste un rebond).
