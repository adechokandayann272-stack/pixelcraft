# Refaire le fichier `maps` — RUN 2

> **Périmètre** : uniquement ce qu’il faut pour recréer le Google Sheet `maps` (scraping → script → master + onglets).
> **Hors sujet** (volontairement retiré) : warmup, DNS, plateformes d’envoi, légal, calendrier de campagne, enquête run 1, questions ouvertes.

Budget data : **~30–40 €** (Apify ~24 € + vérif emails ~5–12 € + FB optionnel ~2 €). Gouv = gratuit.

---

## 0. Ce qu’il te faut

- [ ] Compte Google (Sheets + Apps Script)
- [ ] Compte Apify crédité (~30 €)
- [ ] Compte Bouncer (ou ZeroBounce / MillionVerifier) pour la vérif emails
- [ ] (Optionnel) Hunter.io — uniquement si tu veux chercher un email sur les leads **avec site et sans email**

Cible à recréer : un Sheet nommé `maps_run2`, onglet **`master`**, plus **`A` `B` `C` `D` `RS` `FB` `Sans Site` `RS Sans Email & Site`**.

---

## 1. Scraping Google Maps (Apify)

### Acteur
`compass/crawler-google-places`

### 5 villes = 5 runs (1 JSON par ville)

| # | `locationQuery` |
|---|---|
| 1 | `Boulogne-Billancourt, France` |
| 2 | `Versailles, France` |
| 3 | `Saint-Germain-en-Laye, France` |
| 4 | `Saint-Maur-des-Fossés, France` |
| 5 | `Vincennes, France` |

### JSON d’input (coller dans l’onglet Input JSON d’Apify)

Change seulement `locationQuery` pour chaque ville. Mets `"instagrams": true` dès le run 2 (coût quasi nul).

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

### Lancement
1. 5 runs en parallèle, ~20–60 min chacun.
2. Plafond anti-surprise : ~8 $/run dans les settings Apify.
3. Paramètres qui comptent : `maxCrawledPlacesPerSearch: 35` (23 × 35 = 805 max/ville), `scrapeContacts: true` (emails depuis les sites), `website: "allPlaces"` (vide = signal « pas de site »), `skipClosedPlaces: true`, `scrapePlaceDetailPage: false`.

### Export
Run terminé → **Dataset → Export → JSON** (pas XLSX : l’XLSX perd `title` / `placeId`). Nomme `dataset_<ville>_<date>.json`. Backup CSV optionnel.

Attendus : ~2 500–4 000 lieux bruts → ~1 700–2 800 après dédup ; ~20–30 % avec email ; **~24 €** les 5 villes.

### Pièges
- `searchMatching: "all"` ramène des hors-cible (ex. un Parking). Après assemblage, lis `_stats` (top catégories) et supprime.
- Doublons inter-requêtes / inter-villes : le script déduplique sur `place_id`.

---

## 2. Script unique (Apps Script)

### Installation
1. Google Sheet vierge → nomme-le `maps_run2`.
2. **Extensions → Apps Script**.
3. Efface le stub, **colle TOUT le `Code.gs` ci-dessous**, 💾 Enregistrer, ferme l’onglet.
4. Recharge le Sheet → menu **🚀 PixelCraft** (accepte les autorisations).
5. Clique les items **dans l’ordre du menu** (0 → 8).

### Code.gs (à coller en entier)

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

  let stopped = false;
  for (let b = 0; b < bruts.length && !stopped; b++) {
    const sh = bruts[b];
    const vals = sh.getRange(1, 1, sh.getLastRow(), sh.getLastColumn()).getValues();
    const head = vals[0].map(h => String(h).trim().toLowerCase());
    const at = names => {
      for (const n of names) { const i = head.indexOf(n); if (i !== -1) return i; }
      return -1;
    };
    const c = {};
    Object.keys(SRC).forEach(k => { c[k] = at(SRC[k]); });
    for (let r = 1; r < vals.length; r++) {
      if (timeUp_(start)) { journal_('assemblerBrut', 'STOP anti-timeout — relance pour continuer.'); stopped = true; break; }
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
  }

  const data = out.map(o => [o.title, o.pid, o.address, o.cat, o.city, '',
    o.e0, o.e1, o.fb, o.insta, '', o.phone, o.street, o.url, o.site,
    '', '', '', '', 0, '']);
  if (!data.length) {
    SpreadsheetApp.getUi().alert('Aucune ligne assemblée.');
    return;
  }
  if (fin.getLastRow() === 0) creerStructureMaster();
  if (fin.getLastRow() > 1) {
    fin.getRange(2, 1, fin.getLastRow() - 1, PC.HEADERS_MASTER.length).clearContent();
  }
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
  // Invalides AVANT valides : "invalid" contient "valid", "undeliverable" contient "deliverable".
  if (/undeliverable|\binvalid\b|invalide|^ko$|\bbounce\b|inexistant/.test(t)) return 'invalid';
  if (/accept.?all|catch.?all|accepte/.test(t)) return 'catch-all';
  if (/risky|risque|unknown|inconnu/.test(t)) return 'catch-all';
  if (/deliverable|\bvalid\b|^ok$|delivre/.test(t)) return 'valid';
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
    ['A', 'FILTRE(' + F + 'A2:U; REGEXMATCH(' + F + 'Q2:Q; "NOMINATIF"); ' + F + 'O2:O="")'],
    ['B', 'FILTRE(' + F + 'A2:U; REGEXMATCH(' + F + 'Q2:Q; "NOMINATIF"); ' + F + 'O2:O<>"")'],
    ['C', 'FILTRE(' + F + 'A2:U; REGEXMATCH(' + F + 'Q2:Q; "GÉNÉRIQUE|CATCH-ALL"); ' + F + 'O2:O="")'],
    ['D', 'FILTRE(' + F + 'A2:U; REGEXMATCH(' + F + 'Q2:Q; "GÉNÉRIQUE|CATCH-ALL"); ' + F + 'O2:O<>"")'],
    ['RS', 'FILTRE(' + F + 'A2:U; REGEXMATCH(' + F + 'Q2:Q; "Pas d\'email|INVALIDE"); (' + F + 'I2:I<>"")+(' + F + 'J2:J<>"")>0)'],
    ['Sans Site', 'FILTRE(' + F + 'A2:U; ' + F + 'O2:O="")'],
    ['RS Sans Email & Site', 'FILTRE(' + F + 'A2:U; REGEXMATCH(' + F + 'Q2:Q; "Pas d\'email|INVALIDE"); ' + F + 'O2:O=""; (' + F + 'I2:I<>"")+(' + F + 'J2:J<>"")>0)']
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
  u = u.replace(/^https:\/\/facebook\.com/i, 'https://www.facebook.com');
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

### Menu → effet

| Menu | Fonction | Effet |
|---|---|---|
| 0 | `creerStructureMaster` | Crée `master` (21 colonnes) + format note `100 / 100` |
| 1 | `assemblerBrut` | Fusionne les `brut_*` → `master`, dédup `place_id` (garde la ligne la plus riche) |
| 2 | `extraireIdsEtNoms` | `place_id` + `nom_entreprise` depuis l’URL Maps (ne touche jamais un nom déjà rempli) |
| 3 | `nettoyerEmails` | Minuscules, formats, poubelle, `email_final`, UTM retirés du site |
| 4 | `exporterEmailsAVerifier` | Emails uniques → `_A_VERIFIER` |
| 5 | `importerStatuts` | `_VERIF_RESULT` (A=email, B=statut) → colonne `email_status` |
| 6 | `appliquerStrategieEtScore` | Labels Stratégie + Note Lead + tri décroissant |
| 7 | `genererSegments` | Crée `A` `B` `C` `D` `RS` `Sans Site` `RS Sans Email & Site` (FILTER) |
| 8 | `auditQualite` | Stats dans `_stats` |
| FB | `normaliserUrlsFacebook` / `fusionnerEmailsFB` | Liste `_FB_URLS` → fusion col F |
| Gouv | `enrichirPrenomsGouv` | Prénoms par lots de 150 (reprise auto) |

Sauvegarde : Apps Script → Fichier → **Télécharger** le `.gs` après installation.

---

## 3. Assemblage dans le Sheet

### Import des 5 exports
Chaque `dataset_<ville>.json` → CSV (export CSV Apify, ou convertisseur JSON→CSV) → onglet **`brut_<ville>`** (Fichier → Importer → remplacer l’onglet). Ne plus toucher aux `brut_*`.

### Ordre du menu
`0. Créer la structure master` → `1. Assembler` → `2. Extraire ids/noms` → `3. Nettoyer emails`. Puis lis **`_logs`**.

### Colonnes `master` (21)

```
A nom_entreprise · B place_id · C address · D categoryName · E city
F email_fb · G emails/0 · H emails/1 · I facebook/0 · J instagrams/0
K email_final · L phone · M street · N maps · O website
P email_status · Q Stratégie Email · R Note Lead (/100)
S prenom_dirigeant · T Bonus manuel · U siren
```

Mapping auto : `facebooks/0` → `facebook/0`, `url` → `maps`. Col F = emails trouvés via Facebook.

### Règles de nettoyage (déjà dans le script)
- **Supprimés** : `utilisateur@`, `test@`, `exemple@`, `example.`, `nomdedomaine`, `domaine.com`, `domain.com`, `monsite.fr`, formats invalides.
- **Gardés, listés dans `_logs` à contrôler** : `yespark`, `doctolib`, `linkeo`, `almapay`, `pagesjaunes`, `sante.fr` (souvent l’email du prestataire).
- **Sites plateforme** (`doctolib.fr`, `planity.com`…) signalés : ce ne sont pas de vrais sites.
- **Hors-cible** : via `_stats` (top catégories), suppression manuelle.

---

## 4. Enrichissements (avant la vérif, sinon tu paies 2 fois)

### Facebook (optionnel, ~2 €)
1. Menu → `FB : lister URLs sans email` → `_FB_URLS`.
2. Apify **`apify/facebook-pages-scraper`** : colle les URLs, proxy Residential France, `fr-FR`.
3. Export → colle `URL | email` dans l’onglet **`FB`** (A = URL, B = email).
4. Menu → `FB : fusionner emails trouvés` → col F + `email_final`. Relance l’étape 6 après.

### Hunter.io (optionnel)
Uniquement sur les leads **sans email + avec vrai site**. Domain Search, fiabilité ≥ 75, type Personal. Vérifie que le domaine correspond bien à l’entreprise + ville. Colle en col F.

### API Gouv — prénoms (gratuit)
1. Menu → `Gouv : enrichir prénoms (lot)` → ~150 lignes. Reclique jusqu’à la fin, ou `installer déclencheur auto` (1 lot / 10 min).
2. Remplit `prenom_dirigeant` (S) + `siren` (U). Un `~` = incertain → ne pas utiliser. Un mauvais prénom est pire que pas de prénom.

---

## 5. Vérification des emails

Au run 1 les emails n’ont **pas** été vérifiés : la colonne « valid » voulait juste dire « un email est présent ». Au run 2 :

1. Menu → `4. Exporter emails à vérifier` → `_A_VERIFIER`.
2. Colle dans Bouncer (ou équivalent) → lance.
3. Colle les résultats dans `_VERIF_RESULT` : **A = email, B = statut brut**.
4. Menu → `5. Importer statuts`.

| Statut outil | → `email_status` | Conduite |
|---|---|---|
| deliverable / valid | `valid` | email OK |
| accept-all / catch-all / risky / unknown | `catch-all` | prudent |
| undeliverable / invalid | `invalid` | pas d’email (call / RS) |
| (pas d’email) | `missing` | call / RS |
| (introuvable) | `à vérifier` | revérifier |

On **ne supprime pas** les `invalid` : une ligne invalid + tél + sans site reste un lead call.

---

## 6. Scoring + onglets

### Labels Stratégie (col Q)

| Label | Quand |
|---|---|
| `🎯 NOMINATIF \| Décideur direct \| Pitch direct \| Taux : 35-50%` | Email OK, partie locale **non** générique |
| `🚪 GÉNÉRIQUE \| Intermédiaire \| Passage barrage \| Taux : 15-25%` | Email OK, partie locale **exactement** générique |
| `⚠️ CATCH-ALL \| À tester \| Taux : 20-30%` | statut `catch-all` |
| `⛔ INVALIDE \| Ne pas envoyer` | statut `invalid` |
| `— (Pas d'email valide)` | pas d’email |

Génériques (match **exact** sur la partie avant `@`) : `contact, info, accueil, direction, commercial, devis, agence, secretariat, hello, bonjour, equipe, team, sales, support, sav, facture, facturation, compta, admin, reservation, reservations, rdv, recrutement, rh, presse`.

Donc `contact@` = générique, `contact.dupont@` = nominatif.

### Note Lead (col R)

```
Note = MIN(100 ; Base + Site + Tél + Social + BonusManuel)
Base : NOMINATIF 60 · GÉNÉRIQUE 48 · CATCH-ALL 45 · sans email 10
Site : présent 5 · absent+email 25 · absent+sans email 50
Tél  : mobile 06/07 → 15 · fixe → 6 · absent → 0
Social : FB ou Insta → +5
Bonus manuel (col T) : 0 par défaut
```

Menu `6. Stratégie + Note Lead` calcule et trie (note ↓).

### Onglets (menu 7, 1 clic)

| Onglet | Contenu |
|---|---|
| `master` | Tout, trié note ↓ |
| `A` | Nominatif + **sans site** |
| `B` | Nominatif + site |
| `C` | Générique/Catch-all + sans site |
| `D` | Générique/Catch-all + site |
| `RS` | Pas d’email + FB/Insta |
| `FB` | Import brut Facebook (à coller toi-même) |
| `Sans Site` | Tous sans site |
| `RS Sans Email & Site` | Pas d’email + sans site + RS |

Puis menu `8. Audit qualité` → lis `_stats`.

### Formules (si tu préfères ne pas passer par le script) — Sheets FR, `;`

**B2 place_id :** `=SIERREUR(REGEXEXTRACT(N2;"query_place_id=([^&]+)");"")`

**K2 email_final :** `=SIERREUR(MINUSCULE(SUBSTITUE(SUPPRESPACE(SI(G2<>"";G2;SI(H2<>"";H2;F2)));" ";""));"")`

**P2 statut :** `=SI(K2="";"missing";SIERREUR(RECHERCHEV(K2;_VERIF_RESULT!A:B;2;FAUX);"à vérifier"))`

Le script pose déjà les FILTER des onglets. Inutile de les recoller si tu as lancé le menu 7.

---

## 7. Checklist (dans l’ordre)

- [ ] 5 runs Apify → exports **JSON** → 5 onglets `brut_<ville>`
- [ ] Sheet `maps_run2` → coller `Code.gs` → recharger → menu 0 → 1 → 2 → 3 → lire `_logs`
- [ ] (Optionnel) FB → fusionner ; Hunter sur top sans-email+site ; Gouv prénoms
- [ ] Menu 4 → Bouncer → coller `_VERIF_RESULT` → menu 5
- [ ] Menu 6 → 7 → 8. Contrôler `_stats` (hors-cible, taux email, villes)
- [ ] Copier le Sheet (`maps_run2_AAAA-MM-JJ`) + télécharger le `.gs`
