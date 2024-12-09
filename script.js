// Configuración Inicial
const cardsContainer = document.getElementById('cardsContainer');
const interactionContainer = document.getElementById('interactionContainer');
const donatePopup = document.getElementById('donatePopup');
const donateButton = document.getElementById('donarButton');
const closeButton = document.querySelector('.close');
const copyButton = document.getElementById('copyButton');
const transferData = document.getElementById('transferData');
const firstSetOfCards = [
    'assets/3x/jt.png', 
    'assets/3x/kh.png', 
    'assets/3x/qs.png', 
    'assets/3x/jd.png', 
    'assets/3x/ks.png', 
    'assets/3x/qh.png'
];
const secondSetOfCards = [
    'assets/3x/jh.png', 
    'assets/3x/qt.png', 
    'assets/3x/kh.png', 
    'assets/3x/kt.png', 
    'assets/3x/qd.png'
];

// Función para mostrar cartas
function showCards(cards) {
    cardsContainer.innerHTML = '';
    cards.forEach((card, index) => {
        setTimeout(() => {
            const imgElement = document.createElement('img');
            imgElement.src = card;
            imgElement.alt = 'Card';
            imgElement.classList.add('card');
            cardsContainer.appendChild(imgElement);
        }, index * 500);
    });
}

// Función para crear elementos de interacción
function createInteractionElements() {
    const continueButton = document.createElement('button');
    continueButton.textContent = 'Continuar';
    continueButton.className = 'continue-button';
    interactionContainer.appendChild(continueButton);
    return { continueButton };
}

// Simular efecto de escritura
function typewriterEffect(element, text, speed, onComplete) {
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else if (onComplete) {
            onComplete();
        }
    }
    typeWriter();
}

// Configuración inicial de la página
function setupPage() {
    const { continueButton } = createInteractionElements();
    let trickStep = 0;

    const typewriterText = document.createElement('div');
    typewriterText.className = 'typewriter-text';
    interactionContainer.appendChild(typewriterText);

    typewriterEffect(
        typewriterText,
        'Si estás aquí es porque nos conocimos en algún lugar y espero haberte sorprendido.',
        30,
        () => {
            continueButton.style.display = 'block';
        }
    );

    continueButton.addEventListener('click', () => {
        switch (trickStep) {
            case 0:
                typewriterText.innerHTML = '';
                showCards(firstSetOfCards);
                typewriterEffect(
                    typewriterText,
                    'Concéntrate en una carta y haz clic en continuar.',
                    50
                );
                trickStep++;
                break;
            case 1:
                typewriterText.innerHTML = '';
                typewriterEffect(
                    typewriterText,
                    'Nombra mentalmente tu carta varias veces. Haz clic en continuar.',
                    50
                );
                trickStep++;
                break;
            case 2:
                cardsContainer.innerHTML = '';
                typewriterText.innerHTML = '';
                showCards(secondSetOfCards);
                typewriterEffect(
                    typewriterText,
                    '¿Tu carta sigue aquí? Si es así, no busques el truco.',
                    50
                );
                trickStep++;
                break;
        }
    });
}

// Datos de transferencia
const datos = [
    "Luis Tapia Gatica",
    "RUT: 17.396.545-1",
    "Teléfono: +56 9 8765 4321",
    "Cuenta Vista Nº 4040382471",
    "Banco Ripley",
    "lotapia@ing.ucsc.cl"
];
transferData.textContent = datos.join('\n');

// Botón de copiar datos
copyButton.addEventListener('click', () => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(transferData.textContent)
            .then(() => alert('Datos copiados al portapapeles!'))
            .catch(err => console.error('Error al copiar: ', err));
    }
});

// Mostrar y cerrar la ventana emergente
donateButton.addEventListener('click', () => {
    donatePopup.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    donatePopup.style.display = 'none';
});

window.onclick = (event) => {
    if (event.target === donatePopup) {
        donatePopup.style.display = 'none';
    }
};

// Inicializar la página
window.onload = setupPage;
