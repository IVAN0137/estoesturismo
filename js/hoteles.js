document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-hotel-form');
    const editform = document.getElementById('edit-hotel-form');
    const searchInput = document.getElementById('search-input');
    const cardsContainer = document.getElementById('cards-container');
    const editModal = document.getElementById('edit-modal');

    // Función para cargar hoteles
    const loadhotel = () => {
        fetch("get_hoteles.php")
            .then(response => response.json())
            .then(data => {
                cardsContainer.innerHTML = ""; //Limpiar el contenedor de tarjetas
                data.guides.forEach(hotel => {
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
                    cardsContainer.appendChild(card);
                })

                //Asignar eventos a los botones de edición y eliminación
                document.querySelectorAll(`.edit-btn`).forEach(btn => {
                    btn.addEventListener("click", handleEditClick);
                });

                document.querySelectorAll(".delete-btn").forEach(btn => {
                    btn.addEventListener("click", handleEditClick);
                });


            })
            .catch(error => console.error("Error", error));
    };

    // Manejar el envio del formulario para agregar un nuevo hotel
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new formData(form);

        fetch("add_hotel.php", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    form.reset(); //limpiar formulario
                    loadhotel(); //volver a pagina de hoteles
                } else {
                    alert(data.message || "Error al agregar el hotel");
                }
            })
            .catch(error => console.error("Error", error));
    });

    //Manejar el clic del boton de edición
    const handleEditClick = (e) => {
        const id = e.target.dataset.id;

        fetch("get_hotel.php?id=${id}")
            .then(response => response.json())
            .then(hotel => {
                if (hotel) {
                    document.getElementById("edit-idht").value = hotel.id;
                    document.getElementById("edit-nombreht").value = hotel.nombre;
                    document.getElementById("edit-coloniaht").value = hotel.colonia;
                    document.getElementById("edit-municipioht").value = hotel.municipio;
                    document.getElementById("edit-telefonoht").value = hotel.telefono;
                    document.getElementById("edit-correobt").value = hotel.correo;
                    document.getElementById("edit-descripcionht").value = hotel.descripcion;
                    editModal.style.display = "block"; // Mostrar modal de edición
                }
            })
            .catch(error => console.error("Error:", error));
    };

    // Manejar el envio del formulario para editar un hotel
    editform.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new formData(editform);

        fetch("edit_hotel.php", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    editModal.style.display = "none"; // Cerrar modal de edición
                    loadhotel(); // Volver a cargar hoteles
                } else {
                    alert("Error al editar el hotel");
                }
            })
            .catch(error => console.error("Error:", error));
    });

    // Función para manejar la eliminacion de un guia turístico
    const handleDeleteClick = (e) => {
        const id = e.target.dataset.id;

        fetch("delete_hotel.php?id=${id}")
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    loadhotel(); // Volver a cargar hoteles
                } else {
                    alert("Error al eliminar el hotel");
                }
            })
            .catch(error => console.error("Error:", error));
    };

    // Filtrar Hoteles por busqueda
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();

        document.querySelectorAll(".card").forEach(card => {
            const cardText = card.textContent.toLowerCase();
            if (cardText.includes(searchTerm)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });

    // Cargar hoteles cuando la pagina esté lista
    loadhotel();
})