let trickStep = 0;
let typewriterTimeout;

const cards1 = ["assets/3x/jt.png", "assets/3x/kh.png", "assets/3x/qs.png", "assets/3x/jd.png", "assets/3x/ks.png", "assets/3x/qh.png"];
const cards2 = ["assets/3x/js.png", "assets/3x/kd.png", "assets/3x/qt.png", "assets/3x/jh.png", "assets/3x/qd.png"];

const elements = {
  cards: document.getElementById("cardsContainer"),
  interaction: document.getElementById("interactionContainer"),
  popup: document.getElementById("donatePopup"),
  continue: document.getElementById("continueButton"),
  donate: document.getElementById("donarButton"),
  close: document.querySelector(".close"),
  copy: document.getElementById("copyButton"),
  transfer: document.getElementById("transferData"),
  thankYou: document.getElementById("thankYouMessage")
};

const mensajes = [
  "Si estás aquí es porque nos encontramos en algún lugar de este mundo. Ahora quiero sorprenderte con este clásico.",
  "Piensa en una de estas cartas, y nómbrala mentalmente...",
  "Nombra nuevamente esa carta en tu mente 3 veces. Luego aprieta continuar.",
  "Creo que ya sé cuál pensaste, la sacaré del set.",
  "¿Sorprendido? ... para eso estoy acá.
mas abajo encontrarás mi instagram y mi whatsapp.",
  "¡Muchas gracias!"
];

function typewriter(element, text, speed = 30, callback) {
  clearTimeout(typewriterTimeout);
  let i = 0;
  element.textContent = "";
  function write() {
    if (i < text.length) {
      element.textContent += text[i++];
      typewriterTimeout = setTimeout(write, speed);
    } else if (callback) callback();
  }
  write();
}

function renderCards(cards) {
  elements.cards.innerHTML = "";
  cards.forEach((src, index) => {
    setTimeout(() => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Carta";
      img.classList.add("card");
      elements.cards.appendChild(img);
    }, index * 300);
  });
}

function animateVanish(callback) {
  const cards = elements.cards.querySelectorAll(".card");
  cards.forEach((card) => {
    card.classList.add("tornado");
    card.addEventListener("animationend", () => card.remove(), { once: true });
  });
  if (callback) setTimeout(callback, cards.length * 100 + 1000);
}

function nextStep() {
  const textEl = elements.interaction.querySelector(".typewriter-text");
  if (!textEl) return;

  elements.continue.classList.remove("highlight");
  elements.cards.innerHTML = "";

  switch (trickStep) {
    case 0:
      typewriter(textEl, mensajes[0], 30, () => elements.continue.classList.add("highlight"));
      break;
    case 1:
      typewriter(textEl, mensajes[1], 30, () => elements.continue.classList.add("highlight"));
      renderCards(cards1);
      break;
    case 2:
      typewriter(textEl, mensajes[2], 30, () => elements.continue.classList.add("highlight"));
      break;
    case 3:
      typewriter(textEl, mensajes[3], 30, () => {
        renderCards(cards2);
        elements.continue.classList.add("highlight");
      });
      break;
    case 4:
      typewriter(textEl, mensajes[4], 30, () => elements.continue.classList.add("highlight"));
      break;
    case 5:
      animateVanish();
      typewriter(textEl, mensajes[5]);
      elements.thankYou.style.display = "block";
      elements.thankYou.style.opacity = "0";
      setTimeout(() => {
        elements.thankYou.style.transition = "opacity 1s";
        elements.thankYou.style.opacity = "1";
      }, 100);
      setTimeout(() => {
        ;
        elements.donate.querySelector("img").classList.add("pulse");
      }, 1500);
      elements.continue.style.display = "none";
      break;
  }

  trickStep++;
}

function bindEvents() {
  elements.continue.addEventListener("click", nextStep);

  elements.donate.addEventListener("click", () => {
    elements.popup.style.display = "flex";
    elements.donate.querySelector("img").classList.remove("pulse");
  });

  elements.close.addEventListener("click", () => {
    elements.popup.style.display = "none";
  });

  elements.copy.addEventListener("click", () => {
    navigator.clipboard.writeText(elements.transfer.textContent)
      .then(() => alert("Datos copiados al portapapeles!"))
      .catch(err => console.error("Error al copiar: ", err));
  });
}

function setupPage() {
  const typewriterDiv = document.createElement("div");
  typewriterDiv.className = "typewriter-text";
  elements.interaction.appendChild(typewriterDiv);
  nextStep();

  elements.transfer.textContent = [
    "LUIS OSVALDO TAPIA GATICA",
    "RUT: 17.396.545-1",
    "Cuenta Vista Nº 4040382471",
    "Banco Ripley",
    "lotapia@ing.ucsc.cl"
  ].join("\n");

  bindEvents();
}

window.onload = setupPage;