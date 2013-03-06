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

    der wetterbericht für 05.03.2013 9:28
    [PDL|5]:    R(5):  4.42L|12kAP	E(0):  0.00L|0kAP
    [GM|10]:	R(2):  3.56L|5kAP	E(8):  1.81L|21kAP
    [ESG|23]:	R(22): 4.43L|79kAP	E(1):  3.63L|2kAP
    [GS|38]:	R(20): 2.17L|46kAP	E(17): 1.22L|34kAP
    [TP|10]:	R(0):  0.00L|0kAP	E(10): 4.35L|25kAP
    [PDP|42]:	R(31): 4.04L|80kAP	E(11): 4.76L|34kAP
    [SC|28]:	R(19): 3.74L|49kAP	E(9):  3.94L|20kAP
    [LG|44]:	R(28): 2.36L|60kAP	E(16): 1.06L|31kAP
    [GK|53]:	R(22): 4.32L|75kAP	E(22): 4.19L|58kAP
    [THF|17]:	R(4):  3.19L|9kAP	E(13): 6.34L|31kAP
    [NK|23]:	R(7):  4.64L|18kAP	E(16): 5.79L|65kAP
    [KOE|11]:	R(10): 5.58L|42kAP	E(1):  2.25L|2kAP
    [PKW|9]:	R(0):  0.00L|0kAP	E(9):  2.72L|21kAP
    [VFH|14]:	R(11): 6.14L|37kAP	E(3):  2.75L|6kAP


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

* PDL - Platz der Luftbrücke
* GM  - Gendarmenmarkt
* ESG - East Side Gallery
* GS  - Großer Stern
* TP  - Treptower Park
* PDP - Potsdamer Platz
* SC  - Schloss Charlottenburg
* LG  - Lustgarten
* GK  - Gedächtniskirche
* THF - Tempelhof
* NK  - Neukölln
* KOE - Köpenick
* PKW - Pankow
* VFH - Volkspark Friedrichshain
* CC  - Checkpoint Charlie

## Faction

* R - RESISTANCE
* E - ENLIGHTENED


## Eigene Areas hinzufügen

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

![screenshot der areas](http://i.imgur.com/9hTP5LO.jpg)
