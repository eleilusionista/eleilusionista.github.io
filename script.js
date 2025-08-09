(function () {
  let trickStep = 0;
  let typewriterTimeout;

  const cards1 = [
    "assets/3x/jt.png", "assets/3x/kh.png", "assets/3x/qs.png",
    "assets/3x/jd.png", "assets/3x/ks.png", "assets/3x/qh.png"
  ];
  const cards2 = [
    "assets/3x/js.png", "assets/3x/kd.png", "assets/3x/qt.png",
    "assets/3x/jh.png", "assets/3x/qd.png"
  ];

  const els = {
    cards: document.getElementById("cardsContainer"),
    interaction: document.getElementById("interactionContainer"),
    popup: document.getElementById("donatePopup"),
    continue: document.getElementById("continueButton"),
    donate: document.getElementById("donarButton"),
    close: null,
    copy: document.getElementById("copyButton"),
    transfer: document.getElementById("transferData"),
    thankYou: document.getElementById("thankYouMessage")
  };

  const mensajes = [
    "Si estás aquí es porque nos encontramos en algún lugar de este mundo. Ahora quiero sorprenderte con este clásico.",
    "Piensa en una de estas cartas, y nómbrala mentalmente…",
    "Nombra nuevamente esa carta en tu mente 3 veces. Luego aprieta continuar.",
    "Creo que ya sé cuál pensaste, la sacaré del set.",
    "¿Sorprendido? … para eso estoy acá. Más abajo encontrarás mi Instagram y mi WhatsApp.",
    "¡Muchas gracias!"
  ];

  function typewriter(el, text, speed = 30, cb) {
    clearTimeout(typewriterTimeout);
    let i = 0;
    el.textContent = "";
    (function write() {
      if (i < text.length) {
        el.textContent += text[i++];
        typewriterTimeout = setTimeout(write, speed);
      } else if (cb) cb();
    })();
  }

  function renderCards(files) {
    els.cards.innerHTML = "";
    files.forEach((src, i) => {
      setTimeout(() => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Carta";
        img.loading = "lazy";
        img.className = "card";
        els.cards.appendChild(img);
      }, i * 220);
    });
  }

  function animateVanish(done) {
    const cards = els.cards.querySelectorAll(".card");
    cards.forEach(card => {
      card.classList.add("tornado");
      card.addEventListener("animationend", () => card.remove(), { once: true });
    });
    if (done) setTimeout(done, Math.max(1000, cards.length * 120 + 600));
  }

  function openPopup() {
    els.popup.setAttribute("aria-hidden", "false");
    els.close = els.popup.querySelector(".close");
    els.close?.addEventListener("click", closePopup, { once: true });
    els.popup.addEventListener("click", e => {
      if (e.target === els.popup) closePopup();
    }, { once: true });
    document.addEventListener("keydown", function onEsc(e) {
      if (e.key === "Escape") {
        closePopup();
        document.removeEventListener("keydown", onEsc);
      }
    });
  }

  function closePopup() {
    els.popup.setAttribute("aria-hidden", "true");
  }

  function showThanks() {
    els.thankYou.style.display = "grid";
    requestAnimationFrame(() => {
      els.thankYou.querySelector(".box").style.opacity = "1";
    });
  }

  function nextStep() {
    const textEl = els.interaction.querySelector(".typewriter-text");
    if (!textEl) return;
    els.continue.classList.remove("highlight");
    els.cards.innerHTML = "";

    switch (trickStep) {
      case 0:
        typewriter(textEl, mensajes[0], 26, () => els.continue.classList.add("highlight"));
        break;
      case 1:
        typewriter(textEl, mensajes[1], 26, () => els.continue.classList.add("highlight"));
        renderCards(cards1);
        break;
      case 2:
        typewriter(textEl, mensajes[2], 26, () => els.continue.classList.add("highlight"));
        break;
      case 3:
        typewriter(textEl, mensajes[3], 26, () => {
          renderCards(cards2);
          els.continue.classList.add("highlight");
        });
        break;
      case 4:
        typewriter(textEl, mensajes[4], 26, () => els.continue.classList.add("highlight"));
        break;
      case 5:
        animateVanish();
        typewriter(textEl, mensajes[5]);
        showThanks();
        setTimeout(() => {
          els.donate.querySelector("img")?.classList.add("pulse");
        }, 1400);
        els.continue.style.display = "none";
        break;
    }
    trickStep++;
  }

  function bindEvents() {
    els.continue.addEventListener("click", nextStep);
    els.donate.addEventListener("click", e => {
      e.preventDefault();
      els.donate.querySelector("img")?.classList.remove("pulse");
      openPopup();
    });
    els.copy.addEventListener("click", async () => {
      const text = els.transfer.textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
        alert("Datos copiados al portapapeles");
      } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          alert("Datos copiados");
        } catch {
          alert("No se pudo copiar automáticamente");
        } finally {
          ta.remove();
        }
      }
    });
  }

  function setupPage() {
    els.transfer.textContent = [
      "LUIS OSVALDO TAPIA GATICA",
      "RUT: 17.396.545-1",
      "Cuenta Vista Nº 4040382471",
      "Banco Ripley",
      "lotapia@ing.ucsc.cl"
    ].join("\n");
    nextStep();
    bindEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupPage);
  } else {
    setupPage();
  }
})();