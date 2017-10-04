//JS and Leaflet stuff for IPP buffer tool app
var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors & Adams Co. GIS',
    osm = L.tileLayer(osmUrl, {maxZoom: 19, attribution: osmAttrib}),
    map = new L.Map('map', {center: new L.LatLng(43.955280, -89.816920), zoom: 13}),
    drawnItems = L.featureGroup().addTo(map);    

if (L.Browser.touch) {
    L.control.touchHover().addTo(map);
}
L.control.layers({
    "osm": osm.addTo(map),
    "google": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
        attribution: 'google & Adams Co. GIS'
    })
}, {'drawlayer': drawnItems}, { position: 'topright', collapsed: false }).addTo(map);
map.addControl(new L.Control.Draw({
    edit: {
        featureGroup: drawnItems,
        poly : {
            allowIntersection : false
        },
        buffer: {
            replacePolylines: false,
            separateBuffer: true,
            zIndexOffset: 1
        },
    },
    draw: {
        polyline: {
            shapeOptions: {
                color: '#f0592b',
                opacity: '0.8'
                
            },            
        },
        circle: {
            shapeOptions: {
                 color: '#c1a11b',
                 fillColor: '#0033dd'
            },
            showArea: true,
            metric: false,
            zIndexOffset: 9000
        },
        polygon: {
            shapeOptions: {
                color: '#e93fff'
            },
            zIndexOffset: 8000
        },
        circlemarker: false,
        marker: false,
        rectangle: false        
    },    
    //    draw: {
    //        polygon : {
    //            allowIntersection: false,
    //            showArea: false,
    //            metric: false
    //        }
    //    }
}));
// Truncate value based on number of decimals
var _round = function (num, len) {
    return Math.round(num*(Math.pow(10, len)))/(Math.pow(10, len));
};
// Helper method to format LatLng object (x.xxxxxx, y.yyyyyy)
var strLatLng = function(latlng) {
    return "("+_round(latlng.lat, 6)+", "+_round(latlng.lng, 6)+")";
};
// Generate popup content based on layer type
// - Returns HTML string, or null if unknown object
var getPopupContent = function(layer) {
    // Marker - add lat/long
    if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        return strLatLng(layer.getLatLng());
        // Circle - lat/long, radius
//    } else if (layer instanceof L.Circle) {
//        var center = layer.getLatLng();
////            radius = layer.getRadius();
//        return "Center: "+strLatLng(center)+"<br />";
////            +"Radius: "+_round(radius, 2)+" m";
        // Rectangle/Polygon - area
    } else if (layer instanceof L.Polygon) {
        var latlngs = layer._defaultShape ? layer._defaultShape() : layer.getLatLngs(),
            area = L.GeometryUtil.geodesicArea(latlngs);
        return "Area: "+L.GeometryUtil.readableArea(area, false);
        // Polyline - distance
    } else if (layer instanceof L.Polyline) {
        var latlngs = layer._defaultShape ? layer._defaultShape() : layer.getLatLngs(),
            distance = 0;
        if (latlngs.length < 2) {
            return "Distance: N/A";
        } else {
            for (var i = 0; i < latlngs.length-1; i++) {
                distance += latlngs[i].distanceTo(latlngs[i+1]);
            }
            return "Distance: "+_round((distance*3.2808399), 2)+" ft";
        }
    }
    return null;
};
// Object created - bind popup to layer, add to feature group
map.on(L.Draw.Event.CREATED, function(event) {
    var layer = event.layer;
    var content = getPopupContent(layer);
    if (content !== null) {
        layer.bindPopup(content);
    }
    drawnItems.addLayer(layer);
});
// Object(s) edited - update popups
map.on(L.Draw.Event.EDITED, function(event) {
    var layers = event.layers,
        content = null;
    layers.eachLayer(function(layer) {
        content = getPopupContent(layer);
        if (content !== null) {
            layer.setPopupContent(content);
        }
    });
});
