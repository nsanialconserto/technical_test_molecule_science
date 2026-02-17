# Test technique — Angular, GraphQL, Node, NestJS

**Durée indicative :** 30 min (prévoir jusqu’à 1 h). Les étapes sont **interdépendantes** : il faut valider une étape avant de passer à la suivante.

## Prérequis

- Node 20+
- `pnpm install:all`

## Démarrer l’environnement

1. **API** (NestJS + GraphQL) : `pnpm api` → http://localhost:3000/graphql  
2. **Client** (Angular) : `pnpm client` → http://localhost:4200  

---

## Étape 1 — Corriger le build (obligatoire)

Le projet ne build pas. **Corriger l’erreur** pour que les deux commandes passent :

- `pnpm build:api`
- `pnpm build:client`

Une fois les deux builds verts, vous pouvez passer à l’étape 2.

---

## Étape 2 — NestJS : méthodes du resolver

Le **SuperheroService** est déjà implémenté (create, get, getAll, update avec la JSON DB).  
Le **SuperheroResolver** est en place mais les méthodes GraphQL sont vides ou absentes.

**À faire :**

- Implémenter la **mutation** `updateSuperhero` qui prend un `id` et un input (ex. `name`, `power`) et met à jour le héros (délégation au service).

Tester dans le playground GraphQL : http://localhost:3000/graphql

---

## Étape 3 — Angular : GraphQL + gateway

**À faire :**

- Créer la **mutation** `UpdateSuperhero` (id + champs modifiables) pour mettre à jour un super-héros.
- Implémenter le **SuperheroGateway** (port déjà défini) : méthodes qui appellent ces opérations GraphQL et retournent des `Observable`.

L’appel à l’API se fait vers `http://localhost:3000/graphql` (déjà configurée dans le client).

---

## Étape 4 — Angular : store + Material + Observables

**À faire :**

- Compléter le **SuperheroesStore** (signalStore) pour :
  - Exposer un état (liste, loading, erreur).
  - Utiliser le **SuperheroGateway** pour mettre à jour un héros (mutation).
  - Gérer loading/erreur avec RxJS (tap, catchError, etc.).
- Dans le composant **Superheroes** :
  - Permettre l’édition (nom ou pouvoir) via **MatDialog** ou formulaire inline, en utilisant le store (et donc la mutation).
  - S’abonner au store avec les **observables/signaux** appropriés (pas de subscription manuelle non gérée).

**Bonus :**

- Ajouter le tri sur le tableau avec **MatSort**

---

## Récapitulatif des compétences évaluées

| Domaine        | Attendu |
|----------------|--------|
| **Angular**    | Store (signalStore), Gateway (abstraction), Material (MatTable, MatDialog), Observables/RxJS |
| **GraphQL**    | Query (liste), Mutation (mise à jour), utilisation côté client (Apollo) |
| **Node/NestJS**| Resolver GraphQL (query + mutation), délégation au service |
| **Setup**      | JSON DB (fichier), pas de PostgreSQL |

---

## Validation rapide

- **Étape 1 :** `pnpm build` réussit.
- **Étape 2 :** Dans le playground, `superheroes` et `updateSuperhero` fonctionnent.
- **Étape 3 :** Le gateway est utilisé par le store et les appels partent bien vers l’API.
- **Étape 4 :** Liste en MatTable, édition possible, store + observables utilisés correctement.
