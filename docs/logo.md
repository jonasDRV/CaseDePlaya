# Header-Logo und Browser-Symbole

## Kopfzeile

Startseite, Impressum und Datenschutzerklärung verwenden wieder das originale
`images/LogoChocaya.png` (1000 × 1000 Pixel). Es wurde bytegleich aus dem Archiv
zurückverschoben. Auch das CSS entspricht wieder der bisherigen Darstellung:
135 Pixel Bildhöhe im 72 Pixel hohen Logo-Bereich, Weißfilter über dem Hero
und die Originalfarbe bei gescrollter Kopfzeile. Der Bildkatalog führt wieder
den Schlüssel `LogoChocaya` mit den ursprünglichen Abmessungen und Linktexten.

## Browser-Symbole

Das neue beige Logo erscheint ausschließlich als Browser-/Homescreen-Symbol.
Die Quelldatei `images/Minimalistische Berglandschaft-Logoikone.png` bleibt
unverändert erhalten (1254 × 1254 Pixel).

`images/favicon-source.svg` enthält den zuvor erstellten 256-Pixel-Export
`images/casa-chocaya-logo.png` eingebettet und schneidet den weißen Außenbereich
mit einer abgerundeten SVG-Kontur aus. Die schwarze Zeichnung stammt vollständig
aus der Originaldatei. Transparente Ecken ersetzen den weißen Hintergrund;
die beige Fläche bleibt erhalten. Der 256-Pixel-Export wird nicht in der
Kopfzeile angezeigt.

| Datei in `images/` | Größe | Verwendung |
| --- | --- | --- |
| `favicon-32.png` | 32 × 32 | Browser-Tab |
| `favicon-48.png` | 48 × 48 | Browser-/Website-Symbol |
| `favicon-192.png` | 192 × 192 | Hochauflösendes Favicon und Logo in strukturierten Daten |
| `apple-touch-icon.png` | 180 × 180 | Homescreen-Symbol |

Die vier PNG-Dateien wurden mit dem Browser aus der SVG-Quelle exportiert.
Ihre Ecken sind vollständig transparent; es gibt keine sichtbaren weißen
Randpixel. Antialiasing kann bei nahezu transparenten Kantenpixeln zu
Rundungswerten führen. Versionsparameter an den Icon-Links und am CSS sorgen
für neue Ressourcen-URLs nach der Änderung.

Die Startseite nennt das neue Logo zusätzlich im `logo`-Feld ihres bestehenden
`VacationRental`-Eintrags. Die quadratische 192-Pixel-PNG ist auf allen drei
Seiten als Favicon mit stabiler URL eingebunden. `robots.txt` erlaubt das
Crawlen der Startseite und der Symbole. Das sichtbare Header-Logo bleibt
weiterhin die ursprüngliche transparente Zeichnung.

Google entscheidet selbst über die Anzeige und den Aktualisierungszeitpunkt.
Laut Dokumentation kann das erneute Crawlen und Verarbeiten mehrere Tage bis
Wochen dauern; eine Anzeige ist auch bei korrekter Einbindung nicht garantiert.

Zwei Freistellversuche mit dem eingebauten Imagegen-Werkzeug wurden wegen
unsauberer Ränder verworfen. Der Auftrag lautete, nur den weißen Außenbereich
transparent zu machen und das beige Feld samt schwarzer Zeichnung unverändert
zu erhalten. Keines dieser generierten Bilder wird im Projekt verwendet;
die finale SVG-Maske verarbeitet die ursprünglichen Bildpixel.

Die Link-Einbindung folgt der [HTML-Dokumentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel#icon)
und den [Google-Hinweisen zu Favicons](https://developers.google.com/search/docs/appearance/favicon-in-search).
