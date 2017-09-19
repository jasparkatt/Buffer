L.Control.TouchHover=L.Control.extend({options:{position:"topleft"},onAdd:function(t){this._className="leaflet-control-touchhover";var o=L.DomUtil.create("div",this._className+" leaflet-bar");this._map=t;var e=this._toggleButton=L.DomUtil.create("a",this._className+"-toggle",o);e.href="#";var n=L.DomEvent.stopPropagation;return L.DomEvent.on(e,"mousedown",n).on(e,"dblclick",n).on(e,"click",this._toggle,this),o.appendChild(e),o},_toggle:function(t){var o=this._className+"-toggled";this._toggled?(L.DomUtil.removeClass(this._toggleButton,o),L.DomEvent.off(this._map._container,"touchstart",this._onDown,this),this._map.dragging.enable(),this._map.touchZoom.enable()):(L.DomUtil.addClass(this._toggleButton,o),L.DomEvent.on(this._map._container,"touchstart",this._onDown,this),this._map.dragging.disable(),this._map.touchZoom.disable()),this._toggled=!this._toggled,L.DomEvent.stop(t)},_onDown:function(t){var o=t.touches[0];this._simulateEvent("mouseover",o),this._target=o.target,L.DomEvent.on(document,"touchmove",this._onMove,this).on(document,"touchend",this._onUp,this)},_onMove:function(t){var o=t.touches[0],e=document.elementFromPoint(o.screenX,o.screenY);e!==this._target&&(this._simulateEvent("mouseout",o,this._target),this._simulateEvent("mouseover",o,e),this._target=e),this._simulateEvent("mousemove",o,this._target)},_onUp:function(t){L.DomEvent.off(document,"touchmove",this._onMove,this).off(document,"touchend",this._onUp,this),this._simulateEvent("mouseout",t.changedTouches[0],this._target)},_simulateEvent:function(t,o,e){e=e||o.target;var n=document.createEvent("MouseEvents");n.initMouseEvent(t,!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),e.dispatchEvent(n)}}),L.control.touchHover=function(t){return new L.Control.TouchHover(t)};