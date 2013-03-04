// ==UserScript==
// @id             upgradeablePortals@smilodazsprod
// @name           iitc: upgradeablePortals
// @version        0.1
// @updateURL      https://raw.github.com/dazz/iitc-plugins/gh-pages/plugins/upgradeablePortals.user.js
// @downloadURL    https://raw.github.com/dazz/iitc-plugins/gh-pages/plugins/upgradeablePortals.user.js
// @description    Shows marker on portals that can be upgraded to at least player level - 1
// @include        https://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// ==/UserScript==

function wrapper() {

// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function')
  window.plugin = function() {};

// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.upgradeablePortals = function() {};

// const values

window.plugin.upgradeablePortals._delaunayScriptLocation = 'https://raw.github.com/breunigs/ingress-intel-total-conversion/gh-pages/dist/delaunay.js';

window.plugin.upgradeablePortals.layer = null;

window.plugin.upgradeablePortals._updating = false;
window.plugin.upgradeablePortals._renderLimitReached = false;

window.plugin.upgradeablePortals.updateLayer = function() {
  if (window.plugin.upgradeablePortals._updating ||
      window.plugin.upgradeablePortals.layer === null ||
      !window.map.hasLayer(window.plugin.upgradeablePortals.layer))
    return;
  window.plugin.upgradeablePortals._updating = true;
  window.plugin.upgradeablePortals.layer.clearLayers();

  var locations = [];
  var minX = 0;
  var minY = 0;

  var base = 'https://breunigs.github.com/ingress-intel-total-conversion/dist/images/';
  base = 'https://smile.crew.c-base.org/images/';
  L.Icon.Default.imagePath = base;

  window.iconL4 = L.Icon.Default.extend({options: { iconUrl: base + 'marker-L4.png' } });
  window.iconL5 = L.Icon.Default.extend({options: { iconUrl: base + 'marker-L5.png' } });
  window.iconL6 = L.Icon.Default.extend({options: { iconUrl: base + 'marker-L6.png' } });
  window.iconL7 = L.Icon.Default.extend({options: { iconUrl: base + 'marker-L7.png' } });
  window.iconL8 = L.Icon.Default.extend({options: { iconUrl: base + 'marker-L8.png' } });

  var iconL4 = new window.iconL4();
  var iconL5 = new window.iconL5();
  var iconL6 = new window.iconL6();
  var iconL7 = new window.iconL7();
  var iconL8 = new window.iconL8();

  var playerLevel = window.plugin.upgradeablePortals.getPlayerLevel();

  $.each(window.portals, function(guid, portal) {
    var resoDict = {'8': 1, '7': 1, '6': 2, '5': 2, '4': 4, '3':4, '2':4, '1':8};
    var j = 8;

    while(j > playerLevel) {
      resodict[''+j--] = 0;
    }

    var nick = PLAYER.nickname;
    var levelsum = 0;
    var playerResos = resoDict;
    var resocount = 8;

    if (portal.options.details.controllingTeam.team === PLAYER.team) {

      $.each(portal.options.details.resonatorArray.resonators, function(ind, reso) {
        if(reso !== null && getPlayerName(reso.ownerGuid) === nick){
          playerResos[''+reso.level]--;
        }
      });
      var portalLevel = levelsum / resocount;

      var resoString = "";
      $.each(portal.options.details.resonatorArray.resonators, function(ind, reso) {
        var nextReso = 8;
        while(playerResos[''+nextReso] <= 0){
          nextReso--;
        }
        if (reso === null || (reso !== null && reso.level < nextReso)) {
          playerResos[''+nextReso]--;
          levelsum += nextReso;
          if (resoString === "") {
            resoString = '' + nextReso;
          } else {
            resoString += ', ' + nextReso;
          }
        } else {
          levelsum += reso.level;
        }
      });

      var possibleLevel = levelsum / resocount;
      if(possibleLevel >= playerLevel-1) {
        var currentIcon;
        if(possibleLevel >= 8) {
          currentIcon = iconL8;
        } else if (possibleLevel >= 7) {
          currentIcon = iconL7;
        } else if (possibleLevel >= 6) {
          currentIcon = iconL6;
        } else if (possibleLevel >= 5) {
          currentIcon = iconL5;
        } else if (possibleLevel >= 4) {
          currentIcon = iconL4;
        }
        var m = L.marker([portal._latlng.lat, portal._latlng.lng], {title: portal.options.level+"->"+possibleLevel + ": " + resoString, clickable: false, icon: currentIcon});
        m.on('mouseout', function() { $(this._icon).tooltip('close'); });
        m.addTo(window.plugin.upgradeablePortals.layer);
        window.setupTooltips($(m._icon));
      }
    }
  });
  window.plugin.upgradeablePortals._updating = false;
  window.renderUpdateStatus();
};

window.plugin.upgradeablePortals.getPlayerLevel = function() {
  var level;
  var ap = parseInt(PLAYER.ap, 10);
  for(level = 0; level < window.MIN_AP_FOR_LEVEL.length; level++) {
    if(ap < window.MIN_AP_FOR_LEVEL[level]) break;
  }
    return level;
};


window.plugin.upgradeablePortals.setup = function() {
  load(window.plugin.upgradeablePortals._delaunayScriptLocation).thenRun(function() {

    window.plugin.upgradeablePortals.layer = L.layerGroup([]);

    window.addHook('checkRenderLimit', function(e) {
      if (window.map.hasLayer(window.plugin.upgradeablePortals.layer) &&
          window.plugin.upgradeablePortals._renderLimitReached)
        e.reached = true;
    });

    window.addHook('portalDataLoaded', function(e) {
      if (window.map.hasLayer(window.plugin.upgradeablePortals.layer))
        window.plugin.upgradeablePortals.updateLayer();
    });

    window.map.on('layeradd', function(e) {
      if (e.layer === window.plugin.upgradeablePortals.layer)
        window.plugin.upgradeablePortals.updateLayer();
    });
    window.map.on('zoomend moveend', window.plugin.upgradeablePortals.updateLayer);
    window.layerChooser.addOverlay(window.plugin.upgradeablePortals.layer, 'Upgradeable Portals');

    //map.addLayer(window.plugin.upgradeablePortals.layer);
  });
};
var setup = window.plugin.upgradeablePortals.setup;

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

