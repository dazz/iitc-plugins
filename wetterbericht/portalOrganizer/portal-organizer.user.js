// ==UserScript==
// @id             iitc-plugin-portal-organizer@flyingmana
// @name           iitc: portal-organizer
// @version        0.0.1
// @namespace      https://github.com/breunigs/ingress-intel-total-conversion
// @updateURL      https://github.com/dazz/iitc-plugins/raw/master/portalOrganizer/portal-organizer.user.js
// @downloadURL    https://github.com/dazz/iitc-plugins/raw/master/portalOrganizer/portal-organizer.user.js
// @description    portal-organizer
// @include        *://www.ingress.com/intel*
// @match          *://www.ingress.com/intel*
// ==/UserScript==


function wrapper() {
  // ensure plugin framework is there, even if iitc is not yet loaded
  if(typeof window.plugin !== 'function') window.plugin = function() {};


  // PLUGIN START ////////////////////////////////////////////////////////
  // use own namespace for plugin
  // wetterberichtportals can be multiple city files so let's prepare
  if(typeof window.plugin.wetterberichtportals !== 'function') {
    window.plugin.wetterberichtportals = function() {};
    window.plugin.wetterberichtportals.city = function() {};
  }

  window.plugin.portalorganizer = function(){

    self = this
    this.currentSet = [];

    this.init = function(){

      $('#toolbox').append('<a onclick="window.plugin.portalorganizer.addToSet()">Add To Set</a> ');
    };

    this.addToSet = function(){
      if( selectedPortal )
        this.currentSet.push(selectedPortal);
    };

    this.printCurrentSet = function(){
      var resultSet = []
      var result

      $.each( this.currentSet, function( index, element){
        //console.log(element, portals[element])
        var temp = ""
        temp = temp + "'" + element + "'"
        if( self.currentSet[index+1] ){
          temp = temp + ","
        }else{
          temp = temp + " "
        }
        temp = temp + " // " + portals[element].options.details.portalV2.descriptiveText.TITLE
        resultSet.push( temp )
      } )

      result = "'portals': [\n"
      result = result + "" + resultSet.join("\n") + ""
      result = result + "\n]"
      console.log(result)
    }

    this.clearCurrentSet = function(){
      this.currentSet = [];
    }

    return this;
  }();



  var setup = function(){};
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

