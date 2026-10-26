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
