var map = L.map('map', {
    zoomControl:true, maxZoom:28, minZoom:1
}).fitBounds([[-34.00,-72.80],[-22.50,-65.30]]);
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
document.querySelector(".leaflet-popup-pane").addEventListener("load", function(event) {
  var tagName = event.target.tagName,
    popup = map._popup;
  // Also check if flag is already set.
  if (tagName === "IMG" && popup && !popup._updated) {
    popup._updated = true; // Set flag to prevent looping.
    popup.update();
  }
}, true);


var measureControl = new L.Control.Measure({
    position: 'topleft',
    primaryLengthUnit: 'meters',
    secondaryLengthUnit: 'kilometers',
    primaryAreaUnit: 'sqmeters',
    secondaryAreaUnit: 'hectares',
    localization: 'es',
    activeColor: '#cc2504',
    completedColor: '#197204',
    decPoint: ',',
    thousandsSep: '.'
});
measureControl.addTo(map);



document.getElementsByClassName('leaflet-control-measure-toggle')[0]
.innerHTML = '';
document.getElementsByClassName('leaflet-control-measure-toggle')[0]
.className += ' fas fa-ruler';
var bounds_group = new L.featureGroup([]);
function setBounds() {
}

map.createPane('pane_ESRISatellite_0');
map.getPane('pane_ESRISatellite_0').style.zIndex = 400;
var layer_ESRISatellite_0 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    pane: 'pane_ESRISatellite_0',
    opacity: 1.0,
    attribution: '',
    minZoom: 1,
    maxZoom: 28,
    minNativeZoom: 0,
    maxNativeZoom: 20
});
layer_ESRISatellite_0;


map.createPane('pane_GoogleTerrain_1');
map.getPane('pane_GoogleTerrain_1').style.zIndex = 401;
var layer_GoogleTerrain_1 = L.tileLayer('https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
    pane: 'pane_GoogleTerrain_1',
    opacity: 1.0,
    attribution: '<a href="https://www.google.at/permissions/geoguidelines/attr-guide.html">Map data ©2015 Google</a>',
    minZoom: 1,
    maxZoom: 28,
    minNativeZoom: 0,
    maxNativeZoom: 20
});
layer_GoogleTerrain_1;


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


function pop_Empleos_3(feature, layer) {
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Cargo:</th>\
                <td>' + (feature.properties['Cargo:'] !== null ? autolinker.link(feature.properties['Cargo:'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Empresa:</th>\
                <td>' + (feature.properties['Empresa:'] !== null ? autolinker.link(feature.properties['Empresa:'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Año:</th>\
                <td>' + (feature.properties['Año:'] !== null ? autolinker.link(feature.properties['Año:'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Descripción:</th>\
                <td>' + (feature.properties['Descripción:'] !== null ? autolinker.link(feature.properties['Descripción:'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Dirección:</th>\
                <td>' + (feature.properties['Dirección:'] !== null ? autolinker.link(feature.properties['Dirección:'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Ciudad:</th>\
                <td>' + (feature.properties['Ciudad:'] !== null ? autolinker.link(feature.properties['Ciudad:'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Región:</th>\
                <td>' + (feature.properties['Región:'] !== null ? autolinker.link(feature.properties['Región:'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Pais:</th>\
                <td>' + (feature.properties['Pais:'] !== null ? autolinker.link(feature.properties['Pais:'].toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    layer.bindPopup(popupContent, {maxHeight: 400});
    var popup = layer.getPopup();
    var content = popup.getContent();
    var updatedContent = removeEmptyRowsFromPopupContent(content, feature);
    popup.setContent(updatedContent);



}

function style_Empleos_3_0(feature) {
  switch(String(feature.properties['Empresa:'])) {
              case 'Vialidad Melipilla':
                  return {
              pane: 'pane_ExperienciaLaboral_3',
              radius: 6.4,
              opacity: 1,
              color: 'rgba(35,35,35,1.0)',
              dashArray: '',
              lineCap: 'butt',
              lineJoin: 'miter',
              weight: 1,
              fill: true,
              fillOpacity: 1,
              fillColor: 'rgba(215,25,28,1.0)',
              interactive: true,
          }
                  break;
              case 'GoldFields':
                  return {
              pane: 'pane_ExperienciaLaboral_3',
              radius: 6.4,
              opacity: 1,
              color: 'rgba(35,35,35,1.0)',
              dashArray: '',
              lineCap: 'butt',
              lineJoin: 'miter',
              weight: 1,
              fill: true,
              fillOpacity: 1,
              fillColor: 'rgba(230,85,56,1.0)',
              interactive: true,
          }
                  break;
              case 'Arcadis Geotécnica':
                  return {
              pane: 'pane_ExperienciaLaboral_3',
              radius: 6.4,
              opacity: 1,
              color: 'rgba(35,35,35,1.0)',
              dashArray: '',
              lineCap: 'butt',
              lineJoin: 'miter',
              weight: 1,
              fill: true,
              fillOpacity: 1,
              fillColor: 'rgba(245,144,83,1.0)',
              interactive: true,
          }
                  break;
              case 'Instituto Nacional de Estadísticas':
                  return {
              pane: 'pane_ExperienciaLaboral_3',
              radius: 6.4,
              opacity: 1,
              color: 'rgba(35,35,35,1.0)',
              dashArray: '',
              lineCap: 'butt',
              lineJoin: 'miter',
              weight: 1,
              fill: true,
              fillOpacity: 1,
              fillColor: 'rgba(253,190,116,1.0)',
              interactive: true,
          }
                  break;
              case 'Geoinfo prestando servicios para Exploraciones mineras S.A., Codelco Norte':
                  return {
              pane: 'pane_ExperienciaLaboral_3',
              radius: 6.4,
              opacity: 1,
              color: 'rgba(35,35,35,1.0)',
              dashArray: '',
              lineCap: 'butt',
              lineJoin: 'miter',
              weight: 1,
              fill: true,
              fillOpacity: 1,
              fillColor: 'rgba(254,223,153,1.0)',
              interactive: true,
          }
                  break;
              case 'Comtec-Chile':
                  return {
              pane: 'pane_ExperienciaLaboral_3',
              radius: 6.4,
              opacity: 1,
              color: 'rgba(35,35,35,1.0)',
              dashArray: '',
              lineCap: 'butt',
              lineJoin: 'miter',
              weight: 1,
              fill: true,
              fillOpacity: 1,
              fillColor: 'rgba(255,255,191,1.0)',
              interactive: true,
          }
                  break;
              case 'Contraloría General de la Republica':
                  return {
              pane: 'pane_ExperienciaLaboral_3',
              radius: 6.4,
              opacity: 1,
              color: 'rgba(35,35,35,1.0)',
              dashArray: '',
              lineCap: 'butt',
              lineJoin: 'miter',
              weight: 1,
              fill: true,
              fillOpacity: 1,
              fillColor: 'rgba(221,241,180,1.0)',
              interactive: true,
          }
                  break;
              case 'Proyecto Gef-PNUD Ministerio de Medio Ambiente':
                  return {
              pane: 'pane_ExperienciaLaboral_3',
              radius: 6.4,
              opacity: 1,
              color: 'rgba(35,35,35,1.0)',
              dashArray: '',
              lineCap: 'butt',
              lineJoin: 'miter',
              weight: 1,
              fill: true,
              fillOpacity: 1,
              fillColor: 'rgba(188,228,169,1.0)',
              interactive: true,
          }
                  break;
              case 'ESRI Chile':
                  return {
              pane: 'pane_ExperienciaLaboral_3',
              radius: 6.4,
              opacity: 1,
              color: 'rgba(35,35,35,1.0)',
              dashArray: '',
              lineCap: 'butt',
              lineJoin: 'miter',
              weight: 1,
              fill: true,
              fillOpacity: 1,
              fillColor: 'rgba(145,203,168,1.0)',
              interactive: true,
          }
                  break;
              case 'Geoxite':
                  return {
              pane: 'pane_ExperienciaLaboral_3',
              radius: 6.4,
              opacity: 1,
              color: 'rgba(35,35,35,1.0)',
              dashArray: '',
              lineCap: 'butt',
              lineJoin: 'miter',
              weight: 1,
              fill: true,
              fillOpacity: 1,
              fillColor: 'rgba(94,167,177,1.0)',
              interactive: true,
          }
                  break;
              case 'Servicio Aéreo Fotogramétrico (SAF)':
                  return {
              pane: 'pane_ExperienciaLaboral_3',
              radius: 6.4,
              opacity: 1,
              color: 'rgba(35,35,35,1.0)',
              dashArray: '',
              lineCap: 'butt',
              lineJoin: 'miter',
              weight: 1,
              fill: true,
              fillOpacity: 1,
              fillColor: 'rgba(43,131,186,1.0)',
              interactive: true,
          }
                  break;
    }
}
map.createPane('pane_ExperienciaLaboral_3');
map.getPane('pane_ExperienciaLaboral_3').style.zIndex = 403;
map.getPane('pane_ExperienciaLaboral_3').style['mix-blend-mode'] = 'normal';
var layer_Empleos_3 = new L.geoJson(json_Empleos_3, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Empleos_3',
    layerName: 'layer_Empleos_3',
    pane: 'pane_ExperienciaLaboral_3',
    onEachFeature: pop_Empleos_3,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.circleMarker(latlng, style_Empleos_3_0(feature));
    },
});

// Agregar resaltado en el clic del punto
layer_Empleos_3.on('click', function(e) {
    // Resetear estilo de todos los puntos
    layer_Empleos_3.eachLayer(function(layer) {
        layer.setStyle(style_Empleos_3_0(layer.feature));
    });
    // Resaltar punto clickeado
    var clickedLayer = e.layer;
    clickedLayer.setStyle({
        color: 'red',  // Cambiar borde a rojo
        weight: 3      // Aumentar grosor del borde
    });
});




var cluster_Empleos_3 = new L.MarkerClusterGroup({showCoverageOnHover: false,
    spiderfyDistanceMultiplier: 2});
cluster_Empleos_3.addLayer(layer_Empleos_3);

bounds_group.addLayer(layer_Empleos_3);
cluster_Empleos_3.addTo(map);
function pop_Domicilio_4(feature, layer) {
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Nombre:</th>\
                <td>' + (feature.properties['Nombre:'] !== null ? autolinker.link(feature.properties['Nombre:'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Título:</th>\
                <td>' + (feature.properties['Título:'] !== null ? autolinker.link(feature.properties['Título:'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">RUN:</th>\
                <td>' + (feature.properties['RUN:'] !== null ? autolinker.link(feature.properties['RUN:'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Teléfono:</th>\
                <td>' + (feature.properties['Teléfono:'] !== null ? autolinker.link(feature.properties['Teléfono:'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Correo:</th>\
                <td>' + (feature.properties['Correo:'] !== null ? autolinker.link(feature.properties['Correo:'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Dirección:</th>\
                <td>' + (feature.properties['Dirección:'] !== null ? autolinker.link(feature.properties['Dirección:'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Comuna:</th>\
                <td>' + (feature.properties['Comuna:'] !== null ? autolinker.link(feature.properties['Comuna:'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Ciudad:</th>\
                <td>' + (feature.properties['Ciudad:'] !== null ? autolinker.link(feature.properties['Ciudad:'].toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    layer.bindPopup(popupContent, {maxHeight: 400});
    var popup = layer.getPopup();
    var content = popup.getContent();
    var updatedContent = removeEmptyRowsFromPopupContent(content, feature);
    popup.setContent(updatedContent);
}

function style_Domicilio_4_0() {
    return {
        pane: 'pane_Domicilio_4',
rotationAngle: 0.0,
rotationOrigin: 'center center',
icon: L.icon({
    iconUrl: 'markers/Domicilio_4.svg',
    iconSize: [28.12, 28.12]
}),
        interactive: true,
    }
}
function style_Domicilio_4_1() {
    return {
        pane: 'pane_Domicilio_4',
rotationAngle: -0.00872665,
rotationOrigin: 'center center',
icon: L.icon({
    iconUrl: 'markers/Domicilio_4.svg',
    iconSize: [26.6, 26.6]
}),
        interactive: true,
    }
}
map.createPane('pane_Domicilio_4');
map.getPane('pane_Domicilio_4').style.zIndex = 404;
map.getPane('pane_Domicilio_4').style['mix-blend-mode'] = 'normal';
var layer_Domicilio_4 = new L.geoJson.multiStyle(json_Domicilio_4, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Domicilio_4',
    layerName: 'layer_Domicilio_4',
    pane: 'pane_Domicilio_4',
    onEachFeature: pop_Domicilio_4,
    pointToLayers: [function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.marker(latlng, style_Domicilio_4_0(feature));
    },function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.marker(latlng, style_Domicilio_4_1(feature));
    },
]});
bounds_group.addLayer(layer_Domicilio_4);
map.addLayer(layer_Domicilio_4);



var baseMaps = {
    "OSM Humanitarian": layer_OSMHumanitarian_2,
    "Google Terrain": layer_GoogleTerrain_1,
    "ESRI Satellite": layer_ESRISatellite_0
};


//var overlayMaps=
  //  ;

  L.control.layers(baseMaps, {
    '<img src="legend/Domicilio_4.png" /> Domicilio': layer_Domicilio_4,
    'Experiencia Laboral<br /><table><tr><td style="text-align: center;"><img src="legend/ExperienciaLaboral_3_VialidadMelipilla0.png" /></td><td>Vialidad Melipilla</td></tr><tr><td style="text-align: center;"><img src="legend/ExperienciaLaboral_3_GoldFields1.png" /></td><td>GoldFields</td></tr><tr><td style="text-align: center;"><img src="legend/ExperienciaLaboral_3_ArcadisGeotécnica2.png" /></td><td>Arcadis Geotécnica</td></tr><tr><td style="text-align: center;"><img src="legend/ExperienciaLaboral_3_InstitutoNacionaldeEstadísticas3.png" /></td><td>Instituto Nacional de Estadísticas</td></tr><tr><td style="text-align: center;"><img src="legend/ExperienciaLaboral_3_GeoinfoContratistaCodelcoNorte4.png" /></td><td>Geoinfo Contratista, Codelco Norte</td></tr><tr><td style="text-align: center;"><img src="legend/ExperienciaLaboral_3_ComtecChile5.png" /></td><td>Comtec-Chile</td></tr><tr><td style="text-align: center;"><img src="legend/ExperienciaLaboral_3_ContraloríaGeneraldelaRepublica6.png" /></td><td>Contraloría General de la Republica</td></tr><tr><td style="text-align: center;"><img src="legend/ExperienciaLaboral_3_ProyectoGefPNUDMinisteriodeMedioAmbiente7.png" /></td><td>Proyecto Gef-PNUD Ministerio de Medio Ambiente</td></tr><tr><td style="text-align: center;"><img src="legend/ExperienciaLaboral_3_ESRIChile8.png" /></td><td>ESRI Chile</td></tr><tr><td style="text-align: center;"><img src="legend/ExperienciaLaboral_3_Geoxite9.png" /></td><td>Geoxite</td></tr><tr><td style="text-align: center;"><img src="legend/ExperienciaLaboral_3_ServicioAéreoFotogramétricoSAF10.png" /></td><td>Servicio Aéreo Fotogramétrico (SAF)</td></tr></table>': cluster_Empleos_3
},{
    collapsed: true
}).addTo(map);




//logo position: bottomright, topright, topleft, bottomleft
  var logo = L.control({position: 'bottomright'});
  logo.onAdd = function(map){
    var div = L.DomUtil.create('div', 'myclass');
    div.innerHTML= "<img src='images/Selección_001.png'/>";
    return div;
  }
  logo.addTo(map);

  var sidebar = L.control.sidebar('sidebar').addTo(map);





setBounds();
