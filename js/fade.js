// fade.js

function aplicarFade(elemento) {
  elemento.classList.add('fade-in');
  setTimeout(() => {
    elemento.classList.remove('fade-in');
  }, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
  const elementos = document.querySelectorAll('.fadeable');
  elementos.forEach(el => aplicarFade(el));
});