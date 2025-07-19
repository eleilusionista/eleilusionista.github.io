// ==============================
// VARIABLES Y ELEMENTOS
// ==============================
let timetypew;
let trickStep = 0;

const cardsContainer = document.getElementById("cardsContainer");
const interactionContainer = document.getElementById("interactionContainer");
const donatePopup = document.getElementById("donatePopup");
const donateButton = document.getElementById("donarButton");
const closeButton = document.querySelector(".close");
const copyButton = document.getElementById("copyButton");
const transferData = document.getElementById("transferData");
const continueButton = document.getElementById("continueButton");

const thankYouMessage = document.createElement("div");
thankYouMessage.id = "thankYouMessage";
thankYouMessage.innerHTML = "¡Muchas gracias!";
document.body.appendChild(thankYouMessage);

// Primer y segundo set de cartas
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
// EFECTO MÁQUINA DE ESCRIBIR
// ==============================
function typewriterEffect(element, text, speed, callback) {
  clearTimeout(timetypew);
  let i = 0;
  element.innerHTML = "";

  function typeWriter() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      timetypew = setTimeout(typeWriter, speed);
    } else {
      if (callback) callback();
    }
  }
  typeWriter();
}

// ==============================
// MOSTRAR CARTAS EN PANTALLA
// ==============================
function showCards(cards) {
  cardsContainer.innerHTML = "";
  cards.forEach((card, index) => {
    setTimeout(() => {
      const imgElement = document.createElement("img");
      imgElement.src = card;
      imgElement.alt = "Card";
      imgElement.classList.add("card");
      cardsContainer.appendChild(imgElement);
    }, index * 300);
  });
}

// ==============================
// RESALTAR Y DESRESALTAR BOTÓN
// ==============================
function removeHighlight(button) {
  button.classList.remove("highlight");
}
function addHighlight(button) {
  button.classList.add("highlight");
}

// ==============================
// DESAPARECER CARTAS
// ==============================
function vanishCards() {
  const cards = cardsContainer.querySelectorAll(".card");
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("tornado");
      setTimeout(() => {
        card.remove();
      }, 1000);
    }, index * 100);
  });
}

// ==============================
// CONFIGURAR PÁGINA AL CARGAR
// ==============================
function setupPage() {
  const typewriterText = document.createElement("div");
  typewriterText.className = "typewriter-text";
  interactionContainer.appendChild(typewriterText);

  // Paso 0: mensaje de bienvenida
  typewriterEffect(
    typewriterText,
    "Si estás aquí es porque nos encontramos en algún lugar de este mundo. Ahora quiero sorprenderte con este clásico.",
    30
  );

  continueButton.addEventListener("click", () => {
    clearTimeout(timetypew);
    removeHighlight(continueButton);

    switch (trickStep) {
      case 0:
        typewriterText.innerHTML = "";
        typewriterEffect(
          typewriterText,
          "Piensa en una de estas cartas, y nómbrala mentalmente...",
          30,
          () => {
            showCards(firstSetOfCards);
            addHighlight(continueButton);
          }
        );
        break;

      case 1:
        cardsContainer.innerHTML = "";
        typewriterText.innerHTML = "";
        typewriterEffect(
          typewriterText,
          "Nombra nuevamente esa carta en tu mente 3 veces. Luego aprieta continuar.",
          30,
          () => addHighlight(continueButton)
        );
        break;

      case 2:
        typewriterText.innerHTML = "";
        typewriterEffect(
          typewriterText,
          "Creo que ya sé cuál pensaste, la sacaré del set.",
          30,
          () => {
            showCards(secondSetOfCards);
            addHighlight(continueButton);
          }
        );
        break;

      case 3:
        typewriterText.innerHTML = "";
        cardsContainer.innerHTML = "";
        typewriterEffect(
          typewriterText,
          "¿Sorprendido? ... para eso estoy acá. Si te gusta mi trabajo y quieres apoyarme, más abajo encontrarás mis datos de transferencia, así como también mi Instagram y mi WhatsApp.",
          30,
          () => addHighlight(continueButton)
        );
        break;

      case 4:
        vanishCards();
        typewriterText.innerHTML = "";
        typewriterEffect(typewriterText, "¡Muchas gracias!", 30);
        thankYouMessage.style.display = "block";
        thankYouMessage.style.opacity = "0";
        setTimeout(() => {
          thankYouMessage.style.transition = "opacity 1s";
          thankYouMessage.style.opacity = "1";
        }, 100);
        setTimeout(() => {
          donateButton.classList.add("pulse");
        }, 1500);
        continueButton.style.display = "none";
        break;
    }
    trickStep++;
  });
}

// ==============================
// DATOS DE TRANSFERENCIA
// ==============================
const datos = [
  "LUIS OSVALDO TAPIA GATICA",
  "RUT: 17.396.545-1",
  "Cuenta Vista Nº 4040382471",
  "Banco Ripley",
  "lotapia@ing.ucsc.cl",
];
transferData.textContent = datos.join("\n");

// ==============================
// COPIAR DATOS AL PORTAPAPELES
// ==============================
copyButton.addEventListener("click", () => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(transferData.textContent)
      .then(() => alert("Datos copiados al portapapeles!"))
      .catch((err) => console.error("Error al copiar: ", err));
  }
});

// ==============================
// ABRIR Y CERRAR POPUP DE DONACIÓN
// ==============================
donateButton.addEventListener("click", () => {
  donatePopup.style.display = "block";
});

closeButton.addEventListener("click", () => {
  donatePopup.style.display = "none";
});

// ==============================
// INICIALIZACIÓN
// ==============================
window.onload = setupPage;