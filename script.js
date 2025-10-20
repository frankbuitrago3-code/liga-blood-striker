// script.js

// === Cargar datos del JSON ===
async function cargarDatos() {
  const response = await fetch('datos.json');
  const datos = await response.json();
  actualizarTabla(datos);
  actualizarTopKills(datos);
  animarBarras();
}

// === Actualizar tabla de clanes ===
function actualizarTabla(datos) {
  const tbody = document.querySelector('#tabla-clanes tbody');
  tbody.innerHTML = '';

  datos.sort((a,b) => b.puntos - a.puntos);

  datos.forEach((clan, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index+1}</td>
      <td>${clan.nombre}</td>
      <td class="puntaje">
        <span class="barra"><span class="relleno" style="width:0%"></span></span>
        ${clan.puntos}
      </td>
      <td class="kills">${clan.kills}</td>
    `;
    tbody.appendChild(tr);
  });
}

// === Top 5 jugadores con más kills ===
function actualizarTopKills(datos) {
  const cont = document.querySelector('#top-kills-container');
  cont.innerHTML = '';

  const top5 = [...datos].sort((a,b) => b.kills - a.kills).slice(0,5);

  top5.forEach((jugador, idx) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<h3>${idx+1}. ${jugador.nombre}</h3><p>Kills: ${jugador.kills}</p>`;
    cont.appendChild(card);
  });
}

// === Animar barras de puntos ===
function animarBarras() {
  const barras = document.querySelectorAll('.relleno');
  barras.forEach(b => {
    const porcentaje = b.parentElement.nextSibling.textContent.trim().split(' ')[0];
    b.style.width = porcentaje*5+'%';
  });
}

// === Partículas de fondo ===
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.size = Math.random()*2 + 1;
    this.speedX = Math.random()*1 - 0.5;
    this.speedY = Math.random()*1 - 0.5;
    this.color = `rgba(255,0,51,0.7)`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x < 0) this.x = canvas.width;
    if(this.x > canvas.width) this.x = 0;
    if(this.y < 0) this.y = canvas.height;
    if(this.y > canvas.height) this.y = 0;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for(let i=0; i<100; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// === Inicialización ===
initParticles();
animateParticles();
cargarDatos();
