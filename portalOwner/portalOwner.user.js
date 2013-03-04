// ==UserScript==
// @id             portalOwner@smilodazsprod
// @name           iitc: PortalOwner
// @version        0.1
// @updateURL      https://raw.github.com/breunigs/ingress-intel-total-conversion/gh-pages/plugins/max-links.user.js
// @downloadURL    https://raw.github.com/breunigs/ingress-intel-total-conversion/gh-pages/plugins/max-links.user.js
// @description    Calculates how to link the portals to create the maximum number of fields.
// @include        https://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// ==/UserScript==

function wrapper() {

// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function')
  window.plugin = function() {};

// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.portalOwner = function() {};

// const values
window.plugin.portalOwner.OWNER_COLOR = "red";
window.plugin.portalOwner.RESO_COLOR = "yellow";
    
window.plugin.portalOwner._delaunayScriptLocation = 'https://raw.github.com/breunigs/ingress-intel-total-conversion/gh-pages/dist/delaunay.js';

window.plugin.portalOwner.layer = null;

window.plugin.portalOwner._updating = false;
window.plugin.portalOwner._renderLimitReached = false;

window.plugin.portalOwner.updateLayer = function() {
  if (window.plugin.portalOwner._updating ||
      window.plugin.portalOwner.layer === null ||
      !window.map.hasLayer(window.plugin.portalOwner.layer))
    return;
  window.plugin.portalOwner._updating = true;
  window.plugin.portalOwner.layer.clearLayers();

  var locations = [];
  var minX = 0;
  var minY = 0;
  
  var base = 'http://breunigs.github.com/ingress-intel-total-conversion/dist/images/';
  base = 'http://smile.crew.c-base.org/images/';
  L.Icon.Default.imagePath = base;

  window.iconRed = L.Icon.Default.extend({options: { iconUrl: base + 'marker-red.png' } });
  window.iconYellow = L.Icon.Default.extend({options: { iconUrl: base + 'marker-yellow.png' } });

  var icon = new window.iconRed();
  var iconYellow = new window.iconYellow();

  $.each(window.portals, function(guid, portal) {

    var nick = PLAYER.nickname;
    //nick = "ihmisSuski";
   
    if(getPlayerName(portal.options.details.captured.capturingPlayerId) === nick){
      var m = L.marker([portal._latlng.lat, portal._latlng.lng], {title: nick, clickable: false, icon: icon});
      // ensure tooltips are closed, sometimes they linger
      m.on('mouseout', function() { $(this._icon).tooltip('close'); });
      m.addTo(window.plugin.portalOwner.layer);
      // jQueryUI doesn’t automatically notice the new markers
      window.setupTooltips($(m._icon));
        
    } else {
    $.each(portal.options.details.resonatorArray.resonators, function(ind, reso) {
      if(reso !== null) {
                    if(getPlayerName(reso.ownerGuid) === nick) {
                  var m = L.marker([portal._latlng.lat, portal._latlng.lng], {title: nick, clickable: false, icon: iconYellow});
      m.on('mouseout', function() { $on(this._icon).tooltip('close'); });
                  m.addTo(window.plugin.portalOwner.layer);
                  // jQueryUI doesn’t automatically notice the new markers
                  window.setupTooltips($(m._icon));
                }
            }
    });
    }_icon
  });
  window.plugin.portalOwner._updating = false;
  window.renderUpdateStatus();
    
}

window.plugin.portalOwner.setup = function() {
  load(window.plugin.portalOwner._delaunayScriptLocation).thenRun(function() {

    window.plugin.portalOwner.layer = L.layerGroup([]);

    window.addHook('checkRenderLimit', function(e) {
      if (window.map.hasLayer(window.plugin.portalOwner.layer) &&
          window.plugin.portalOwner._renderLimitReached)
        e.reached = true;
    });

    window.addHook('portalDataLoaded', function(e) {
      if (window.map.hasLayer(window.plugin.portalOwner.layer))
        window.plugin.portalOwner.updateLayer();
    });

    window.map.on('layeradd', function(e) {
      if (e.layer === window.plugin.portalOwner.layer)
        window.plugin.portalOwner.updateLayer();
    });
    window.map.on('zoomend moveend', window.plugin.portalOwner.updateLayer);
    window.layerChooser.addOverlay(window.plugin.portalOwner.layer, 'My Portals');
    map.addLayer(window.plugin.portalOwner.layer);
  });
}
var setup = window.plugin.portalOwner.setup;

// PLUGIN END //////////////////////////////////////////////////////////
if(window.iitcLoaded && typeof setup === 'function') {
  setup();
} else {
  if(window.bootPlugins)
    window.bootPlugins.push(setup);
  else
    window.bootPlugins = [setup];
}

} // wrapper end

// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);

