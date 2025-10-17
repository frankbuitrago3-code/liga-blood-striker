document.addEventListener('DOMContentLoaded', () => {
  const filas = document.querySelectorAll('#tabla-clanes tbody tr');

  // Calcular máximo de puntos
  let maxPuntos = 0;
  filas.forEach(fila => {
    const puntos = parseInt(fila.dataset.puntos);
    if (puntos > maxPuntos) maxPuntos = puntos;
  });

  // Animar filas
  filas.forEach((fila, i) => {
    const puntos = parseInt(fila.dataset.puntos);
    const kills = parseInt(fila.dataset.kills);
    const tdPuntos = fila.querySelector('.puntaje');
    const tdKills = fila.querySelector('.kills');
    const relleno = tdPuntos.querySelector('.relleno');

    // Barra de progreso animada
    setTimeout(() => {
      const porcentaje = (puntos / maxPuntos) * 100;
      relleno.style.width = porcentaje + '%';
    }, 200 * i);

    // Contador de puntos y kills tipo scoreboard
    let contadorP = 0;
    let contadorK = 0;
    const duracion = 1000;
    const incrementoP = puntos / (duracion / 16);
    const incrementoK = kills / (duracion / 16);

    function animar() {
      contadorP += incrementoP;
      contadorK += incrementoK;
      if(contadorP < puntos) {
        tdPuntos.childNodes[1].nodeValue = Math.floor(contadorP);
        tdKills.textContent = Math.floor(contadorK);
        requestAnimationFrame(animar);
      } else {
        tdPuntos.childNodes[1].nodeValue = puntos;
        tdKills.textContent = kills;
      }
    }
    animar();
  });

  // Animación de tarjetas
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, i) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      card.style.transition = 'all 0.6s ease';
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }, 200 * i);
  });
});
