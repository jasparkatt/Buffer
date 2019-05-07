var osmUrl="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",osmAttrib='&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors & Adams Co. GIS',osm=L.tileLayer(osmUrl,{maxZoom:19,attribution:osmAttrib}),map=new L.Map("map",{center:new L.LatLng(43.95528,-89.81692),zoom:13}),drawnItems=L.featureGroup().addTo(map);L.Browser.touch&&L.control.touchHover().addTo(map),L.control.layers({osm:osm.addTo(map),google:L.tileLayer("http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",{attribution:"google & Adams Co. GIS"})},{drawlayer:drawnItems},{position:"topright",collapsed:!1}).addTo(map),map.addControl(new L.Control.Draw({edit:{featureGroup:drawnItems,poly:{allowIntersection:!1},buffer:{replacePolylines:!1,separateBuffer:!0,zIndexOffset:1}},draw:{polyline:{shapeOptions:{color:"#f0592b",opacity:"0.8"}},circle:{shapeOptions:{color:"#f7ff00",fillColor:"#0900ff"},showArea:!0,metric:!1,zIndexOffset:9e3},polygon:{shapeOptions:{color:"#dd02ff",fillColor:"#24ff02"},zIndexOffset:8e3},circlemarker:!1,marker:!1,rectangle:!1}}));var myImage='<img class="button-image" src="/dist/img/About.png" />',myWindow,toggle=L.easyButton({position:"bottomleft",states:[{stateName:"open-help",icon:myImage,title:"open help doc",onClick:function(){myWindow=window.open("https://camo.githubusercontent.com/8cecbb8038c8eb9a2029a114bcc8993dd893d17a/687474703a2f2f692e696d6775722e636f6d2f464954637061732e676966","_blank","toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400"),toggle.state("remove-help")}},{icon:myImage,stateName:"remove-help",onClick:function(){myWindow.close(),toggle.state("open-help")},title:"close help doc"}]});toggle.addTo(map);var _round=function(e,t){return Math.round(e*Math.pow(10,t))/Math.pow(10,t)},strLatLng=function(e){return"("+_round(e.lat,6)+", "+_round(e.lng,6)+")"},getPopupContent=function(e){if(e instanceof L.Marker||e instanceof L.CircleMarker)return strLatLng(e.getLatLng());if(e instanceof L.Polygon){var t=e._defaultShape?e._defaultShape():e.getLatLngs(),o=L.GeometryUtil.geodesicArea(t);return"Area: "+L.GeometryUtil.readableArea(o,!1)}if(e instanceof L.Polyline){var a=0;if((t=e._defaultShape?e._defaultShape():e.getLatLngs()).length<2)return"Distance: N/A";for(var n=0;n<t.length-1;n++)a+=t[n].distanceTo(t[n+1]);return"Distance: "+_round(3.2808399*a,2)+" ft"}return null};map.on(L.Draw.Event.CREATED,function(e){var t=e.layer,o=getPopupContent(t);null!==o&&t.bindPopup(o),drawnItems.addLayer(t)}),map.on(L.Draw.Event.EDITED,function(e){var t=null;e.layers.eachLayer(function(e){null!==(t=getPopupContent(e))&&e.setPopupContent(t)})});
