/* 
Problem: Wenn man viele Facebook Kampagnen schaltet, die jeweils einer anderen Kostenstelle zugeordnet werden müssen (Kontierung),
    kann Facebook die Kosten nicht automatisch nach der Kostenstelle gruppieren. 
Lösung: Dieses Skript automatisiert den kompletten Ablauf 
    und erzeugt in der console ein JavaScript Objekt mit allen Ausgaben – gruppiert nach Kostenstelle. Das kannst du das kopieren und irgendwo abspeichern. 
Wie: Öffnet Chrome und besucht die Webseite des Facebook Business Managers, in der ihr die Abrechnungen findet.
    Wählt nun den Zeitraum aus, den ihr kontieren wollt (bei mir 1 Monat) und klickt auf die Darstellung der "Ausgaben pro Facebook-Seite".
    Jetzt seht ihr eine Tabelle, die links eure FB Seite zeigt und rechts davon das Rechnungsdatum, den Namen der Kampagne und ganz rechts den ausgegebenen Betrag.

    Öffnet jetzt die Entwicklerconsole von Chrome und klickt auf "Source" und dann auf Snippets. Dort könnt ihr ein Snippet hinzufügen
    und diesen Code reinkopieren. 

    Wichtig: Unsere (!) Naming-Konvention der Kampagnen ist folgende:
       Kostenstelle | Name der Kampagne | Optionaler Zusatz

    Ihr müsst den Code an ein paar Stellen anpassen, damit er für eure Kampagnen-Naming-Konvention passt.

VG Holger Kurtz 
(P.S. Das hier ist mein erstes JS Projekt, daher is der Code sicher nicht der geilste :) - works for me)

*/

var gesamt = document.getElementsByClassName("_1zy4")[0].textContent;
var replace = gesamt.replace(/Kampagne:/g, "===").replace(/€/g, " |").replace(/,/g, "."); // Musst du für euch anpassen
var liste = replace.split("==="); // Musst du für euch anpassen

var gesamtListe = [];
var weiter = true;

for (i = 0;weiter;i++) {   
    try {
        var kampagne = liste[i].split(" | "); // Musst du für euch anpassen
        gesamtListe.push(kampagne)
    } catch {
        weiter = !weiter;
      } 

}


bereinigteListe = []
for (x = 0; x < gesamtListe.length; x++) {
    var last = gesamtListe[x].length-1;
    if (gesamtListe[x].length > 1) {
        bereinigteListe.push([gesamtListe[x][0], parseFloat(gesamtListe[x][last]) ]);
    } else {
        //pass 
    }
}

// Diesen Part habe ich von https://stackoverflow.com/questions/26454655/convert-javascript-array-of-2-element-arrays-into-object-key-value-pairs
bereinigteListe.reduce(function(p, c) {
         p[c[0]] = c[1];
         return p;

// Diesen Part habe ich von https://stackoverflow.com/questions/24444738/sum-similar-keys-in-an-array-of-objects
var holder = {};

p.forEach(function(d) {
  if (holder.hasOwnProperty(d.name)) {
    holder[d.name] = holder[d.name] + d.value;
  } else {
    holder[d.name] = d.value;
  }
});

var obj2 = [];

for (var prop in holder) {
  obj2.push({ name: prop, value: holder[prop] });
}

    }, {});



/* Bisher nur ein Test – lass das am besten als Kommentar.
let csvContent = "data:text/csv;charset=utf-8," 
    + bereinigteListe.map(e => e.join(",")).join("\n");

var encodedUri = encodeURI(csvContent);
window.open(encodedUri);

*/