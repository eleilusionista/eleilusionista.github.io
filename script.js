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

// Primer y segundo set de cartas (puedes ajustar las imágenes)
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

function removeHighlight(button) {
  button.classList.remove("highlight");
}

function addHighlight(button) {
  button.classList.add("highlight");
}

function vanishCards() {
  // Aplica la animación tornado a cada carta
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

function setupPage() {
  const typewriterText = document.createElement("div");
  typewriterText.className = "typewriter-text";
  interactionContainer.appendChild(typewriterText);

  // Paso 0: Mensaje inicial
  typewriterEffect(
    typewriterText,
    "Si estás aquí es porque nos encontramos en algún lugar de este mundo. Ahora quiero sorprenderte a través de acá.",
    30
  );

  // Ya está resaltado el botón Continuar al inicio.

  continueButton.addEventListener("click", () => {
    clearTimeout(timetypew);
    removeHighlight(continueButton); // Al presionar, quitamos el highlight, lo pondremos al final de cada fase.
    
    switch (trickStep) {
      case 0:
        // Mostramos el primer set de cartas
        typewriterText.innerHTML = "";
        typewriterEffect(
          typewriterText,
          "Piensa en una de estas cartas, y nómbrala mentalmente...",
          30,
          () => addHighlight(continueButton)
        );
        showCards(firstSetOfCards);
        break;
      case 1:
        // Desaparece el set y nuevo texto
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
        // "Creo que ya sé cuál pensaste, la sacaré del set."
        typewriterText.innerHTML = "";
        typewriterEffect(
          typewriterText,
          "Creo que ya sé cuál pensaste, la sacaré del set.",
          30,
          () => addHighlight(continueButton)
        );
        showCards(secondSetOfCards);
        break;
      case 3:
        // "¿Sorprendido?... para eso estoy acá..."
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
        // Desaparecen las cartas (no hay cartas visibles ahora, pero si las hubiera, se podrían eliminar)
        vanishCards();
        typewriterText.innerHTML = "";
        typewriterEffect(
          typewriterText,
          "¡Muchas gracias!",
          30
        );
        thankYouMessage.style.display = "block";
        thankYouMessage.style.opacity = "0";
        setTimeout(() => {
          thankYouMessage.style.transition = "opacity 1s";
          thankYouMessage.style.opacity = "1";
        }, 100);
        // Al final resaltamos el botón donar
        setTimeout(() => {
          addHighlight(donateButton);
        }, 1500);
        // Ya no hay más continue
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