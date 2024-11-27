document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-hotel-form');
    const editForm = document.getElementById('edit-hotel-form');
    const searchInput = document.getElementById('search-input');
    const cardsContainer = document.getElementById('cards-container');
    const editModal = document.getElementById('edit-modal'); // Modal de edición

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
                        <p><strong>Teléfono:</strong> ${hotel.telefono}</p>
                        <p><strong>Correo:</strong> ${hotel.correo}</p>
                        <p>${hotel.descripcion}</p>
                        <button class="edit-btn" data-id="${hotel.id}">Editar</button>
                        <button class="delete-btn" data-id="${hotel.id}">Eliminar</button>
                    `;
                    cardsContainer.appendChild(card);
                });

                // Asignar eventos a los botones de edición y eliminación
                document.querySelectorAll('.edit-btn').forEach(btn => {
                    btn.addEventListener('click', handleEditClick);
                });

                document.querySelectorAll('.delete-btn').forEach(btn => {
                    btn.addEventListener('click', handleDeleteClick);
                });
            })
            .catch(error => console.error('Error:', error));
    };

    // Manejar el envío del formulario para agregar un nuevo hotel
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        fetch('add_hotel.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    form.reset(); // Limpiar el formulario
                    loadHoteles();  // Volver a cargar los hoteles
                } else {
                    alert(data.message || 'Error al agregar el hotel');
                }
            })
            .catch(error => console.error('Error:', error));
    });

    // Manejar el clic del botón de edición
    const handleEditClick = (e) => {
        const id = e.target.dataset.id;

        fetch(`get_hotel.php?id=${id}`)
            .then(response => response.json())
            .then(hotel => {
                if (hotel) {
                    document.getElementById('edit-id').value = hotel.id;
                    document.getElementById('edit-nombre').value = hotel.nombre;
                    document.getElementById('edit-colonia').value = hotel.colonia;
                    document.getElementById('edit-municipio').value = hotel.municipio;
                    document.getElementById('edit-telefono').value = hotel.telefono;
                    document.getElementById('edit-correo').value = hotel.correo;
                    document.getElementById('edit-descripcion').value = hotel.descripcion;
                    editModal.style.display = 'block'; // Mostrar modal de edición
                }
            })
            .catch(error => console.error('Error:', error));
    };

    // Manejar el envío del formulario para editar un hotel
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(editForm);

        fetch('edit_hotel.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    editModal.style.display = 'none'; // Cerrar modal de edición
                    loadHoteles(); // Volver a cargar hoteles
                } else {
                    alert('Error al editar el hotel');
                }
            })
            .catch(error => console.error('Error:', error));
    });

    // Función para manejar la eliminación de un hotel
    const handleDeleteClick = (e) => {
        const id = e.target.dataset.id;

        fetch(`delete_hotel.php?id=${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    loadHoteles(); // Volver a cargar hoteles después de eliminar uno
                } else {
                    alert('Error al eliminar el hotel');
                }
            })
            .catch(error => console.error('Error:', error));
    };

    // Filtrar hoteles por búsqueda
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();

        document.querySelectorAll('.card').forEach(card => {
            const cardText = card.textContent.toLowerCase();
            if (cardText.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Cargar guías cuando la página esté lista
    loadHoteles();
});
