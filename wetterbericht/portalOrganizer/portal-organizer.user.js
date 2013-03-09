// ==UserScript==
// @id             iitc-plugin-portal-organizer@flyingmana
// @name           iitc: portal-organizer
// @version        0.1.0
// @namespace      https://github.com/breunigs/ingress-intel-total-conversion
// @updateURL      https://github.com/dazz/iitc-plugins/raw/master/wetterbericht/portalOrganizer/portal-organizer.user.js
// @downloadURL    https://github.com/dazz/iitc-plugins/raw/master/wetterbericht/portalOrganizer/portal-organizer.user.js
// @description    portal-organizer
// @include        *://www.ingress.com/intel*
// @match          *://www.ingress.com/intel*
// ==/UserScript==


function wrapper() {
  // ensure plugin framework is there, even if iitc is not yet loaded
  if(typeof window.plugin !== 'function') window.plugin = function() {};


  // PLUGIN START ////////////////////////////////////////////////////////
  // use own namespace for plugin 
  window.plugin.portalorganizer = function() {

    self = this;
    this.currentSet = [];

    this.addToSet = function() {
      if (selectedPortal) {
        this.currentSet.push(selectedPortal);
      }
    };

    this.printCurrentSet = function() {
      var resultSet = [];
      var result;

      $.each(this.currentSet, function(index, guid) {
        //console.log(guid, portals[guid]);
        var outputSting = "";
        outputSting = outputSting + "'" + guid + "'";
        if (self.currentSet[index+1] ) {
          outputSting = outputSting + ","
        } else {
          outputSting = outputSting + " "
        }
        outputSting = outputSting + " // " + portals[guid].options.details.portalV2.descriptiveText.TITLE;
        resultSet.push( outputSting )
      });

      result = "'portals': [\n";
      result = result + "" + resultSet.join("\n") + "";
      result = result + "\n]";
      console.log(result);
    };

    this.clearCurrentSet = function() {
      this.currentSet = [];
    };

    this.setup = function() {
      $('#toolbox').append('<a onclick="window.plugin.portalorganizer.addToSet()">Add</a> ');
      $('#toolbox').append('<a onclick="window.plugin.portalorganizer.printCurrentSet()">Print</a> ');
      $('#toolbox').append('<a onclick="window.plugin.portalorganizer.clearCurrentSet()">Clear</a> ');
    };

    return this;
  }();

  var setup = window.plugin.portalorganizer.setup;

  //var setup = window.plugin.portalorganizer.setup();
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