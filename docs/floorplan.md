# Interaktiver Gästegrundriss

## Quelle und bestätigte Zuordnung

Die SVG-Geometrie in `floorplan.js` vereinfacht die Pläne auf Seiten 6–8 von
`BOOK DE ANTEPROYECTO.pdf`. Am 25.10.2026 bestätigte der Eigentümer, dass die
Wände und die Verteilung der Räume unverändert sind; Möbel wurden verändert.
Die PDF bleibt außerhalb des veröffentlichten Repositories.

Der Plan ist eine schematische Orientierungshilfe ohne Maßstab, mit
vereinfachten Umrissen und ausgewählten Einbauten und Möbeln. Türöffnungen,
Fenster und Möblierung werden nicht vollständig dargestellt. Lageangaben
wie „links“ und „hinten“ beziehen sich auf die Zeichnung; eine Meer- oder
Nordrichtung wird daraus nicht abgeleitet.

| Raum-ID | Lage | Bestätigtes Schlafzimmerfoto |
| --- | --- | --- |
| `ground-bedroom-front` | Erdgeschoss, hinter der Garage; Bedroom 3 | `gf_bedroom3` |
| `ground-bedroom-left` | Erdgeschoss, links hinten neben Patio; Bedroom 2 | `gf_bedroom2_1`, `gf_bedroom2_2` |
| `ground-bedroom-main` | Erdgeschoss, rechts hinten zum Park; Bedroom 4 | `gf_bedroom4` |
| `upper-bedroom` | Einziges Schlafzimmer im Obergeschoss; Bedroom 1 | `1st_bedroom1_1` |

Die renovierten Fotos vom 27.10.2026 verwenden `gf_` für das Erdgeschoss,
`1st_` für das Obergeschoss und `2nd_` für die Dachterrasse. Deren neue
Schlafzimmernummern stimmen mit dem Grundriss überein. Die alten Dateinamen
`Dormitorio2` und `Dormitorio4` waren gegenüber den Raumnummern vertauscht.
Die bisherigen Raumkarten und die allgemeine Galerie bleiben vorerst
unverändert; die neue Zuordnung gilt für den interaktiven Grundriss.

Weitere Fotozuordnungen:

| Raum-ID | Fotos |
| --- | --- |
| `entrance` | `exterieur_front`, `gf_lounge_entrance` |
| `garage` | `gf_garage` |
| `ground-wc` | `gf_toilet` |
| `ground-lounge` | `gf_lounge`, `gf_lounge_entrance` |
| `kitchenette` | `gf_lounge_entrance` (Zeile und Garagentür in der Gesamtansicht) |
| `ground-shared-bath` | `gf_sharedbath_1` |
| `ground-rear-bath` | `gf_bathroom_of_bed2` (Bad von Bedroom 2) |
| `ground-patio` | `exterieur_back` (Außenansicht des rückwärtigen Zugangs) |
| `upper-terrace` | `1st_living_terrace_2`, `1st_living_terrace_1` |
| `upper-living` | `1st_living_terrace_1`, `1st_living_3`, `1st_living_2`, `1st_living_night` |
| `dining` | `1st_dining_2`, `1st_dining_1`, `1st_dining_living` |
| `kitchen` | `1st_kitchen`, `1st_kitchen_night`, `1st_dining_1` |
| `upper-bath` | `1st_bathroom_of_bed1` (Bad von Bedroom 1) |
| `balcony` | `exterieur_back` (Außenansicht), `VistaParque` (bisheriger Ausblick) |
| `pool` | `2nd_pool_view_2`, `2nd_pool_1`, `2nd_pool_view_1`, `2nd_pool_view_3` |
| `bbq` | `2nd_terrace_bbq` |
| `roof-terrace` | `2nd_terrace_seaview`, `2nd_terrace_parkview`, `2nd_terrace_bbq` |

Identische Dateien werden innerhalb einer Raumansicht nicht doppelt gezeigt:
`1st_dining_kitchen` ist identisch zu `1st_dining_1`, `gf_sharedbath_2` zu
`gf_sharedbath_1`. Die Bilddateien selbst bleiben erhalten.

`1st_bathroom_of_bed1` und `gf_bathroom_of_bed2` sind ebenfalls bytegleich.
Der Eigentümer hat bestätigt, dass die beiden Badezimmer identisch aussehen
und das Foto ausdrücklich für beide Räume verwendet werden soll.
Für `upper-wc` liegt weiterhin kein eindeutig zugeordnetes neues Bild vor.
`seaview` bleibt für die spätere Auswahl der allgemeinen Galerie verfügbar.

## Schematische Darstellung der Etagen

- Erdgeschoss: Eingang und Hall bilden einen gemeinsamen Bereich. Die zwei
  zuvor leeren Bereiche neben der Garage sind zu einem Technikraum
  zusammengefasst. Dieser bleibt beschriftet sichtbar, ist aber nicht
  anklickbar. Die Lounge erhält eine
  kleine Sitzecke zur Orientierung anhand der Bestandsfotos. Die Kitchenette wird als gerade Küchenzeile
  dargestellt; die Verbindungstür zur Garage ist eingezeichnet.
- Obergeschoss: Die Treppe wird als L-Treppe dargestellt. Der offene
  Galeriebereich ist als Luftraum ohne Boden gekennzeichnet. Patio und die
  freien Bereiche des Erdgeschosses werden hier nicht als begehbare Räume
  oder zusätzliche Terrassen gezeigt.
- Dachterrasse: Nur Pool, BBQ und Terrasse sind auswählbare Bereiche. Der
  Zugang vom Obergeschoss und die Pooltreppe sind getrennt erkennbar;
  die Pooltreppe schließt rechts direkt an den Hausaufgang an, bei
  unveränderter Breite und Länge. Das neue Bild `2nd_terrace_bbq` zeigt den
  BBQ-Bereich. Rechts neben dem Pool liegt über dem Balkon im
  Obergeschoss ein offener Bereich ohne Dachbodenfläche. Dieser ist aus
  dem Dachumriss und der anklickbaren Poolfläche ausgespart.

Die eingezeichneten Möbel unterstützen die Orientierung; sie sind keine
verbindliche Darstellung der aktuellen Ausstattung nach der Renovierung.

## Fotos und Texte aktualisieren

`floorplan.js` enthält pro Raum `photos`, `name`, `label`, `description` und
die SVG-Koordinaten. `photos` ist eine Liste der Bildnamen ohne Dateiendung,
zum Beispiel `photos: ['Dormitorio3', 'NeuesDormitorio3']`.
Jeder Name benötigt diese Dateien in `images/`:

- `<name>-800.avif`
- `<name>-1600.avif`
- `<name>-800.webp`
- `<name>-1600.webp`

Das Suffix `-1600` bezeichnet bei den neuen Fotos die maximale Exportbreite.
Viele Originale sind kleiner; sie wurden korrekt nicht hochgerechnet.
`casaImages.dimensions` in `image-metadata.js` hält die tatsächlichen Breiten
und Höhen aller Varianten für die `srcset`-Angaben fest. Bei späteren Bildern
diese Werte mit den realen Dateiabmessungen abgleichen. Hochformatige
Bestandsbilder können auch bei der kleinen Variante unter 800 Pixel breit sein.
Spanische und englische Alttexte stehen ebenfalls in `image-metadata.js` und
werden bei Raumwechsel, Fotowechsel, Sprachwechsel und Vergrößerung verwendet.

Die Vorschau nutzt responsive AVIF/WebP-Bilder. Die vergrößerte Galerie nutzt
1600er WebP-Dateien und die bestehende `openLightbox`-Funktion in `script.js`.
Bei auswählbaren Räumen zeigt ein leeres `photos: []` einen Platzhalter und
keine fremden Raumfotos. Mit `interactive: false` bleibt ein Raum nur als
beschriftete Fläche sichtbar, ohne Klick- oder Tastaturauswahl.
Für das Gäste-WC im Obergeschoss fehlt noch eine eigene Aufnahme.
Lufträume und Treppen werden als
Orientierungselemente gezeigt und erhalten keine eigenen Fotoansichten.

Die Raumkarten unter dem Plan und die allgemeine Galerie verwenden weiterhin
ihre bestehenden Bildlisten in `index.html`. Beim Austausch der Bilder sind
diese Listen ebenfalls zu prüfen. Spanische und englische Grundrisstexte
stehen in `floorplan.js`; bestehende Webseitentexte bleiben in `script.js`.

## Verhalten und lokale Prüfung

- Etagenwahl per Klick, Pfeiltasten, Home und End.
- Raumwahl direkt im Plan, per Klick, Enter und Leertaste. Es gibt keine
  zusätzliche Raumliste, weder auf dem Desktop noch auf Mobilgeräten.
- Der ausgewählte Raum wird oberhalb der Fotos benannt; seine Beschreibung
  steht unterhalb der Fotovorschau und wechselt mit der Raumauswahl sowie
  der Sprache. Die Beschreibungstexte stehen weiterhin pro Raum in
  `floorplan.js` und können dort später ausgearbeitet werden.
- Mobile Raumwahl scrollt zur Vorschau; „Zurück zum Plan“ setzt den Fokus
  auf den gewählten Raum zurück.
- Sprachwechsel erhält Raum und ausgewähltes Foto.
- Fotogalerie mit Escape, Pfeiltasten, Fokusbegrenzung und Fokusrückgabe.
- Ohne JavaScript bleibt die bestehende Raumübersicht verfügbar.

Es gibt keinen Build-Schritt und keine neuen externen Abhängigkeiten. Zur
lokalen Prüfung `index.html` im Browser öffnen und „Distribución“ wählen.
Für GitHub Pages müssen `image-metadata.js`, `floorplan.css` und `floorplan.js` zusammen mit den
zugehörigen Änderungen an HTML und JavaScript vorliegen.
Versionsparameter an den eingebundenen Dateien beim späteren Update erhöhen.
