# da-christian-portfolio

Ce projet est un portfolio statique développé avec Gulp et SCSS.

## Structure du projet

```
├── gulpfile.js         # Configuration des tâches Gulp
├── package.json        # Dépendances et scripts npm/yarn
├── src/                # Source du projet (SCSS, JS, images, etc.)
│   ├── scss/
│   ├── js/
│   ├── images/
│   └── ...
└── dist/               # Dossier généré pour la production (build)
```

## Installation

1. Clonez le dépôt :
   ```sh
   git clone https://github.com/Hop-Syder/da-christian-portfolio.git
   cd da-christian-portfolio
   ```
2. Installez les dépendances :
   ```sh
   npm install
   # ou
   yarn install
   ```

## Développement local

Pour lancer le serveur de développement (avec rechargement automatique et gestion des assets) :

```sh
yarn run dev
# ou
npm run dev
```

## Génération du build de production

Pour générer les fichiers optimisés dans le dossier `dist` :

```sh
yarn run build
# ou
npm run build
```

## Déploiement

### 1. Sur Vercel

- Connectez votre dépôt GitHub à Vercel
- Configurez la commande de build : `yarn run build` ou `npm run build`
- Configurez le dossier de sortie : `dist`
- Vercel va automatiquement générer et servir le site

### 2. Sur Netlify

- Importez le projet
- Commande de build : `yarn run build` ou `npm run build`
- Dossier de publication : `dist`

### 3. Sur un serveur web (FTP, Apache, Nginx)

- Générez le build (`dist`)
- Uploadez le contenu de `dist` dans le dossier public de votre serveur (`www`, `public_html`, etc.)

## Bonnes pratiques

- Le dossier `dist` n’est pas versionné sur Git (voir `.gitignore`)
- Les images et assets doivent être placés dans `src/images` et seront copiés dans `dist` lors du build
- Modifiez les chemins des images si besoin pour garantir leur affichage en production

## Scripts utiles

- `yarn run dev` : serveur local avec hot reload
- `yarn run build` : build de production

## Questions fréquentes

- **Pourquoi le dossier `dist` n’est pas sur Git ?**
  Il est généré à chaque build, inutile de le versionner.
- **Comment déployer facilement ?**
  Utilisez Vercel ou Netlify pour automatiser le build et le déploiement.

══════════════════════════════════════════════════
@hopsyder | Data Scientist & Full-Stack Developer
Nexus Partners - Intelligent Solutions
══════════════════════════════════════════════════
Stack: ML/DL • React/Node • Flutter • DevOps
