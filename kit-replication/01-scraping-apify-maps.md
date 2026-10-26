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
