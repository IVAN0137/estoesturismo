window.unload  = function(){
    $('#preloader').fadeOut();
    $('body').removeClass('hidden')
}
document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cards-container');

    // Función para cargar guías turísticos
    const loadGuides = () => {
        fetch('get_guides.php')
            .then(response => response.json())
            .then(data => {
                cardsContainer.innerHTML = ''; // Limpiar el contenedor de tarjetas
                data.guides.forEach(guide => {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = `
                        <img src="uploads/${guide.foto}" alt="Foto de ${guide.nombre}">
                        <h3>${guide.nombre}</h3>
                        <p><strong>Colonia:</strong> ${guide.colonia}</p>
                        <p><strong>Municipio:</strong> ${guide.municipio}</p>
                        
                        <p><strong>Teléfono:</strong> 
                        <a href="https://wa.me/${guide.telefono}" target="_blank">
                            ${guide.telefono}
                        </a>
                    </p>
                        <p><strong>Correo:</strong> 
                        <a href="#" class="contact-email" data-email="${guide.correo}">
                            ${guide.correo}
                        </a>
                    </p>

                        <p>${guide.descripcion}</p>
                    `;
                    cardsContainer.appendChild(card);
                });
            })
            .catch(error => console.error('Error:', error));
    };

    // Cargar guías cuando la página esté lista
    loadGuides();
});

