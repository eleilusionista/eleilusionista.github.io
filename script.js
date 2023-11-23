document.getElementById('imageUpload').addEventListener('change', handleImageUpload);

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let uploadedImage = '';

function handleImageUpload(event) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            uploadedImage = canvas.toDataURL('image/png');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    document.getElementById('btnDownload').style.display = 'block';
}

document.getElementById('btnDownload').addEventListener('click', function() {
    const img = new Image();
    img.src = url('https://github.com/eleilusionista/eleilusionista.github.io/blob/main/archivo3d/donarr.png´); // Cambia esto por la ruta de tu icono de donación

    img.onload = function() {
        // Posiciona el icono en la esquina superior derecha
        const x = canvas.width - img.width;
        const y = 0;

        // Dibuja el icono sobre la imagen cargada
        ctx.drawImage(img, x, y, img.width, img.height);

        // Crea un elemento <a> para descargar la imagen
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = 'selfie_con_icono.png'; // El nombre del archivo descargado
        a.click();
    };
});

