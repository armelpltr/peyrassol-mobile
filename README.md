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
| ≥ 1280 px | desktop, navigation complète avec sous-menus au survol |
| ≤ 1279 px | menu burger plein écran |
| ≤ 1023 px | tablette : blocs image + texte empilés, cartes sur 2 colonnes |
| ≤ 767 px | mobile : carrousels horizontaux, boutons pleine largeur |

## Lancer en local

Aucune compilation : ouvrir `index.html` dans un navigateur.
