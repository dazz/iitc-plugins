// ==UserScript==
// @id             iitc-plugin-wetterbericht-portals@dazz
// @name           iitc: wetterbericht-portals-pdm
// @version        0.1.1
// @namespace      https://github.com/breunigs/ingress-intel-total-conversion
// @updateURL      https://github.com/thiasb/iitc-plugins/raw/master/wetterbericht/wetterbericht-portals-pdm.user.js
// @downloadURL    https://github.com/thiasb/iitc-plugins/raw/master/wetterbericht/wetterbericht-portals-pdm.user.js
// @description    wetterbericht-portals-pdm
// @include        *://www.ingress.com/intel*
// @match          *://www.ingress.com/intel*
// ==/UserScript==

function wrapper() {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};


// PLUGIN START ////////////////////////////////////////////////////////
// use own namespace for plugin
window.plugin.wetterberichtportals = function() {};

window.plugin.wetterberichtportals.city = function() {};
window.plugin.wetterberichtportals.city.potsdam = function() {
  return {
    'areas': [ // select area(s) you want to see
      'BB', 'NP'
    ],
    'BB': {
      'portals': [
        '8fbe5b0690ec41008a6ce9fd4ef384c0.12', // Bahnhof Babelsberg
        '315659248b104a98a8a21fdb7fb591ea.12', // Berlijn2
        'c0d96ad184334b1c961f7135404243b9.12', // Чекпойнт Чарли
        'dcdc183fedc142fe940ecfe40e77ae4c.12', // Berlin Checkpoint Charlie
        '59782084f1df4bad8350b9853fbd83ca.12', // "Berliner Mauer"
        'e1d813ca03394b93bb63a4b7c835ed42.12', // House Ball by Claes Oldenburg
        '329f1fa4188f48428daa8aa74e61e8ff.12', // Oldenburg/van Bruggen: Houseba
      ]
    },
    'NP': {
      'portals': [
        'cb8f749054c8403f92d51afd3484cb25.12', // Airfild Memorial
        'b231c2c7aab048f29a9413ef77db6253.12', // die Luftbrücke
        '645fc1daea0043de8e244e8bc7fd629a.12', // Berlin Airlift Monument by Edu
        '4870a2296861446bbc1d0809146dd89b.12', // Tempelhof
        '3fe78a5b37b14687818d3ee535ff2d5e.12', // Luftbruecke monument
      ]
    },
//      '': {
//        'portals': [
//
//        ]
//      },
  };
};
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
