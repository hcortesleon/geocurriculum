// --- Inicialización del Mapa ---

var map = L.map('map', { zoomControl:true, maxZoom:28, minZoom:1 }).setView([-28.285, -65.962], 6);
var hash = new L.Hash(map);
map.attributionControl.setPrefix('<a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; ');

var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});

function removeEmptyRowsFromPopupContent(content, feature) {
 var tempDiv = document.createElement('div');
 tempDiv.innerHTML = content;
 var rows = tempDiv.querySelectorAll('tr');
 for (var i = 0; i < rows.length; i++) {
     var td = rows[i].querySelector('td.visible-with-data');
     var key = td ? td.id : '';
     if (td && td.classList.contains('visible-with-data') && feature.properties[key] == null) {
         rows[i].parentNode.removeChild(rows[i]);
     }
 }
 return tempDiv.innerHTML;
}

var measureControl = new L.Control.Measure({
    position: 'topleft', primaryLengthUnit: 'meters', secondaryLengthUnit: 'kilometers',
    primaryAreaUnit: 'sqmeters', secondaryAreaUnit: 'hectares', localization: 'es',
    activeColor: '#cc2504', completedColor: '#197204', decPoint: ',', thousandsSep: '.'
});
measureControl.addTo(map);
document.getElementsByClassName('leaflet-control-measure-toggle')[0].innerHTML = '';
document.getElementsByClassName('leaflet-control-measure-toggle')[0].className += ' fas fa-ruler';

map.createPane('pane_ESRISatellite_0'); map.getPane('pane_ESRISatellite_0').style.zIndex = 400;
var layer_ESRISatellite_0 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { pane: 'pane_ESRISatellite_0', opacity: 1.0, minZoom: 1, maxZoom: 28 });

map.createPane('pane_GoogleTerrain_1'); map.getPane('pane_GoogleTerrain_1').style.zIndex = 401;
var layer_GoogleTerrain_1 = L.tileLayer('https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', { pane: 'pane_GoogleTerrain_1', opacity: 1.0, minZoom: 1, maxZoom: 28 });

map.createPane('pane_OSMHumanitarian_2');
map.getPane('pane_OSMHumanitarian_2').style.zIndex = 402;
var layer_OSMHumanitarian_2 = L.tileLayer('http://tile-b.openstreetmap.fr/hot/{z}/{x}/{y}.png, http://tile-a.openstreetmap.fr/hot/{z}/{x}/{y}.png, http://tile-c.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    pane: 'pane_OSMHumanitarian_2',
    opacity: 1.0,
    attribution: '<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
    minZoom: 1,
    maxZoom: 28,
    minNativeZoom: 0,
    maxNativeZoom: 19
});
layer_OSMHumanitarian_2;
map.addLayer(layer_OSMHumanitarian_2);

map.createPane('pane_CartoDBDark_3'); map.getPane('pane_CartoDBDark_3').style.zIndex = 399;
var layer_CartoDark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { pane: 'pane_CartoDBDark_3', minZoom: 1, maxZoom: 28 });

map.addLayer(layer_OSMHumanitarian_2);

const habilidadesPorEmpresa = {
    'Vialidad Melipilla': { 'Python/GDAL': 55, 'Segmentación Dinámica': 85, 'Bases de Datos': 65 },
    'GoldFields': { 'Cartografía Geológica': 80, 'Metadatos': 75, 'GIS Desktop': 70 },
    'Arcadis Geotécnica': { 'Geodatabase Modelos': 85, 'Estudios Ambientales': 75, 'ArcGIS': 80 },
    'Instituto Nacional de Estadísticas': { 'Cartografía Censal': 90, 'ArcInfo Workstation': 85 },
    'Geoinfo prestando servicios para Exploraciones mineras S.A., Codelco Norte': { 'Cartografía Minera': 85, 'Control de Calidad': 75 },
    'Comtec-Chile': { 'Catastro Eléctrico': 90, 'Análisis Espacial': 80, 'Gestión de Propietarios': 85 },
    'Contraloría General de la Republica': { 'Auditoría Obras Públicas': 90, 'Normas ISO 19100': 85, 'Capacitación': 95 },
    'Proyecto Gef-PNUD Ministerio de Medio Ambiente': { 'Áreas Protegidas': 95, 'Normas ISO-Chile': 90, 'Edición Avanzada': 85 },
    'ESRI Chile': { 'Interoperabilidad GDB': 90, 'ArcGIS Server': 85, 'Comités de Normalización': 95 },
    'Geoxite': { 'Desarrollo ArcPy': 90, 'ArcGIS Enterprise': 85, 'Geodatabase Enterprise': 90 },
    'Servicio Aéreo Fotogramétrico (SAF)': { 'PostGIS/Postgres': 95, 'GeoServer': 90, 'Image Server': 95, 'Docencia': 90 }
};

function obtenerColorEmpresa(empresa) {
    switch(empresa) {
        case 'Vialidad Melipilla': return 'rgba(215,25,28,1.0)';
        case 'GoldFields': return 'rgba(230,85,56,1.0)';
        case 'Arcadis Geotécnica': return 'rgba(245,144,83,1.0)';
        case 'Instituto Nacional de Estadísticas': return 'rgba(253,190,116,1.0)';
        case 'Geoinfo prestando servicios para Exploraciones mineras S.A., Codelco Norte': return 'rgba(254,223,153,1.0)';
        case 'Comtec-Chile': return 'rgba(255,255,191,1.0)';
        case 'Contraloría General de la Republica': return 'rgba(221,241,180,1.0)';
        case 'Proyecto Gef-PNUD Ministerio de Medio Ambiente': return 'rgba(188,228,169,1.0)';
        case 'ESRI Chile': return 'rgba(145,203,168,1.0)';
        case 'Geoxite': return 'rgba(94,167,177,1.0)';
        case 'Servicio Aéreo Fotogramétrico (SAF)': return 'rgba(43,131,186,1.0)';
        default: return '#3388ff';
    }
}

var cluster_Empleos_3 = new L.MarkerClusterGroup({ showCoverageOnHover: false, spiderfyDistanceMultiplier: 2 }).addTo(map);
var trajectoryLayer = L.layerGroup().addTo(map);
var heatLayer = null;

function filtrarYRenderizarCronologia(anioDestino) {
    cluster_Empleos_3.clearLayers();
    trajectoryLayer.clearLayers();

    var puntosCronologicos = [];
    var registrosFiltrados = json_Empleos_3.features.filter(function(feature) {
        var anioStr = feature.properties['Año:'];
        var anioBase = parseInt(anioStr.substring(0, 4));
        return anioBase <= anioDestino;
    });
	
	
	

    const miOrdenPersonalizado = {
    'Servicio Aéreo Fotogramétrico (SAF)': 11,
    'ESRI Chile': 9,
    'Geoxite': 10,
    'Contraloría General de la Republica': 7,
    'Proyecto Gef-PNUD Ministerio de Medio Ambiente': 8,
    'Arcadis Geotécnica': 3,
    'GoldFields': 2,
    'Instituto Nacional de Estadísticas': 4,
    'Geoinfo prestando servicios para Exploraciones mineras S.A., Codelco Norte': 5,
    'Comtec-Chile': 6,
    'Vialidad Melipilla': 1
};

registrosFiltrados.sort(function(a, b) {
    var ordenA = miOrdenPersonalizado[a.properties['Empresa:']] || 99;
    var ordenB = miOrdenPersonalizado[b.properties['Empresa:']] || 99;
    return ordenA - ordenB;
});





    registrosFiltrados.forEach(function(feature, index) {
        var coords = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
        puntosCronologicos.push(coords);

        var colorHex = obtenerColorEmpresa(feature.properties['Empresa:']);
        var htmlIcono = `<div class="custom-animated-pulse marker-entry-animation" style="width:14px; height:14px; background:${colorHex}; border:2px solid #fff; box-shadow:0 0 4px rgba(0,0,0,0.4);"></div>`;
        var customIcon = L.divIcon({ html: htmlIcono, className: '', iconSize: [14, 14], iconAnchor: [7, 7] });
        var marker = L.marker(coords, { icon: customIcon });
		
		marker.feature = feature

        marker.bindTooltip(`<b>${feature.properties['Empresa:']}</b><br>${feature.properties['Año:']}`, { className: 'modern-tooltip', direction: 'top', offset: [0, -10] });

        
		
		var popupId = `chart-popup-${index}`;
        var popupContent = `
            <div style="min-width:240px; color:#333;">
                <h4 style="margin:0 0 6px 0; color:#2b83ba; line-height:1.2;">
                    ${feature.properties['Empresa:']} <br>
                    <span style="font-size:12px; color:#555; font-weight:normal;">${feature.properties['Cargo:']}</span>
                </h4>
                <b>Periodo:</b> ${feature.properties['Año:']}<br>
                <p style="margin:6px 0; font-size:11px; max-height:80px; overflow-y:auto; line-height:1.3; border:none;">
                    ${feature.properties['Descripción:'].replace(/\n/g, '<br>')}
                </p>
                <div class="popup-chart-container"><canvas id="${popupId}"></canvas></div>
            </div>
        
			
			
        `;
        marker.bindPopup(popupContent, { maxHeight: 320 });

        marker.on('popupopen', function() {
            var empresa = feature.properties['Empresa:'];
            var skills = habilidadesPorEmpresa[empresa] || { 'GIS General': 80 };
            setTimeout(function() {
                var ctx = document.getElementById(popupId).getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: { labels: Object.keys(skills), datasets: [{ label: 'Dominio Técnico %', data: Object.values(skills), backgroundColor: colorHex, borderColor: 'rgba(0,0,0,0.1)', borderWidth: 1 }] },
                    options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true, max: 100, ticks: { display: false } }, y: { ticks: { font: { size: 9 } } } } }
                });
            }, 100);
        });

        cluster_Empleos_3.addLayer(marker);
    });

   // if (puntosCronologicos.length > 1) {
     //   var polyline = L.polyline(puntosCronologicos, { color: '#2b83ba', weight: 3, opacity: 0.8, className: 'animated-trajectory' });
       // trajectoryLayer.addLayer(polyline);
    //}

    document.getElementById('stat-jobs').innerText = registrosFiltrados.length;
    var totalAnios = registrosFiltrados.length > 0 ? (anioDestino - 2008 + 1) : 0;
    document.getElementById('stat-years').innerText = totalAnios;
}

var slider = document.getElementById('timeline-slider');
var labelAnio = document.getElementById('year-display');

slider.addEventListener('input', function(e) {
    var anio = parseInt(e.target.value);
    labelAnio.innerText = anio;
    filtrarYRenderizarCronologia(anio);
});

var darkThemeActive = false;
document.getElementById('btn-theme').addEventListener('click', function() {
    darkThemeActive = !darkThemeActive;
    if (darkThemeActive) {
        map.removeLayer(layer_OSMHumanitarian_2);
        map.addLayer(layer_CartoDark);
        document.body.setAttribute('data-theme', 'dark');
        this.innerText = "☀️ Modo Claro";
    } else {
        map.removeLayer(layer_CartoDark);
        map.addLayer(layer_OSMHumanitarian_2);
        document.body.removeAttribute('data-theme');
        this.innerText = "🌙 Modo Oscuro";
    }
});

document.getElementById('btn-heat').addEventListener('click', function() {
    if (heatLayer) {
        map.removeLayer(heatLayer);
        heatLayer = null;
        this.innerText = "🔥 Heatmap";
    } else {
        var puntosCalor = json_Empleos_3.features.map(function(f) { return [f.geometry.coordinates[1], f.geometry.coordinates[0], 0.8]; });
        heatLayer = L.heatLayer(puntosCalor, { radius: 40, blur: 25, maxZoom: 10 }).addTo(map);
        this.innerText = "📍 Mostrar Puntos";
    }
});




// ==========================================
// CONFIGURACIÓN DEFINITIVA DEL TOUR CONTROLADO
// ==========================================
var tourActivo = false;
var timeoutTour = null;

document.getElementById('btn-tour').addEventListener('click', function() {
    // Si el tour ya está corriendo, este mismo botón ahora lo detiene
    if (tourActivo) {
        detenerTour();
        return;
    }

    // 1. Forzar a que todos los puntos existan en el mapa llevando el slider al final
    slider.value = 2016;
    labelAnio.innerText = 2016;
    filtrarYRenderizarCronologia(2016);

    // 2. Tu orden personalizado idéntico a las empresas del JSON
    const miOrdenPersonalizado = {
        'Vialidad Melipilla': 1,
        'GoldFields': 2,
        'Arcadis Geotécnica': 3,
        'Instituto Nacional de Estadísticas': 4,
        'Geoinfo prestando servicios para Exploraciones mineras S.A., Codelco Norte': 5,
        'Comtec-Chile': 6,
        'Contraloría General de la Republica': 7,
        'Proyecto Gef-PNUD Ministerio de Medio Ambiente': 8,
        'ESRI Chile': 9,
        'Geoxite': 10,
        'Servicio Aéreo Fotogramétrico (SAF)': 11
    };

    // 3. Obtenemos los marcadores reales
    var marcadoresOriginales = cluster_Empleos_3.getLayers();
    if (marcadoresOriginales.length === 0) return;

    // 4. ¡SOLUCIÓN AL ORDEN! Creamos una lista nueva e independiente clonando los marcadores
    var rutaTour = [].concat(marcadoresOriginales);

    rutaTour.sort(function(a, b) {
        var featureA = a.feature || (a.options && a.options.feature);
        var featureB = b.feature || (b.options && b.options.feature);

        var empresaA = (featureA && featureA.properties) ? featureA.properties['Empresa:'] : '';
        var empresaB = (featureB && featureB.properties) ? featureB.properties['Empresa:'] : '';
        
        return (miOrdenPersonalizado[empresaA] || 99) - (miOrdenPersonalizado[empresaB] || 99);
    });

    // 5. Cambiar estado del botón a modo "Detener"
    tourActivo = true;
    this.innerText = "🛑 Detener Tour";
    this.style.backgroundColor = "#dc3545"; // Color rojo para indicar peligro/detener
    this.style.color = "white";

    var indexTour = 0;

    function ejecutarPasoTour() {
        if (!tourActivo) return; // Si se presionó detener, abortamos inmediatamente

        if (indexTour >= rutaTour.length) {
            restablecerBotonTour();
            map.fitBounds([[-34.00,-72.80],[-22.50,-65.30]]);
            return;
        }

        var markerActual = rutaTour[indexTour];
        
        // Vuelo fluido hacia las coordenadas del marcador ordenado
        map.flyTo(markerActual.getLatLng(), 14, { duration: 2.5, easeLinearity: 0.25 });

        map.once('moveend', function() {
            if (!tourActivo) return;

            // Abrir el clúster si está agrupado y desplegar el gráfico
            cluster_Empleos_3.zoomToShowLayer(markerActual, function() {
                if (!tourActivo) return;
                markerActual.openPopup();
                indexTour++;
                // Guardamos el temporizador para poder cancelarlo si el usuario pulsa detener
                timeoutTour = setTimeout(ejecutarPasoTour, 4500); 
            });
        });
    }
    
    ejecutarPasoTour();
});

// Función de apoyo para frenar las animaciones y tiempos en ejecución
function detenerTour() {
    tourActivo = false;
    clearTimeout(timeoutTour); // Cancela el conteo de los 4.5 segundos actuales
    map.off('moveend');        // Cancela vuelos de cámara pendientes
    restablecerBotonTour();
}

function restablecerBotonTour() {
    tourActivo = false;
    var btn = document.getElementById('btn-tour');
    btn.innerText = "✈️ Iniciar Tour";
    btn.style.backgroundColor = ""; // Vuelve a su estilo CSS por defecto
    btn.style.color = "";
}





map.createPane('pane_Domicilio_4');
map.getPane('pane_Domicilio_4').style.zIndex = 404;
function pop_Domicilio_4(feature, layer) {
    var popupContent = '<table><tr><th scope="row">Nombre:</th><td>' + (feature.properties['Nombre:'] !== null ? autolinker.link(feature.properties['Nombre:'].toLocaleString()) : '') + '</td></tr><tr><th scope="row">Título:</th><td>' + (feature.properties['Título:'] !== null ? autolinker.link(feature.properties['Título:'].toLocaleString()) : '') + '</td></tr><tr><th scope="row">Dirección:</th><td>' + (feature.properties['Dirección:'] !== null ? autolinker.link(feature.properties['Dirección:'].toLocaleString()) : '') + '</td></tr></table>';
    layer.bindPopup(popupContent, {maxHeight: 400});
}
function style_Domicilio_4_0() { return { pane: 'pane_Domicilio_4', rotationAngle: 0.0, rotationOrigin: 'center center', icon: L.icon({ iconUrl: 'markers/Domicilio_4.svg', iconSize: [28, 28] }), interactive: true, } }
var layer_Domicilio_4 = new L.geoJson(json_Domicilio_4, { pane: 'pane_Domicilio_4', onEachFeature: pop_Domicilio_4, pointToLayer: function (feature, latlng) { return L.marker(latlng, style_Domicilio_4_0()); } }).addTo(map);

var baseMaps = { "OSM Humanitarian": layer_OSMHumanitarian_2, "Google Terrain": layer_GoogleTerrain_1, "ESRI Satellite": layer_ESRISatellite_0 };
var overlays = { 
    'Domicilio': layer_Domicilio_4,
    'Experiencia Laboral': cluster_Empleos_3
	};
L.control.layers(baseMaps, overlays, { collapsed: true }).addTo(map);

// --- Configuración y Tamaño del Logo ---
var logo = L.control({position: 'bottomright'});
logo.onAdd = function(map){ 
    var div = L.DomUtil.create('div', 'myclass'); 
    // Aumentamos max-width a 180px y agregamos una sombra sutil para darle relieve
    div.innerHTML = "<img src='images/Selección_001.png' style='max-width: 180px; width: 100%; height: auto; filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4));'/>"; 
    return div; 
}
logo.addTo(map);

var sidebar = L.control.sidebar('sidebar').addTo(map);

sidebar.on('content', function(e) {
    setTimeout(function() {
        map.invalidateSize();
    }, 300);
});

sidebar.on('closing', function() {
    setTimeout(function() {
        map.invalidateSize();
    }, 300);
});

filtrarYRenderizarCronologia(2016);

// ====================================================
// INITIALIZATION OF SIDEBAR CHARTS AND LEGEND
// ====================================================
function inicializarGraficosSidebar() {
    // 1. Gráfico de Radar por Categorías
    var ctxRadar = document.getElementById('radarCategorias').getContext('2d');
    new Chart(ctxRadar, {
        type: 'radar',
        data: {
            labels: ['Sistemas/Linux', 'Desarrollo (Py/JS)', 'Bases de Datos', 'Servidores SIG', 'Desarrollo Web', 'Normas ISO'],
            datasets: [{
                label: 'Nivel de Dominio %',
                data: [80, 85, 95, 90, 85, 95], // Valores asignados según tu perfil técnico
                backgroundColor: 'rgba(43, 131, 186, 0.2)',
                borderColor: 'rgba(43, 131, 186, 1)',
                pointBackgroundColor: 'rgba(43, 131, 186, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { r: { min: 0, max: 100, ticks: { display: false }, pointLabels: { font: { size: 10 } } } }
        }
    });

    // 2. Gráfico de Barras Horizontales para Software específico
    var ctxBarras = document.getElementById('barrasSoftware').getContext('2d');
    new Chart(ctxBarras, {
        type: 'bar',
        data: {
            labels: ['PostGIS/Postgres', 'ArcGIS Enterprise', 'GeoServer', 'Python (ArcPy/GDAL)', 'Leaflet / API JS'],
            datasets: [{
                data: [95, 90, 90, 85, 80],
                backgroundColor: ['#2b83ba', '#5ea7b1', '#91cba8', '#bce4a9', '#ddf1b4'],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { beginAtZero: true, max: 100, ticks: { display: false } }, y: { ticks: { font: { size: 10, weight: 'bold' } } } }
        }
    });

    // 3. Generar la Leyenda Dinámica de Experiencia usando tu paleta de colores
    const empresasOrdenadas = [
        'Servicio Aéreo Fotogramétrico (SAF)', 'Geoxite', 'ESRI Chile', 
        'Proyecto Gef-PNUD Ministerio de Medio Ambiente', 'Contraloría General de la Republica', 
        'Comtec-Chile', 'Geoinfo prestando servicios para Exploraciones mineras S.A., Codelco Norte', 
        'Instituto Nacional de Estadísticas', 'Arcadis Geotécnica', 'GoldFields', 'Vialidad Melipilla'
    ];

    var contenedorLeyenda = document.getElementById('leyenda-sidebar');
    var htmlLeyenda = '<table style="width:100%; border-collapse: collapse;">';
    
    empresasOrdenadas.forEach(function(empresa) {
        var color = obtenerColorEmpresa(empresa); // Reutiliza tu función de colores existente
        htmlLeyenda += `
            <tr style="border-bottom: 1px solid #eee;">
                <td style="width: 20px; padding: 6px 0; vertical-align: middle;">
                    <div style="width: 12px; height: 12px; background: ${color}; border-radius: 50%; border: 1px solid #fff; box-shadow: 0 0 2px rgba(0,0,0,0.3);"></div>
                </td>
                <td style="padding: 6px 4px; font-size: 11px; line-height: 1.2; color: #444;">
                    ${empresa}
                </td>
            </tr>`;
    });
    
    htmlLeyenda += '</table>';
    contenedorLeyenda.innerHTML = htmlLeyenda;
}

// Ejecutamos la función al cargar la página
inicializarGraficosSidebar();
