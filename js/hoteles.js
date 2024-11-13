document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-hotel-form');
    const editform = document.getElementById('edit-hotel-form');
    const searchInput = document.getElementById('search-input');
    const cardsContainer = document.getElementById('cards-container');
    const editModal = document.getElementById('edit-modal');

    const loadhotel = () => {
        fetch()
            .then(response => response.json())
            .then(data => {
                cardsContainer.innerHTML = ""; //Limpiar el contenedor de tarjetas
                data.guides.forEach(guide => {
                    const card = document.createElement("div");
                    card.classList.add("card");
                    card.innerHTML = `
                    <img src="uploads/${hotel.foto}" alt="Foto de ${hotel.nombre}">
                    <h3>${hotel.nombre}</h3>
                    <p><strong>Colonia:</strong> ${hotel.colonia}</p>
                    <p><strong>Municipio:</strong> ${hotel.municipio}</p>
                    <p><strong>Telefono:</strong> ${hotel.telefono}</p>
                    <p><strong>Correo:</strong> ${hotel.correo}</p>
                    <p>${hotel.descripcion}</p>
                    <button class="edit-btn" data-id="${hotel.id}">Editar</button>
                    <button class="delete-btn" data-id="${hotel.id}">Eliminar</button>
                    `;
                })
            })
    }
})