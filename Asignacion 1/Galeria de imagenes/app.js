const authSection = document.getElementById('auth-section');
const gallerySection = document.getElementById('gallery-section');
const imageGrid = document.getElementById('image-grid');

// Simulación de Login
document.getElementById('login-btn').addEventListener('click', () => {
    const user = document.getElementById('username').value;
    if(user) {
        document.getElementById('user-display').innerText = user;
        authSection.classList.add('hidden');
        gallerySection.classList.remove('hidden');
    }
});

// Manejo de subida de imágenes
document.getElementById('upload-input').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            renderImage(event.target.result);
        };
        reader.readAsDataURL(file);
    }
});

function renderImage(src) {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'img-item';
    
    // Opción de descarga al hacer click
    img.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = src;
        link.download = 'mi-galeria.png';
        link.click();
    });
    
    imageGrid.appendChild(img);
}