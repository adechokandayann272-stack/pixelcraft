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
