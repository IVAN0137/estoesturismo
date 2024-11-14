// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    cargarReseñas();
    
    const botonSubir = document.getElementById('boton-subir');
    const formularioSubir = document.getElementById('form-subir');
    
    botonSubir.addEventListener('click', function() {
        if (formularioSubir.style.display === 'none' || formularioSubir.style.display === '') {
            formularioSubir.style.display = 'block';
        } else {
            formularioSubir.style.display = 'none';
        }
    });
});

function cargarReseñas() {
    fetch('mostrar_reseñas.php')
        .then(response => response.text())
        .then(data => {
            document.getElementById('lista_reseñas').innerHTML = data;
        })
        .catch(error => console.error('Error:', error));
}
