// Esperar a que la página cargue completamente
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0'; // Hacerlo transparente
    preloader.style.visibility = 'hidden'; // Ocultarlo completamente

    // Mostrar el contenido de la página
    const content = document.getElementById('content');
    setTimeout(() => {
        content.style.display = 'block';
    }, 400); // Coincidir con la transición del preloader
});
