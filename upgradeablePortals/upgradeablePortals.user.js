// ==UserScript==
// @id             upgradeablePortals@smilodazsprod
// @name           iitc: upgradeablePortals
// @version        0.2.4
// @updateURL      https://github.com/dazz/iitc-plugins/raw/master/upgradeablePortals/upgradeablePortals.user.js
// @downloadURL    https://github.com/dazz/iitc-plugins/raw/master/upgradeablePortals/upgradeablePortals.user.js
// @description    Shows marker on portals that can be upgraded to at least player level - 1
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// ==/UserScript==

function wrapper() {

  // ensure plugin framework is there, even if iitc is not yet loaded
  if(typeof window.plugin !== 'function')
    window.plugin = function() {};

  // PLUGIN START ////////////////////////////////////////////////////////

  // use own namespace for plugin
  window.plugin.upgradeablePortals = function() {};

  // const values

  window.plugin.upgradeablePortals.layer = null;

  window.plugin.upgradeablePortals._updating = false;
  window.plugin.upgradeablePortals._renderLimitReached = false;

  window.plugin.upgradeablePortals.updateLayer = function() {
    if (!window.map.hasLayer(window.plugin.upgradeablePortals.layer) || window.plugin.upgradeablePortals._updating ||
        window.plugin.upgradeablePortals.layer === null)
      return;
    window.plugin.upgradeablePortals._updating = true;
    window.plugin.upgradeablePortals.layer.clearLayers();

    var locations = [];
    var minX = 0;
    var minY = 0;

	var markerL4 = 'data:image/png;base64,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';
	var markerL5 = 'data:image/png;base64,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';
	var markerL6 = 'data:image/png;base64,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';
	var markerL7 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAABmJLR0QAbAAsAIPgZ0wtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QMCDQIt8Oy6rgAAACJ0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUCBvbiBhIE1hY4eod0MAAAbgSURBVFjDtZZrbBxXFYC/e2dmX7Z37dR2DUlaSqAhqKqipiVRBYFQpAok+AXi+Yc/SOVHhEQTRSioqBSVR4JEECBQxUOAqFBoUX8kPwI4rauoadO8SBQ32JHT2s56vbter2fneR/8WNuJ48R2ijijI83MPed+99xz7pkRrFF2b9m/zpXeekfIvljHNVd6kz+9+NT0WnzFSoN7Hvj+ZuDrnsx+LTXxek9mw063S/lqzklNnPdktpKa+C9+Ove7X7314/N3BPlQ6QH52Y1f3OvJ7Pc2FO6lN9efzRRdhHPd3GpL0lTUo2oy6g+LWMc/PFM/+fTQ1DG1KmT3lv3vzzrZv3oyu2XbwPaCk5PoyGC0xWpLalI86SEcgXQETk4CcOGdc8FsOjMa6/gLhy4989ZtIbu37H8c+PuDPduc3t5eL21pkjRZdc8zXgavw6FararzM29q4MuHLj3z4jLIE5v39noyM7K9b2epoztPqxGSmniFHbZL3noyS0d3nqSpeHXqn61Ih5t/c/ngBIBcdBXy9+/Nb8x1dOdp1Bu3BghA2GUAgNTENOoNMkWXTV2bXVd6f1wYcwC+cf+3v1pwO7+1deDhXLM5izIKY82iZpwcrufieA5SiPa94yCsJNHJEtskSujr6ncrrWsDD/Y8XDlVO3FaPLF5bwGY3t73sULB7aSZNJasMO/lsQ5oUqywCCsAgbAgjINAEKXhEp9ipptA+ZycHoqAu9yW8h/qcDtFV6HIjF9fmlAny1eOP37bhBtt+NMnjpL3CoRpsPi+mTTo6VwHYFrKf0i60ntkfeEedGJITLKoFouRZsWqqlycwUiDoW13o79ODOsL9whXeo+4xuqdXV4pHyif1CQ3RJFBW8Vzn3oBg0FbjUQgEDy2fwebdm1k7NUJrDQkaYwjHVJ13T9QPl1eKW+s3imNNTtKme6bikhghcEIjTEGaw1g2yt2YMNH7gZgbGgSbQ3KKqR0l0VaynRjrNnhhjootMkBoWrvqxSSjMkgxALMYIwBARu3DZDtyFAdmaFZ9sFYjLXEOlz0b5+bDAW3QKLjvATOloNJCm7h+hIsWGsxtCPRWmOtRWvNfR/dAMCVoXG0Viij0UbPR3tdCm6BcjCJRp+R2upXakklXVI1GBIbtyfRCq01WmuMNdz36HoARo5fRWmNVhpHOsR6efupJZVEmfRl11rzxnQ0lQDeQpUABGlAzsth5y8ErN/aT6EnT2OiSflytX1mLGijl5TwgkyF1xLgDbeR1E8JIfPtHiNRth2UtRY/SXGki0AClk077wHgPy+PobVCINFWo3XaXsi8uMIDINRBPjbxKTlYPjoJvDneuto+qTog0AGhDglViJ/MkZiY1CR88OPvA2D4X1fQRpGahEi1bRf8Ah1QzHQz3rpqtdWnjowfnpIAkQ4PnK6fDJYk/waJVcRd93dTek8Xfj1g/Ow1UpOS6KTd51ie9NP1k2Gkwx8tduHLsxdejHSYlINJim7pFhjLhx/7QDuK46NEKiLVKalJlgGKbolyMIkyqX+m9tpLi5CRueHUFe4vx1ojYW+un9TEN2nClk+2Ief/cZFIB8QmXGYH0JvrZ6w1EiqrDl4Lx/WSj9augU8PdHmlq4/27coomzKbznCnUvJ6cIXHK5VjUSOpbThRGawt+WgNlo+WgZ+PtUbCddk+3o2sy/Zxtv56CBxcAAAsaTjVeOpZ4JsbCvdS8nqoROU1A/pzA9TjaQLdMtVo6ic3jskbH+bpB87NnFqMRlm1qi5Ecbp+MgCefb06NHtbCMBMUjvQUr6ux9N0ekWsNatqf26A8eAqyqRqLp392c1zLoMMTR1rAj84N3MqXChnu8IlhMQVHsOz/w6UVU8Plo/6q0IAGkntUEv5cS2p0JPtXTEX3Zl11JIKkQ6jkealX9zK5paQE5XBAHhqzB9djCbS4TJdOHxj/mjoCve7l5sXozVDAK7MDf861pFfSyp0ecUlvz0L2uUVqSUVWspvVuOp5243120hw7MXYmD/mD8alrweCm7HTf2pg5LXw5g/GgLfOVEZTO4YMl9pv411NDMZjtPlFQl1sKhdXpHJcJyW8qtnaq/9YaV5VoQMTR1Tyqp901E59GSWvNPu0nmngCezjLfGIle4+xZ61LuCzOfmzy3ll2fiKp1ecbGiZuIqwMTl5oXnV5tjVcjw7AUD7J0I3o463A463E6yTpaJ4O1IWbV3fvx/gwAcGT/8N2XV2GzSsH25u5lNGha4cmT88Atr8Zdr7H8WeLIaVxKA6aicKqv2rLV5ijtp5Z/b+KXTrvS2KpOeeemd57et1U/eCSQx8ZPKpCIx8R7+n/KZDZ/fd6c+/wXoH1xh4fXHTgAAAABJRU5ErkJggg==';
	var markerL8 = 'data:image/png;base64,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';

    window.iconL4 = L.Icon.Default.extend({options: { iconUrl: markerL4 } });
    window.iconL5 = L.Icon.Default.extend({options: { iconUrl: markerL5 } });
    window.iconL6 = L.Icon.Default.extend({options: { iconUrl: markerL6 } });
    window.iconL7 = L.Icon.Default.extend({options: { iconUrl: markerL7 } });
    window.iconL8 = L.Icon.Default.extend({options: { iconUrl: markerL8 } });

    var iconL4 = new window.iconL4();
    var iconL5 = new window.iconL5();
    var iconL6 = new window.iconL6();
    var iconL7 = new window.iconL7();
    var iconL8 = new window.iconL8();

    var playerLevel = window.plugin.upgradeablePortals.getPlayerLevel();
    //  playerLevel = 8;
    var nick = PLAYER.nickname;
    //  nick = "cmile";
    var playerTeam = PLAYER.team;
    //  playerTeam = "RESISTANCE";

    $.each(window.portals, function(guid, portal) {
      var resoDict = {8: 1, 7: 1, 6: 2, 5: 2, 4: 4, 3:4, 2:4, 1:8};
      var portalResos = [0,0,0,0,0,0,0,0,0];
      var j = 8;
      while(j > playerLevel) {
        resoDict[j--] = 0;
      }

      var levelsum = 0;
      var playerResos = resoDict;
      var resocount = 8;
      var playerResocount = 0;

      if (portal.options.details.controllingTeam.team === playerTeam) {

        $.each(portal.options.details.resonatorArray.resonators, function(ind, reso) {
          if(reso !== null) {
            if(getPlayerName(reso.ownerGuid) === nick){
              playerResos[reso.level]--;
              playerResocount++;
              levelsum += reso.level;
            } else {
              portalResos[reso.level]++;
            }
          } else {
            portalResos[0]++;
          }
        });

        var resos = [];
        resoCount = playerResocount;

        $.each(portalResos, function(ind, reso) {
          while(reso>0){
            var nextReso = 8;
            while(playerResos[nextReso] <= 0){
              nextReso--;
            }
            if (ind < nextReso) {
              playerResos[nextReso]--;
              levelsum += nextReso;
              resos.push(nextReso);
            } else {
              levelsum += ind;
            }
            reso--;
            if(ind > 0) {
              resoCount++;
            }
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
          var m = L.marker([portal._latlng.lat, portal._latlng.lng], {title: portal.options.level+"->"+possibleLevel + ": " + resos.join(', '), referenceToPortal: portal.options.guid, icon: currentIcon});
          m.on('mouseout', function() { $(this._icon).tooltip('close'); });
          m.on('click', function(player) { window.renderPortalDetails(player.target.options.referenceToPortal); });
          if (Math.floor(possibleLevel) > Math.floor(portal.options.level)) {
            m.addTo(window.plugin.upgradeablePortals.layer);
          } else if (possibleLevel > portal.options.level) {
            m.addTo(window.plugin.upgradeablePortals.layer2);
          }
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
    window.plugin.upgradeablePortals.layer = L.layerGroup([]);
    window.plugin.upgradeablePortals.layer2 = L.layerGroup([]);


    window.addHook('checkRenderLimit', function(e) {
      if ((window.map.hasLayer(window.plugin.upgradeablePortals.layer) ||
          window.map.hasLayer(window.plugin.upgradeablePortals.layer2) ) &&
          window.plugin.upgradeablePortals._renderLimitReached)
        e.reached = true;
    });

    window.addHook('portalDataLoaded', function(e) {
      if ((window.map.hasLayer(window.plugin.upgradeablePortals.layer) ||
          window.map.hasLayer(window.plugin.upgradeablePortals.layer2) ))
        window.plugin.upgradeablePortals.updateLayer();
    });

    window.map.on('layeradd', function(e) {
      if (e.layer === window.plugin.upgradeablePortals.layer ||
         e.layer === window.plugin.upgradeablePortals.layer2)
        window.plugin.upgradeablePortals.updateLayer();
    });
    window.map.on('zoomend moveend', window.plugin.upgradeablePortals.updateLayer);
    window.layerChooser.addOverlay(window.plugin.upgradeablePortals.layer, 'Upgradeable Portals');
    window.layerChooser.addOverlay(window.plugin.upgradeablePortals.layer2, 'Already upgraded Portals');

    //map.addLayer(window.plugin.upgradeablePortals.layer);
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
