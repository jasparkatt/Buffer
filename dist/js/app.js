var osmUrl="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",osmAttrib='&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',osm=L.tileLayer(osmUrl,{maxZoom:19,attribution:osmAttrib}),map=new L.Map("map",{center:new L.LatLng(43.95528,-89.81692),zoom:13}),drawnItems=L.featureGroup().addTo(map);L.Browser.touch&&L.control.touchHover().addTo(map),L.control.layers({osm:osm.addTo(map),google:L.tileLayer("http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",{attribution:"google"})},{drawlayer:drawnItems},{position:"topright",collapsed:!1}).addTo(map),map.addControl(new L.Control.Draw({edit:{featureGroup:drawnItems,poly:{allowIntersection:!1}},draw:{polygon:{allowIntersection:!1,showArea:!0}}}));var _round=function(t,e){return Math.round(t*Math.pow(10,e))/Math.pow(10,e)},strLatLng=function(t){return"("+_round(t.lat,6)+", "+_round(t.lng,6)+")"},getPopupContent=function(t){if(t instanceof L.Marker||t instanceof L.CircleMarker)return strLatLng(t.getLatLng());if(t instanceof L.Circle){var e=t.getLatLng(),n=t.getRadius();return"Center: "+strLatLng(e)+"<br />Radius: "+_round(n,2)+" m"}if(t instanceof L.Polygon){var r=t._defaultShape?t._defaultShape():t.getLatLngs(),o=L.GeometryUtil.geodesicArea(r);return"Area: "+L.GeometryUtil.readableArea(o,!0)}if(t instanceof L.Polyline){var a=0;if((r=t._defaultShape?t._defaultShape():t.getLatLngs()).length<2)return"Distance: N/A";for(var l=0;l<r.length-1;l++)a+=r[l].distanceTo(r[l+1]);return"Distance: "+_round(a,2)+" m"}return null};map.on(L.Draw.Event.CREATED,function(t){var e=t.layer,n=getPopupContent(e);null!==n&&e.bindPopup(n),drawnItems.addLayer(e)}),map.on(L.Draw.Event.EDITED,function(t){var e=null;t.layers.eachLayer(function(t){null!==(e=getPopupContent(t))&&t.setPopupContent(e)})});
