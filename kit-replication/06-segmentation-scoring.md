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
