window.unload = function () {
    $('#preloader').fadeOut();
    $('body').removeClass('hidden')
}
document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cards-container');

    // Función para cargar hoteles
    const loadHoteles = () => {
        fetch('get_hoteles.php')
            .then(response => response.json())
            .then(data => {
                cardsContainer.innerHTML = ''; // Limpiar el contenedor de tarjetas
                data.hotel.forEach(hotel => {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = `
                        <img src="uploads/${hotel.foto}" alt="Foto de ${hotel.nombre}">
                        <h3>${hotel.nombre}</h3>
                        <p><strong>Colonia:</strong> ${hotel.colonia}</p>
                        <p><strong>Municipio:</strong> ${hotel.municipio}</p>
                        
                        <p><strong>Teléfono:</strong> 
                        <a href="https://wa.me/${hotel.telefono}" target="_blank">
                            ${hotel.telefono}
                        </a>
                    </p>
                        <p><strong>Correo:</strong> 
                        <a href="#" class="contact-email" data-email="${hotel.correo}">
                            ${hotel.correo}
                        </a>
                    </p>
                        <p>${hotel.descripcion}</p>
                    `;
                    cardsContainer.appendChild(card);
                });
            })
            .catch(error => console.error('Error:', error));
    };

    // Cargar guías cuando la página esté lista
    loadHoteles();
});

