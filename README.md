# Peyrassol — versions mobiles

Intégration HTML/CSS/JS (sans framework) de trois pages du site de la Commanderie de Peyrassol, d'après les maquettes desktop Figma, avec leurs versions tablette et mobile.

**Démo :** https://armelpltr.github.io/peyrassol-mobile/

## Pages

| Page | Fichier |
| --- | --- |
| Accueil | `index.html` |
| Nos vins | `nos-vins.html` |
| Restaurants | `restaurants.html` |
| Menu mobile | dans le header de chaque page (bouton burger) |

En haut de chaque page, une barre de démo donne accès aux 4 pages (le bouton « Menu mobile » ouvre la version mobile menu déployé) et à l'**aperçu PC / Mobile**, qui permet de voir les deux versions depuis n'importe quel écran (`demo.css` + `demo-switch.js`, à ne pas reprendre dans le thème WordPress).

## Structure

```
assets/
  css/style.css        base desktop (maquettes 1440 px)
  css/mobile.css       responsive uniquement : media queries chargées après style.css
  js/menu-mobile.js    menu burger + sous-menus en accordéon (vanilla JS)
  js/main.js           slider d'accueil et carrousel des labels
  img/                 images extraites des maquettes, optimisées pour le web
```

## Points de rupture

| Largeur | Comportement |
| --- | --- |
| ≥ 1024 px | desktop, navigation avec sous-menus au survol |
| ≤ 1023 px | tablette : menu burger plein écran, blocs image + texte empilés, cartes sur 2 colonnes |
| ≤ 767 px | mobile : carrousels horizontaux, boutons pleine largeur |

## Lancer en local

Aucune compilation : ouvrir `index.html` dans un navigateur.
