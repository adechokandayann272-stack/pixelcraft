# 🚀 Kit de réplication — Prospection Maps PixelCraft (RUN 2)

> ⭐ **TU VEUX UN SEUL FICHIER ?** Ouvre **`GUIDE-COMPLET-RUN2.md`** — c'est le guide unique et complet (tout le pipeline dans l'ordre, scripts inclus).
> Les autres fichiers ci-dessous sont les références à copier-coller.

> **Objectif :** refaire tout le pipeline de prospection (scraping → enrichissement → scoring → envoi) une 2ᵉ fois, **sans rien avoir perdu**, même si les scripts d'origine ont disparu : ils sont **recréés ici en version améliorée**.

## 📦 Contenu du kit

| Fichier | Rôle |
|---|---|
| `GUIDE-COMPLET-RUN2.md` | ⭐ **LIRE EN 1er — le guide unique** : tout le pipeline dans l'ordre d'exécution (scripts + formules + JSON + warmup + checklists) |
| `01-scraping-apify-maps.md` | Scraping Google Maps : acteur, 5 villes, 23 requêtes, coûts, export |
| `apify-maps-vincennes.json` | Input Apify EXACT du run Vincennes (fourni, à réutiliser tel quel) |
| `apify-maps-TEMPLATE.json` | Template pour les autres villes (copier → changer `locationQuery`) |
| `02-assemblage-nettoyage.md` | Fusion des 5 exports, dédup, mapping colonnes brut → final, nettoyage emails |
| `Code.gs` | ⭐ **LE script Apps Script complet** (menu 14 actions, remplace tous les scripts perdus) |
| `03-formules.md` | Toutes les formules Sheets prêtes à coller (email_final, statut, stratégie, Note Lead, segments) |
| `04-enrichissements.md` | Facebook (optionnel) + Hunter.io + API Gouv prénoms dirigeants |
| `05-verification-emails.md` | Vérification (Bouncer & co), réimport des statuts, règles d'envoi |
| `06-segmentation-scoring.md` | Labels Stratégie, Note Lead v2 (barème + preuves), segments A/B/C/D/RS |
| `07-warmup-envoi.md` | Infra 4 plateformes + **planning warmup J1→J42 complet récupéré** + RGPD |
| `annexes/warmup-J1-J42.csv` | Planning warmup en CSV (import direct, séparateur `;`) |
| `CHECKLIST-RUN2.md` | Pas-à-pas chronologique numéroté avec cases à cocher |

## 🔍 Ce qui a été retrouvé (enquête Drive + rétro-ingénierie)

**Fichiers récupérés sur ton Drive :**
1. `maps` (Google Sheet, 29 sept.) — le fichier FINAL enrichi + scoré (~1 750 lignes estimées sur la 1ʳᵉ feuille)
2. `maps.xlsx` (5 sept.) — export brut de campagne (Boulogne-Billancourt + autres), feuille `Data`
3. ~~`dataset_crawler-google-places_2026-06-07`~~ — test flop, ignoré (a juste confirmé le nom de l'acteur Apify)
4. `warmup_emails` — **planning warmup J1→J42 complet** (4 plateformes, 925/j max) ✅
5. ~~`hunter_emails_lisible`~~ — test flop, ignoré
6. ~~`Feuille sans titre` (25 juil.)~~ — test flop, ignoré
7. Ton input JSON Apify du run **Vincennes** (23 requêtes, 35 lieux/requête)

**Les 5 villes identifiées :** Boulogne-Billancourt, Versailles, Saint-Germain-en-Laye, Saint-Maur-des-Fossés, Vincennes.

**Chronologie reconstituée :** tests en juin → warmup planifié début août → scrape campagne début sept. → fichier final le 29 sept.

## ⚠️ Constats importants (lis ça avant de refaire)

1. **Les scripts sont bien perdus** (aucun fichier Apps Script sur le Drive) → recréés dans `Code.gs`, en **mieux** (colonnes trouvées par nom, plus de `setValue` en boucle, reprise sur panne).
2. **La structure réelle ≠ ton plan** : le fichier final a 19 colonnes (`nom_entreprise, place_id, address, categoryName, city, [F vide], emails/0, emails/1, facebook/0, instagrams/0, email_final, phone, street, maps, website, email_status, Stratégie Email, Note Lead (/100), prenom_dirigeant`), pas les `master` col B/C/D/E/G/I/J/K du plan. **Ce kit documente la RÉALITÉ.**
3. **Colonne F vide sans en-tête** sur toutes les lignes visibles → probablement prévue pour les emails Facebook. Au run 2, on l'utilise pour `email_fb`. *(À confirmer : c'était prévu pour quoi ?)*
4. **Étape Facebook probablement JAMAIS exécutée** : `email_final` = toujours `emails/0` sur les lignes visibles, aucune colonne `email_fb`. Gardée en optionnel dans le kit.
5. **Prénoms dirigeants : colonne vide** sur tête + queue du fichier → l'enrichissement Gouv n'a jamais abouti (API en 502 ?). Version robuste + batchée fournie.
6. **Warmup jamais démarré** : la date de début est vide dans `warmup_emails`.
7. **Emails JAMAIS vérifiés** (tu l'as confirmé) : `valid` = juste « email présent », PAS « délivrable ». Les `invalid`/`catch-all` n'existent pas encore → la vraie vérification est à faire au run 2 (voir `05`).
8. **Écart 2 840 → ~1 750 lignes** : dédup inter-requêtes + suppressions probables (ou autres onglets invisibles pour moi — l'export CSV ne montre que la 1ʳᵉ feuille).
9. **Note Lead rétro-ingéniérée à ~95 %** : formule v2 dans le kit qui reproduit tous les scores certains (100/85/73/71/20/15), avec 2 anomalies documentées (voir `06-segmentation-scoring.md`).
10. **Anciens tests non réutilisés** : les premiers exports d'essai comportaient trop d'erreurs (mauvais domaines, hors-cible) → le run 2 repart d'un **scraping propre** (voir `01`), sans réutiliser ces fichiers.

## ✅ Checklist express (détail : `CHECKLIST-RUN2.md`)

- [ ] J-45 : lancer le warmup (date de début !) + config DNS (SPF/DKIM/DMARC)
- [ ] J-30 : 5 runs Apify Maps (1/ville) → export **JSON**
- [ ] J-28 : nouveau Google Sheet → coller `Code.gs` → `0. Créer la structure master` → `1. Assembler les bruts → master` → `2. Extraire place_id + noms` → `3. Nettoyer emails + email_final`
- [ ] J-25 : enrichissements (FB optionnel → Hunter top leads → Gouv prénoms)
- [ ] J-20 : export `_A_VERIFIER` → vérification externe → `5. Importer statuts vérification`
- [ ] J-18 : `6. Stratégie + Note Lead` → `7. Générer les onglets (A/B/C/D/RS…)` → `8. Audit qualité`
- [ ] J-15 : campagne par segment (A en premier), suivi réponses

## ❓ Questions restantes (le kit marche sans — seuls 2-3 points affineraient)

1. ✅ **RÉSOLU par ta capture** : les onglets sont `master`, `A`, `B`, `C`, `D`, `RS`, `FB`, `Sans Site`, `POUBELLE` → le script v2 (`Code.gs`, menu 7) génère exactement ces noms.
2. **Colonne F vide** : prévue pour quoi ?
3. ✅ **RÉSOLU (tu as confirmé)** : les emails n'ont jamais été vérifiés — `valid` = juste « présent ». La vraie vérification est une étape du run 2 (voir `05` + menus 4/5 du script).
4. Étape **Facebook** : exécutée ou pas ?
5. **Prénoms Gouv** : échec API 502 confirmé ?
6. Dans `maps`, les lignes **sans email + avec tél + sans site** sont vers **70** (branche cold-call ✅ ma théorie) ou vers **45** ? Et les lignes **nominatif + fixe + FB + sans site** sont à **86 ou 96** ?
7. Écart **2 840 → ~1 750** : suppressions volontaires ? autres onglets ?
