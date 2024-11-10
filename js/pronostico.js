document.getElementById('buscarClima').addEventListener('click', obtenerClima);

function obtenerClima() {
    const ciudad = document.getElementById('ciudad').value;
    const apiKey = '7e8372022c6afb180925e2e0d3e743bf';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ciudad no encontrada');
            }
            return response.json();
        })
        .then(data => mostrarClima(data))
        .catch(error => mostrarError(error));
}

function mostrarClima(data) {
    document.getElementById('nombreCiudad').textContent = data.name;
    document.getElementById('descripcion').textContent = `Descripción: ${data.weather[0].description}`;
    document.getElementById('temperatura').textContent = `Temperatura: ${data.main.temp} °C`;
    document.getElementById('humedad').textContent = `Humedad: ${data.main.humidity} %`;
    document.getElementById('viento').textContent = `Viento: ${data.wind.speed} m/s`;
    document.getElementById('iconoClima').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    document.getElementById('resultado').classList.remove('oculto');
    document.getElementById('error').classList.add('oculto');
}

function mostrarError(error) {
    document.getElementById('error').textContent = error.message;
    document.getElementById('error').classList.remove('oculto');
    document.getElementById('resultado').classList.add('oculto');
}
