// Inicializar el mapa y establecer la vista inicial
var map = L.map('map').setView([21.1397, -99.6266], 13);

// Añadir la capa de tiles de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Añadir controles de zoom y escala
L.control.scale({
    position: 'topright'
}).addTo(map);
// Crear un ícono personalizado para gasolineras
const gasStationIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2906/2906275.png', // URL del ícono de gasolinera
    iconSize: [25, 25], // Tamaño del ícono
    iconAnchor: [12, 25], // Punto del ícono que corresponde a la posición en el mapa
    popupAnchor: [0, -20] // Punto desde donde aparece el popup
});

// Crear un ícono personalizado para zonas de riesgo
const dangerIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1828/1828843.png', // URL del ícono de advertencia
    iconSize: [20, 20], // Tamaño del ícono
    iconAnchor: [12, 12], // Punto del ícono que corresponde a la posición en el mapa
    popupAnchor: [0, -100] // Punto desde donde aparece el popup
});



// Lista de gasolineras con coordenadas y detalles
const gasStationMarkers = L.layerGroup();
const gasStations = [
    { coords: [21.131,-99.631], popup: 'Gasolinera Mobil.' },
    { coords: [21.214, -99.538], popup: 'Gasolinera GASHA Ahuacatlan.' },
    { coords: [21.215, -99.467], popup: 'Gasolinera PEMEX.' },
    { coords: [21.234, -99.478], popup: 'Gasolinera PEMEX.' },
    { coords: [21.389,-98.985], popup: 'Gasolinera PEMEX Xilitla.' },
    { coords: [21.45198949920952, -99.63237909484643], popup: 'Gasolinera Conca.' },


];

// Definir zonas de peligro
// Crear un grupo para marcadores de zonas de riesgo
const dangerMarkers = L.layerGroup();
const dangerZones = [
    { coords: [21.138, -99.620], // Coordenadas del señalamiento
      popup: '¡Precaución! Riesgo de deslizamientos de tierra.'},
    { coords: [21.136, -99.625], // Coordenadas del señalamiento
      popup: '¡Cuidado! Curva Peligrosa.'},
    { coords: [21.138, -99.620], // Coordenadas del señalamiento
      popup: 'Zona con riesgo de caídas de rocas.'}, 
    { coords: [21.204, -99.474], // Coordenadas del señalamiento
      popup: 'Zona con riesgo de Ahogamiento.'}, 
    { coords: [21.135, -99.628], // Coordenadas del señalamiento
      popup: 'Zona Peatonal.'}, 
    { coords: [21.167, -99.556], // Coordenadas del señalamiento
      popup: 'Zona de ahogamiento.'}, 
    { coords: [21.554, -99.330], // Coordenadas del señalamiento
      popup: 'Zona de ahogamiento acceso solo con guia.'},
    { coords: [21.273, -99.214], // Coordenadas del señalamiento
        popup: 'carretera peligrosa.'},
    { coords: [21.100, -99.621], // Coordenadas del señalamiento
            popup: 'Zona de deslave.'},   
];
// Añadir áreas destacadas con círculos para zonas de peligro
// Crear un grupo para las áreas de peligro
const dangerAreas = L.layerGroup();
const dangerAreasData = [
    { coords: [21.138, -99.620],color: 'red',radius: 200,popup: 'Zona de peligro: riesgo de deslizamientos.'},
    {coords: [21.187, -99.576],color: 'red',radius: 500, popup: 'Zona de peligro: Curva Peligrosa.'},
    { coords: [21.141, -99.620],color: 'yellow', radius: 200, popup: 'Zona de peligro: Zona de Niebla.'},
    { coords: [21.204, -99.474], color: 'red', radius: 100, popup: 'Zona de peligro:Nadar con precaucion.'},
    { coords: [21.135, -99.628], color: 'yellow', radius: 100, popup: 'Zona de peligro: Zona Peatonal.'},
    { coords: [21.167, -99.556], color: 'orange', radius: 500, popup: 'Nadar con precaucion.'},
    { coords: [21.554, -99.330], color: 'orange',radius: 500,popup: 'Nadar con precaucion.'},
    { coords: [21.273, -99.214], color: 'orange',radius: 500,popup: 'Curva peligrosa.'},
    { coords: [21.273, -99.214], color: 'orange',radius: 500,popup: 'Maneje con precaucion.'},

];

// Añadir círculos al mapa
dangerAreasData.forEach(area => {
    L.circle(area.coords, {
        color: area.color,
        radius: area.radius,
        fillColor: area.color,
        fillOpacity: 0.3
    }).addTo(dangerAreas).bindPopup(area.popup);
    
});

gasStations.forEach(station => {
    L.marker(station.coords, { icon: gasStationIcon })
        .addTo(gasStationMarkers)
        .bindPopup(station.popup);
});
// Añadir el control para mostrar/ocultar las capas de peligro
const overlayMaps = {
    "Áreas de peligro": dangerAreas,
    "Gasolineras": gasStationMarkers
   
};
L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map);

// Por defecto, no mostrar las capas de peligro
map.removeLayer(dangerMarkers);
map.removeLayer(dangerAreas);
map.removeLayer(dangerIcon);



var currentRoute = null;

// Array de marcadores
var markers = [
    { coords: [21.13480, -99.62855], name: 'PINAL DE AMOLES', popup: '<a href="pinal.html"><b>PINAL DE AMOLES</b><br><img src="res/pinal/PINAL.jpg" alt="Mirador Pinal" width="150" height="100"></a>' },
    { coords: [21.18546, -99.61196], name: 'PUENTE DE DIOS', popup: '<a href="pinal.html"><b>PUENTE DE DIOS</b><br><img src="res/pinal/puente de dios.jpg" alt="Puente De Dios" width="150" height="100"></a>' },
    { coords: [21.08033, -99.66208], name: 'MIRADOR CUATRO PALOS', popup: '<a href="pinal.html"><b>MIRADOR CUATRO PALOS</b><br><img src="res/pinal/MIRADOR 4 PALOS.jpg" alt="Mirador Cuatro Palos" width="150" height="100"></a>' },
    { coords: [21.13461, -99.62533], name: 'PARROQUIA SAN JOSE PINAL DE AMOLES', popup: '<a href="pinal.html"><b>PARROQUIA SAN JOSE PINAL DE AMOLES</b><br><img src="res/pinal/parroquiapinal.jpg" alt="Parroquia San Jose" width="150" height="100"></a>' },
    { coords: [21.13434, -99.62746], name: 'MUSEO COMUNITARIO PINAL DE AMOLES', popup: '<a href="pinal.html"><b>MUSEO COMUNITARIO PINAL DE AMOLES</b><br><img src="res/pinal/museo.jpg" alt="Museo Comunitario" width="150" height="100"></a>' },
    { coords: [21.13324, -99.62546], name: 'AUDITORIO MUNICIPAL', popup: '<a href="pinal.html"><b>AUDITORIO MUNICIPAL</b><br><img src="res/pinal/audi.jpg" alt="Auditorio Municipal" width="150" height="100"></a>' },
    { coords: [21.161765, -99.561271], name: 'CASCADA EL CHUVEJE', popup: '<a href="pinal.html"><b>CASCADA EL CHUVEJE</b><br><a href="#"><img src="res/pinal/chuveje.jpg" alt="Cascada El Chuveje" width="150" height="100"></a>' },
    { coords: [21.126811, -99.637523], name: 'PUERTA DEL CIELO', popup: '<a href="pinal.html"><b>PUERTA DEL CIELO</b><br><img src="res/pinal/PUERTA DEL CIERLO.jpg" alt="Puerta del Cielo" width="150" height="100">' },
    { coords: [21.035866, -99.619614], name: 'CAMPAMENTO EL MANGAL, BUCARELI', popup: '<a href="pinal.html"><b>CAMPAMENTO EL MANGAL, BUCARELI</b><br><img src="res/pinal/mangal.jpg" alt="Campamento El Mangal" width="150" height="100"></a>' },
    { coords: [21.196211, -99.516402], name: 'CUEVA DE LOS RISCOS', popup: '<a href="pinal.html"><b>CUEVA DE LOS RISCOS</b><br><img src="res/pinal/riscos.jpg" alt="Cueva de los Riscos" width="150" height="100"></a>' },
    { coords: [21.233713,-99.6251149], name: 'CAÑON DEL INFIERNILLO', popup: '<a href="pinal/html"><b>CAÑON DEL INFIERNILLO</b><br><img src="res/pinal/infiernillo.jpg" alt="Cañon del Infiiernillo" width="150" height="100"></a>' },
    { coords: [21.11297, -99.62452], name: 'MIRADOR DE LAS GUACAMAYAS ', popup: '<a href="pinal.html"><b>MIRADOR DE LAS GUACAMAYAS</b><br><img src="res/pinal/guacamayas.jpg" alt="Mirador De Las Guacamayas(Mirador De Cristal)" width="150" height="100"></a>' },
    { coords: [21.04085, -99.61413], name: 'BUCARELI', popup: '<a href="pinal.html"><b>BUCARELI</b><br><img src="res/pinal/buca.jpg" alt="Bucareli" width="150" height="100"></a>' },
    { coords: [21.037164, -99.614668], name: 'EX CONVENTO BUCARELI', popup: '<a href="pinal.html"><b>EX CONVENTO BUCARELI</b><br><img src="res/pinal/exconvento.jpg" alt="Ex Convento Bucareli" width="150" height="100"></a>' },
    { coords: [21.134362, -99.626095], name: 'MONUMENTO HACIA LOS MINEROS', popup: '<a href="pinal.html"><b>MONUMENTO HACIA LOS MINEROS</b><br><img src="res/pinal/mineros.jpg" alt="Monumento Hacia Los Mineros" width="150" height="100"></a>' },
    { coords: [21.134545, -99.624812], name: 'CENTRO COMUNITARIO', popup: '<a href="pinal.html"><b>CENTRO COMUNITARIO</b><br><img src="res/pinal/centrodedia.png" alt="Centro comunitario" width="150" height="100"></a>' },
    { coords: [21.134877, -99.627899], name: 'CASA DEL ESTUDIANTE PEÑAMILLER-PINAL', popup: '<a href="pinal.html"><b>CASA DEL ESTUDIANTE PEÑAMILLER-PINAL</b><br><img src="res/pinal/casaestudiante.png" alt="Mirador Pinal" width="150" height="100"></a>' },
    { coords: [21.1233705,-99.5339916], name: 'CASCADA EL SALTO ', popup: '<a href="pinal.html"><b>CASCADA EL SALTO</b><br><img src="res/pinal/Cascada-el-Salto.jpg" alt="cascada el salto" width="150" height="100"></a>' },

    // Jalpan de Serra     
    { coords: [21.217321, -99.473034], name: 'JALPAN DE SERRA', popup: '<a href="jalpan.html"><b>JALPAN DE SERRA</b><br><img src="res/jalpan/jalpan.jpg" alt="Jalpan De serra" width="150" height="100"></a>' },
    { coords: [21.216758, -99.473858], name: 'MISIÓN DE SANTIAGO', popup: '<a href="jalpan.html"><b>MISIÓN DE SANTIAGO</b><br><img src="res/jalpan/santiago.jpg" alt="Jalpan" width="150" height="100"></a>' },
    { coords: [21.20622, -99.47230], name: 'PRESA JALPAN', popup: '<a href="jalpan.html"><b>PRESA JALPAN</b><br><img src="res/jalpan/presa.jpg" alt="Presa Jalpan" width="150" height="100"></a>' },
        { coords: [21.217768, -99.473729], name: 'MUSEO HISTORICO DE LA SIERRA GORDA', popup: '<a href="jalpan.html"><b>MUSEO HISTORICO DE LA SIERRA GORDA</b><br><img src="res/jalpan/museoj.jpg" alt="Museo Historico De La Sierra Gorda" width="150" height="100"></a>' },
        { coords: [21.160738, -99.396671], name: 'ZONA ARQUEOLOGICA DE TANCAMA', popup: '<a href="jalpan.html"><b>ZONA ARQUELOGICA DE TANCAMA</b><br><img src="res/jalpan/tancama.jpg" alt="zona arquelogica de tancama" width="150" height="100"></a>' },
        { coords: [21.398757, -99.330354], name: 'MUSEO PAME XI OI', popup: '<a href="jalpan.html"><b>MUSEO PAME XI OI</b><br><img src="res/jalpan/museopame.jpg" alt="museo pame xi oi" width="150" height="100"></a>' },
        { coords: [21.44604, -99.44223], name: 'RIO SANTA MARIA', popup: '<a href="jalpan.html"><b>RIO SANTA MARIA</b><br><img src="res/jalpan/rio santa maria.jpg" alt="rio santa maria" width="150" height="100"></a>' },
        { coords: [21.399327, -99.329560], name: 'MISION DE TANCOYOL', popup: '<a href="jalpan.html"><b>MISION DE TANCOYOL</b><br><img src="res/jalpan/tancoyol.jpg" alt="mision de tancoyol " width="150" height="100"></a>' },
        { coords: [21.51353, -99.17178], name: 'VALLE VERDE', popup: '<a href="jalpan.html"><b>VALLE VERDE</b><br><img src="res/jalpan/valle verde.jpg" alt="valle verde" width="150" height="100"></a>' },
        { coords: [21.4968788,-99.2799002], name: 'CUEVA DE AGUA', popup: '<a href="jalpan.html"><b>CUEVA DEL AGUA</b><br><img src="res/jalpan/cueva del agua.jpg" alt="cueva del agua" width="150" height="100"></a>' },
        { coords: [21.4968788,-99.2799002], name: 'SAN ANTONIO TANCOYOL', popup: '<a href="jalpan.html"><b>SAN ANTONIO TANCOYOL</b><br><img src="res/jalpan/san antonio tancoyol.jpg" alt="san antonio tancoyol" width="150" height="100"></a>' },




    //landa de matamoros
    { coords: [21.18390, -99.32157], name: 'LANDA DE MATAMOROS', popup: '<a href="landa.html"><b>LANDA DE MARAMOROS</b><br><img src="res/landa/landa.jpg" alt="Landa de Matamoros" width="150" height="100"></a>' },
    { coords: [21.244180, -99.122727], name: 'LAS POSAS DEL RÍO VERDITO', popup:'<a href="landa.html"><b> LAS POSAS DEL RÍO VERDITO</b><br><img src="res/landa/rioverdito.jpg" alt="rio verdito" width="150" height="100"></a>' },
    { coords: [21.278347, -99.150713], name: 'EL MADROÑO, LANDA DE MATAMOROS', popup:'<a href="landa.html"><b>EL MADROÑO, LANDA DE MATAMOROS </b><br><img src="res/landa/madrono.jpg" alt="" width="150" height="100"></a>' },
    { coords: [21.163825, -99.191410], name: 'MISION DE SAN FRANSICO DE ASÍS DEL VALE DE TILACO', popup:'<a href="landa.html"><b>MISION DE SAN FRANSICO DE ASÍS DEL VALE DE TILACO</b><br><img src="res/landa/tilaco.jpg" alt="" width="150" height="100"></a>' },
    { coords: [21.268146966410278, -99.16365092394435], name: 'RODEO ECOTURISMO', popup:'<a href="landa.html"><b>RODEO ECOTURISMO</b><br><img src="res/landa/eco.jpg" alt="" width="150" height="100"></a>' },
    { coords: [21.1631931,-99.1937817], name: 'HURACAN DE LA SIERRA ', popup:'<a href="landa.html"><b>HURACAN DE LA SIERRA</b><br><img src="res/landa/huracandelasierra.jpg" alt="huracan de la sierra" width="150" height="100"></a>' },



    //xilitla
    { coords: [21.38647, -98.99201], name: 'XILITLA', popup:'<a href="xilitla.html"><b>XILITLA</b><br><img src="res/xilitla/xilitapaisaje.jpg" alt="xilitla" width="150" height="100"></a>' },
    { coords: [21.397589, -98.996505], name: 'JARDIN SURREALISTA DE EDWARD JAMES', popup: '<a href="xilitla.html"><b>JARDIN SURREALISTA DE EDWARD JAMES</b><br><img src="res/xilitla/jardinedward.jpg" alt="jardin de edward james" width="150" height="100"></a>' },
    { coords: [21.385611, -98.989609], name: 'EX CONVENTO SAN AGUSTIN', popup:'<a href="xilitla.html"><b>EXCONVENTO SAN AGUSTIN</b><br><img src="res/xilitla/sanagustin.jpg" alt="jardin de edward james" width="150" height="100"></a>' },
    { coords: [21.395466, -98.997223], name: 'CASCADA DE LOS COMALES', popup:'<a href="xilitla.html"><b>CASCADA DE LOS COMALES</b><br><img src="res/xilitla/comales.png" alt="cascada de los comales" width="150" height="100"></a>' },
    { coords: [21.387055, -98.981844], name: 'CUEVA DEL SALITRE', popup:'<a href="xilitla.html"><b>CUEVA DEL SALITRE</b><br><img src="res/xilitla/salitre.jpg" alt="cueva del salitre" width="150" height="100"></a>' },
    { coords: [21.398236, -98.996558], name: 'SARCÓFAGO', popup: '<a href="xilitla.html"><b>SARCOFAGO</b><br><img src="" alt="Sarcofago" width="150" height="100"></a>'},
    { coords: [21.4592305,-98.9796911], name: ' NACIMIENTO DE HUICHIHUAYAN', popup: '<a href="xilitla.html"><b>NACIMIENTO DE HUICHIHUAYAN</b><br><img src="res/xilitla/nacimiento.jpg" alt="nacimiento de huichihuayan" width="150" height="100"></a>'},
    { coords: [21.4148389,-99.0941433], name: ' LA HOYA DE LA LUZ', popup: '<a href="hoyadelaluz.html"><b>LA HOYA DE LA LUZ</b><br><img src="res/xilitla/salitre.jpg" alt="la hoya de la luz" width="150" height="100"></a>'},
    { coords: [21.3880261,-99.0590298], name: ' MUSEO LEONORA CARRIGNTON', popup: '<a href="xilitla.html"><b>MUSEO LEONORA CARRIGNTON</b><br><img src="res/xilitla/museoleonora.jpg" alt="museo leonora carrignton" width="150" height="100"></a>'},
    { coords: [21.531229, -99.033562], name: ' SOTANO DE LAS GOLONDRINAS', popup: '<a href="xilitla.html"><b>SOTANO DE LAS GOLONDRINAS</b><br><img src="res/xilitla/sotanogolonddrinas.jpg" alt=" sotano las golondrinas" width="150" height="100"></a>'},
    { coords: [21.621577, -99.018721], name: ' EMBARCADERO LA MORENA', popup: '<a href="xilitla.html"><b>EMBARCADERO LA MORENA</b><br><img src="res/xilitla/morena.jpg" alt="embarcadero la morena" width="150" height="100"></a>'},
    { coords: [21.398143,-98.9992209], name: ' CASCADA EL GENERAL', popup: '<a href="xilita.html"><b>CASCADA EL GENERAL</b><br><img src="res/xilitla/cascadageneral.jpg" alt="cascada el general" width="150" height="100"></a>'},
    
    //arroyo seco

    { coords: [21.5503856,-99.7019375], name: ' ARROYO SECO', popup: '<a href="arroyoseco.html"><b>ARROYO SECO</b><br><img src="res/arroyo seco/arroyoseco.jpg" alt="arroyo seco" width="150" height="100"></a>'},
    { coords: [21.4441902,-100.1638313], name: ' MISION SAN MIGUEL CONCA', popup: '<a href="arroyoseco.html"><b>MISION SAN MIGUEL CONCA</b><br><img src="res/arroyo seco/misionconca.jpg" alt="ayutla" width="150" height="100"></a>'},
    { coords: [21.4055748,-99.6052998], name: ' AYUTLA', popup: '<a href="arroyoseco.html"><b>AYUTLA</b><br><img src="res/arroyo seco/ayutla.jpg" alt="ayutla" width="150" height="100"></a>'},
    { coords: [21.4467664,-99.6321278], name: 'ARBOL MILENARIO Y NACIMIENTOS DE CONCA', popup: '<a href="arroyoseco.html"><b>ARBOL MILENARIO Y NACIMIENTOS DE CONCA</b><br><img src="res/arroyo seco/arbol.jpeg" alt="arbol milenario y nacimientos de conca" width="150" height="100"></a>'},
    { coords: [21.3560202,-99.7485061], name: ' SOTANO DEL BARRO', popup: '<a href="arroyoseco.html"><b>SOTANO DEL BARRO</b><br><img src="res/arroyo seco/sotano.jpg" alt="sotano del barro" width="150" height="100"></a>'},

// peñamiller"
{ coords: [21.0589, -99.8163], name: ' PEÑAMILLER', popup: '<a href="peñamiller.html"><b>PEÑAMILLER</b><br><img src="res/peñamiller/peñamiller.jpeg" alt="peñamiller" width="150" height="100"></a>'},
{ coords: [21.0000173,-99.7104338], name: 'BALNERIO EL OASIS', popup: '<a href="peñamiller.html"><b>BALNEARIO EL OASIS</b><br><img src="res/peñamiller/Balneario.jpg" alt="balneario el paraiso" width="150" height=" 100"></a>'},
{ coords: [21.020980, -99.699683], name: ' CAÑON DEL PARAISO', popup: '<a href="peñamiller.html"><b>CAÑON DEL PARAISO</b><br><img src="res/peñamiller/paraiso.jpg" alt="cañon del paraiso" width="150" height=" 100"></a>'},

];

// Crear marcadores y añadir eventos
markers.forEach(function(marker) {
    // Crear un marcador y añadirlo al mapa
    var leafletMarker = L.marker(marker.coords).addTo(map);
    leafletMarker.bindPopup(marker.popup);

    
    

    // Añadir a la lista de direcciones
    var listItem = document.createElement('li');
    listItem.innerHTML = `<a href="#" data-lat="${marker.coords[0]}" data-lng="${marker.coords[1]}">${marker.name}</a>`;
    document.getElementById('directions-list').appendChild(listItem);

    // Evento de clic en el marcador del mapa
    leafletMarker.on('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var userLocation = [position.coords.latitude, position.coords.longitude];
                
                // Eliminar la ruta actual si existe
                if (currentRoute) {
                    map.removeControl(currentRoute);
                }

                // Crear y añadir la nueva ruta
                currentRoute = L.Routing.control({
                    waypoints: [
                        L.latLng(userLocation),
                        L.latLng(marker.coords)
                    ],
                    routeWhileDragging: true,
                    language: 'es'
                }).addTo(map);
            }, function(error) {
                alert("Error al obtener la ubicación: " + error.message);
            });
        } else {
            alert("Geolocalización no es soportada por este navegador.");
        }
    });
});

// Añadir eventos de clic para la lista de destinos
document.getElementById('directions-list').addEventListener('click', function(event) {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        var lat = parseFloat(event.target.getAttribute('data-lat'));
        var lng = parseFloat(event.target.getAttribute('data-lng'));
        var destination = [lat, lng];

        if (!isNaN(lat) && !isNaN(lng)) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var userLocation = [position.coords.latitude, position.coords.longitude];
                    
                    // Eliminar la ruta actual si existe
                    if (currentRoute) {
                        map.removeControl(currentRoute);
                    }

                    // Crear y añadir la nueva ruta
                    currentRoute = L.Routing.control({
                        waypoints: [
                            L.latLng(userLocation),
                            L.latLng(destination)
                        ],
                        routeWhileDragging: true,
                        language: 'es'
                    }).addTo(map);

                    // Centramos el mapa en el destino y abrimos el popup
                    map.setView(destination, 14); // Ajusta el nivel de zoom según sea necesario

                    // Buscar el marcador correspondiente y abrir su popup
                    markers.forEach(function(marker) {
                        if (marker.coords[0] === lat && marker.coords[1] === lng) {
                            leafletMarker = L.marker(marker.coords).addTo(map);
                            leafletMarker.bindPopup(marker.popup).openPopup();
                        }
                    });
                }, function(error) {
                    alert("Error al obtener la ubicación: " + error.message);
                });
            } else {
                alert("Geolocalización no es soportada por este navegador.");
            }
        } else {
            alert("Coordenadas del destino no válidas.");
        }
    }
});

