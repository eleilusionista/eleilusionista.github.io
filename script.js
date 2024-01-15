const cardsContainer = document.getElementById('cardsContainer');
const interactionContainer = document.getElementById('interactionContainer');
const firstSetOfCards = ['assets/3x/jt.png', 'assets/3x/kh.png', 'assets/3x/qs.png', 'assets/3x/jd.png', 'assets/3x/ks.png', 'assets/3x/qh.png'];
const secondSetOfCards = ['assets/3x/jh.png', 'assets/3x/qt.png', 'assets/3x/kh.png', 'assets/3x/kt.png', 'assets/3x/qd.png'];

// Esta función muestra las cartas en el contenedor de cartas
function showCards(cards) {
    cardsContainer.innerHTML = ''; // Limpia el contenedor de cartas
    cards.forEach((card, index) => {
        // Crear un temporizador para cada carta
        setTimeout(() => {
            const imgElement = document.createElement('img');
            imgElement.src = card;
            imgElement.alt = 'Card';
            imgElement.classList.add('card');
            cardsContainer.appendChild(imgElement);
            // Añade la clase para la animación si es necesario
            imgElement.classList.add('animate'); // Asegúrate de tener una clase CSS para la animación
        }, index * 500); // Cambia el 500 a la duración que desees por carta
    });
}

// Esta función crea los elementos de interacción y los devuelve
function createInteractionElements() {
    const donarButton = document.createElement('button');
    donarButton.className = 'saltar-button';
    donarButton.textContent = 'donar';
    donarButton.style.display = 'block';

    const guardarButton = document.createElement('button');
    guardarButton.className = 'big-button';
    guardarButton.textContent = 'guardar contacto'; 
    guardarButton.style.display = 'block';

    const saltarButton = document.createElement('button');
    saltarButton.className = 'saltar-button';
    saltarButton.textContent = 'saltar';
    saltarButton.style.display = 'none';


    const continueButton = document.createElement('button');
    continueButton.className = 'continue-button';
    continueButton.textContent = 'Continuar';
    continueButton.style.display = 'none';
    
    const typewriterText = document.createElement('div');
    typewriterText.className = 'typewriter-text';
    
   
    interactionContainer.appendChild(continueButton);
    interactionContainer.appendChild(typewriterText);
    cardsContainer.appendChild(donarButton);
    cardsContainer.appendChild(guardarButton);
    interactionContainer.appendChild(saltarButton);


    return { donarButton, continueButton, typewriterText,guardarButton,saltarButton };
}

// Función para simular el efecto de escritura de texto
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
    const { donarButton, continueButton, typewriterText,guardarButton,saltarButton } = createInteractionElements();
    let trickStep = 0;
    typewriterEffect(typewriterText, 'Si estás aquí es porque nos conocimos en algún lugar y pude, espero, hacer que pases un buen rato mezclando la realidad con la fantasia', 50, () => {
        continueButton.style.display = 'block';
        saltarButton.style.display = 'block';
       
    });


    saltarButton.addEventListener('click', () => {
                typewriterText.innerHTML = '';
                typewriterEffect(typewriterText, 'Este sitio lo cree con el fin de compartir mi contacto pero hacerlo de una manera mas entretenida. dale al botón guardar contacto para guarar mi contacto directamente en tu agenda. Si te gustó mi trabajo y quieres apoyarme para seguir sorprendiendolos puedes encontras mis datos de transferencia en el botón donar ', 50, () => {
                    donarButton.style.display = 'block';
                    guardarButton.style.display = 'block';
                }   );  
    });
                
    continueButton.addEventListener('click', () => {
        switch(trickStep) {
            case 0:
                typewriterText.innerHTML = ''
                cardsContainer.innerHTML = '';
                typewriterEffect(typewriterText, 'Quiero tratar de asombrarte con este clasico de la internet. A continuación aparecerá una selección de cartas, concentrate en una ...', 50, () => {
                continueButton.style.display = 'block'
                showCards(firstSetOfCards);
                });
            
                continueButton.textContent = 'continuar';
                trickStep++;
                break;
            case 1: 
                
                continueButton.style.display = 'none';
                typewriterText.innerHTML = ''
                typewriterEffect(typewriterText, 'ya la tienes ? nombrala mentalmente y apreta continuar,', 50, () => {
                continueButton.style.display = 'block';
                });
            
                trickStep++;
                break;
            case 2: 
                cardsContainer.innerHTML = '';
                continueButton.style.display = 'none';
                typewriterText.innerHTML = ''
                typewriterEffect(typewriterText, 'ahora trataré de leer tu mente ,nombra mentalmente tu carta 5 veces ... ... ... ... ... ,', 50, () => {
                continueButton.style.display = 'block';
                });
            
                trickStep++;
                break;
                
            case 3:
                typewriterText.innerHTML = ''
                continueButton.style.display = 'none';
                typewriterEffect(typewriterText, 'creo que ya lo tengo , sacaré la carta que estás pensando... ... ...', 50, () => {
                showCards(secondSetOfCards);
                continueButton.style.display = 'block';
                });
            
                trickStep++
                break;
            case 4:
                typewriterText.innerHTML = '';
                cardsContainer.innerHTML = '';
                typewriterEffect(typewriterText, 'Asombrado ? ... ... ... ...si lo estás no busques el truco , se siente mejor así...');
                trickStep++
                break;
            case 5:
                typewriterText.innerHTML = '';
                typewriterEffect(typewriterText, 'Este sitio lo cree con el fin de compartir mi contacto pero hacerlo de una manera mas entretenida. dale al botón guardar contacto para guarar mi contacto directamente en tu agenda. Si te gustó mi trabajo y quieres apoyarme para seguir sorprendiendolos puedes encontras mis datos de transferencia en el botón donar ', 50, () => {
                    ;
                });
                cardsContainer.appendChild(donarButton);
                cardsContainer.appendChild(guardarButton);
                break;


        }
    });
    // Obtener elementos del DOM
const donatePopup = document.getElementById('donatePopup');
const donateButton = document.getElementById('donarButton'); // Asegúrate de que este ID corresponda al botón donar
const closeButton = document.querySelector('.close');
const copyButton = document.getElementById('copyButton');
const transferData = document.getElementById('transferData');
// Datos de transferencia
const datos = [
    "Luis Tapia Gatica",
    "RUT: 17.396.545-1",
    "Cuenta Vista Nº 4040382471",
    "Banco Ripley",
    "lotapia@ing.ucsc.cl"
];
//asignar los datos de transferencia al elemento pre
transferData.textContent = datos.join('\n');
// Mostrar la mini ventana


donarButton.addEventListener('click', () => {
    donatePopup.style.display = 'block';
});
guardarButton.addEventListener('click', () => {
    window.location.href = 'assets/Mago Ele Ilusionista.vcf';;
});
// Cerrar la mini ventana
closeButton.addEventListener('click', () => {
    donatePopup.style.display = 'none';
});

// Función para copiar datos al portapapeles
copyButton.addEventListener('click', () => {
    // Copiar los datos al portapapeles
    navigator.clipboard.writeText(transferData.textContent)
        .then(() => {
            alert('Datos copiados al portapapeles!');
        })
        .catch(err => {
            console.error('Error al copiar: ', err);
        });
});

// Cerrar la mini ventana al hacer clic fuera de ella
window.onclick = function(event) {
    if (event.target == donatePopup) {
        donatePopup.style.display = 'none';
    }
}


}

window.onload = setupPage;
