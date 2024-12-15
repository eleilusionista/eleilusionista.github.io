function setupPage() {
  const typewriterText = document.createElement("div");
  typewriterText.className = "typewriter-text";
  interactionContainer.appendChild(typewriterText);

  // Paso 1: Mensaje inicial
  typewriterEffect(
    typewriterText,
    "Si estás aquí es porque nos encontramos en algún lugar de este mundo. Ahora quiero sorprenderte con este clásico.",
    30,
    () => addHighlight(continueButton) // Al terminar, resaltar el botón
  );

  continueButton.addEventListener("click", () => {
    clearTimeout(timetypew);
    removeHighlight(continueButton);

    switch (trickStep) {
      case 0:
        // Paso 2: Mostrar primer set y segundo texto
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
        // Paso 3: Desaparece el primer set, nuevo texto
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
        // Paso 4: Muestra texto "Creo que ya sé cuál pensaste..."
        typewriterText.innerHTML = "";
        typewriterEffect(
          typewriterText,
          "Creo que ya sé cuál pensaste, la sacaré del set.",
          30,
          () => {
            // Al terminar de escribir, esperar 2 segundos antes de mostrar segundo set
            setTimeout(() => {
              showCards(secondSetOfCards);
              addHighlight(continueButton);
            }, 2000);
          }
        );
        break;

      case 3:
        // Paso 5: Desaparecen las cartas del segundo set, luego mensaje de gracias
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

        // Destacar el botón donar
        setTimeout(() => {
          addHighlight(donateButton);
        }, 1500);
        continueButton.style.display = "none";
        break;
    }
    trickStep++;
  });
}