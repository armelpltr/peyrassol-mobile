/**
 * Peyrassol — carrousels (slider d'accueil et labels)
 * Le défilement repose sur le scroll-snap CSS : sans JS, tout reste
 * consultable au glisser ; ce script ajoute les points et les flèches.
 */
(function () {
  'use strict';

  function scrollToItem(track, index) {
    var item = track.children[index];
    if (!item) return;
    track.scrollTo({ left: item.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  }

  // Index de l'élément le plus proche du bord gauche visible
  function currentIndex(track) {
    var best = 0;
    var bestDistance = Infinity;
    Array.prototype.forEach.call(track.children, function (item, i) {
      var distance = Math.abs(item.offsetLeft - track.offsetLeft - track.scrollLeft);
      if (distance < bestDistance) {
        best = i;
        bestDistance = distance;
      }
    });
    return best;
  }

  // Slider d'accueil : un point par image
  document.querySelectorAll('[data-slider]').forEach(function (slider) {
    var track = slider.querySelector('[data-slider-track]');
    var dotsBox = slider.querySelector('[data-slider-dots]');
    if (!track || !dotsBox) return;

    var dots = Array.prototype.map.call(track.children, function (slide, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'hero-slider__dot';
      dot.setAttribute('aria-label', 'Image ' + (i + 1));
      dot.addEventListener('click', function () { scrollToItem(track, i); });
      dotsBox.appendChild(dot);
      return dot;
    });

    function update() {
      var active = currentIndex(track);
      dots.forEach(function (dot, i) {
        dot.setAttribute('aria-current', String(i === active));
      });
    }

    track.addEventListener('scroll', function () {
      window.requestAnimationFrame(update);
    }, { passive: true });
    update();
  });

  // Labels : flèches précédent / suivant
  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    var track = carousel.querySelector('[data-carousel-track]');
    if (!track) return;

    function step(direction) {
      var last = track.children.length - 1;
      var next = currentIndex(track) + direction;
      if (next < 0) next = last;
      if (next > last) next = 0;
      scrollToItem(track, next);
    }

    var arrows = carousel.querySelectorAll('[data-carousel-prev], [data-carousel-next]');
    carousel.querySelector('[data-carousel-prev]').addEventListener('click', function () { step(-1); });
    carousel.querySelector('[data-carousel-next]').addEventListener('click', function () { step(1); });

    // Flèches désactivées quand tous les labels tiennent à l'écran
    function updateArrows() {
      var scrollable = track.scrollWidth > track.clientWidth + 1;
      arrows.forEach(function (arrow) { arrow.disabled = !scrollable; });
    }

    window.addEventListener('resize', updateArrows);
    window.addEventListener('load', updateArrows);
    updateArrows();
  });
})();
