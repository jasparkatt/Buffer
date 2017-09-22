var osmUrl="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",osmAttrib='&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors & Adams Co. GIS',osm=L.tileLayer(osmUrl,{maxZoom:19,attribution:osmAttrib}),map=new L.Map("map",{center:new L.LatLng(43.95528,-89.81692),zoom:13}),drawnItems=L.featureGroup().addTo(map);map.createPane("buffers"),map.getPane("buffers").style.zIndex=25,map.getPane("buffers").style.pointerEvents="none",L.Browser.touch&&L.control.touchHover().addTo(map),L.control.layers({osm:osm.addTo(map),google:L.tileLayer("http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",{attribution:"google & Adams Co. GIS"})},{drawlayer:drawnItems},{position:"topright",collapsed:!1}).addTo(map),map.addControl(new L.Control.Draw({edit:{featureGroup:drawnItems,poly:{allowIntersection:!1},buffer:{replacePolylines:!1,separateBuffer:!0,pane:"buffers"}},draw:{polyline:{shapeOptions:{color:"#92d625"}},circle:{shapeOptions:{color:"#e3ff86"},showArea:!0,metric:!1},polygon:{shapeOptions:{color:"#fa9025"}},circlemarker:!1,marker:!1,rectangle:!1}}));var _round=function(e,t){return Math.round(e*Math.pow(10,t))/Math.pow(10,t)},strLatLng=function(e){return"("+_round(e.lat,6)+", "+_round(e.lng,6)+")"},getPopupContent=function(e){if(e instanceof L.Marker||e instanceof L.CircleMarker)return strLatLng(e.getLatLng());if(e instanceof L.Polygon){var t=e._defaultShape?e._defaultShape():e.getLatLngs(),r=L.GeometryUtil.geodesicArea(t);return"Area: "+L.GeometryUtil.readableArea(r,!1)}if(e instanceof L.Polyline){var a=0;if((t=e._defaultShape?e._defaultShape():e.getLatLngs()).length<2)return"Distance: N/A";for(var o=0;o<t.length-1;o++)a+=t[o].distanceTo(t[o+1]);return"Distance: "+_round(3.2808399*a,2)+" ft"}return null};map.on(L.Draw.Event.CREATED,function(e){var t=e.layer,r=getPopupContent(t);null!==r&&t.bindPopup(r),drawnItems.addLayer(t)}),map.on(L.Draw.Event.EDITED,function(e){var t=null;e.layers.eachLayer(function(e){null!==(t=getPopupContent(e))&&e.setPopupContent(t)})});