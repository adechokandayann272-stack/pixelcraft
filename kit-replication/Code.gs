/*****************************************************************
 * PIXELCRAFT — Kit réplication prospection Maps (RUN 2)
 * ----------------------------------------------------------------
 * Installation : Google Sheet vierge → Extensions → Apps Script →
 * coller tout ce fichier → Enregistrer → recharger le Sheet →
 * menu "🚀 PixelCraft" apparaît.
 *
 * Ordre d'utilisation (voir CHECKLIST-RUN2.md) :
 *  1. creerStructureFinale (1 fois)
 *  2. importer tes exports Apify dans des onglets brut_<ville>
 *  3. assemblerBrut → extraireIdsEtNoms → nettoyerEmails
 *  4. enrichissements (FB/Hunter/Gouv) — voir 04-enrichissements.md
 *  5. exporterEmailsAVerifier → (outil externe) → importerStatuts
 *  6. appliquerStrategieEtScore → genererSegments → auditQualite
 *
 * Conventions : colonnes retrouvées par NOM (insensible à la casse),
 * écritures par lots (getValues/setValues), logs dans _logs.
 *****************************************************************/

const PC = {
  FINAL: 'FINAL',
  LOGS: '_logs',
  STATS: '_stats',
  A_VERIFIER: 'A_VERIFIER',
  VERIF_RESULT: 'VERIF_RESULT',
  FB_URLS: 'FB_URLS',
  FB_RESULT: 'FB_RESULT',

  HEADERS_FINAL: [
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

  // Barème Note Lead v2 (voir 06-segmentation-scoring.md pour les preuves)
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
    .addItem('0. Créer la structure FINAL', 'creerStructureFinale')
    .addSeparator()
    .addItem('1. Assembler les bruts → FINAL', 'assemblerBrut')
    .addItem('2. Extraire place_id + noms', 'extraireIdsEtNoms')
    .addItem('3. Nettoyer emails + email_final', 'nettoyerEmails')
    .addSeparator()
    .addItem('4. Exporter emails à vérifier', 'exporterEmailsAVerifier')
    .addItem('5. Importer statuts vérification', 'importerStatuts')
    .addItem('6. Stratégie + Note Lead', 'appliquerStrategieEtScore')
    .addItem('7. Générer onglets P1→P6', 'genererSegments')
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
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function toast_(msg) {
  SpreadsheetApp.getActiveSpreadsheet().toast(msg, '🚀 PixelCraft');
}

/* ============================== 0. STRUCTURE ============================== */

function creerStructureFinale() {
  const s = getOrCreateSheet_(PC.FINAL);
  s.clear();
  s.getRange(1, 1, 1, PC.HEADERS_FINAL.length).setValues([PC.HEADERS_FINAL]);
  s.setFrozenRows(1);
  // Format perso de la note : 100 → "100 / 100"
  s.getRange(2, 18, Math.max(s.getMaxRows() - 1, 1), 1).setNumberFormat('0" / 100"');
  journal_('creerStructureFinale', 'Structure FINAL créée (' + PC.HEADERS_FINAL.length + ' colonnes).');
  toast_('Onglet FINAL prêt ✅');
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
  const fin = getOrCreateSheet_(PC.FINAL);
  if (fin.getLastRow() === 0) creerStructureFinale();

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
      if (timeUp_(start)) { journal_('assemblerBrut', 'STOP anti-timeout à ' + sh.getName() + ' ligne ' + (r + 1) + ' — relance pour continuer (déjà ' + out.length + ' assemblées, non écrites).'); return; }
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
  fin.getRange(2, 1, data.length, PC.HEADERS_FINAL.length).setValues(data);
  journal_('assemblerBrut', lus + ' lignes lues dans ' + bruts.length + ' brut(s), ' + dups + ' doublons fusionnés, ' + out.length + ' lignes écrites dans FINAL.');
  toast_('Assemblé : ' + out.length + ' lignes (' + dups + ' doublons fusionnés) ✅');
}

/* ============================== 2. IDS + NOMS ============================== */

function cleanNomAffichage_(brut) {
  let s = String(brut || '');
  try { s = decodeURIComponent(s.replace(/\+/g, ' ')); } catch (e) { /* déjà décodé */ }
  s = s.split(' - ')[0].split(' | ')[0].split(',')[0];
  s = s.replace(/["«»]/g, '').replace(/['’ʼ]/g, "'").replace(/\s+/g, ' ').trim();
  // Casse de titre mot à mot (espaces + tirets), minuscules après apostrophe : D'avocat
  s = s.toLowerCase().split(' ').map(w =>
    w.split('-').map(p => (p.charAt(0).toUpperCase() + p.slice(1))).join('-')
  ).join(' ');
  return s;
}

function extraireIdsEtNoms() {
  const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PC.FINAL);
  if (!s || s.getLastRow() < 2) { SpreadsheetApp.getUi().alert('FINAL vide. Lance l\'assemblage d\'abord.'); return; }
  const n = s.getLastRow() - 1;
  const vals = s.getRange(2, 1, n, PC.HEADERS_FINAL.length).getValues();
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
    } else {
      // Nettoie légèrement les noms issus de title (ne touche pas aux retouches manuelles : 1 seul passage)
      // (volontairement conservateur : on ne re-touche pas)
    }
  }
  s.getRange(2, 1, n, PC.HEADERS_FINAL.length).setValues(vals);
  journal_('extraireIdsEtNoms', pidN + ' place_id extraits, ' + nomN + ' noms reconstruits depuis les URL.');
  toast_('IDs + noms OK ✅ (' + pidN + ' ids, ' + nomN + ' noms)');
}

/* ============================== 3. NETTOYAGE EMAILS ============================== */

function nettoyerEmails() {
  const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PC.FINAL);
  if (!s || s.getLastRow() < 2) { SpreadsheetApp.getUi().alert('FINAL vide.'); return; }
  const n = s.getLastRow() - 1;
  const vals = s.getRange(2, 1, n, PC.HEADERS_FINAL.length).getValues();
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
  s.getRange(2, 1, n, PC.HEADERS_FINAL.length).setValues(vals);
  journal_('nettoyerEmails', 'Supprimés auto: ' + autoN + ', format invalide: ' + badN + ', doublons G/H: ' + dedupN +
    '. | À CONTRÔLER (liste grise, gardés) : ' + (grise.slice(0, 30).join(' ; ') || 'aucun') +
    (grise.length > 30 ? ' (+' + (grise.length - 30) + ' autres)' : '') +
    ' | Sites plateforme (pas des vrais sites ?) : ' + (plateformes.slice(0, 30).join(' ; ') || 'aucun'));
  toast_('Nettoyage OK ✅ (' + autoN + ' poubelle, ' + badN + ' invalides, ' + grise.length + ' à contrôler → _logs)');
}

/* Variante v2 (optionnelle, désactivée par défaut) : préfère l'email NOMINATIF
   parmi G/H/F au lieu du premier non-vide. Ex run 1 : question@ → laurent.denis@ */
function choisirMeilleurEmail() {
  const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PC.FINAL);
  if (!s || s.getLastRow() < 2) return;
  const n = s.getLastRow() - 1;
  const vals = s.getRange(2, 1, n, PC.HEADERS_FINAL.length).getValues();
  let changed = 0;
  for (let i = 0; i < vals.length; i++) {
    const r = vals[i];
    const cands = [r[6], r[7], r[5]].filter(e => e);
    if (!cands.length) { r[10] = ''; continue; }
    const nomi = cands.filter(e => !isGenerique_(e));
    const best = nomi.length ? nomi[0] : cands[0];
    if (best !== r[10]) { r[10] = best; changed++; }
  }
  s.getRange(2, 1, n, PC.HEADERS_FINAL.length).setValues(vals);
  journal_('choisirMeilleurEmail', changed + ' email_final améliorés (préférence nominatif). Pense à relancer l\'étape 6.');
  toast_(changed + ' emails améliorés ✅ (relance l\'étape 6)');
}

/* ============================== 4-5. VÉRIFICATION ============================== */

function exporterEmailsAVerifier() {
  const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PC.FINAL);
  if (!s || s.getLastRow() < 2) { SpreadsheetApp.getUi().alert('FINAL vide.'); return; }
  const n = s.getLastRow() - 1;
  const vals = s.getRange(2, 1, n, PC.HEADERS_FINAL.length).getValues();
  const seen = {};
  const out = [['email', 'ligne_final', 'strategie_actuelle']];
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
  if (/risky|risque|unknown|inconnu/.test(t)) return 'catch-all'; // v2 : risky → bucket catch-all (tester prudemment)
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
  const s = ss.getSheetByName(PC.FINAL);
  const n = s.getLastRow() - 1;
  const vals = s.getRange(2, 1, n, PC.HEADERS_FINAL.length).getValues();
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
  s.getRange(2, 1, n, PC.HEADERS_FINAL.length).setValues(vals);
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
  const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PC.FINAL);
  if (!s || s.getLastRow() < 2) { SpreadsheetApp.getUi().alert('FINAL vide.'); return; }
  const n = s.getLastRow() - 1;
  const vals = s.getRange(2, 1, n, PC.HEADERS_FINAL.length).getValues();
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
  s.getRange(2, 1, n, PC.HEADERS_FINAL.length).setValues(vals);
  // Tri décroissant sur la note (comme ton fichier run 1)
  s.getRange(2, 1, n, PC.HEADERS_FINAL.length).sort({ column: 18, ascending: false });
  journal_('appliquerStrategieEtScore', n + ' lignes scorées + triées (note décroissante).');
  toast_(n + ' lignes scorées ✅');
}

/* ============================== 7. SEGMENTS P1→P6 ============================== */

function genererSegments() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const F = PC.FINAL + '!';
  const segs = [
    ['P1_CREATION_CHAUDE', 'FILTER(' + F + 'A2:U; REGEXMATCH(' + F + 'Q2:Q; "NOMINATIF"); ' + F + 'O2:O=""; ' + F + 'R2:R>=85)'],
    ['P2_CREATION_TIEDE', 'FILTER(' + F + 'A2:U; REGEXMATCH(' + F + 'Q2:Q; "GÉNÉRIQUE|CATCH-ALL"); ' + F + 'O2:O="")'],
    ['P3_REFONTE', 'FILTER(' + F + 'A2:U; REGEXMATCH(' + F + 'Q2:Q; "NOMINATIF|GÉNÉRIQUE|CATCH-ALL"); ' + F + 'O2:O<>"")'],
    ['P4_COLD_CALL', 'FILTER(' + F + 'A2:U; REGEXMATCH(' + F + 'Q2:Q; "Pas d\'email|INVALIDE"); ' + F + 'L2:L<>"")'],
    ['P5_RS_DM', 'FILTER(' + F + 'A2:U; REGEXMATCH(' + F + 'Q2:Q; "Pas d\'email|INVALIDE"); ' + F + 'L2:L=""; (' + F + 'I2:I<>"")+(' + F + 'J2:J<>"")>0)'],
    ['P6_ARCHIVE', 'FILTER(' + F + 'A2:U; REGEXMATCH(' + F + 'Q2:Q; "Pas d\'email|INVALIDE"); ' + F + 'L2:L=""; (' + F + 'I2:I="")*(' + F + 'J2:J=""))']
  ];
  segs.forEach(sg => {
    const sh = getOrCreateSheet_(sg[0]);
    sh.clear();
    sh.getRange('A1').setFormula('={' + F + 'A1:U1}');
    sh.getRange('A2').setFormula('=SIERREUR(' + sg[1] + '; "— vide —")');
    sh.setFrozenRows(1);
  });
  journal_('genererSegments', 'Onglets P1→P6 créés (formules FILTER dynamiques sur FINAL).');
  toast_('Segments P1→P6 créés ✅');
}

/* ============================== 8. AUDIT ============================== */

function auditQualite() {
  const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PC.FINAL);
  if (!s || s.getLastRow() < 2) { SpreadsheetApp.getUi().alert('FINAL vide.'); return; }
  const n = s.getLastRow() - 1;
  const vals = s.getRange(2, 1, n, PC.HEADERS_FINAL.length).getValues();
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
  const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PC.FINAL);
  if (!s || s.getLastRow() < 2) { SpreadsheetApp.getUi().alert('FINAL vide.'); return; }
  const n = s.getLastRow() - 1;
  const vals = s.getRange(2, 1, n, PC.HEADERS_FINAL.length).getValues();
  const seen = {};
  const out = [['fb_url_clean', 'ligne_final', 'nom_entreprise']];
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
    SpreadsheetApp.getUi().alert('Colle d\'abord l\'export FB dans ' + PC.FB_RESULT + ' : colonne A = URL page, colonne B = email trouvé.');
    getOrCreateSheet_(PC.FB_RESULT);
    return;
  }
  const map = {};
  f.getRange(2, 1, f.getLastRow() - 1, 2).getValues().forEach(r => {
    const u = cleanFbUrl_(r[0]);
    const e = cleanEmail_(r[1]);
    if (u && e && PC.EMAIL_OK.test(e) && !PC.POUBELLE_AUTO.test(e)) map[u] = e;
  });
  const s = ss.getSheetByName(PC.FINAL);
  const n = s.getLastRow() - 1;
  const vals = s.getRange(2, 1, n, PC.HEADERS_FINAL.length).getValues();
  let n2 = 0;
  vals.forEach(r => {
    if (cleanEmail_(r[10])) return;
    const hit = map[cleanFbUrl_(r[8])];
    if (hit) { r[5] = hit; r[10] = r[6] || r[7] || hit; n2++; }
  });
  s.getRange(2, 1, n, PC.HEADERS_FINAL.length).setValues(vals);
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
  const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PC.FINAL);
  if (!s || s.getLastRow() < 2) { SpreadsheetApp.getUi().alert('FINAL vide.'); return; }
  const n = s.getLastRow() - 1;
  let row = Number(props.getProperty('PC_GOV_ROW') || 2);
  if (row < 2 || row > n + 1) row = 2;
  const vals = s.getRange(2, 1, n, PC.HEADERS_FINAL.length).getValues();
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
    if (traites % 20 === 0) s.getRange(2, 1, n, PC.HEADERS_FINAL.length).setValues(vals); // sauvegarde intermédiaire
    row = i + 3;
  }
  s.getRange(2, 1, n, PC.HEADERS_FINAL.length).setValues(vals);
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
