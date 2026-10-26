/**
 * Peyrassol — menu mobile (vanilla JS, sans dépendance)
 *
 * - Bouton burger : ouvre / ferme le panneau de navigation (#main-nav)
 * - Chevrons : sous-menus en accordéon, un seul ouvert à la fois
 * - Fermeture : touche Échap, clic sur un lien, retour en affichage desktop
 * - Accessibilité : aria-expanded à jour, focus piégé dans le panneau ouvert
 */
(function () {
  'use strict';

  var BREAKPOINT = '(max-width: 1023px)';

  var burger = document.querySelector('.burger');
  var nav = document.getElementById('main-nav');
  if (!burger || !nav) return;

  var toggles = nav.querySelectorAll('.main-nav__toggle');
  var mobileQuery = window.matchMedia(BREAKPOINT);

  function isOpen() {
    return nav.classList.contains('is-open');
  }

  function focusables() {
    return Array.prototype.filter.call(
      nav.querySelectorAll('a[href], button'),
      function (el) { return el.offsetParent !== null; }
    );
  }

  function openMenu() {
    nav.classList.add('is-open');
    document.body.classList.add('menu-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Fermer le menu');
    var first = focusables()[0];
    if (first) first.focus();
  }

  function closeMenu(restoreFocus) {
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
    closeAllSubmenus();
    if (restoreFocus) burger.focus();
  }

  function setSubmenu(toggle, open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.parentElement.classList.toggle('is-open', open);
  }

  function closeAllSubmenus(except) {
    toggles.forEach(function (toggle) {
      if (toggle !== except) setSubmenu(toggle, false);
    });
  }

  burger.addEventListener('click', function () {
    if (isOpen()) {
      closeMenu(false);
    } else {
      openMenu();
    }
  });

  toggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') !== 'true';
      closeAllSubmenus(toggle);
      setSubmenu(toggle, open);
    });
  });

  // Un lien suivi ferme le menu (utile pour les ancres de la même page)
  nav.addEventListener('click', function (event) {
    if (isOpen() && event.target.closest('a[href]')) closeMenu(false);
  });

  document.addEventListener('keydown', function (event) {
    if (!isOpen()) return;

    if (event.key === 'Escape') {
      closeMenu(true);
      return;
    }

    // Garde le focus clavier dans le panneau (burger compris)
    if (event.key === 'Tab') {
      var items = [burger].concat(focusables());
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  // Passage en desktop : on remet tout à zéro
  mobileQuery.addEventListener('change', function (event) {
    if (!event.matches && isOpen()) closeMenu(false);
    if (!event.matches) closeAllSubmenus();
  });
})();
