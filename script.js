// ==============================
// SCRIPT PRINCIPAL - ELE ILUSIONISTA
// ==============================

// Temporizador interno para el efecto máquina de escribir
let typewriterTimeout;
// Paso actual de la rutina
let trickStep = 0;

// ==============================
// CONJUNTOS DE CARTAS
// ==============================
const firstSetOfCards = [
  "assets/3x/jt.png",
  "assets/3x/kh.png",
  "assets/3x/qs.png",
  "assets/3x/jd.png",
  "assets/3x/ks.png",
  "assets/3x/qh.png",
];
const secondSetOfCards = [
  "assets/3x/js.png",
  "assets/3x/kd.png",
  "assets/3x/qt.png",
  "assets/3x/jh.png",
  "assets/3x/qd.png",
];

// ==============================
// ELEMENTOS DEL DOM
// ==============================
const cardsContainer      = document.getElementById("cardsContainer");
const interactionContainer = document.getElementById("interactionContainer");
const donatePopup         = document.getElementById("donatePopup");
const donateButton        = document.getElementById("donarButton");
const closeButton         = document.querySelector(".close");
const copyButton          = document.getElementById("copyButton");
const transferData        = document.getElementById("transferData");
const continueButton      = document.getElementById("continueButton");
// Usamos el DIV ya existente en el HTML, no creamos uno nuevo
const thankYouMessage     = document.getElementById("thankYouMessage");

// ==============================
// TEXTOS DE LA RUTINA
// ==============================
const mensajes = [
  "Si estás aquí es porque nos encontramos en algún lugar de este mundo. Ahora quiero sorprenderte con este clásico.",
  "Piensa en una de estas cartas, y nómbrala mentalmente...",
  "Nombra nuevamente esa carta en tu mente 3 veces. Luego aprieta continuar.",
  "Creo que ya sé cuál pensaste, la sacaré del set.",
  "¿Sorprendido? ... para eso estoy acá. Si te gusta mi trabajo y quieres apoyarme, más abajo encontrarás mis datos de transferencia, así como también mi Instagram y mi WhatsApp.",
  "¡Muchas gracias!"
];

// ==============================
// EFECTO MÁQUINA DE ESCRIBIR
// ==============================
function typewriterEffect(element, text, speed = 30, callback) {
  clearTimeout(typewriterTimeout);
  let i = 0;
  element.textContent = "";
  function write() {
    if (i < text.length) {
      element.textContent += text.charAt(i++);
      typewriterTimeout = setTimeout(write, speed);
    } else if (callback) {
      callback();
    }
  }
  write();
}

// ==============================
// MOSTRAR UN CONJUNTO DE CARTAS
// ==============================
function showCards(cards) {
  cardsContainer.innerHTML = "";
  cards.forEach((src, index) => {
    setTimeout(() => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Carta";
      img.classList.add("card");
      cardsContainer.appendChild(img);
    }, index * 300);
  });
}

// ==============================
// DESVANECER CARTAS CON TORNADO
// ==============================
function vanishCards() {
  const cards = cardsContainer.querySelectorAll(".card");
  cards.forEach((card, idx) => {
    setTimeout(() => {
      card.classList.add("tornado");
      card.addEventListener("animationend", () => card.remove(), { once: true });
    }, idx * 100);
  });
}

// ==============================
// AVANZAR AL SIGUIENTE PASO
// ==============================
function nextStep() {
  const textEl = interactionContainer.querySelector(".typewriter-text");
  if (!textEl) return;

  // Limpiar resaltado y cartas previas
  continueButton.classList.remove("highlight");
  cardsContainer.innerHTML = "";

  switch (trickStep) {
    case 0:
      // Paso 1: mostrar primer set de cartas
      typewriterEffect(textEl, mensajes[0], 30, () => {
        showCards(firstSetOfCards);
        continueButton.classList.add("highlight");
      });
      break;

    case 1:
      // Paso 2: repetir mentalmente
      typewriterEffect(textEl, mensajes[1], 30, () => {
        continueButton.classList.add("highlight");
      });
      break;

    case 2:
      // Paso 3: mostrar segundo set de cartas
      typewriterEffect(textEl, mensajes[2], 30, () => {
        showCards(secondSetOfCards);
        continueButton.classList.add("highlight");
      });
      break;

    case 3:
      // Paso 4: invitación a donar
      typewriterEffect(textEl, mensajes[3], 30, () => {
        continueButton.classList.add("highlight");
      });
      break;

    case 4:
      // Paso 5: final predicción y agradecimiento
      vanishCards();
      typewriterEffect(textEl, mensajes[4], 30);
      // Mostrar mensaje de agradecimiento
      thankYouMessage.style.display = "block";
      thankYouMessage.style.opacity = "0";
      setTimeout(() => {
        thankYouMessage.style.transition = "opacity 1s";
        thankYouMessage.style.opacity = "1";
      }, 100);
      // Iniciar efecto de latido sobre la imagen de donar
      setTimeout(() => {
        donateButton.querySelector("img").classList.add("pulse");
      }, 1500);
      continueButton.style.display = "none";
      break;
  }

  trickStep++;
}

// ==============================
// ASOCIAR EVENTOS AL DOM
// ==============================
function bindEvents() {
  // Avanzar pasos
  continueButton.addEventListener("click", () => {
    // Si el texto sigue escribiéndose, lo completamos de golpe
    clearTimeout(typewriterTimeout);
    nextStep();
  });

  // Abrir popup y detener latido
  donateButton.addEventListener("click", () => {
    donatePopup.style.display = "flex";
    donateButton.querySelector("img").classList.remove("pulse");
  });

  // Cerrar popup
  closeButton.addEventListener("click", () => {
    donatePopup.style.display = "none";
  });

  // Copiar datos
  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(transferData.textContent)
      .then(() => alert("Datos copiados al portapapeles!"))
      .catch(err => console.error("Error al copiar:", err));
  });
}

// ==============================
// CONFIGURACIÓN INICIAL
// ==============================
function setupPage() {
  // Insertar elemento para máquina de escribir
  const typewriterDiv = document.createElement("div");
  typewriterDiv.className = "typewriter-text";
  interactionContainer.appendChild(typewriterDiv);

  // Carga datos de transferencia
  transferData.textContent = [
    "LUIS OSVALDO TAPIA GATICA",
    "RUT: 17.396.545-1",
    "Cuenta Vista Nº 4040382471",
    "Banco Ripley",
    "lotapia@ing.ucsc.cl"
  ].join("\n");

  // Asociar eventos y arrancar
  bindEvents();
  // Mostrar primer mensaje sin requerir click
  typewriterEffect(typewriterDiv, mensajes[0], 30, () => {
    showCards(firstSetOfCards);
    continueButton.classList.add("highlight");
    trickStep = 1; // ya avanzamos el primer paso
  });
}

// Ejecutar al cargar la página
window.onload = setupPage;