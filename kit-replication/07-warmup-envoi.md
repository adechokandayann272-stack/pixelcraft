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
