# 📦 Kit de réplication Maps PixelCraft — FICHIER UNIQUE (RUN 2)

> **Ce fichier regroupe les 14 fichiers du kit** (`kit-replication/`), pour lecture dun seul bloc et **import dans Notion**.
>
> **→ Importer dans Notion :** crée une page → menu `···` → **Importer** → **Markdown** → choisis ce fichier (ou glisse-dépose le `.md` dans Notion). Titres, tableaux, cases à cocher et blocs de code sont conservés.
>
> **Par où commencer : §2 (le GUIDE)** — le document unique qui contient déjà le script `Code.gs` en entier, les configs Apify, les formules, le planning warmup et les checklists. Les autres sections sont les fichiers techniques de référence.
>
> ⚠️ `Code.gs` na pas de section propre : il est repris **en entier** dans le §2 (chercher `Code.gs` dans le §2) — 33 fonctions vérifiées identiques, inutile de le dupliquer.

## Sommaire

1. §1 — `README.md` (présentation du kit)
2. §2 — `GUIDE-COMPLET-RUN2.md` (le guide unique : script + configs + formules + warmup + checklists)
3. §3 — `01-scraping-apify-maps.md`
4. §4 — `apify-maps-vincennes.json` (copie conforme, prête à coller dans Apify)
5. §5 — `apify-maps-TEMPLATE.json` (copie conforme pour les autres villes)
6. §6 — `02-assemblage-nettoyage.md`
7. §7 — `03-formules.md`
8. §8 — `04-enrichissements.md`
9. §9 — `05-verification-emails.md`
10. §10 — `06-segmentation-scoring.md`
11. §11 — `07-warmup-envoi.md`
12. §12 — `CHECKLIST-RUN2.md`
13. §13 — `annexes/warmup-J1-J42.csv` (tableau lisible + CSV brut à copier)

---

## §1 — `README.md`

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

---

## §2 — `GUIDE-COMPLET-RUN2.md`

# 📕 GUIDE COMPLET — Refaire le fichier `maps` de zéro (RUN 2)

> **Ce document = tout, en un seul fichier, dans l'ordre** : scraping → script unique → assemblage →
> enrichissements → vérification → scoring + onglets → warmup/envoi.
> Tu le lis de haut en bas et tu copies-colles au fur et à mesure. Rien d'autre à lire.
>
> Budget run 2 : **~35-45 €** (Apify ~24 € + vérif emails ~5-12 € + FB ~2 €, le reste gratuit).
> Durée : ~2-3 semaines (dont warmup en parallèle).

---

## 0. Ce qu'il te faut avant de commencer

- [ ] Compte **Google** (Sheets + Apps Script, gratuit)
- [ ] Compte **Apify** crédité (~30 €) — scraping Maps + FB
- [ ] Compte **Bouncer** (ou ZeroBounce/MillionVerifier, ~10 €) — vérification emails
- [ ] Compte **Hunter.io** (gratuit ~25/mois suffit) — enrichissement optionnel
- [ ] Tes 4 plateformes d'envoi : **Amazon SES, Gmail+GMass, Outlook, Brevo** (voir §7)
- [ ] Ta capture l'a confirmé : ton fichier s'appelle `maps`, onglet principal **`master`**,
  onglets **`RS Sans Email & Site`, `A`, `B`, `C`, `D`, `RS`, `FB`, `Sans Site`** → ce guide recrée exactement ça.

💡 **Vérifie d'abord une chose (30 secondes)** : ouvre ton fichier `maps` →
menu **Extensions → Apps Script**. Si tes anciens scripts y sont encore, ils живут là.
Copie-les-moi et je les fusionne dans ce guide. Sinon : pas grave, tout est recréé au §2.

---

## 1. SCRAPING Google Maps (Apify)

### 1.1 Acteur
**`compass/crawler-google-places`** (Apify → Actors → cherche ce nom).

### 1.2 Les 5 villes = 5 runs (1 JSON par ville)

| # | Ville (`locationQuery`) |
|---|---|
| 1 | `Boulogne-Billancourt, France` |
| 2 | `Versailles, France` |
| 3 | `Saint-Germain-en-Laye, France` |
| 4 | `Saint-Maur-des-Fossés, France` |
| 5 | `Vincennes, France` |

### 1.3 JSON complet (run Vincennes — ton input exact, réutilise-le tel quel)

Apify → l'acteur → onglet **Input (JSON)** → colle tout le bloc → Save → Start :

```json
{
  "enableCompetitorAnalysis": false,
  "includeWebResults": false,
  "language": "fr",
  "locationQuery": "Vincennes, France",
  "maxCrawledPlacesPerSearch": 35,
  "maxImages": 0,
  "maxReviews": 0,
  "maximumLeadsEnrichmentRecords": 0,
  "scrapeContacts": true,
  "scrapeDirectories": false,
  "scrapeImageAuthors": false,
  "scrapeOrderOnline": false,
  "scrapePlaceDetailPage": false,
  "scrapeReviewsPersonalData": false,
  "scrapeSocialMediaProfiles": {
    "facebooks": true,
    "instagrams": false,
    "tiktoks": false,
    "twitters": false,
    "youtubes": false
  },
  "scrapeTableReservationProvider": false,
  "searchStringsArray": [
    "Entreprise générale du bâtiment",
    "Entreprise de rénovation intérieure",
    "Architecte d'intérieur",
    "Cabinet d'avocat",
    "Expert-comptable",
    "Courtier immobilier",
    "Courtier en crédit",
    "Cabinet de gestion de patrimoine",
    "Agence immobilière",
    "Notaire",
    "Chirurgien esthétique",
    "Dentiste",
    "Ostéopathe",
    "Clinique vétérinaire",
    "Institut de beauté",
    "Psychologue",
    "Salon de coiffure",
    "Photographe",
    "Garage automobile",
    "Auto-école",
    "Ophtalmologue",
    "Salle de sport",
    "Paysagiste"
  ],
  "skipClosedPlaces": true,
  "verifyLeadsEnrichmentEmails": false,
  "website": "allPlaces",
  "searchMatching": "all",
  "placeMinimumStars": "",
  "maxQuestions": 0,
  "reviewsSort": "newest",
  "reviewsFilterString": "",
  "reviewsOrigin": "all",
  "maxCompetitorsToAnalyze": 30,
  "allPlacesNoSearchAction": ""
}
```

### 1.4 Pour les 4 autres villes
Reprends le JSON ci-dessus et change **2 choses** :
1. `"locationQuery"` → la ville visée (ex. `"Versailles, France"`).
2. `"instagrams": false` → `"instagrams": true` (ton fichier final contient des URLs Instagram,
   donc autant les scraper partout ; coût quasi nul).
   *(Le même JSON template est aussi dans `apify-maps-TEMPLATE.json`.)*

### 1.5 Lancement
1. 5 runs (tu peux les lancer **en parallèle**), ~20-60 min chacun.
2. **Plafond anti-surprise** : limite de dépense ~8 $/run dans les settings.
3. Ce qui compte dans les paramètres : `maxCrawledPlacesPerSearch: 35` (23 requêtes × 35 = 805 lieux max/ville),
   `scrapeContacts: true` (⭐ = les emails, trouvés sur les **sites web** des fiches),
   `website: "allPlaces"` (le site ou vide → le vide = ton signal « pas de site » 💰),
   `skipClosedPlaces: true`, `scrapePlaceDetailPage: false` (inutile, cher).

### 1.6 Export (⚠️ en JSON, pas en XLSX)
Ton export XLSX du run 1 avait **perdu des colonnes** (`title`, `placeId`).
Run terminé → **Dataset** → **Export** → **JSON** → nomme `dataset_<ville>_<date>.json`.
(backup optionnel en CSV.)

**Attendus** (tes chiffres run 1) : ~2 500-4 000 lieux bruts → ~1 700-2 800 après dédup ;
~20-30 % avec email (~755) ; **~24 €** les 5 villes.

### 1.7 Pièges connus
- `searchMatching: "all"` ramène des **hors-cible** (un `Parking` s'était glissé dans ton final !)
  → tu filtreras les catégories au §3 (le script loggue les catégories dans `_stats`).
- Doublons massifs entre requêtes/villes → dédup auto sur `place_id` au §3.

---

## 2. LE SCRIPT UNIQUE (remplace tous tes scripts perdus)

### 2.1 Installation (5 clics)
1. Crée un Google Sheet vierge (nomme-le `maps_run2`).
2. Menu **Extensions → Apps Script**.
3. Supprime le code existant, **colle TOUT le bloc `Code.gs` ci-dessous**, 💾 Enregistrer, ferme l'onglet.
4. Recharge le Sheet → le menu **🚀 PixelCraft** apparaît (accepte les autorisations Google).
5. Clique les fonctions **dans l'ordre du menu** (0 → 8).

### 2.2 Le script complet (à copier en entier)

```javascript
/*****************************************************************
 * PIXELCRAFT — Script unique prospection Maps (RUN 2)
 * ----------------------------------------------------------------
 * Installation : Google Sheet vierge → Extensions → Apps Script →
 * supprimer le code existant → coller TOUT ce fichier →
 * Enregistrer (💾) → fermer → recharger le Sheet →
 * le menu "🚀 PixelCraft" apparaît (accepte les autorisations).
 *
 * Ordre d'utilisation (détail : GUIDE-COMPLET-RUN2.md) :
 *  0. Créer la structure master (1 fois)
 *  1. Importer tes exports Apify dans des onglets brut_<ville>
 *  2. Assembler → Extraire ids/noms → Nettoyer emails
 *  3. Enrichissements (FB / Hunter / Gouv)
 *  4. Exporter emails à vérifier → (outil externe) → Importer statuts
 *  5. Stratégie + Note → Générer les onglets → Audit qualité
 *
 * Conventions : colonnes retrouvées par NOM (insensible à la casse),
 * écritures par lots (rapide), logs dans _logs, helpers en _*.
 *****************************************************************/

const PC = {
  MASTER: 'master',
  LOGS: '_logs',
  STATS: '_stats',
  A_VERIFIER: '_A_VERIFIER',
  VERIF_RESULT: '_VERIF_RESULT',
  FB_URLS: '_FB_URLS',
  FB_RESULT: 'FB', // = ton onglet FB : import brut apify/facebook-pages-scraper

  HEADERS_MASTER: [
    'nom_entreprise', 'place_id', 'address', 'categoryName', 'city',
    'email_fb', 'emails/0', 'emails/1', 'facebook/0', 'instagrams/0',
    'email_final', 'phone', 'street', 'maps', 'website',
    'email_status', 'Stratégie Email', 'Note Lead (/100)',
    'prenom_dirigeant', 'Bonus manuel', 'siren'
  ],

  // Détection GÉNÉRIQUE = partie locale EXACTEMENT égale (pas un préfixe !).
  // Constat run 1 : contact@ → GÉNÉRIQUE mais contact.atmosphereby@ → NOMINATIF.
  GENERIQUES: ['contact', 'info', 'accueil', 'direction', 'commercial',
    'devis', 'agence', 'secretariat', 'hello', 'bonjour', 'equipe', 'team',
    'sales', 'support', 'sav', 'facture', 'facturation', 'compta', 'admin',
    'reservation', 'reservations', 'rdv', 'recrutement', 'rh', 'presse'],

  LABEL_NOMINATIF: '🎯 NOMINATIF | Décideur direct | Pitch direct | Taux : 35-50%',
  LABEL_GENERIQUE: '🚪 GÉNÉRIQUE | Intermédiaire | Passage barrage | Taux : 15-25%',
  LABEL_CATCHALL: '⚠️ CATCH-ALL | À tester | Taux : 20-30%',
  LABEL_MISSING: '— (Pas d\'email valide)',
  LABEL_INVALID: '⛔ INVALIDE | Ne pas envoyer',

  // Barème Note Lead v2 (preuves : GUIDE §6)
  PTS: { NOM: 60, GEN: 48, CATCHALL: 45, AUCUN: 10,
         SITE_NON: 25, SITE_NON_SANS_EMAIL: 50, SITE_OUI: 5,
         TEL_MOBILE: 15, TEL_FIXE: 6, SOCIAL: 5 },

  POUBELLE_AUTO: /(utilisateur@|test@|exemple@|example\.|nomdedomaine|domaine\.com|domain\.com|monsite\.fr)/i,
  POUBELLE_GRIZE: /(yespark|doctolib|linkeo|almapay|pagesjaunes|sante\.fr|widerspruch)/i,
  EMAIL_OK: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  PLATEFORMES_SITE: /(doctolib\.fr|planity\.com|facebook\.com|instagram\.com|pagesjaunes\.fr|tripadvisor|yelp\.)/i
};

/* ============================== MENU ============================== */

function onOpen() {
  SpreadsheetApp.getUi().createMenu('🚀 PixelCraft')
    .addItem('0. Créer la structure master', 'creerStructureMaster')
    .addSeparator()
    .addItem('1. Assembler les bruts → master', 'assemblerBrut')
    .addItem('2. Extraire place_id + noms', 'extraireIdsEtNoms')
    .addItem('3. Nettoyer emails + email_final', 'nettoyerEmails')
    .addSeparator()
    .addItem('4. Exporter emails à vérifier', 'exporterEmailsAVerifier')
    .addItem('5. Importer statuts vérification', 'importerStatuts')
    .addItem('6. Stratégie + Note Lead', 'appliquerStrategieEtScore')
    .addItem('7. Générer les onglets (A/B/C/D/RS…)', 'genererSegments')
    .addItem('8. Audit qualité → _stats', 'auditQualite')
    .addSeparator()
    .addItem('FB : lister URLs sans email', 'normaliserUrlsFacebook')
    .addItem('FB : fusionner emails trouvés', 'fusionnerEmailsFB')
    .addSeparator()
    .addItem('Gouv : enrichir prénoms (lot)', 'enrichirPrenomsGouv')
    .addItem('Gouv : installer déclencheur auto', 'installerDeclencheurGouv')
    .addItem('Gouv : arrêter déclencheur auto', 'arreterDeclencheurGouv')
    .addToUi();
}

/* ============================== UTILS ============================== */

function colIndex_(sheet, names) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    .map(h => String(h).trim().toLowerCase());
  const list = Array.isArray(names) ? names : [names];
  for (const n of list) {
    const i = headers.indexOf(String(n).trim().toLowerCase());
    if (i !== -1) return i + 1;
  }
  return -1;
}

function getOrCreateSheet_(name) {
  let s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!s) s = SpreadsheetApp.getActiveSpreadsheet().insertSheet(name);
  return s;
}

function journal_(fonction, message) {
  const s = getOrCreateSheet_(PC.LOGS);
  if (s.getLastRow() === 0) s.appendRow(['date', 'fonction', 'message']);
  s.appendRow([new Date(), fonction, String(message).substring(0, 900)]);
}

function timeUp_(start, maxMin) {
  return (Date.now() - start) > (maxMin || 5) * 60 * 1000;
}

function cleanEmail_(v) {
  return String(v || '').toLowerCase().replace(/\s+/g, '');
}

function cleanUrlSite_(v) {
  let u = String(v || '').trim();
  if (!u) return '';
  u = u.split('#')[0].split('?')[0].trim();
  return u;
}

function normalizeTxt_(s) {
  return String(s || '').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function toast_(msg) {
  SpreadsheetApp.getActiveSpreadsheet().toast(msg, '🚀 PixelCraft');
}

/* ============================== 0. STRUCTURE ============================== */

function creerStructureMaster() {
  const s = getOrCreateSheet_(PC.MASTER);
  s.clear();
  s.getRange(1, 1, 1, PC.HEADERS_MASTER.length).setValues([PC.HEADERS_MASTER]);
  s.setFrozenRows(1);
  // Format perso de la note : 100 → "100 / 100"
  s.getRange(2, 18, Math.max(s.getMaxRows() - 1, 1), 1).setNumberFormat('0" / 100"');
  journal_('creerStructureMaster', 'Structure master créée (' + PC.HEADERS_MASTER.length + ' colonnes).');
  toast_('Onglet master prêt ✅');
}

/* ============================== 1. ASSEMBLAGE ============================== */

function assemblerBrut() {
  const start = Date.now();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const bruts = ss.getSheets().filter(sh =>
    sh.getName().toLowerCase().indexOf('brut') === 0 && sh.getLastRow() > 1);
  if (!bruts.length) {
    SpreadsheetApp.getUi().alert('Aucun onglet brut_* trouvé. Importe d\'abord tes exports Apify (1 onglet brut_<ville> par ville).');
    return;
  }
  const fin = getOrCreateSheet_(PC.MASTER);
  if (fin.getLastRow() === 0) creerStructureMaster();

  const SRC = { // alias acceptés dans les bruts
    title: ['title', 'nom_entreprise', 'nom', 'entreprise'],
    placeId: ['placeid', 'place_id'],
    address: ['address', 'adresse'],
    categoryName: ['categoryname', 'categorie'],
    city: ['city', 'ville'],
    emails0: ['emails/0', 'emails_0', 'email', 'mail'],
    emails1: ['emails/1', 'emails_1', 'email2'],
    fb: ['facebooks/0', 'facebook/0', 'facebook'],
    insta: ['instagrams/0', 'instagram/0', 'instagram'],
    phone: ['phone', 'tel', 'telephone'],
    street: ['street', 'rue'],
    url: ['url', 'maps', 'lien_maps'],
    website: ['website', 'site', 'site_web']
  };

  const seen = {}; // place_id -> index dans out
  const out = [];
  let lus = 0, dups = 0;

  bruts.forEach(sh => {
    const vals = sh.getRange(1, 1, sh.getLastRow(), sh.getLastColumn()).getValues();
    const head = vals[0].map(h => String(h).trim().toLowerCase());
    const at = names => {
      for (const n of names) { const i = head.indexOf(n); if (i !== -1) return i; }
      return -1;
    };
    const c = {};
    Object.keys(SRC).forEach(k => { c[k] = at(SRC[k]); });
    for (let r = 1; r < vals.length; r++) {
      if (timeUp_(start)) { journal_('assemblerBrut', 'STOP anti-timeout — relance pour continuer.'); return; }
      const g = i => (i === -1 ? '' : String(vals[r][i] || '').trim());
      const url = g(c.url);
      let pid = g(c.placeId);
      if (!pid && url) { const m = url.match(/query_place_id=([^&]+)/); if (m) pid = m[1]; }
      if (!pid) pid = 'NOID_' + normalizeTxt_(g(c.title) + '|' + g(c.phone)).substring(0, 60);
      const row = {
        title: g(c.title), pid: pid, address: g(c.address), cat: g(c.categoryName),
        city: g(c.city), e0: g(c.emails0), e1: g(c.emails1), fb: g(c.fb),
        insta: g(c.insta), phone: g(c.phone), street: g(c.street),
        url: url, site: g(c.website)
      };
      // Score de richesse pour garder la meilleure ligne en cas de doublon
      row._rich = (row.e0 ? 3 : 0) + (row.phone ? 2 : 0) + ((row.fb || row.insta) ? 1 : 0) + (row.site ? 1 : 0);
      lus++;
      if (seen[pid] === undefined) { seen[pid] = out.length; out.push(row); }
      else { dups++; if (row._rich > out[seen[pid]]._rich) out[seen[pid]] = row; }
    }
  });

  const data = out.map(o => [o.title, o.pid, o.address, o.cat, o.city, '',
    o.e0, o.e1, o.fb, o.insta, '', o.phone, o.street, o.url, o.site,
    '', '', '', '', 0, '']);
  fin.getRange(2, 1, data.length, PC.HEADERS_MASTER.length).setValues(data);
  journal_('assemblerBrut', lus + ' lignes lues dans ' + bruts.length + ' brut(s), ' + dups + ' doublons fusionnés, ' + out.length + ' lignes écrites dans master.');
  toast_('Assemblé : ' + out.length + ' lignes (' + dups + ' doublons fusionnés) ✅');
}

/* ============================== 2. IDS + NOMS ============================== */

function cleanNomAffichage_(brut) {
  let s = String(brut || '');
  try { s = decodeURIComponent(s.replace(/\+/g, ' ')); } catch (e) { /* déjà décodé */ }
  s = s.split(' - ')[0].split(' | ')[0].split(',')[0];
  s = s.replace(/["«»]/g, '').replace(/['’ʼ]/g, "'").replace(/\s+/g, ' ').trim();
  // Casse de titre mot à mot, minuscules après apostrophe : D'avocat
  s = s.toLowerCase().split(' ').map(w =>
    w.split('-').map(p => (p.charAt(0).toUpperCase() + p.slice(1))).join('-')
  ).join(' ');
  return s;
}

function extraireIdsEtNoms() {
  const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PC.MASTER);
  if (!s || s.getLastRow() < 2) { SpreadsheetApp.getUi().alert('master vide. Lance l\'assemblage d\'abord.'); return; }
  const n = s.getLastRow() - 1;
  const vals = s.getRange(2, 1, n, PC.HEADERS_MASTER.length).getValues();
  let pidN = 0, nomN = 0;
  for (let i = 0; i < vals.length; i++) {
    const r = vals[i];
    const url = String(r[13] || ''); // N = maps
    if (!String(r[1] || '').trim() && url) {
      const m = url.match(/query_place_id=([^&]+)/);
      if (m) { r[1] = m[1]; pidN++; }
    }
    if (!String(r[0] || '').trim()) {
      let q = '';
      const m = url.match(/[?&]query=([^&]+)/);
      if (m) q = m[1];
      if (q) { r[0] = cleanNomAffichage_(q); nomN++; }
    }
    // Les noms déjà remplis (title Apify ou retouches manuelles) ne sont jamais touchés.
  }
  s.getRange(2, 1, n, PC.HEADERS_MASTER.length).setValues(vals);
  journal_('extraireIdsEtNoms', pidN + ' place_id extraits, ' + nomN + ' noms reconstruits depuis les URL.');
  toast_('IDs + noms OK ✅ (' + pidN + ' ids, ' + nomN + ' noms)');
}

/* ============================== 3. NETTOYAGE EMAILS ============================== */

function nettoyerEmails() {
  const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PC.MASTER);
  if (!s || s.getLastRow() < 2) { SpreadsheetApp.getUi().alert('master vide.'); return; }
  const n = s.getLastRow() - 1;
  const vals = s.getRange(2, 1, n, PC.HEADERS_MASTER.length).getValues();
  let autoN = 0, badN = 0, dedupN = 0;
  const grise = [];
  const plateformes = [];

  for (let i = 0; i < vals.length; i++) {
    const r = vals[i];
    const line = i + 2;
    // Normalise G, H, F
    [6, 7, 5].forEach(ci => {
      let e = cleanEmail_(r[ci]);
      if (!e) { r[ci] = ''; return; }
      if (!PC.EMAIL_OK.test(e)) { r[ci] = ''; badN++; return; }
      if (PC.POUBELLE_AUTO.test(e)) { r[ci] = ''; autoN++; return; }
      if (PC.POUBELLE_GRIZE.test(e)) grise.push('L' + line + ' ' + e);
      r[ci] = e;
    });
    // Dédup H vs G
    if (r[7] && r[7] === r[6]) { r[7] = ''; dedupN++; }
    // email_final K = premier non-vide G/H/F
    r[10] = r[6] || r[7] || r[5] || '';
    // Site O : retire UTM & co
    const siteAvant = String(r[14] || '');
    r[14] = cleanUrlSite_(siteAvant);
    if (r[14] && PC.PLATEFORMES_SITE.test(r[14])) plateformes.push('L' + line + ' ' + r[14]);
  }
  s.getRange(2, 1, n, PC.HEADERS_MASTER.length).setValues(vals);
  journal_('nettoyerEmails', 'Supprimés auto: ' + autoN + ', format invalide: ' + badN + ', doublons G/H: ' + dedupN +
    '. | À CONTRÔLER (liste grise, gardés) : ' + (grise.slice(0, 30).join(' ; ') || 'aucun') +
    (grise.length > 30 ? ' (+' + (grise.length - 30) + ' autres)' : '') +
    ' | Sites plateforme (pas des vrais sites ?) : ' + (plateformes.slice(0, 30).join(' ; ') || 'aucun'));
  toast_('Nettoyage OK ✅ (' + autoN + ' poubelle, ' + badN + ' invalides, ' + grise.length + ' à contrôler → _logs)');
}

/* Variante v2 (optionnelle) : préfère l'email NOMINATIF parmi G/H/F.
   Ex run 1 : question@ → remplacé par laurent.denis@. Relance l'étape 6 après. */
function choisirMeilleurEmail() {
  const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PC.MASTER);
  if (!s || s.getLastRow() < 2) return;
  const n = s.getLastRow() - 1;
  const vals = s.getRange(2, 1, n, PC.HEADERS_MASTER.length).getValues();
  let changed = 0;
  for (let i = 0; i < vals.length; i++) {
    const r = vals[i];
    const cands = [r[6], r[7], r[5]].filter(e => e);
    if (!cands.length) { r[10] = ''; continue; }
    const nomi = cands.filter(e => !isGenerique_(e));
    const best = nomi.length ? nomi[0] : cands[0];
    if (best !== r[10]) { r[10] = best; changed++; }
  }
  s.getRange(2, 1, n, PC.HEADERS_MASTER.length).setValues(vals);
  journal_('choisirMeilleurEmail', changed + ' email_final améliorés (préférence nominatif). Pense à relancer l\'étape 6 + re-vérifier les emails changés.');
  toast_(changed + ' emails améliorés ✅ (relance l\'étape 6)');
}

/* ============================== 4-5. VÉRIFICATION ============================== */

function exporterEmailsAVerifier() {
  const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PC.MASTER);
  if (!s || s.getLastRow() < 2) { SpreadsheetApp.getUi().alert('master vide.'); return; }
  const n = s.getLastRow() - 1;
  const vals = s.getRange(2, 1, n, PC.HEADERS_MASTER.length).getValues();
  const seen = {};
  const out = [['email', 'ligne_master', 'strategie_actuelle']];
  for (let i = 0; i < vals.length; i++) {
    const e = cleanEmail_(vals[i][10]);
    if (e && !seen[e]) { seen[e] = 1; out.push([e, i + 2, vals[i][16] || '']); }
  }
  const c = getOrCreateSheet_(PC.A_VERIFIER);
  c.clear();
  c.getRange(1, 1, out.length, 3).setValues(out);
  journal_('exporterEmailsAVerifier', (out.length - 1) + ' emails uniques exportés vers ' + PC.A_VERIFIER + '.');
  toast_((out.length - 1) + ' emails à vérifier (onglet ' + PC.A_VERIFIER + ') ✅');
}

function normaliserStatut_(brut) {
  const t = normalizeTxt_(brut);
  if (/deliverable|valid|^ok$|delivre/.test(t)) return 'valid';
  if (/accept.?all|catch.?all|accepte/.test(t)) return 'catch-all';
  if (/risky|risque|unknown|inconnu/.test(t)) return 'catch-all'; // v2 : risky → tester prudemment
  if (/undeliverable|invalid|invalide|^ko$|bounce|inexistant/.test(t)) return 'invalid';
  return '';
}

function importerStatuts() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const v = ss.getSheetByName(PC.VERIF_RESULT);
  if (!v || v.getLastRow() < 2) {
    SpreadsheetApp.getUi().alert('Colle d\'abord les résultats dans ' + PC.VERIF_RESULT + ' : colonne A = email, colonne B = statut brut de l\'outil.');
    getOrCreateSheet_(PC.VERIF_RESULT);
    return;
  }
  const map = {};
  v.getRange(2, 1, v.getLastRow() - 1, 2).getValues().forEach(r => {
    const e = cleanEmail_(r[0]);
    const st = normaliserStatut_(r[1]);
    if (e && st) map[e] = st;
  });
  const s = ss.getSheetByName(PC.MASTER);
  const n = s.getLastRow() - 1;
  const vals = s.getRange(2, 1, n, PC.HEADERS_MASTER.length).getValues();
  const counts = {};
  const sansMatch = [];
  for (let i = 0; i < vals.length; i++) {
    const r = vals[i];
    const e = cleanEmail_(r[10]);
    let st;
    if (!e) st = 'missing';
    else if (map[e]) st = map[e];
    else { st = 'à vérifier'; if (sansMatch.length < 30) sansMatch.push(e); }
    r[15] = st;
    counts[st] = (counts[st] || 0) + 1;
  }
  s.getRange(2, 1, n, PC.HEADERS_MASTER.length).setValues(vals);
  journal_('importerStatuts', JSON.stringify(counts) + ' | Sans correspondance (échantillon) : ' + (sansMatch.join(', ') || 'aucun'));
  toast_('Statuts importés ✅ ' + JSON.stringify(counts));
}

/* ============================== 6. STRATÉGIE + NOTE ============================== */

function isGenerique_(email) {
  const e = cleanEmail_(email);
  const at = e.indexOf('@');
  if (at <= 0) return false;
  const local = e.substring(0, at);
  return PC.GENERIQUES.indexOf(local) !== -1; // match EXACT (constat run 1)
}

function calculerStrategie_(email, statut) {
  email = cleanEmail_(email);
  statut = String(statut || '').toLowerCase();
  if (!email || statut === 'missing') return PC.LABEL_MISSING;
  if (statut === 'invalid') return PC.LABEL_INVALID;
  if (statut === 'catch-all' || statut === 'risky') return PC.LABEL_CATCHALL;
  return isGenerique_(email) ? PC.LABEL_GENERIQUE : PC.LABEL_NOMINATIF;
}

function calculerNote_(o) {
  const P = PC.PTS;
  const strat = String(o.strategie || '');
  const sansEmail = !o.email || /Pas d'email|INVALIDE/.test(strat);
  let base;
  if (/NOMINATIF/.test(strat)) base = P.NOM;
  else if (/GÉNÉRIQUE|GENERIQUE/.test(strat)) base = P.GEN;
  else if (/CATCH-ALL/.test(strat)) base = P.CATCHALL;
  else base = P.AUCUN;
  const site = o.site ? P.SITE_OUI : (sansEmail ? P.SITE_NON_SANS_EMAIL : P.SITE_NON);
  let tel = 0;
  const t = String(o.tel || '').trim();
  if (t) tel = /^(\+33\s*[67]|0[67])/.test(t) ? P.TEL_MOBILE : P.TEL_FIXE;
  const soc = (o.fb || o.insta) ? P.SOCIAL : 0;
  return Math.min(100, base + site + tel + soc + (Number(o.bonus) || 0));
}

function appliquerStrategieEtScore() {
  const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PC.MASTER);
  if (!s || s.getLastRow() < 2) { SpreadsheetApp.getUi().alert('master vide.'); return; }
  const n = s.getLastRow() - 1;
  const vals = s.getRange(2, 1, n, PC.HEADERS_MASTER.length).getValues();
  for (let i = 0; i < vals.length; i++) {
    const r = vals[i];
    const email = cleanEmail_(r[10]);
    r[10] = email;
    if (!email) r[15] = 'missing';
    else if (!String(r[15] || '').trim()) r[15] = 'à vérifier';
    r[16] = calculerStrategie_(email, r[15]);
    r[17] = calculerNote_({ email: email, strategie: r[16], site: String(r[14] || '').trim(),
      tel: r[11], fb: String(r[8] || '').trim(), insta: String(r[9] || '').trim(), bonus: r[19] });
  }
  s.getRange(2, 1, n, PC.HEADERS_MASTER.length).setValues(vals);
  // Tri décroissant sur la note (comme ton fichier run 1)
  s.getRange(2, 1, n, PC.HEADERS_MASTER.length).sort({ column: 18, ascending: false });
  journal_('appliquerStrategieEtScore', n + ' lignes scorées + triées (note décroissante).');
  toast_(n + ' lignes scorées ✅');
}

/* ============================== 7. ONGLETS A/B/C/D/RS… ============================== */

function genererSegments() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const F = PC.MASTER + '!';
  const segs = [
    ['A', 'FILTER(' + F + 'A2:U; REGEXMATCH(' + F + 'Q2:Q; "NOMINATIF"); ' + F + 'O2:O="")'],
    ['B', 'FILTER(' + F + 'A2:U; REGEXMATCH(' + F + 'Q2:Q; "NOMINATIF"); ' + F + 'O2:O<>"")'],
    ['C', 'FILTER(' + F + 'A2:U; REGEXMATCH(' + F + 'Q2:Q; "GÉNÉRIQUE|CATCH-ALL"); ' + F + 'O2:O="")'],
    ['D', 'FILTER(' + F + 'A2:U; REGEXMATCH(' + F + 'Q2:Q; "GÉNÉRIQUE|CATCH-ALL"); ' + F + 'O2:O<>"")'],
    ['RS', 'FILTER(' + F + 'A2:U; REGEXMATCH(' + F + 'Q2:Q; "Pas d\'email|INVALIDE"); (' + F + 'I2:I<>"")+(' + F + 'J2:J<>"")>0)'],
    ['Sans Site', 'FILTER(' + F + 'A2:U; ' + F + 'O2:O="")'],
    ['RS Sans Email & Site', 'FILTER(' + F + 'A2:U; REGEXMATCH(' + F + 'Q2:Q; "Pas d\'email|INVALIDE"); ' + F + 'O2:O=""; (' + F + 'I2:I<>"")+(' + F + 'J2:J<>"")>0)']
  ];
  segs.forEach(sg => {
    const sh = getOrCreateSheet_(sg[0]);
    sh.clear();
    sh.getRange('A1').setFormula('={' + F + 'A1:U1}');
    sh.getRange('A2').setFormula('=SIERREUR(' + sg[1] + '; "— vide —")');
    sh.setFrozenRows(1);
  });
  journal_('genererSegments', 'Onglets A/B/C/D/RS/Sans Site/RS Sans Email & Site créés (FILTER dynamiques sur master).');
  toast_('Onglets créés ✅');
}

/* ============================== 8. AUDIT ============================== */

function auditQualite() {
  const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PC.MASTER);
  if (!s || s.getLastRow() < 2) { SpreadsheetApp.getUi().alert('master vide.'); return; }
  const n = s.getLastRow() - 1;
  const vals = s.getRange(2, 1, n, PC.HEADERS_MASTER.length).getValues();
  const c = { total: n, email: 0, site: 0, tel: 0, mobile: 0, fb: 0, insta: 0, prenom: 0 };
  const statuts = {}, strats = {}, villes = {}, cats = {};
  let sommeNotes = 0, nbNotes = 0;
  vals.forEach(r => {
    if (r[10]) c.email++;
    if (String(r[14] || '').trim()) c.site++;
    const t = String(r[11] || '').trim();
    if (t) { c.tel++; if (/^(\+33\s*[67]|0[67])/.test(t)) c.mobile++; }
    if (String(r[8] || '').trim()) c.fb++;
    if (String(r[9] || '').trim()) c.insta++;
    if (String(r[18] || '').trim()) c.prenom++;
    if (typeof r[17] === 'number') { sommeNotes += r[17]; nbNotes++; }
    const k = (o, v) => { v = String(v || '(vide)'); o[v] = (o[v] || 0) + 1; };
    k(statuts, r[15]); k(strats, r[16]); k(villes, r[4]); k(cats, r[3]);
  });
  const top = o => Object.keys(o).sort((a, b) => o[b] - o[a]).slice(0, 15)
    .map(k => [k, o[k]]);
  const out = [['INDICATEUR', 'VALEUR'],
    ['Lignes', c.total], ['Avec email_final', c.email + ' (' + Math.round(100 * c.email / n) + '%)'],
    ['Avec site', c.site], ['Sans site (angle CRÉATION)', n - c.site],
    ['Avec tél', c.tel], ['Tél mobile', c.mobile], ['Avec Facebook', c.fb],
    ['Avec Instagram', c.insta], ['Avec prénom dirigeant', c.prenom],
    ['Note moyenne', nbNotes ? (sommeNotes / nbNotes).toFixed(1) : '—'],
    [], ['TOP STATUTS', 'NB'], ...top(statuts),
    [], ['TOP STRATÉGIES', 'NB'], ...top(strats),
    [], ['TOP VILLES', 'NB'], ...top(villes),
    [], ['TOP CATÉGORIES', 'NB'], ...top(cats)];
  const st = getOrCreateSheet_(PC.STATS);
  st.clear();
  st.getRange(1, 1, out.length, 2).setValues(out);
  journal_('auditQualite', 'Audit écrit dans _stats (' + n + ' lignes).');
  toast_('Audit terminé → onglet _stats ✅');
}

/* ============================== FACEBOOK ============================== */

function cleanFbUrl_(u) {
  u = String(u || '').trim();
  if (!u) return '';
  u = u.replace(/^http:\/\//i, 'https://');
  if (/^facebook\.com/i.test(u)) u = 'https://www.' + u;
  if (/^www\.facebook\.com/i.test(u)) u = 'https://' + u;
  u = u.replace(/^https:\/\/m\.facebook\.com/i, 'https://www.facebook.com');
  u = u.split('?')[0].split('#')[0];
  if (u.length > 8 && u.charAt(u.length - 1) === '/') u = u.slice(0, -1);
  return u.toLowerCase();
}

function normaliserUrlsFacebook() {
  const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PC.MASTER);
  if (!s || s.getLastRow() < 2) { SpreadsheetApp.getUi().alert('master vide.'); return; }
  const n = s.getLastRow() - 1;
  const vals = s.getRange(2, 1, n, PC.HEADERS_MASTER.length).getValues();
  const seen = {};
  const out = [['fb_url_clean', 'ligne_master', 'nom_entreprise']];
  vals.forEach((r, i) => {
    if (cleanEmail_(r[10])) return; // déjà un email → pas besoin de FB
    const fb = cleanFbUrl_(r[8]);
    if (fb && !seen[fb]) { seen[fb] = 1; out.push([fb, i + 2, r[0]]); }
  });
  const c = getOrCreateSheet_(PC.FB_URLS);
  c.clear();
  c.getRange(1, 1, out.length, 3).setValues(out);
  journal_('normaliserUrlsFacebook', (out.length - 1) + ' URLs FB uniques sans email → ' + PC.FB_URLS + ' (à coller dans apify/facebook-pages-scraper).');
  toast_((out.length - 1) + ' URLs FB à scraper ✅');
}

function fusionnerEmailsFB() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const f = ss.getSheetByName(PC.FB_RESULT);
  if (!f || f.getLastRow() < 2) {
    SpreadsheetApp.getUi().alert('Colle d\'abord l\'export FB dans l\'onglet ' + PC.FB_RESULT + ' : colonne A = URL page, colonne B = email trouvé.');
    getOrCreateSheet_(PC.FB_RESULT);
    return;
  }
  const map = {};
  f.getRange(2, 1, f.getLastRow() - 1, 2).getValues().forEach(r => {
    const u = cleanFbUrl_(r[0]);
    const e = cleanEmail_(r[1]);
    if (u && e && PC.EMAIL_OK.test(e) && !PC.POUBELLE_AUTO.test(e)) map[u] = e;
  });
  const s = ss.getSheetByName(PC.MASTER);
  const n = s.getLastRow() - 1;
  const vals = s.getRange(2, 1, n, PC.HEADERS_MASTER.length).getValues();
  let n2 = 0;
  vals.forEach(r => {
    if (cleanEmail_(r[10])) return;
    const hit = map[cleanFbUrl_(r[8])];
    if (hit) { r[5] = hit; r[10] = r[6] || r[7] || hit; n2++; }
  });
  s.getRange(2, 1, n, PC.HEADERS_MASTER.length).setValues(vals);
  journal_('fusionnerEmailsFB', n2 + ' emails FB fusionnés (col F + email_final). Pense à relancer l\'étape 6.');
  toast_(n2 + ' emails FB fusionnés ✅ (relance l\'étape 6)');
}

/* ============================== GOUV (PRÉNOMS) ============================== */

function cleanNomGouv_(nom) {
  return String(nom || '')
    .replace(/\b(sarl|sas|sasu|eurl|sci|selas|selarl|ei|eirl|sa|me|dr|maitre|notaire|avocat|cabinet|agence|garage|dentiste|docteur|pr|clinique|studio|atelier)\b/gi, '')
    .replace(/["«»,|/\\\-–—]/g, ' ').replace(/\s+/g, ' ').trim();
}

function capitaliser_(p) {
  p = String(p || '').trim().split(/[\s\-]+/)[0] || '';
  p = p.toLowerCase();
  return p.charAt(0).toUpperCase() + p.slice(1);
}

function fetchGouv_(nom, ville) {
  const q = encodeURIComponent(cleanNomGouv_(nom) + ' ' + String(ville || ''));
  const url = 'https://recherche-entreprises.api.gouv.fr/search?q=' + q + '&per_page=5&etat_administratif=A';
  try {
    const res = UrlFetchApp.fetch(url, { muteHttpExceptions: true, headers: { Accept: 'application/json' } });
    const code = res.getResponseCode();
    if (code === 429 || code === 502 || code === 503) return { stop: true, raison: 'API saturée/maintenance (HTTP ' + code + ')' };
    if (code !== 200) return { stop: false, prenom: '', siren: '', note: 'HTTP ' + code };
    const json = JSON.parse(res.getContentText());
    const results = (json && json.results) || [];
    if (!results.length) return { stop: false, prenom: '', siren: '', note: 'aucun résultat' };
    // Préfère un résultat dont la commune matche la ville (anti-homonymes)
    const villeN = normalizeTxt_(ville).replace(/[^a-z]/g, '');
    let ent = results[0], matche = false;
    for (const r2 of results) {
      const com = normalizeTxt_(((r2.siege || {}).commune) || '').replace(/[^a-z]/g, '');
      if (com && villeN && (com.indexOf(villeN) !== -1 || villeN.indexOf(com) !== -1)) { ent = r2; matche = true; break; }
    }
    const siren = ent.siren || '';
    const dirigeants = ent.dirigeants || [];
    for (const d of dirigeants) {
      if (d.siren) continue; // personne morale → skip
      const p = d.prenoms || d.prenom || '';
      if (p) return { stop: false, prenom: capitaliser_(p), siren: siren, note: matche ? '' : 'ville non vérifiée' };
    }
    // Fallback : 1er mot du nom_complet (souvent le prénom pour les EI)
    if (ent.nom_complet) {
      const mots = String(ent.nom_complet).trim().split(/\s+/);
      if (mots.length > 1 && !/\d/.test(mots[0])) {
        return { stop: false, prenom: capitaliser_(mots[0]) + ' ~', siren: siren, note: 'incertain (nom_complet)' };
      }
    }
    return { stop: false, prenom: '', siren: siren, note: dirigeants.length ? 'dirigeants non exploitables' : 'pas de dirigeants renvoyés' };
  } catch (e) {
    return { stop: false, prenom: '', siren: '', note: 'erreur: ' + e };
  }
}

function enrichirPrenomsGouv() {
  const start = Date.now();
  const props = PropertiesService.getScriptProperties();
  const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PC.MASTER);
  if (!s || s.getLastRow() < 2) { SpreadsheetApp.getUi().alert('master vide.'); return; }
  const n = s.getLastRow() - 1;
  let row = Number(props.getProperty('PC_GOV_ROW') || 2);
  if (row < 2 || row > n + 1) row = 2;
  const vals = s.getRange(2, 1, n, PC.HEADERS_MASTER.length).getValues();
  let traites = 0, trouves = 0, arret = '';
  for (let i = row - 2; i < vals.length; i++) {
    if (timeUp_(start, 5) || traites >= 150) { arret = 'lot terminé (limite temps/volume)'; break; }
    const r = vals[i];
    if (String(r[18] || '').trim()) continue; // déjà enrichi → skip
    if (!String(r[0] || '').trim()) continue;
    const res = fetchGouv_(r[0], r[4]);
    traites++;
    if (res.stop) { arret = res.raison; break; }
    if (res.prenom) { r[18] = res.prenom; trouves++; }
    if (res.siren) r[20] = res.siren;
    Utilities.sleep(200);
    if (traites % 20 === 0) s.getRange(2, 1, n, PC.HEADERS_MASTER.length).setValues(vals); // sauvegarde intermédiaire
    row = i + 3;
  }
  s.getRange(2, 1, n, PC.HEADERS_MASTER.length).setValues(vals);
  props.setProperty('PC_GOV_ROW', String(row));
  const fini = row > n + 1;
  if (fini) { props.deleteProperty('PC_GOV_ROW'); arreterDeclencheurGouv(); }
  journal_('enrichirPrenomsGouv', traites + ' lignes traitées, ' + trouves + ' prénoms trouvés. ' + (fini ? 'TERMINÉ ✅' : 'Prochaine reprise ligne ' + row + ' (' + arret + ').'));
  toast_(fini ? 'Enrichissement terminé ✅' : trouves + ' prénoms ce lot — relance pour continuer (ligne ' + row + ')');
}

function installerDeclencheurGouv() {
  arreterDeclencheurGouv();
  ScriptApp.newTrigger('enrichirPrenomsGouv').timeBased().everyMinutes(10).create();
  toast_('Déclencheur installé : 1 lot toutes les 10 min ✅');
  journal_('installerDeclencheurGouv', 'Trigger everyMinutes(10) installé.');
}

function arreterDeclencheurGouv() {
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'enrichirPrenomsGouv') ScriptApp.deleteTrigger(t);
  });
}
```

*(Le même script est aussi dans le fichier `Code.gs` à part, pour copier-coller facilement.)*

### 2.3 Ce que fait chaque fonction (résumé)

| Menu | Fonction | Effet |
|---|---|---|
| 0 | `creerStructureMaster` | Crée `master` avec les 21 colonnes + format `100 / 100` |
| 1 | `assemblerBrut` | Fusionne les `brut_*` → `master`, dédup `place_id` (garde la ligne la plus riche) |
| 2 | `extraireIdsEtNoms` | `place_id` + `nom_entreprise` depuis les URL (ne touche jamais aux noms déjà remplis) |
| 3 | `nettoyerEmails` | Minuscules, formats, poubelle auto, doublons, `email_final`, nettoyage UTM |
| 4 | `exporterEmailsAVerifier` | Emails uniques → `_A_VERIFIER` |
| 5 | `importerStatuts` | `_VERIF_RESULT` (A=email, B=statut) → `email_status`, insensible à la casse |
| 6 | `appliquerStrategieEtScore` | Labels Stratégie + Note Lead + tri décroissant |
| 7 | `genererSegments` | Crée `A`, `B`, `C`, `D`, `RS`, `Sans Site`, `RS Sans Email & Site` (formules FILTER) |
| 8 | `auditQualite` | Stats dans `_stats` (taux emails, tops villes/catégories…) |
| FB | `normaliserUrlsFacebook` / `fusionnerEmailsFB` | Liste à scraper → `_FB_URLS`, fusion → col F |
| Gouv | `enrichirPrenomsGouv` (+ déclencheur) | Prénoms par lots de 150 avec reprise auto |

---

## 3. ASSEMBLAGE & NETTOYAGE (dans le Sheet)

### 3.1 Importe tes 5 exports
1. Chaque `dataset_<ville>.json` → convertis en CSV (ex. avec un convertisseur JSON→CSV en ligne,
   ou utilise l'export CSV d'Apify en backup) → importe dans un onglet **`brut_<ville>`**
   (Fichier → Importer → remplace l'onglet). 5 bruts = 5 onglets.
2. Ne touche plus jamais aux `brut_*` (ils restent intacts = ta preuve).

### 3.2 Lance le menu dans l'ordre
`0. Créer la structure master` → `1. Assembler` → `2. Extraire ids/noms` → `3. Nettoyer emails`.
Puis **lis l'onglet `_logs`** : il te dit tout (doublons fusionnés, emails supprimés, lignes à contrôler).

### 3.3 Structure `master` recréée (21 colonnes = tes 19 + 2 bonus)

```
A nom_entreprise · B place_id · C address · D categoryName · E city ·
F email_fb · G emails/0 · H emails/1 · I facebook/0 · J instagrams/0 ·
K email_final · L phone · M street · N maps · O website ·
P email_status · Q Stratégie Email · R Note Lead (/100) ·
S prenom_dirigeant · T Bonus manuel (+2, optionnel) · U siren (+2, optionnel)
```

Transformations auto : `facebooks/0` → `facebook/0`, `url` → `maps`,
abandon de `linkedIns/0`, `countryCode`… (conservés dans les bruts).

### 3.4 Ta question sur la colonne F (réponse simple)
Sur ta capture, après `city` (colonne E) et avant `emails/0`, il y a une **colonne F vide sans titre**.
Au run 1 elle n'a jamais servi. Au run 2, le script s'en sert pour **`email_fb`**
(= les emails trouvés via Facebook, §4). Mystère résolu, zéro action requise. ✅

### 3.5 Règles de nettoyage (dans le script, rappel)
- **Supprimés d'office** : `utilisateur@`, `test@`, `exemple@`, `example.`, `nomdedomaine`,
  `domaine.com`, `domain.com`, `monsite.fr`, formats invalides.
- **Signalés dans `_logs` (gardés, à contrôler)** : `yespark`, `doctolib`, `linkeo`, `almapay`,
  `pagesjaunes`, `sante.fr` (= souvent l'email du prestataire/plateforme, pas du prospect).
  ⚠️ Au run 1, `renault`/`linkeo` étaient supprimés d'office — trop agressif, corrigé.
- **Sites plateforme** (`doctolib.fr`, `planity.com`…) signalés : ce ne sont pas des vrais sites.
- **Hors-cible** (`Parking`, mairies…) : repère-les via `_stats` (top catégories) et supprime-les.

---

## 4. ENRICHISSEMENTS (dans l'ordre : FB → Hunter → Gouv)

> ⚠️ Toujours AVANT la vérification (§5), sinon tu paies la vérif 2 fois.

### 4.1 Facebook (optionnel, ~2 € — jamais fait au run 1)
1. Menu → `FB : lister URLs sans email` → onglet `_FB_URLS`.
2. Apify → **`apify/facebook-pages-scraper`** : colle les URLs, proxy **Residential France**, langue `fr-FR`, lance.
3. Export → colle `URL | email` dans l'onglet **`FB`** (A = URL, B = email).
4. Menu → `FB : fusionner emails trouvés` → remplit la col F + `email_final`, puis relance l'étape 6.

### 4.2 Hunter.io (optionnel — top leads sans email + AVEC site pro)
1. Hunter → **Domain Search** : 1 domaine du site (jamais sur `@gmail`).
2. Filtres : fiabilité ≥ 75, `Personal` d'abord, statut `Valid`.
3. ⚠️ **Contrôle obligatoire** : Hunter se trompe souvent d'entité — le domaine doit évoquer le NOM + ville FR, sinon jeter.
4. Colle les emails retenus en **col F** (ou H si F prise par FB).
Gratuit ~25 recherches/mois, sinon ~30 €/mois.

### 4.3 API Gouv — prénoms dirigeants (gratuit, jamais abouti au run 1)
1. Menu → `Gouv : enrichir prénoms` → traite un lot de ~150 → **reclique** jusqu'à la fin
   (ou `installer déclencheur auto` : 1 lot / 10 min, s'arrête seul).
2. Remplit `prenom_dirigeant` (S) + `siren` (U). `~` = incertain → ne pas utiliser en publipostage.
3. Rendement attendu : 30-60 % (nul sur filiales de groupes). **Un mauvais prénom est pire que pas de prénom.**

---

## 5. VÉRIFICATION DES EMAILS (~5-12 € — jamais faite au run 1 ⚠️)

> Conséquence directe de ta réponse : dans ton fichier actuel, **`valid` = juste « email présent »**,
> PAS « délivrable ». Au run 2, on vérifie pour de vrai :

1. Menu → `4. Exporter emails à vérifier` → onglet `_A_VERIFIER` (uniques, minuscules).
2. Colle dans **Bouncer** (ou ZeroBounce / MillionVerifier le moins cher) → lance.
3. Colle les résultats dans `_VERIF_RESULT` : **A = email, B = statut brut**.
4. Menu → `5. Importer statuts` → normalisation auto :

| Statut outil | → `email_status` | Conduite |
|---|---|---|
| deliverable / valid | `valid` | ✅ envoi normal |
| accept-all / catch-all / risky / unknown | `catch-all` | ⚠️ petit volume, surveille rebonds |
| undeliverable / invalid | `invalid` | ⛔ jamais d'email (bascule call/RS) |
| (pas d'email) | `missing` | 📞 call / RS / archive |
| (introuvable) | `à vérifier` | 🔁 revérifier |

5. **On ne supprime plus les `invalid`** (nouveauté v2) : une ligne `invalid` + tél + sans site
   reste un lead call à ~71/100. On route, on ne jette plus.

---

## 6. SCORING + ONGLETS (tes labels exacts + tes 8 onglets)

### 6.1 Labels Stratégie (Q) — tes textes exacts

| Label | Quand |
|---|---|
| `🎯 NOMINATIF \| Décideur direct \| Pitch direct \| Taux : 35-50%` | Email OK, partie locale non générique |
| `🚪 GÉNÉRIQUE \| Intermédiaire \| Passage barrage \| Taux : 15-25%` | Email OK, partie locale **exactement** générique |
| `— (Pas d'email valide)` | Pas d'email |
| `⚠️ CATCH-ALL \| À tester \| Taux : 20-30%` *(v2)* | `catch-all` |
| `⛔ INVALIDE \| Ne pas envoyer` *(v2)* | `invalid` |

Liste générique (match **exact** — prouvé : `contact@`→GEN mais `contact.atmosphereby@`→NOM) :
`contact, info, accueil, direction, commercial, devis, agence, secretariat`
+ `hello, bonjour, equipe, team, sales, support, sav, facture, facturation, compta, admin, reservation, reservations, rdv, recrutement, rh, presse`.

### 6.2 Note Lead (R) — barème prouvé sur ton fichier

```
Note = MIN(100 ; Base + Site + Tél + Social + BonusManuel)
Base   : NOMINATIF 60 · GÉNÉRIQUE 48 · CATCH-ALL 45 · sans email 10
Site   : présent 5 · absent+email 25 · absent+SANS email 50 (branche cold-call 🔥)
Tél    : mobile 06/07 → 15 · fixe → 6 · absent → 0
Social : FB ou Insta présent → +5 · Bonus manuel (col T) : défaut 0
```

**Preuves** (reproduit tes scores) : nominatif+mobile+sans site+FB = 105→**100** ✅ ;
nominatif+mobile+site+RS = **85** ✅ (×13 lignes) ; générique+mobile+site+RS = **73** ✅ ;
nominatif+fixe+site = **71** ✅ ; **sans email**+fixe+sans site+FB = 10+50+6+5 = **71** ✅ (cas Hivelin) ;
sans email+sans tél+site+Insta = **20** ✅ ; sans email+sans tél+site = **15** ✅.
2 lignes à 86 au lieu de 96 (Garage Anjou, Scoobidoo) → mets `Bonus manuel = -10`
ou dis-moi ce qu'elles ont de spécial (voir §10).

### 6.3 Formules (si tu préfères les formules au script — Sheets FR, séparateur `;`)

**B2 place_id :** `=SIERREUR(REGEXEXTRACT(N2;"query_place_id=([^&]+)");"")`

**K2 email_final :** `=SIERREUR(MINUSCULE(SUBSTITUE(SUPPRESPACE(SI(G2<>"";G2;SI(H2<>"";H2;F2)));" ";""));"")`

**P2 statut :** `=SI(K2="";"missing";SIERREUR(RECHERCHEV(K2;_VERIF_RESULT!A:B;2;FAUX);"à vérifier"))`

**Q2 stratégie :**
```
=SI(OU(K2="";P2="missing");"— (Pas d'email valide)";
 SI(P2="invalid";"⛔ INVALIDE | Ne pas envoyer";
 SI(OU(P2="catch-all";P2="risky");"⚠️ CATCH-ALL | À tester | Taux : 20-30%";
 SI(REGEXMATCH(MINUSCULE(SIERREUR(GAUCHE(K2;TROUVE("@";K2)-1);"¤")); "^(contact|info|accueil|direction|commercial|devis|agence|secretariat|hello|bonjour|equipe|team|sales|support|sav|facture|facturation|compta|admin|reservation|reservations|rdv|recrutement|rh|presse)$");
 "🚪 GÉNÉRIQUE | Intermédiaire | Passage barrage | Taux : 15-25%";
 "🎯 NOMINATIF | Décideur direct | Pitch direct | Taux : 35-50%"))))
```

**R2 note :**
```
=MIN(100;
 SI(REGEXMATCH(Q2;"NOMINATIF");60;SI(REGEXMATCH(Q2;"GÉNÉRIQUE");48;SI(REGEXMATCH(Q2;"CATCH-ALL");45;10)))
 +SI(O2="";SI(OU(K2="";REGEXMATCH(Q2;"Pas d'email|INVALIDE"));50;25);5)
 +SI(L2="";0;SI(REGEXMATCH(L2;"^(\+33\s*[67]|0[67])");15;6))
 +SI(OU(I2<>"";J2<>"");5;0)
 +SI(T2="";0;T2))
```
+ format perso sur R : `0" / 100"`.

### 6.4 Tes 8 onglets recréés (le script le fait en 1 clic : étape 7)

| Onglet | Contenu | Angle |
|---|---|---|
| `master` | Tout, trié note ↓ | — |
| `A` | Nominatif + **sans site** | 🥇 Création (priorité 1) |
| `B` | Nominatif + site | Refonte chaude |
| `C` | Générique/Catch-all + sans site | 🥈 Création |
| `D` | Générique/Catch-all + site | Refonte tiède |
| `RS` | Pas d'email + FB/Insta | DM manuel |
| `FB` | Import brut apify/facebook-pages-scraper | — |
| `Sans Site` | Tous sans site (email ou pas) | Création |
| `RS Sans Email & Site` | Pas d'email + sans site + RS | DM création |

Formules posées par le script (A1 = `={master!A1:U1}`, A2 = filtre) :
```
A : =SIERREUR(FILTER(master!A2:U; REGEXMATCH(master!Q2:Q;"NOMINATIF"); master!O2:O="");"— vide —")
B : =SIERREUR(FILTER(master!A2:U; REGEXMATCH(master!Q2:Q;"NOMINATIF"); master!O2:O<>"");"— vide —")
C : =SIERREUR(FILTER(master!A2:U; REGEXMATCH(master!Q2:Q;"GÉNÉRIQUE|CATCH-ALL"); master!O2:O="");"— vide —")
D : =SIERREUR(FILTER(master!A2:U; REGEXMATCH(master!Q2:Q;"GÉNÉRIQUE|CATCH-ALL"); master!O2:O<>"");"— vide —")
RS : =SIERREUR(FILTER(master!A2:U; REGEXMATCH(master!Q2:Q;"Pas d'email|INVALIDE"); (master!I2:I<>"")+(master!J2:J<>"")>0);"— vide —")
Sans Site : =SIERREUR(FILTER(master!A2:U; master!O2:O="");"— vide —")
RS Sans Email & Site : =SIERREUR(FILTER(master!A2:U; REGEXMATCH(master!Q2:Q;"Pas d'email|INVALIDE"); master!O2:O=""; (master!I2:I<>"")+(master!J2:J<>"")>0);"— vide —")
BONUS cold-call (nouvel onglet CALL si tu veux) : =SIERREUR(FILTER(master!A2:U; REGEXMATCH(master!Q2:Q;"Pas d'email|INVALIDE"); master!L2:L<>"");"— vide —")
```

---

## 7. WARMUP & ENVOI (récupéré à 100 % — mais jamais démarré)

### 7.1 Plateformes
Amazon SES (200/j, volume pas cher) · Gmail+GMass (150/j, emails « humains ») ·
Outlook (300/j, gare aux bans) · Brevo `pixelcraft.email` (275/j, principale). **Total max : 925/j.**

### 7.2 DNS obligatoires AVANT J1
SPF + DKIM + DMARC sur chaque plateforme (sinon = spam). Idéal : sous-domaine dédié
(ex. `send.pixelcraft.email`). Valide avec mail-tester (vise 9-10/10).
⚠️ Gmail **perso** = pas de DKIM → petits volumes « humains » uniquement.

### 7.3 Planning J1→J42 (ton tableau intégral — CSV aussi dans `annexes/warmup-J1-J42.csv`)

| Jour | SES | Gmail+GMass | Outlook | Brevo | Total | Cumul |
|---|---|---|---|---|---|---|
| Max | 200 | 150 | 300 | 275 | 925 | — |
| J1 | 0 | 10 | 10 | 0 | 20 | 20 |
| J2 | 0 | 15 | 15 | 0 | 30 | 50 |
| J3 | 0 | 20 | 20 | 0 | 40 | 90 |
| J4 | 0 | 30 | 30 | 5 | 65 | 155 |
| J5 | 0 | 35 | 35 | 5 | 75 | 230 |
| J6 | 0 | 40 | 40 | 5 | 85 | 315 |
| J7 | 5 | 50 | 50 | 10 | 115 | 430 |
| J8 | 5 | 55 | 55 | 15 | 130 | 560 |
| J9 | 10 | 60 | 60 | 15 | 145 | 705 |
| J10 | 15 | 65 | 65 | 15 | 160 | 865 |
| J11 | 20 | 70 | 70 | 20 | 180 | 1045 |
| J12 | 25 | 75 | 75 | 25 | 200 | 1245 |
| J13 | 25 | 80 | 80 | 25 | 210 | 1455 |
| J14 | 25 | 85 | 85 | 25 | 220 | 1675 |
| J15 | 30 | 90 | 90 | 30 | 240 | 1915 |
| J16 | 35 | 95 | 95 | 35 | 260 | 2175 |
| J17 | 40 | 100 | 100 | 40 | 280 | 2455 |
| J18 | 45 | 110 | 110 | 45 | 310 | 2765 |
| J19 | 50 | 115 | 115 | 50 | 330 | 3095 |
| J20 | 55 | 120 | 120 | 55 | 350 | 3445 |
| J21 | 60 | 125 | 125 | 60 | 370 | 3815 |
| J22 | 65 | 130 | 130 | 65 | 390 | 4205 |
| J23 | 70 | 135 | 135 | 70 | 410 | 4615 |
| J24 | 80 | 140 | 140 | 80 | 440 | 5055 |
| J25 | 90 | 145 | 145 | 90 | 470 | 5525 |
| J26 | 100 | 150 | 150 | 100 | 500 | 6025 |
| J27 | 110 | 150 | 155 | 110 | 525 | 6550 |
| J28 | 120 | 150 | 160 | 120 | 550 | 7100 |
| J29 | 130 | 150 | 165 | 130 | 575 | 7675 |
| J30 | 140 | 150 | 170 | 140 | 600 | 8275 |
| J31 | 150 | 150 | 175 | 150 | 625 | 8900 |
| J32 | 160 | 150 | 180 | 160 | 650 | 9550 |
| J33 | 180 | 150 | 185 | 180 | 695 | 10245 |
| J34 | 200 | 150 | 190 | 200 | 740 | 10985 |
| J35 | 200 | 150 | 195 | 220 | 765 | 11750 |
| J36 | 200 | 150 | 200 | 240 | 790 | 12540 |
| J37 | 200 | 150 | 220 | 260 | 830 | 13370 |
| J38 | 200 | 150 | 240 | 275 | 865 | 14235 |
| J39 | 200 | 150 | 260 | 275 | 885 | 15120 |
| J40 | 200 | 150 | 280 | 275 | 905 | 16025 |
| J41 | 200 | 150 | 300 | 275 | 925 | 16950 |
| J42 | 200 | 150 | 300 | 275 | 925 | — |

**Mode d'emploi** : renseigne la date de début (= J1, c'est ce qui manquait !).
Warmup = emails d'engagement (pool type lemwarm), PAS de prospection avant ~J21.
Stop si : rebonds > 3 %, spam > 0,1 %, compte restreint (surtout Outlook/Gmail).

### 7.4 Campagne
J1→J21 : warmup + données (§1→§6). J21→J42 : onglet **A** en premier (~100-200/j).
J42+ : A → C → B → D à plein régime (~700 × 3 relances ≈ 3-4 jours).
`RS`/`RS Sans Email & Site` en DM manuel en parallèle.

### 7.5 Légal France (B2B)
Email B2B OK (intérêt légitime, lien avec la fonction) + **désinscription + identité** obligatoires.
**SMS/WhatsApp à froid = consentement préalable obligatoire** → uniquement en suivi post-échange.
Conservation prospects 3 ans max.

---

## 8. CHECKLIST EXPRESS

- [ ] DNS + date de début warmup (J1) → suivre le tableau §7.3
- [ ] 5 runs Apify (§1) → exports JSON → 5 onglets `brut_*`
- [ ] Script installé (§2) → menu 0→3 → lire `_logs`
- [ ] Enrichissements (§4 : FB optionnel → Hunter → Gouv)
- [ ] Vérification (§5 : export → Bouncer → import)
- [ ] Menu 6 → 7 → 8 (§6 : scoring, onglets, audit)
- [ ] Campagne A → C → B → D + DM + calls (§7)

## 9. NE PLUS JAMAIS PERDRE LES SCRIPTS 🎯
1. Apps Script → Fichier → **Télécharger** (garde le `.gs` avec ce guide).
2. Fichier → **Créer une copie** du Sheet (`maps_run2_AAAA-MM-JJ`) à chaque étape clé.
3. Ce guide + `Code.gs` sont versionnés : ne les modifie que par copies.

## 10. Dernières questions (pour affiner à 100 %)
1. **Colonne F** : expliquée au §3.4 (jamais servie au run 1, utilisée pour `email_fb` au run 2). Rien à faire ✅.
2. **Onglets `B`, `C`, `D`, `FB`** : que contiennent-ils chez toi (filtres auto ou valeurs collées ?) ?
   Envoie-moi la formule en A2 (ou une capture) et j'aligne le guide à l'identique.
3. **Garage Anjou / Scoobidoo à 86** : retouche manuelle ou normale ? (voir §6.2)
4. **Anciens scripts** : vérifie **Extensions → Apps Script** dans `maps` (§0) — s'ils y sont, envoie-les moi.

---

## §3 — `01-scraping-apify-maps.md`

# 01 — Scraping Google Maps (Apify)

## Acteur à utiliser

**`compass/crawler-google-places`** (ex-filiale Apify Google Maps).
C'est l'acteur de référence pour ce type d'export (colonnes `emails/0`, `facebooks/0`, `url` avec `query_place_id`).

## Les 5 villes (retrouvées dans ton fichier final)

| # | `locationQuery` | Fichier d'input |
|---|---|---|
| 1 | `Boulogne-Billancourt, France` | template (voir plus bas) |
| 2 | `Versailles, France` | template |
| 3 | `Saint-Germain-en-Laye, France` | template |
| 4 | `Saint-Maur-des-Fossés, France` | template |
| 5 | `Vincennes, France` | `apify-maps-vincennes.json` ✅ fourni tel quel |

👉 Pour les villes 1→4 : copier `apify-maps-TEMPLATE.json`, remplacer `__VILLE__` par la ville.
Le template est identique au JSON Vincennes **à 1 différence près** : `instagrams: true`
(ton final contient des `instagrams/0`, donc un run les avait activés — autant tous les activer).

## Les 23 requêtes (dans `searchStringsArray`, ne pas modifier l'ordre)

```
Entreprise générale du bâtiment / Entreprise de rénovation intérieure / Architecte d'intérieur /
Cabinet d'avocat / Expert-comptable / Courtier immobilier / Courtier en crédit /
Cabinet de gestion de patrimoine / Agence immobilière / Notaire / Chirurgien esthétique /
Dentiste / Ostéopathe / Clinique vétérinaire / Institut de beauté / Psychologue /
Salon de coiffure / Photographe / Garage automobile / Auto-école / Ophtalmologue /
Salle de sport / Paysagiste
```

## Paramètres clés expliqués

| Paramètre | Valeur | Pourquoi |
|---|---|---|
| `maxCrawledPlacesPerSearch` | `35` | 23 × 35 = **805 lieux max / ville** avant dédup |
| `scrapeContacts` | `true` | ⭐ LE paramètre : va chercher emails + réseaux sociaux sur les **sites web** des fiches |
| `scrapeSocialMediaProfiles.facebooks` | `true` | URLs Facebook (colonne `facebooks/0`) |
| `scrapeSocialMediaProfiles.instagrams` | `true` (v2) | URLs Instagram (`instagrams/0`) |
| `website` | `allPlaces` | Récupère le site web de chaque fiche (vide si aucun → signal « pas de site » 💰) |
| `skipClosedPlaces` | `true` | Ignore les établissements fermés |
| `scrapePlaceDetailPage` | `false` | Détail Maps inutile (cher) : on a déjà adresse/tél/site |
| `maxReviews` / `maxImages` | `0` | Pas besoin (économies) — voir note avis plus bas |
| `searchMatching` | `all` | ⚠️ Matching large → **résultats hors-cible** (ex. un `Parking` retrouvé dans ton final !) → filtrer après (voir `02`) |
| `language` | `fr` | Résultats FR |
| `maximumLeadsEnrichmentRecords` | `0` | Enrichissement leads Apify désactivé (cher, pas utilisé au run 1) |

## Lancement (pas-à-pas)

1. Apify → Actors → `compass/crawler-google-places` → onglet **Input (JSON)**.
2. Coller le JSON de la ville → **Save** → **Start**.
3. Durée indicative : ~20-60 min / ville.
4. **Plafond anti-surprise** : dans les settings du run, mets une limite de dépense (ex. 8 $/run).
5. Répéter pour les 5 villes (tu peux lancer les 5 runs en parallèle).

## Export (⚠️ important : PAS en XLSX)

Constat run 1 : l'export XLSX peut **omettre des colonnes** (`title`, `placeId` manquaient dans `maps.xlsx`).

1. Run terminé → **Dataset** → **Export** → format **JSON** ✅ (garde TOUT : `title`, `placeId`, `emails[]`, `facebooks[]`, `instagram[]`, `phone`, `website`, `url`, `totalScore`, `reviewsCount`, `address`, `city`...).
2. Nomme : `dataset_<ville>_<AAAA-MM-JJ>.json`.
3. (Optionnel) exporte aussi en **CSV** en backup.

## Volumes & coûts attendus (basés sur ton run 1)

| Métrique | Run 1 (tes chiffres) | À quoi t'attendre run 2 |
|---|---|---|
| Lieux bruts (5 villes) | ~2 840 (après dédup ?) | ~2 500-4 000 bruts → ~1 700-2 800 après dédup `place_id` |
| Emails bruts (`scrapeContacts`) | ~755 (~26 % des fiches) | 20-30 % des fiches (dépend des catégories) |
| Coût Apify Maps | **~24 €** les 5 villes (~5 €/ville) | Idem (même input) |

## 💡 Améliorations v2 (optionnelles, à coût quasi nul)

- **Avis Google** : si tu veux vendre l'offre « Avis Google Maps », mets `maxReviews: 1` (juste pour avoir `totalScore` + `reviewsCount` — en fait ces 2 champs viennent même à `0` dans le JSON, vérifie sur 1 run test avant de payer des reviews).
- **Horaires / `searchMatching`** : si trop de hors-cible, teste `searchMatching: "direct"` sur 1 ville et compare.
- **LinkedIn** : ton brut contenait des `linkedIns/0` (abandonnés ensuite). Si tu veux les garder : active l'option équivalente dans l'UI du run (case à cocher réseaux sociaux) — ne bricole pas le JSON avec des clés inconnues.
- **Doublons inter-villes** (ex. Paris qui déborde) : la dédup `place_id` dans `02` gère ça.

---

## §4 — `apify-maps-vincennes.json`

```json
{
  "enableCompetitorAnalysis": false,
  "includeWebResults": false,
  "language": "fr",
  "locationQuery": "Vincennes, France",
  "maxCrawledPlacesPerSearch": 35,
  "maxImages": 0,
  "maxReviews": 0,
  "maximumLeadsEnrichmentRecords": 0,
  "scrapeContacts": true,
  "scrapeDirectories": false,
  "scrapeImageAuthors": false,
  "scrapeOrderOnline": false,
  "scrapePlaceDetailPage": false,
  "scrapeReviewsPersonalData": false,
  "scrapeSocialMediaProfiles": {
    "facebooks": true,
    "instagrams": false,
    "tiktoks": false,
    "twitters": false,
    "youtubes": false
  },
  "scrapeTableReservationProvider": false,
  "searchStringsArray": [
    "Entreprise générale du bâtiment",
    "Entreprise de rénovation intérieure",
    "Architecte d'intérieur",
    "Cabinet d'avocat",
    "Expert-comptable",
    "Courtier immobilier",
    "Courtier en crédit",
    "Cabinet de gestion de patrimoine",
    "Agence immobilière",
    "Notaire",
    "Chirurgien esthétique",
    "Dentiste",
    "Ostéopathe",
    "Clinique vétérinaire",
    "Institut de beauté",
    "Psychologue",
    "Salon de coiffure",
    "Photographe",
    "Garage automobile",
    "Auto-école",
    "Ophtalmologue",
    "Salle de sport",
    "Paysagiste"
  ],
  "skipClosedPlaces": true,
  "verifyLeadsEnrichmentEmails": false,
  "website": "allPlaces",
  "searchMatching": "all",
  "placeMinimumStars": "",
  "maxQuestions": 0,
  "reviewsSort": "newest",
  "reviewsFilterString": "",
  "reviewsOrigin": "all",
  "maxCompetitorsToAnalyze": 30,
  "allPlacesNoSearchAction": ""
}
```

---

## §5 — `apify-maps-TEMPLATE.json`

```json
{
  "enableCompetitorAnalysis": false,
  "includeWebResults": false,
  "language": "fr",
  "locationQuery": "__VILLE__, France",
  "maxCrawledPlacesPerSearch": 35,
  "maxImages": 0,
  "maxReviews": 0,
  "maximumLeadsEnrichmentRecords": 0,
  "scrapeContacts": true,
  "scrapeDirectories": false,
  "scrapeImageAuthors": false,
  "scrapeOrderOnline": false,
  "scrapePlaceDetailPage": false,
  "scrapeReviewsPersonalData": false,
  "scrapeSocialMediaProfiles": {
    "facebooks": true,
    "instagrams": true,
    "tiktoks": false,
    "twitters": false,
    "youtubes": false
  },
  "scrapeTableReservationProvider": false,
  "searchStringsArray": [
    "Entreprise générale du bâtiment",
    "Entreprise de rénovation intérieure",
    "Architecte d'intérieur",
    "Cabinet d'avocat",
    "Expert-comptable",
    "Courtier immobilier",
    "Courtier en crédit",
    "Cabinet de gestion de patrimoine",
    "Agence immobilière",
    "Notaire",
    "Chirurgien esthétique",
    "Dentiste",
    "Ostéopathe",
    "Clinique vétérinaire",
    "Institut de beauté",
    "Psychologue",
    "Salon de coiffure",
    "Photographe",
    "Garage automobile",
    "Auto-école",
    "Ophtalmologue",
    "Salle de sport",
    "Paysagiste"
  ],
  "skipClosedPlaces": true,
  "verifyLeadsEnrichmentEmails": false,
  "website": "allPlaces",
  "searchMatching": "all",
  "placeMinimumStars": "",
  "maxQuestions": 0,
  "reviewsSort": "newest",
  "reviewsFilterString": "",
  "reviewsOrigin": "all",
  "maxCompetitorsToAnalyze": 30,
  "allPlacesNoSearchAction": ""
}
```

---

## §6 — `02-assemblage-nettoyage.md`

# 02 — Assemblage, dédup & nettoyage

## Principe (mieux qu'au run 1)

- **Ne jamais modifier le brut** : 1 onglet `brut_<ville>` par export JSON (importé via un convertisseur JSON→CSV, ou copié depuis l'export CSV Apify).
- Tout le traitement se fait vers l'onglet **`FINAL`** via `Code.gs` (menu 🚀 PixelCraft).
- Le script retrouve les colonnes **par leur nom** (pas par lettre) → insensible aux colonnes en plus/moins.

## A. Colonnes brutes observées (export Apify aplati)

Ton export brut (`maps.xlsx`, feuille `Data`) contenait :

```
address | categoryName | city | countryCode | emails/0 | emails/1 |
facebooks/0 | instagrams/0 | linkedIns/0 | phone | street | url | website
```

⚠️ Selon le format d'export (JSON vs CSV vs XLSX), tu peux aussi avoir :
`title`, `placeId`, `totalScore`, `reviewsCount`, `categories/0..4`, `state`.
**Le script gère les deux cas** : s'il trouve `title`/`placeId`, il les utilise ; sinon il les extrait de `url` (voir C).

## B. Structure cible `FINAL` (21 colonnes)

| Col | En-tête exact | Source | Notes |
|---|---|---|---|
| A | `nom_entreprise` | `title` nettoyé, sinon URL | Revue manuelle conseillée sur le top 200 |
| B | `place_id` | `placeId` ou regex sur `url` | Clé de dédup |
| C | `address` | brut | Adresse complète |
| D | `categoryName` | brut | Catégorie Maps |
| E | `city` | brut | Ville |
| F | `email_fb` | enrichissement FB (voir `04`) | **Vide au run 1** (c'était ta colonne F vide !) |
| G | `emails/0` | brut, nettoyé | 1er email trouvé sur le site |
| H | `emails/1` | brut, nettoyé | 2e email (vidé si doublon de G) |
| I | `facebook/0` | `facebooks/0` renommé | ⚠️ renommage (sans `s`) |
| J | `instagrams/0` | brut | |
| K | `email_final` | = 1er non-vide de G, H, F | En minuscules, sans espaces |
| L | `phone` | brut | Tel Maps |
| M | `street` | brut | Rue |
| N | `maps` | `url` renommé | Lien fiche Google Maps |
| O | `website` | brut, nettoyé (UTM retirés) | Vide = pas de site = 💰 angle CRÉATION |
| P | `email_status` | `missing` auto + réimport verif | `valid` / `catch-all` / `risky` / `invalid` / `missing` / `à vérifier` |
| Q | `Stratégie Email` | calculé (labels exacts run 1) | Voir `06` |
| R | `Note Lead (/100)` | calculé (formule v2) | **Nombre** + format perso `0" / 100"` |
| S | `prenom_dirigeant` | API Gouv (voir `04`) | Vide au run 1 |
| T | `Bonus manuel` | toi (défaut 0) | ± points (ex. -10, +25), intégré à la note |
| U | `siren` | API Gouv (v2) | Bonus : ouvre la porte à Societe.com/Pappers |

Colonnes brutes **abandonnées** (comme au run 1) : `linkedIns/0`, `countryCode`, `state`, `totalScore`, `reviewsCount`, `categories/*`.
(Tu peux les garder dans les onglets `brut_*` au cas où.)

## C. Extraction `place_id` + `nom_entreprise` depuis l'URL

Si `placeId`/`title` absents du brut, tout vient de `url` :

- **place_id** : `query_place_id=ChIJ...` dans l'URL → regex `query_place_id=([^&]+)`.
  Vérifié : tous les `place_id` de ton final correspondent à leur URL. ✅
- **nom** : paramètre `query=` décodé (ex. `Lyse%20Beaut%C3%A9` → `Lyse Beauté`),
  puis nettoyage : partie avant ` - `, partie avant `,`, casse de titre, apostrophes normalisées.

⚠️ Constat : certains noms de ton final ont visiblement été **retouchés à la main ou par IA**
(`"Laurent Denis,"` avec virgule restante, `"1,2,3 AutoService"` vs `"Garage d'ANJOU - 1,2,3 AutoService"`).
Le script fait un nettoyage **déterministe** (mieux), et **ne touche jamais** aux noms déjà remplis
→ tu peux corriger à la main, il respectera tes corrections.

## D. Nettoyage des emails (ce que fait `nettoyerEmails`)

1. **Normalisation** : minuscules + suppression espaces (ex. `LORIS@SECONDSOUFFLE.CO` → `loris@...`).
2. **Format** : doit ressembler à `xxx@yyy.zz` (sinon vidé + loggé).
3. **Liste noire AUTO** (vidé + loggé) — faux emails sûrs :
   `utilisateur@`, `test@`, `exemple@`, `example.`, `nomdedomaine`, `domaine.com`, `domain.com`, `monsite.fr`
4. **Liste GRIZE** (gardé MAIS signalé dans `_logs` pour contrôle) — emails de **prestataires/plateformes**
   trouvés dans les footers des sites (pas ceux du prospect) : `yespark`, `doctolib`, `linkeo`, `almapay`,
   `pagesjaunes`, `sante.fr`... ⚠️ Au run 1, `renault`/`linkeo`/`almapay` étaient **supprimés d'office**
   (trop agressif : un garage Renault ou un client Linkeo perdait son vrai email !). En v2 : contrôle humain.
5. **Déduplication** G vs H (ex. Second Souffle avait 2× le même email en casses différentes).
6. **`email_final`** = premier non-vide parmi `emails/0`, `emails/1`, `email_fb`.
   - Constat run 1 : toujours `emails/0` (même quand `emails/1` était meilleur, ex. `question@` gardé au lieu de `laurent.denis@`).
   - v2 optionnelle : `choisirMeilleurEmail` préfère le nominatif (voir `Code.gs`, désactivé par défaut).

## E. Nettoyage du site web (v2)

- Supprime les paramètres `?...` (UTM `?utm_campaign=GoogleMyBusiness...` retrouvés dans ton brut).
- Supprime `#...`, espaces, `/` final unique conservé.
- Un site `doctolib.fr/...`, `planity.com/...`, `facebook.com/...` = **page plateforme, pas un vrai site** → le script le signale dans `_logs` (à toi de décider : compter comme « pas de site » ou non).

## F. Dédup inter-villes / inter-requêtes

- Clé : `place_id` (ou `url` normalisée si absent).
- En cas de doublon : **garde la ligne la plus riche** (email > tél > réseaux > site), loggue les lignes supprimées dans `_logs`.
- Explique une partie de l'écart 2 840 → ~1 750 (le reste = probablement lignes supprimées à la main, voir question 7 du README).
- Bonus v2 : dédup aussi sur `phone` normalisé (même tel = même boîte, ex. IAD et ses 50 conseillers... à manier avec précaution : loggé, pas auto-supprimé).

## G. Filtre hors-cible (v2, recommandé)

`searchMatching: "all"` ramène des intrus (ex. `Parking` dans ton final). Après assemblage :
- passe en revue les `categoryName` distincts (via `auditQualite` → `_stats`),
- supprime ou taggue les catégories hors ICP (parkings, mairies, associations...),
- note tes catégories exclues ici pour le run 3 : `................................................`.

---

## §7 — `03-formules.md`

# 03 — Formules Sheets (prêtes à coller)

> Locale : Sheets en **français** (séparateur `;`). Toutes les formules sont **cohérentes avec `Code.gs`**
> (mêmes labels, mêmes seuils). Astuce : le script est recommandé au-delà de ~1 000 lignes
> (les formules `REGEXMATCH` sur 3 000 lignes ralentissent le Sheet).

Rappel des colonnes `FINAL` : A nom · B place_id · C address · D catégorie · E ville · F email_fb ·
G emails/0 · H emails/1 · I facebook · J insta · K email_final · L phone · M street · N maps ·
O website · P email_status · Q Stratégie · R Note · S prénom · T Bonus manuel · U siren.

## B2 — place_id depuis l'URL Maps (N)

```
=SIERREUR(REGEXEXTRACT(N2;"query_place_id=([^&]+)");"")
```

## K2 — email_final (premier non-vide G/H/F, normalisé)

```
=SIERREUR(MINUSCULE(SUBSTITUE(SUPPRESPACE(SI(G2<>"";G2;SI(H2<>"";H2;F2)));" ";""));"")
```

## P2 — email_status (auto `missing` + réimport vérif)

Prérequis : onglet `VERIF_RESULT`, col A = email (minuscules), col B = statut normalisé
(`valid`, `catch-all`, `invalid` — voir `05-verification-emails.md`).

```
=SI(K2="";"missing";SIERREUR(RECHERCHEV(K2;VERIF_RESULT!A:B;2;FAUX);"à vérifier"))
```

## Test générique (partie locale en match EXACT — constat run 1)

À mettre dans une colonne helper (ex. `Z2`), ou en ligne dans la formule Q2 :

```
=REGEXMATCH(MINUSCULE(SIERREUR(GAUCHE(K2;TROUVE("@";K2)-1);"¤")); "^(contact|info|accueil|direction|commercial|devis|agence|secretariat|hello|bonjour|equipe|team|sales|support|sav|facture|facturation|compta|admin|reservation|reservations|rdv|recrutement|rh|presse)$")
```

> Preuve du match exact : `contact@aodesign.fr` → GÉNÉRIQUE mais
> `contact.atmosphereby@gmail.com` → NOMINATIF ; `question@...` → NOMINATIF.

## Q2 — Stratégie Email (labels EXACTS du run 1)

```
=SI(OU(K2="";P2="missing");"— (Pas d'email valide)";
 SI(P2="invalid";"⛔ INVALIDE | Ne pas envoyer";
 SI(OU(P2="catch-all";P2="risky");"⚠️ CATCH-ALL | À tester | Taux : 20-30%";
 SI(REGEXMATCH(MINUSCULE(SIERREUR(GAUCHE(K2;TROUVE("@";K2)-1);"¤")); "^(contact|info|accueil|direction|commercial|devis|agence|secretariat|hello|bonjour|equipe|team|sales|support|sav|facture|facturation|compta|admin|reservation|reservations|rdv|recrutement|rh|presse)$");
 "🚪 GÉNÉRIQUE | Intermédiaire | Passage barrage | Taux : 15-25%";
 "🎯 NOMINATIF | Décideur direct | Pitch direct | Taux : 35-50%"))))
```

## R2 — Note Lead v2 (barème prouvé, voir `06`)

```
=MIN(100;
 SI(REGEXMATCH(Q2;"NOMINATIF");60;SI(REGEXMATCH(Q2;"GÉNÉRIQUE");48;SI(REGEXMATCH(Q2;"CATCH-ALL");45;10)))
 +SI(O2="";SI(OU(K2="";REGEXMATCH(Q2;"Pas d'email|INVALIDE"));50;25);5)
 +SI(L2="";0;SI(REGEXMATCH(L2;"^(\+33\s*[67]|0[67])");15;6))
 +SI(OU(I2<>"";J2<>"");5;0)
 +SI(T2="";0;T2))
```

Puis format personnalisé sur la colonne R : `0" / 100"` → affiche `100 / 100`.

## Segments P1→P6 (1 formule en A2 de chaque onglet + `={FINAL!A1:U1}` en A1)

```
P1_CREATION_CHAUDE : =SIERREUR(FILTER(FINAL!A2:U; REGEXMATCH(FINAL!Q2:Q;"NOMINATIF"); FINAL!O2:O=""; FINAL!R2:R>=85);"— vide —")
P2_CREATION_TIEDE  : =SIERREUR(FILTER(FINAL!A2:U; REGEXMATCH(FINAL!Q2:Q;"GÉNÉRIQUE|CATCH-ALL"); FINAL!O2:O="");"— vide —")
P3_REFONTE         : =SIERREUR(FILTER(FINAL!A2:U; REGEXMATCH(FINAL!Q2:Q;"NOMINATIF|GÉNÉRIQUE|CATCH-ALL"); FINAL!O2:O<>"");"— vide —")
P4_COLD_CALL       : =SIERREUR(FILTER(FINAL!A2:U; REGEXMATCH(FINAL!Q2:Q;"Pas d'email|INVALIDE"); FINAL!L2:L<>"");"— vide —")
P5_RS_DM           : =SIERREUR(FILTER(FINAL!A2:U; REGEXMATCH(FINAL!Q2:Q;"Pas d'email|INVALIDE"); FINAL!L2:L=""; (FINAL!I2:I<>"")+(FINAL!J2:J<>"")>0);"— vide —")
P6_ARCHIVE         : =SIERREUR(FILTER(FINAL!A2:U; REGEXMATCH(FINAL!Q2:Q;"Pas d'email|INVALIDE"); FINAL!L2:L=""; (FINAL!I2:I="")*(FINAL!J2:J=""));"— vide —")
```

> Couverture totale : chaque ligne de FINAL tombe dans **exactement 1** segment (voir preuve dans `06`).
> Le script `genererSegments` crée ces 6 onglets automatiquement.

## Divers utiles

**Compter les sans-site avec email (potentiel P1+P2) :**
```
=NB.SI.ENS(K2:K; "<>"; O2:O; "")
```

**Extraire le domaine d'un email (pour Hunter) :**
```
=SIERREUR(DROITE(K2;NBCAR(K2)-TROUVE("@";K2));"")
```

**Domaine du site web (nettoyé) :**
```
=SIERREUR(REGEXEXTRACT(REGEXREPLACE(O2;"https?://(www\.)?";"");"^([^/]+)");"")
```

**Trier FINAL par note décroissante (sans script) :**
Données → Créer un filtre → tri Z→A sur R. (Le script le fait auto à l'étape 6.)

---

## §8 — `04-enrichissements.md`

# 04 — Enrichissements (FB + Hunter + Gouv)

> ⚠️ Ordre OBLIGATOIRE : enrichissements (ajout d'emails) → **PUIS** vérification (`05`).
> Vérifier avant d'avoir tous les emails = payer 2 fois.

## A. Facebook (optionnel — probablement jamais fait au run 1)

**Quand :** uniquement les lignes **sans email mais avec URL Facebook** (typiquement 150-300 lignes).

1. `Code.gs` → `normaliserUrlsFacebook` → onglet `FB_URLS` (URLs uniques, nettoyées :
   `m.facebook` → `www`, paramètres `?...` retirés, minuscules, dédup).
2. Apify → **`apify/facebook-pages-scraper`** :
   - Start URLs : coller la colonne A de `FB_URLS`.
   - Proxy : **Residential**, pays **France (FR)**.
   - Langue : `fr-FR`.
   - Coût constaté/prévu : **~1-2 €** pour ce volume.
3. Export CSV → copier `URL page | email` dans l'onglet `FB_RESULT` (A = URL, B = email).
4. `Code.gs` → `fusionnerEmailsFB` → remplit `email_fb` (col F) + recalcule `email_final` si vide.
   Le match se fait sur URL **normalisée** (corrige le bug `RECHERCHEV` exact du plan d'origine).

## B. Hunter.io (optionnel)

**Quand :** les TOP leads **sans email mais AVEC site pro** (pas de Hunter sans domaine ; oublie les `@gmail`).

**Procédure (Hunter.io → Domain Search) :**
1. Extraire le domaine du site (formule dans `03`), 1 domaine par recherche.
2. Filtres : **score ≥ 75**, priorité `Personal` > `Generic`, statut `Valid`.
3. ⚠️ **VÉRIFICATION CROISÉE OBLIGATOIRE** — erreurs typiques de Hunter à surveiller :
   - mauvais pays (ex. carrosserie française → `haas-carrosserie.ch` en Suisse !),
   - mauvais établissement (ex. `Boulangerie Senon` → `boulangeriepinot.fr`),
   - domaines exotiques (`.it`, `.ch`, `.co.id`...) pour des boîtes françaises.
   Règle : le domaine doit évoquer le NOM de l'établissement + ville/pays FR. Sinon : jeter.
4. Hunter → Email Verifier sur les retenus → export CSV.
5. Import : colle les emails retenus en col F (`email_fb` — renomme-la `email_enrichi` si tu préfères ;
   le script utilise G puis H puis F). Vérifie chaque email (Hunter → Email Verifier) AVANT de l'importer,
   et garde une trace (CSV `NOM, EMAIL, DOMAINE, VILLE`) pour pouvoir auditer.

**Coûts Hunter (indicatifs) :** offre gratuite ~25-50 recherches/mois ; payant dès ~30 €/mois.
Réserve Hunter aux leads note ≥ 60 sans email (quelques centaines max).

**Bonus :** Hunter donne parfois **prénom + nom** → pré-remplit la personnalisation (mieux que Gouv quand dispo).

## C. API Gouv — prénoms des dirigeants (colonne vide au run 1 → tout est à refaire)

**API :** `https://recherche-entreprises.api.gouv.fr/search?q=<nom+ville>&per_page=5&etat_administratif=A` — gratuite, sans clé.

**Ce que fait `enrichirPrenomsGouv` (version robuste, corrige les 5 bugs de l'original) :**

| Bug original | Correction v2 |
|---|---|
| 1 seul résultat (`per_page=1`) → homonymes | `per_page=5` + **match de commune** (n'accepte que si la ville colle) |
| Timeout Apps Script (> 6 min pour 2 800 lignes) | **Lots de 150 + reprise auto** (progression sauvegardée, déclencheur toutes les 10 min) |
| Tout code ≠ 200 = « 502 maintenance » | Distingue 429/502/503 (pause) vs autres (skip ligne) |
| `dirigeants[0].prenom` (champ `prenoms` au pluriel !) | Lit `prenoms` (+ fallback `prenom`), **skip les personnes morales** |
| Pas de traçabilité | Écrit `prenom_dirigeant` (S) + `siren` (U) ; `~` si incertain |

**Lancement :** menu → `Gouv : enrichir prénoms (lot)` (clique, attends, reclique)
ou `installer déclencheur auto` (1 lot / 10 min, s'arrête tout seul à la fin).

**Limites honnêtes :**
- L'API ne renvoie pas toujours les dirigeants (selon les fiches) → le script le détecte
  (si 20+ lignes d'affilée sans dirigeants, vérifie `_logs` + l'état de l'API).
- Homonymes résiduels possibles → le flag `ville non vérifiée`/`~` dit quand douter.
  **Un mauvais prénom est pire que pas de prénom** : n'utilise `S` en publipostage que sans `~`.
- Rendement attendu : 30-60 % de prénoms (mieux sur les EI/PME, nul sur les filiales de groupes).

## D. Ordre récapitulatif

```
FINAL nettoyé (02+03)
  → [A] FB : FB_URLS → scrape → FB_RESULT → fusion (col F)
  → [B] Hunter : top sans-email + site → col F (ou H si F prise)
  → [C] Gouv : prénoms (col S) + siren (U) — indépendant des emails, peut tourner en parallèle
  → PUIS SEULEMENT : 05-vérification (sur email_final complet)
```

---

## §9 — `05-verification-emails.md`

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

---

## §10 — `06-segmentation-scoring.md`

# 06 — Stratégie, Note Lead & segments P1→P6

## A. Labels Stratégie Email (EXACTS, récupérés de ton fichier)

| Label (copier-coller exact) | Quand |
|---|---|
| `🎯 NOMINATIF \| Décideur direct \| Pitch direct \| Taux : 35-50%` | Email validé dont la partie locale n'est PAS générique |
| `🚪 GÉNÉRIQUE \| Intermédiaire \| Passage barrage \| Taux : 15-25%` | Email validé à partie locale générique (match **exact**) |
| `— (Pas d'email valide)` | Pas d'email |
| `⚠️ CATCH-ALL \| À tester \| Taux : 20-30%` *(v2)* | Statut `catch-all`/`risky` |
| `⛔ INVALIDE \| Ne pas envoyer` *(v2)* | Statut `invalid` |

**Liste générique (match exact, minuscules)** — prouvée par `contact@`→GEN vs `contact.atmosphereby@`→NOM :
`contact, info, accueil, direction, commercial, devis, agence, secretariat`
+ ajouts v2 : `hello, bonjour, equipe, team, sales, support, sav, facture, facturation, compta, admin, reservation, reservations, rdv, recrutement, rh, presse`.

## B. Note Lead v2 — barème

```
Note = MIN(100 ; BaseEmail + BonusSite + BonusTel + BonusSocial + BonusManuel)
```

| Composante | Points |
|---|---|
| **Base email** : NOMINATIF validé / GÉNÉRIQUE validé / CATCH-ALL / sans email (`missing`/`invalid`) | **60 / 48 / 45 / 10** |
| **Site** : présent / absent + email / absent + SANS email (branche cold-call 🔥) | **5 / 25 / 50** |
| **Tél** : mobile 06-07 / fixe 01-05,09 / absent | **15 / 6 / 0** |
| **Social** : Facebook OU Instagram présent | **+5** |
| **Bonus manuel** (col T, toi) | défaut 0 |

**Logique métier :** pas de site = besoin CRÉATION (lead chaud) ; sans email mais joignable + sans site
= cible cold-call presque aussi chaude qu'un email (d'où 50).

## C. Preuves : la v2 reproduit tes scores observés

| Cas (run 1) | Calcul v2 | Observé |
|---|---|---|
| Nominatif + mobile + sans site + FB (ex. Le BonBeau) | 60+25+15+5=105→**100** | 100 ✅ |
| Nominatif + mobile + sans site, sans RS (ex. Lyse Beauté) | 60+25+15+0=**100** | 100 ✅ |
| Nominatif + fixe + sans site + FB (Souffir) | 60+25+6+5=**96** | 96 ✅ |
| Nominatif + fixe + sans site, sans RS (Hajjaji) | 60+25+6+0=**91** | 91 ✅ |
| Nominatif + mobile + site + Insta (ex. Atelier Entracte, ×13 lignes) | 60+5+15+5=**85** | 85 ✅ |
| Générique + mobile + site + RS (ex. AO design, ×5 lignes) | 48+5+15+5=**73** | 73 ✅ |
| Nominatif + fixe + site, sans RS (Martin-Pigeon) | 60+5+6+0=**71** | 71 ✅ |
| **Sans email** + fixe + sans site + FB (Hivelin = preuve de la branche 50) | 10+**50**+6+5=**71** | 71 ✅ |
| Sans email + sans tél + site + Insta (Parking) | 10+5+0+5=**20** | 20 ✅ |
| Sans email + sans tél + site, sans RS (×7 lignes) | 10+5+0+0=**15** | 15 ✅ |

**Anomalies documentées (2 lignes) :** Garage d'Anjou + Scoobidoo (nominatif + fixe + sans site + FB)
scorés **86** au lieu des 96 prédits → mets `Bonus manuel = -10`, **ou** dis-moi s'ils sont vraiment à 86
(possible batch avec une variante, ou retouche manuelle — voir question 6 du README).

## D. Segments P1→P6 (réconcilie tes 2 tableaux contradictoires)

| Segment | Définition | Angle | Canal | Ordre |
|---|---|---|---|---|
| 🥇 **P1_CREATION_CHAUDE** | NOMINATIF + **sans site** (note ≥ 85 auto) | Création site | Email pitch direct + call | 1er |
| 🥈 **P2_CREATION_TIEDE** | GÉNÉRIQUE/CATCH-ALL + **sans site** | Création site | Email + relances | 2e |
| 🥉 **P3_REFONTE** | Email OK (NOM/GEN/CATCH) + **site** | Refonte / audit gratuit | Email audit | 3e |
| 📞 **P4_COLD_CALL** | Pas d'email valide + **tél** (trier par note ↓) | Création (si sans site) / refonte | Appel (+ SMS de suivi*) | 4e |
| 🔵 **P5_RS_DM** | Pas d'email + pas de tél + **FB/Insta** | Création/refonte selon site | DM manuel | 5e |
| 🗑️ **P6_ARCHIVE** | Pas d'email + pas de tél + pas de RS | — | Nurture plus tard / archive | — |

\* ⚠️ SMS/WhatsApp à froid = **consentement préalable requis** (voir `07`) → en pratique : appel d'abord, SMS seulement en suivi post-échange.

**Couverture totale prouvée :** lignes avec email (NOM/GEN/CATCH) → P1/P2/P3 selon site (NOM sans site ≥ 85 toujours : 60+25 min) ; lignes sans email → P4/P5/P6 selon tél puis RS. Chaque ligne tombe dans **exactement 1** segment.

Formules : voir `03-formules.md` (ou `genererSegments` dans `Code.gs` = 1 clic).

---

## §11 — `07-warmup-envoi.md`

# 07 — Warmup & infrastructure d'envoi

> ✅ **Récupéré à 100 %** depuis ton fichier `warmup_emails`.
> ⚠️ Constat : la **date de début est vide** → le warmup n'a jamais démarré.

## A. Les 4 plateformes (rôles recommandés)

| Plateforme | Max/j (ton plan) | Rôle conseillé | Coût indicatif |
|---|---|---|---|
| **Amazon SES** | 200/j | Volume pas cher (P2/P3) | ~0,10 $/1 000 emails |
| **Gmail + GMass** | 150/j | Emails « humains » nominatifs (P1) | GMass gratuit 50/j, payant ~20 $/mois |
| **Outlook** | 300/j | Volume (attention aux bans) | Inclus Microsoft 365 |
| **Brevo** (`pixelcraft.email`) | 275/j | Plateforme principale + campagnes | Gratuit 300/j |
| **TOTAL** | **925/j** | | |

## B. Pré-requis DNS (à valider AVANT J1 — sinon = spam direct)

- [ ] **SPF** : chaque domaine d'envoi déclare ses plateformes (`include:_spf.google.com`, `include:spf.brevo.com`, `include:spf.protection.outlook.com`, SES via `MAIL FROM`).
- [ ] **DKIM** : activé partout (Brevo : 2 entrées ; SES : 3 CNAME ; Google Workspace : 1 TXT ; Outlook : 2 CNAME). ⚠️ Un Gmail **perso** (@gmail.com) ne peut pas signer DKIM à ton nom → limite GMass aux petits volumes « humains ».
- [ ] **DMARC** : `v=DMARC1; p=quarantine; rua=mailto: tolerated...` (au minimum `p=none` + rapports au début).
- [ ] Idéal : envoyer depuis un **sous-domaine dédié** (ex. `send.pixelcraft.email`) pour protéger le domaine principal.
- [ ] Vérifier avec : MXToolbox / mail-tester.com (vise 9-10/10) avant J1.

## C. Planning J1→J42 (ton tableau, intégral)

Paliers quotidiens par plateforme. Même fichier en CSV : `annexes/warmup-J1-J42.csv`.

| Jour | SES | Gmail+GMass | Outlook | Brevo | Total | Cumul |
|---|---|---|---|---|---|---|
| Max | 200 | 150 | 300 | 275 | 925 | — |
| J1 | 0 | 10 | 10 | 0 | 20 | 20 |
| J2 | 0 | 15 | 15 | 0 | 30 | 50 |
| J3 | 0 | 20 | 20 | 0 | 40 | 90 |
| J4 | 0 | 30 | 30 | 5 | 65 | 155 |
| J5 | 0 | 35 | 35 | 5 | 75 | 230 |
| J6 | 0 | 40 | 40 | 5 | 85 | 315 |
| J7 | 5 | 50 | 50 | 10 | 115 | 430 |
| J8 | 5 | 55 | 55 | 15 | 130 | 560 |
| J9 | 10 | 60 | 60 | 15 | 145 | 705 |
| J10 | 15 | 65 | 65 | 15 | 160 | 865 |
| J11 | 20 | 70 | 70 | 20 | 180 | 1045 |
| J12 | 25 | 75 | 75 | 25 | 200 | 1245 |
| J13 | 25 | 80 | 80 | 25 | 210 | 1455 |
| J14 | 25 | 85 | 85 | 25 | 220 | 1675 |
| J15 | 30 | 90 | 90 | 30 | 240 | 1915 |
| J16 | 35 | 95 | 95 | 35 | 260 | 2175 |
| J17 | 40 | 100 | 100 | 40 | 280 | 2455 |
| J18 | 45 | 110 | 110 | 45 | 310 | 2765 |
| J19 | 50 | 115 | 115 | 50 | 330 | 3095 |
| J20 | 55 | 120 | 120 | 55 | 350 | 3445 |
| J21 | 60 | 125 | 125 | 60 | 370 | 3815 |
| J22 | 65 | 130 | 130 | 65 | 390 | 4205 |
| J23 | 70 | 135 | 135 | 70 | 410 | 4615 |
| J24 | 80 | 140 | 140 | 80 | 440 | 5055 |
| J25 | 90 | 145 | 145 | 90 | 470 | 5525 |
| J26 | 100 | 150 | 150 | 100 | 500 | 6025 |
| J27 | 110 | 150 | 155 | 110 | 525 | 6550 |
| J28 | 120 | 150 | 160 | 120 | 550 | 7100 |
| J29 | 130 | 150 | 165 | 130 | 575 | 7675 |
| J30 | 140 | 150 | 170 | 140 | 600 | 8275 |
| J31 | 150 | 150 | 175 | 150 | 625 | 8900 |
| J32 | 160 | 150 | 180 | 160 | 650 | 9550 |
| J33 | 180 | 150 | 185 | 180 | 695 | 10245 |
| J34 | 200 | 150 | 190 | 200 | 740 | 10985 |
| J35 | 200 | 150 | 195 | 220 | 765 | 11750 |
| J36 | 200 | 150 | 200 | 240 | 790 | 12540 |
| J37 | 200 | 150 | 220 | 260 | 830 | 13370 |
| J38 | 200 | 150 | 240 | 275 | 865 | 14235 |
| J39 | 200 | 150 | 260 | 275 | 885 | 15120 |
| J40 | 200 | 150 | 280 | 275 | 905 | 16025 |
| J41 | 200 | 150 | 300 | 275 | 925 | 16950 |
| J42 | 200 | 150 | 300 | 275 | 925 | — |

**Mode d'emploi :**
1. Renseigne la **date de début** (= J1) et ne touche plus aux paliers.
2. Warmup = emails d'**engagement** (ouvertures/réponses simulées via pool de warmup : service type lemwarm / Million Inbox / warmup Brevo), PAS encore de prospection.
3. Règles d'arrêt : rebonds > 3 % → pause + vérifier la liste ; plaintes spam > 0,1 % → pause immédiate ; compte restreint (surtout Outlook/Gmail) → stop, attendre 24-48h.
4. La prospection démarre quand ≥ J21 **et** délivrabilité stable (ou J42 pour le plein régime).

## D. Calendrier campagne réaliste (ex. ~700 emails valides)

- J1→J21 : warmup seul + préparation données (`01`→`06`).
- J21→J42 : P1 (nominatifs chauds) en priorité, ~100-200/j en montant.
- J42+ : P1 suite → P2 → P3, plein régime 925/j max (soit ~700 × 3 relances ≈ 2 100 envois ≈ **3-4 jours** à plein régime).
- P4/P5 en parallèle (manuel, pas de warmup requis).

## E. Cadre légal France (B2B) — à respecter

- **Email B2B** : OK sur fondement « intérêt légitime » SI rapport avec la fonction du destinataire (un site web pour une PME ✅), avec **lien de désinscription + identité de l'expéditeur** dans chaque email. Conservation prospects : 3 ans max.
- **Appels B2B** : Bloctel ne vise que les consommateurs, mais reste courtois + fichier d'opposition interne.
- **SMS / WhatsApp à froid** : ⛔ **consentement préalable OBLIGATOIRE** (pas de cold SMS/WA légal en France). Le « SMS/WA manuel » de ton plan = uniquement en **suivi post-échange** (après un appel ou une réponse).
- Mentions : PixelCraft, SIRET dès que tu l'as, contact DPO/réclamation.

---

## §12 — `CHECKLIST-RUN2.md`

# ✅ Checklist RUN 2 (chronologique)

> Détail de chaque étape : `GUIDE-COMPLET-RUN2.md` (le guide unique, à lire en 1er).

## Phase 0 — Infra envoi (J-45 → J-3)
- [ ] Valider DNS : SPF + DKIM + DMARC sur les 4 plateformes (voir `07-B`)
- [ ] Tester délivrabilité : mail-tester 9-10/10
- [ ] **Renseigner la DATE DE DÉBUT du warmup** (= J1) et suivre `annexes/warmup-J1-J42.csv`
- [ ] Créer les comptes/outils : Bouncer (ou équivalent), Hunter.io, Apify (crédits ~30 €)

## Phase 1 — Scraping (J-30)
- [ ] Acteur `compass/crawler-google-places`, 5 runs (1 JSON/ville, voir `01` + `apify-maps-*.json`)
- [ ] Plafond de dépense par run (ex. 8 $)
- [ ] Export **JSON** : `dataset_<ville>_<date>.json` (+ CSV backup)

## Phase 2 — Assemblage (J-28)
- [ ] Nouveau Google Sheet → coller `Code.gs` (Extensions → Apps Script) → recharger
- [ ] Menu 🚀 → `0. Créer la structure master`
- [ ] Importer chaque export en onglet `brut_<ville>` (JSON→CSV via convertisseur, ou CSV Apify)
- [ ] Menu → `1. Assembler les bruts → master` → `2. Extraire place_id + noms` → `3. Nettoyer emails + email_final`
- [ ] Lire `_logs` : contrôler liste grise + sites plateforme + hors-cible (`02-F/G`)

## Phase 3 — Enrichissements (J-25, voir `04`)
- [ ] [Optionnel] FB : `FB : lister URLs sans email` → scrape Apify → coller en `FB` → `FB : fusionner emails trouvés`
- [ ] Hunter : top sans-email + site pro → contrôle qualité → col F (`email_fb`)
- [ ] Gouv : `Gouv : enrichir prénoms (lot)` (ou déclencheur auto) → col S (`prenom_dirigeant`) + U (`siren`)
- [ ] Revue manuelle des noms sur le top 200 (tri par note)

## Phase 4 — Vérification (J-20, voir `05`)
- [ ] `4. Exporter emails à vérifier` → outil externe → coller résultats en `_VERIF_RESULT` (A=email, B=statut)
- [ ] `5. Importer statuts vérification` → contrôler `_logs` (sans-correspondance)

## Phase 5 — Scoring & segments (J-18)
- [ ] `6. Stratégie + Note Lead` (tri auto décroissant)
- [ ] [Optionnel] `choisirMeilleurEmail` (depuis l'éditeur Apps Script — pas de bouton dans le menu — préfère le nominatif) → relancer étape 6 → **re-vérifier les emails changés**
- [ ] Bonus manuels (col T) sur les cas limites
- [ ] `7. Générer les onglets (A/B/C/D/RS…)` → `8. Audit qualité → _stats` (lire `_stats`)

## Phase 6 — Campagne (J-15 →, voir `06-D` + `07-D/E`)
- [ ] A en premier (pitch direct), puis B → C ; D/RS en parallèle manuel
- [ ] Désinscription + identité dans chaque email ; suivi rebonds/spam quotidien
- [ ] Archiver : copier le Sheet final (`maps_run2_AAAA-MM-JJ`) + exporter `Code.gs` (Fichier → Télécharger) **pour ne plus jamais perdre les scripts** 🎯

---

## §13 — `annexes/warmup-J1-J42.csv`

### Tableau lisible

| Jour | Amazon_SES | Gmail_GMass | Outlook | Brevo_pixelcraft_email | Total | Cumul |
| --- | --- | --- | --- | --- | --- | --- 
| Max | 200 | 150 | 300 | 275 | 925 |  |
| J1 | 0 | 10 | 10 | 0 | 20 | 20 |
| J2 | 0 | 15 | 15 | 0 | 30 | 50 |
| J3 | 0 | 20 | 20 | 0 | 40 | 90 |
| J4 | 0 | 30 | 30 | 5 | 65 | 155 |
| J5 | 0 | 35 | 35 | 5 | 75 | 230 |
| J6 | 0 | 40 | 40 | 5 | 85 | 315 |
| J7 | 5 | 50 | 50 | 10 | 115 | 430 |
| J8 | 5 | 55 | 55 | 15 | 130 | 560 |
| J9 | 10 | 60 | 60 | 15 | 145 | 705 |
| J10 | 15 | 65 | 65 | 15 | 160 | 865 |
| J11 | 20 | 70 | 70 | 20 | 180 | 1045 |
| J12 | 25 | 75 | 75 | 25 | 200 | 1245 |
| J13 | 25 | 80 | 80 | 25 | 210 | 1455 |
| J14 | 25 | 85 | 85 | 25 | 220 | 1675 |
| J15 | 30 | 90 | 90 | 30 | 240 | 1915 |
| J16 | 35 | 95 | 95 | 35 | 260 | 2175 |
| J17 | 40 | 100 | 100 | 40 | 280 | 2455 |
| J18 | 45 | 110 | 110 | 45 | 310 | 2765 |
| J19 | 50 | 115 | 115 | 50 | 330 | 3095 |
| J20 | 55 | 120 | 120 | 55 | 350 | 3445 |
| J21 | 60 | 125 | 125 | 60 | 370 | 3815 |
| J22 | 65 | 130 | 130 | 65 | 390 | 4205 |
| J23 | 70 | 135 | 135 | 70 | 410 | 4615 |
| J24 | 80 | 140 | 140 | 80 | 440 | 5055 |
| J25 | 90 | 145 | 145 | 90 | 470 | 5525 |
| J26 | 100 | 150 | 150 | 100 | 500 | 6025 |
| J27 | 110 | 150 | 155 | 110 | 525 | 6550 |
| J28 | 120 | 150 | 160 | 120 | 550 | 7100 |
| J29 | 130 | 150 | 165 | 130 | 575 | 7675 |
| J30 | 140 | 150 | 170 | 140 | 600 | 8275 |
| J31 | 150 | 150 | 175 | 150 | 625 | 8900 |
| J32 | 160 | 150 | 180 | 160 | 650 | 9550 |
| J33 | 180 | 150 | 185 | 180 | 695 | 10245 |
| J34 | 200 | 150 | 190 | 200 | 740 | 10985 |
| J35 | 200 | 150 | 195 | 220 | 765 | 11750 |
| J36 | 200 | 150 | 200 | 240 | 790 | 12540 |
| J37 | 200 | 150 | 220 | 260 | 830 | 13370 |
| J38 | 200 | 150 | 240 | 275 | 865 | 14235 |
| J39 | 200 | 150 | 260 | 275 | 885 | 15120 |
| J40 | 200 | 150 | 280 | 275 | 905 | 16025 |
| J41 | 200 | 150 | 300 | 275 | 925 | 16950 |
| J42 | 200 | 150 | 300 | 275 | 925 |  |

### CSV brut (séparateur `;` — à copier pour import Sheets)

```csv
Jour;Amazon_SES;Gmail_GMass;Outlook;Brevo_pixelcraft_email;Total;Cumul
Max;200;150;300;275;925;
J1;0;10;10;0;20;20
J2;0;15;15;0;30;50
J3;0;20;20;0;40;90
J4;0;30;30;5;65;155
J5;0;35;35;5;75;230
J6;0;40;40;5;85;315
J7;5;50;50;10;115;430
J8;5;55;55;15;130;560
J9;10;60;60;15;145;705
J10;15;65;65;15;160;865
J11;20;70;70;20;180;1045
J12;25;75;75;25;200;1245
J13;25;80;80;25;210;1455
J14;25;85;85;25;220;1675
J15;30;90;90;30;240;1915
J16;35;95;95;35;260;2175
J17;40;100;100;40;280;2455
J18;45;110;110;45;310;2765
J19;50;115;115;50;330;3095
J20;55;120;120;55;350;3445
J21;60;125;125;60;370;3815
J22;65;130;130;65;390;4205
J23;70;135;135;70;410;4615
J24;80;140;140;80;440;5055
J25;90;145;145;90;470;5525
J26;100;150;150;100;500;6025
J27;110;150;155;110;525;6550
J28;120;150;160;120;550;7100
J29;130;150;165;130;575;7675
J30;140;150;170;140;600;8275
J31;150;150;175;150;625;8900
J32;160;150;180;160;650;9550
J33;180;150;185;180;695;10245
J34;200;150;190;200;740;10985
J35;200;150;195;220;765;11750
J36;200;150;200;240;790;12540
J37;200;150;220;260;830;13370
J38;200;150;240;275;865;14235
J39;200;150;260;275;885;15120
J40;200;150;280;275;905;16025
J41;200;150;300;275;925;16950
J42;200;150;300;275;925;
```

---

*Fin du fichier unique — 14 fichiers du kit regroupés (dont `Code.gs` via le §2).*
