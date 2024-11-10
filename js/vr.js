// Obtener el modal
var modal = document.getElementById("tour-modal");

// Obtener el iframe del modal
var modalIframe = document.getElementById("modal-iframe");

// Obtener todos los elementos de la galería
var galleryItems = document.querySelectorAll(".gallery-item");

// Obtener el botón de cerrar (la "X")
var closeButton = document.querySelector(".close");

// Agregar el evento de clic a cada ítem de la galería
galleryItems.forEach(function(item) {
    item.addEventListener("click", function() {
        // Obtener el iframe dentro del ítem
        var iframe = item.querySelector("iframe");
        var iframeSrc = iframe.src;

        // Mostrar el modal
        modal.style.display = "block";
        
        // Establecer el src del iframe en el modal al src del iframe del ítem
        modalIframe.src = iframeSrc;
    });
});

// Agregar el evento de clic al botón de cerrar
closeButton.addEventListener("click", function() {
    // Ocultar el modal
    modal.style.display = "none";
    
    // Limpiar el src del iframe para detener el video o la vista del tour
    modalIframe.src = "";
});

// Cerrar el modal si el usuario hace clic fuera del modal
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        modalIframe.src = "";
    }
});
