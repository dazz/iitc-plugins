# Wetterbericht (für Berlin)

* Fügt der Toolbox einen Link mit dem Text 'wetterbericht' hinzu. Beim Anklicken wird der Wetterbericht für die eingetragenen Areas als Alert und in der Console angezeigt.
* Die Datei `wetterbericht-portals.user.js` enthält die Listen mit den Areas, die Datei `wetterbericht.user.js` ist das eigendliche Plugin. Funktioniert nur mit beiden Dateien. Ich habe es in zwei Dateien aufgeteilt, damit sich auch jeder seine eigenen Areas anlegen kann.
* Die weißen Portale sind die gelisteten für die Areas
* Eine Historie findet ihr hier: [wetterbericht für berlin](https://gist.github.com/dazz/bdcd6b4220563ee1483f)
* Das Plugin ist in Kooperation von flyingmana(E), cmile(R) und mir(R)(dazs), entstanden. Ich hoffe auf weitere gute Zusammenarbeit!
* viel Spaß und happy AP sammeln :)

## Install

1. [wetterbericht-portals.user.js](https://github.com/dazz/iitc-plugins/raw/master/wetterbericht/wetterbericht-portals.user.js)
2. [wetterbericht.user.js](https://github.com/dazz/iitc-plugins/raw/master/wetterbericht/wetterbericht.user.js)

## So sieht's aus

    Der Wetterbericht für 08.03.2013 11:38
    [ANH|9]:    R(4):  3.84L|9kAP	E(5):  3.02L|18kAP
    [CC|7]:     R(2):  3.25L|5kAP	E(5):  2.60L|21kAP
    [ESG|23]:	R(19): 4.87L|45kAP	E(4):  3.75L|9kAP
    [GK|53]:	R(28): 3.34L|93kAP	E(15): 4.04L|36kAP
    [GM|10]:	R(10): 4.80L|47kAP	E(0):  0.00L|0kAP
    [GRP|8]:	R(2):  1.00L|4kAP	E(6):  4.54L|20kAP
    [GS|38]:	R(37): 3.29L|91kAP	E(1):  3.63L|3kAP
    [KOE|11]:	R(5):  3.88L|13kAP	E(6):  2.33L|26kAP
    [LG|44]:	R(37): 2.49L|83kAP	E(7):  2.89L|15kAP
    [NK|23]:	R(5):  4.10L|11kAP	E(18): 5.54L|71kAP
    [PDL|5]:	R(0):  0.00L|0kAP	E(5):  5.63L|25kAP
    [PKW|16]:	R(5):  4.55L|11kAP	E(11): 4.61L|29kAP
    [PP|42]:	R(31): 4.27L|109kAP	E(11): 3.26L|40kAP
    [THF|17]:	R(10): 4.17L|32kAP	E(7):  6.54L|17kAP
    [TP|10]:	R(10): 5.75L|30kAP	E(0):  0.00L|0kAP
    [SC|28]:	R(17): 4.96L|67kAP	E(11): 4.44L|32kAP
    [VFH|14]:	R(13): 4.48L|32kAP	E(1):  5.13L|2kAP


## Wie ist der wetterbericht zu lesen:

    [Area|Portal Anzahl insg.] Faction(anz. Portale): durschn. Level|max. kAP

Ein Beispiel:

    [GK|41]:

An der Gedächtniskirche werden _41_ Portale ausgewertet.

    R(7):  4.88L|18kAP

Die Resistance besetzt davon 7 mit einem durchschnittlichen Level von 4.88, was den Erleuchteten beim Einriss und Aufbau 18kAP bringen würde.

    E(31): 5.12L|126kAP

Die Erleuchteten besetzen 31 Portale und haben diese durchschnittlich auf Level 5.12 gebracht. Es würde dir 126.000 AP bringen diese wieder einzureißen, zu deployen und noch einiges mehr wenn du felder baust, also los!﻿


## Areas

* ANH - Anhalter Bahnhof/Tempodrom
* CC  - Checkpoint Charlie
* ESG - East Side Gallery
* GK  - Gedächtniskirche
* GM  - Gendarmenmarkt
* GRP - Gropiusbau/Topographie des Terrors
* GS  - Großer Stern
* KOE - Köpenick
* LG  - Lustgarten
* NK  - Neukölln
* PDL - Platz der Luftbrücke
* PDP - Potsdamer Platz
* PKW - Pankow
* SC  - Schloss Charlottenburg
* THF - Tempelhof
* TP  - Treptower Park
* VFH - Volkspark Friedrichshain


## Faction

* R - RESISTANCE
* E - ENLIGHTENED


## Eigene Areas hinzufügen

Flyingmana hat ein cooles UserScript geschrieben mit der man Portale einfach exportieren kann: [portalOrganizer](https://github.com/dazz/iitc-plugins/tree/master/wetterbericht/portalOrganizer)

### Oder:

Im Script [wetterbericht.user.js](https://github.com/dazz/iitc-plugins/blob/master/wetterbericht/wetterbericht.user.js) gibt es eine Export-Funktionalität.

    [63] //window.plugin.wetterbericht.export.add(d);  // [1] collect all portals in list to filter double entries
    [66] //window.plugin.wetterbericht.export.add(d);  // [1] collect all the portals seen on map
    [69] //window.plugin.wetterbericht.export.log();   // [2] dump to console

Wenn man auf einen Bereich der Karte zoomt und dann [1] und [2] einkommentiert werden auf Konsole die Portale ausgegeben.

Die Liste dann kopieren und in [wetterbericht-portals.user.js](https://github.com/dazz/iitc-plugins/blob/master/wetterbericht/wetterbericht-portals.user.js) eintragen und speichern. Nach einem Refresh sollten die Portale mit einer weißen Füllung angezeigt werden.

Das Kürzel nicht vergessen. Und an mich schicken :)

## Was kann schiefgehen?

* Es werden beim Laden der Portale im Browser alle der Area entsprechenden Portal-Informationen gesammelt, wenn bei einer Area folgendes steht, wurden die Portale nicht geladen:

    [PDL|0]:    R(0):  0.00LL|0kAP    E(0):  0.00L|0kAP
    
* Es wurden nicht beide Dateien als UserScript im Browser geladen

## Le Screenshot
![link zum wetterbericht](http://i.imgur.com/45DjLLA.jpg)
![screenshot der areas](http://i.imgur.com/9hTP5LO.jpg)
