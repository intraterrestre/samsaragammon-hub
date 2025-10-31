document.addEventListener("DOMContentLoaded", () => {
  const buscador = document.getElementById("buscador");
  const resultado = document.getElementById("resultado");

  let diccionario = [];

  // Cargar el JSON
  fetch("diccionario/diccionario.json")
    .then(response => response.json())
    .then(data => {
      diccionario = data;
    })
    .catch(error => {
      resultado.innerHTML = "<p>Error al cargar el diccionario.</p>";
      console.error(error);
    });

  // Buscar término
  buscador.addEventListener("input", () => {
    const query = buscador.value.toLowerCase().trim();
    const entrada = diccionario.find(item => item.termino.toLowerCase() === query);

    if (entrada) {
      resultado.innerHTML = `
        <h3>${entrada.termino}</h3>
        <p><strong>Definición:</strong> ${entrada.definicion}</p>
        <p><strong>Categoría:</strong> ${entrada.categoria}</p>
        <p><strong>Etiquetas:</strong> ${entrada.etiquetas.join(", ")}</p>
        <p><em>${entrada.frase_ritual}</em></p>
      `;
    } else {
      resultado.innerHTML = "<p>No se encontró ese término.</p>";
    }
  });
});