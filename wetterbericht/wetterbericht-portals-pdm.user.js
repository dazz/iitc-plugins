// ==UserScript==
// @id             iitc-plugin-wetterbericht-portals@dazz
// @name           iitc: wetterbericht-portals-pdm
// @version        0.1.1
// @namespace      https://github.com/breunigs/ingress-intel-total-conversion
// @updateURL      https://github.com/thiasb/iitc-plugins/raw/Potsdam/wetterbericht/wetterbericht-portals-pdm.user.js
// @downloadURL    https://github.com/thiasb/iitc-plugins/raw/Potsdam/wetterbericht/wetterbericht-portals-pdm.user.js
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
        '5ee7e12338994ef4b6b3c432461a79c2.12', // Schönheit der Architektur
        '0d73412825f7424997d110cf3be5fcb0.11', // Bartgeist
        '7ce3f515dffb4e46b39329007d26bc36.11', // Litfaßsäule
        '6db4235242e044a8b25c716b0b45cbb8.11', // Neptun
        'e57a9aa905304b158e264f542b5c1e36.11', // Backsteintor
        '7df3410f21004e3e94e1e218e00b540c.11', // Bahnhof Babelsberg
      ]
    },
    'NP': {
      'portals': [
        'dbad657ebe354e1cb4cf710124022a13.12', // Neues Palais
        'aed42d91fdc04e238f826c0ac7fee4ab.12', // Sanssouci Park
        '1f35e5cb0eef462ba49be07eaff2f027.12', // Viktoria im Park
        '9f68979a62984a2284188ac4e50b6799.12', // Park Sanssouci - Neues Palais
        '2c26250db6bf4438a1949696cd464ba9.11', // Freundschaftstempel im Park Sa
        '04e4a834268d46b293406d94fa98b2f9.12', // Universität Potsdam am Schloss
        '4cc4e24bd42348b8b95656b390654aff.12', // Neues Palais, Potsdam-Sanssouc
        '22ce8b467196446f889104ccba27d12c.12', // Neues Palais im Park Sanssouci
        'b22519f2a0ee4fef8d62cb7e98bc8e15.12', // Potsdam - Neues Palais
        'ef96b28d877e49af9952a84b056f9a31.12', // Neues Palais im Park Sanssouci
        '3f16528ed033461b89aaada66bd2833c.12', // Neues Palais, Potsdam-Sanssouc
        '14166a9669314e56b7754500f13a5918.12', // Symbiose
        'a2ffe85be95b460e8631308b9486f56b.12', // das Neue Palais am Morgen
        'dfe9ac39f92f418cbb2de7ec54b94d76.12', // Blick durch die Kastanien
        '283dbfcbe7074bd292d670ea0a6eb59f.12', // Neue Palais - Potsdam - Kandel
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
