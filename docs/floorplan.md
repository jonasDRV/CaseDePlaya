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
| `ground-bedroom-front` | Erdgeschoss, hinter der Garage | `Dormitorio3` |
| `ground-bedroom-left` | Erdgeschoss, links hinten neben Patio; Bedroom 2 | `Dormitorio4` |
| `ground-bedroom-main` | Erdgeschoss, rechts hinten zum Park; Bedroom 4 | `Dormitorio2` |
| `upper-bedroom` | Einziges Schlafzimmer im Obergeschoss | `ChocayaDormitorio` |

Die Fotozuordnung von Bedroom 2 und Bedroom 4 wurde nach der Rückmeldung
des Eigentümers getauscht. Die Raumnummern im Grundriss ergeben sich nicht
aus den Bilddateinamen. Diese Korrektur betrifft die Fotos im Grundriss;
die bisherigen Raumkarten und die allgemeine Galerie bleiben unverändert.

## Schematische Darstellung der Etagen

- Erdgeschoss: Eingang und Hall bilden einen gemeinsamen Bereich. Die zwei
  zuvor leeren Bereiche neben der Garage sind zu einem Technikraum
  zusammengefasst. Die Lounge erhält eine kleine Sitzecke zur Orientierung
  anhand der Bestandsfotos. Die Kitchenette wird als gerade Küchenzeile
  dargestellt; die Verbindungstür zur Garage ist eingezeichnet.
- Obergeschoss: Die Treppe wird als L-Treppe dargestellt. Der offene
  Galeriebereich ist als Luftraum ohne Boden gekennzeichnet. Patio und die
  freien Bereiche des Erdgeschosses werden hier nicht als begehbare Räume
  oder zusätzliche Terrassen gezeigt.
- Dachterrasse: Nur Pool, BBQ und Terrasse sind auswählbare Bereiche. Der
  Zugang vom Obergeschoss und die Pooltreppe sind getrennt erkennbar und
  dienen der Orientierung. Das Bild `Terraza` zeigt den BBQ-Bereich und ist
  diesem zugeordnet.

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

Die Vorschau nutzt responsive AVIF/WebP-Bilder. Die vergrößerte Galerie nutzt
1600er WebP-Dateien und die bestehende `openLightbox`-Funktion in `script.js`.
Ein leeres `photos: []` zeigt einen Platzhalter und keine fremden Raumfotos.
Insbesondere die einzelnen Bäder und einige Nebenbereiche benötigen noch
eine eindeutige Fotozuordnung. Lufträume und Treppen werden als
Orientierungselemente gezeigt und erhalten keine eigenen Fotoansichten.

Die Raumkarten unter dem Plan und die allgemeine Galerie verwenden weiterhin
ihre bestehenden Bildlisten in `index.html`. Beim Austausch der Bilder sind
diese Listen ebenfalls zu prüfen. Spanische und englische Grundrisstexte
stehen in `floorplan.js`; bestehende Webseitentexte bleiben in `script.js`.

## Verhalten und lokale Prüfung

- Etagenwahl per Klick, Pfeiltasten, Home und End.
- Raumwahl per Plan, Raumliste, Enter und Leertaste.
- Mobile Raumwahl scrollt zur Vorschau; „Zurück zum Plan“ setzt den Fokus
  auf den gewählten Raum zurück.
- Sprachwechsel erhält Raum und ausgewähltes Foto.
- Fotogalerie mit Escape, Pfeiltasten, Fokusbegrenzung und Fokusrückgabe.
- Ohne JavaScript bleibt die bestehende Raumübersicht verfügbar.

Es gibt keinen Build-Schritt und keine neuen externen Abhängigkeiten. Zur
lokalen Prüfung `index.html` im Browser öffnen und „Distribución“ wählen.
Für GitHub Pages müssen `floorplan.css` und `floorplan.js` zusammen mit den
zugehörigen Änderungen an HTML und JavaScript vorliegen.
Versionsparameter an den eingebundenen Dateien beim späteren Update erhöhen.
