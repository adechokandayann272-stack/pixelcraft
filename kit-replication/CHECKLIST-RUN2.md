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
