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
