function activarAudioYRedirigir() {
  const audio = new Audio('audio/ritual-l4d1c0m0.mp3');
  audio.loop = true;
  audio.play();

  setTimeout(() => {
    window.location.href = 'juego.html';
  }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
  const luna = document.querySelector('.luna-superpuesta');
  if (luna) {
    luna.addEventListener('click', activarAudioYRedirigir);
  }
});