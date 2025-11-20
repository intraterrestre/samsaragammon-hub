// karma.js

function activarKarma() {
  const audio = new Audio('audio/shadows_-4934#.mp3');
  audio.loop = true;
  audio.play();
}

document.addEventListener('DOMContentLoaded', () => {
  const karmaZona = document.querySelector('.karma-zona');
  if (karmaZona) {
    karmaZona.addEventListener('mouseenter', activarKarma);
  }
});