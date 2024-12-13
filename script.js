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

const firstSetOfCards = [
  "assets/3x/jt.png",
  "assets/3x/kh.png",
  "assets/3x/qs.png",
  "assets/3x/jd.png",
  "assets/3x/ks.png",
  "assets/3x/qh.png",
];
const secondSetOfCards = [
  "assets/3x/jh.png",
  "assets/3x/qt.png",
  "assets/3x/kh.png",
  "assets/3x/kt.png",
  "assets/3x/qd.png",
];

function typewriterEffect(element, text, speed) {
  clearTimeout(timetypew);
  let i = 0;
  element.innerHTML = "";

  function typeWriter() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      timetypew = setTimeout(typeWriter, speed);
    }
  }
  typeWriter();
}

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

function setupPage() {
  const typewriterText = document.createElement("div");
  typewriterText.className = "typewriter-text";
  interactionContainer.appendChild(typewriterText);

  typewriterEffect(
    typewriterText,
    "Si estás aquí es porque nos conocimos en algún lugar y espero haberte sorprendido.",
    30
  );

  continueButton.addEventListener("click", () => {
    clearTimeout(timetypew); 
    switch (trickStep) {
      case 0:
        typewriterText.innerHTML = "";
        typewriterEffect(
          typewriterText,
          "Concéntrate en una carta y haz clic en continuar.",
          30
        );
        showCards(firstSetOfCards);
        break;
      case 1:
        typewriterText.innerHTML = "";
        cardsContainer.innerHTML = "";
        typewriterEffect(
          typewriterText,
          "Nombra mentalmente tu carta varias veces. Haz clic en continuar.",
          30
        );
        showCards(secondSetOfCards);
        break;
      case 2:
        typewriterText.innerHTML = "";
        cardsContainer.innerHTML = "";
        typewriterEffect(
          typewriterText,
          "¿Tu carta sigue aquí?",
          30
        );
        break;
      case 3:
        continueButton.textContent = "Fin";
        break;
      case 4:
        thankYouMessage.style.display = "block";
        thankYouMessage.style.opacity = "0";
        setTimeout(() => {
          thankYouMessage.style.transition = "opacity 1s";
          thankYouMessage.style.opacity = "1";
        }, 100);
        continueButton.style.display = "none";
        break;
    }
    trickStep++;
  });
}

// Datos de transferencia
const datos = [
  "Luis Tapia Gatica",
  "RUT: 17.396.545-1",
  "Teléfono: +56 9 8765 4321",
  "Cuenta Vista Nº 4040382471",
  "Banco Ripley",
  "lotapia@ing.ucsc.cl",
];
transferData.textContent = datos.join("\n");

// Copiar datos
copyButton.addEventListener("click", () => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(transferData.textContent)
      .then(() => alert("Datos copiados al portapapeles!"))
      .catch((err) => console.error("Error al copiar: ", err));
  }
});

// Ventana Donar
donateButton.addEventListener("click", () => {
  donatePopup.style.display = "block";
});

closeButton.addEventListener("click", () => {
  donatePopup.style.display = "none";
});

window.onload = setupPage;