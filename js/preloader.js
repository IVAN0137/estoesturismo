// preloader.js

window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');
    
    // Retraso para asegurar que la animación del preloader se vea antes de ocultarlo
    setTimeout(function() {
        preloader.style.display = 'none';  // Ocultar el preloader
        content.style.display = 'block';   // Mostrar el contenido principal
    }, 500); // 500ms de retraso para la animación
});
