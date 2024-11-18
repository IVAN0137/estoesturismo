// script.js
window.onload = function() {
    // Esperar que la página cargue
    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');
    
    // Ocultar el preloader y mostrar el contenido principal
    preloader.style.display = 'none';
    content.style.display = 'block';
};
