# Interaktiver Gästegrundriss

## Quelle und bestätigte Zuordnung

Die SVG-Geometrie in `floorplan.js` vereinfacht die Pläne auf Seiten 6–8 von
`BOOK DE ANTEPROYECTO.pdf`. Am 25.10.2026 bestätigte der Eigentümer, dass die
Wände und die Verteilung der Räume unverändert sind; Möbel wurden verändert.
Die PDF bleibt außerhalb des veröffentlichten Repositories.

Alle Etagen haben dieselbe Orientierung: Hauptzugang und Garage oben,
Parkseite unten. Der Plan ist eine Orientierungshilfe ohne Maßstab, mit
vereinfachten Umrissen und festen Einbauten. Türöffnungen, Fenster und
Möblierung werden nicht im Detail dargestellt. Eine Meer- oder Nordrichtung
wird nicht aus der Zeichnung abgeleitet.

| Raum-ID | Lage | Bestätigtes Schlafzimmerfoto |
| --- | --- | --- |
| `ground-bedroom-front` | Erdgeschoss, hinter der Garage | `Dormitorio3` |
| `ground-bedroom-left` | Erdgeschoss, links hinten neben Patio | `Dormitorio2` |
| `ground-bedroom-main` | Erdgeschoss, rechts hinten zum Park | `Dormitorio4` |
| `upper-bedroom` | Einziges Schlafzimmer im Obergeschoss | `ChocayaDormitorio` |

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
Insbesondere die einzelnen Bäder und mehrere Außenbereiche benötigen noch
eine eindeutige Fotozuordnung. Der zweite Balkon/Patiobereich, der im Plan
als offener Bereich dargestellt ist, wird nicht als Innenraum ausgegeben.

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
Für GitHub Pages müssen die beiden neuen Dateien `floorplan.css` und
`floorplan.js` zusammen mit den Änderungen an HTML und JavaScript vorliegen.
Versionsparameter an den eingebundenen Dateien beim späteren Update erhöhen.
