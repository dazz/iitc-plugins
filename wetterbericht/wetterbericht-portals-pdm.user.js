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
      'BB', 'NP', 'GB', 'PS'
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
    'GB': {
      'portals': [
        '4c193f05308f48ccab4edb8b71631625.12', // Milchmädchen-Brunnen im Schlos
        '4807a52771554b5fb8993d22850fab2b.12', // Casino Klein-Glienicke von F.
        'f528905072f04c838e4321a221360f26.12', // Löwenfontäne im Schlosspark Gl
        'f6c8322099f64be18bcd7917428ee906.12', // Glienicker Park, Greif
        '75419c678b9b4773b40662fca4efee0b.11', // Stein im Glienicker Volkspark
        'a3ced1b241b94cf69fe332c29914bf13.12', // Schloss Glienicke mit Neptunbr
        'e0e24a6220134654a31494d95091b2c4.12', // Un tritone
        '4435bfda3ad349c38ec95f7149537dcb.12', // Glienicker Brücke-Potsdam-2008
      ]
    },
    'PS': {
      'portals': [
        '978fc04c0d6e4fedb3149af86bc561e8.12', // Historische Mühle von Sanssouc
        '59a638646aaf4a5288a407a0996a5642.12', // Sansousi
        '3e8b33ba304246bd8196feb1219900cc.12', // CK Orangerie
        '6a2d5b4b5c864f5b9898c03bd2f9bd58.12', // Potsdam - Orangerieschloss (Ne
        '3500e375ee564f098c01ebb225da94ee.12', // Parque Sanssouci - POTSDAM ,
        '2e58d53b4bd14278b8f43cce4422ba3b.11', // Orangeri
        '940c3dcd856046438f07b224a0431061.12', // CK Bogenschützer
        'fe39015c452c4c92abea2733ade43e3e.12', // Schloss Sanssouci
        '325cbe8dd6a44ae4ba037a92a50db0c2.12', // Engel
        '9b58d2ffd99348ae9282793f9fb787c0.12', // Studying in Potsdam, Germany
        'f0236d90d9ff40528555ffb2b6d4f78d.12', // Park Sanssouci
        '459c5ddcdf2e49ca8b5a8060e1d4cb42.12', // Statue, Sanssouci Park
        '3d60f98b0962452685a379f271a135ee.12', // Potsdam - Park Sanssouci
        '9c24b6db63ff4ed8b79ccab9a6eaa17a.12', // Statue über Weinterrassen und
        '9ff5007d5f774b4c98b92f9f289d6712.12', // Potsdam, Sanssouci.
        'b2c0bcbfc5e14b07a4f5ca5932cb7bd1.12', // [Untitled]
        'bf41b66a9a35463995f7f331b9e71b6e.12', // Sanssouci Castle, Sanssouci Pa
        '5543192a130d45aab6712933ec01b830.12', // Schlosspark Sanssouci
        'c09ed42b48cf41588f893d03926240d2.12', // [Untitled]
        '7e65c9b48bdd424c9cad61bd523aa659.12', // Schlosspark Sanssouci
        '5e199b44188f4412ba0ba8ac138cb5f5.12', // Mühle am Schloss Sanssouci - P
        'e286a395d5d649df9f694acf65baea44.11', // Schloss San Soucis
        'd5491c3046de4e8abddb19b6057e23c7.12', // Pavillion am Schloss - Potsdam
        '002578cccd1c4fe5b77361efdd34cff4.12', // Potsdam - Sanssouci   (ha_rk@g
        '91ff8102954a4f7f90d5aa53c5c1ff4a.12', // China pavillion
        '7047758558f7432db9c110b94c38bdd2.12', // Berlin
        '352a8cd8c595411f8e11e74a77d39077.12', // Casa China ,  Parque Sanssouci
        '891de0d6c08d4f339b1458aa29e3093a.12', // Casa China ,  Park Sanssouci -
        '274e088b80d1433e96206bf7900fddfd.12', // China pavillion
        'b505cbb91943442099ec44d84069af11.12', // Park Sanssouci - Orangerie
        '38ce9823423e4770927398b6c59b8437.12', // Friedrich der Große und Orange
        '82bb405fb799448d8572b6bd9a49a4dd.12', // Orangery Palace - Frederick th
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
