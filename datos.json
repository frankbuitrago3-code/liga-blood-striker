// Cargar datos desde datos.json
fetch('datos.json')
  .then(response => response.json())
  .then(datos => {
    
    // -------------------------
    // 1️⃣ Tabla de Clanes
    // -------------------------
    const tabla = document.getElementById('tabla-clanes').getElementsByTagName('tbody')[0];

    // Ordenar clanes por puntos descendente
    const clanesOrdenados = datos.clanes.sort((a, b) => b.puntos - a.puntos);

    tabla.innerHTML = ''; // limpiar tabla antes de agregar

    clanesOrdenados.forEach((clan, index) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${index + 1}</td>
        <td>${clan.nombre}</td>
        <td class="puntaje">
          <span class="barra"><span class="relleno" style="width:0%"></span></span> ${clan.puntos}
        </td>
        <td class="kills">${clan.kills}</td>
      `;
      tabla.appendChild(fila);
    });

    // Animación de barras de puntos
    const barras = document.querySelectorAll('.relleno');
    clanesOrdenados.forEach((clan, i) => {
      setTimeout(() => {
        barras[i].style.width = `${(clan.puntos / clanesOrdenados[0].puntos) * 100}%`;
      }, 200);
    });

    // -------------------------
    // 2️⃣ Top 5 jugadores con más kills
    // -------------------------
    const top5Container = document.querySelector('.top5-jugadores');
    if (top5Container) {
      top5Container.innerHTML = '';
      const top5 = datos.jugadores
        .sort((a, b) => b.kills - a.kills)
        .slice(0, 5);

      top5.forEach((jugador, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <h3>${index + 1}. ${jugador.nombre}</h3>
          <p>Clan: ${jugador.clan}</p>
          <p>Kills: ${jugador.kills}</p>
        `;
        top5Container.appendChild(card);
      });
    }

  })
  .catch(error => console.error('Error al cargar datos.json:', error));

