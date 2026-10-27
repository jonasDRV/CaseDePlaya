# Bildbeschreibungen und technische Bilddaten

`image-metadata.js` enthält spanische und englische Alttexte für alle 40
Fotomotive sowie den Text des Logo-Links. Die Beschreibungen folgen den
sichtbaren Motiven; sie enthalten keine Keyword-Listen. Varianten desselben
Motivs erhalten denselben Alttext. Die vom Eigentümer bestätigten identischen
Badaufnahmen werden im jeweiligen Raumkontext beschrieben.

## Einbindung

- In `index.html` stehen aussagekräftige spanische Alttexte und reale
  Bildabmessungen bereits im HTML. `data-image` verweist auf das Motiv im
  zentralen Katalog. Die Galerie zeigt 30 Motive. Schlafzimmer, Bäder, Garage, Pool, Terrasse, BBQ,
  Wohnzimmer, Lounge, Essbereich, Küche und Hausfassaden zeigen die neuen Aufnahmen.
  Die zwei bisherigen Rückansichten wurden durch ein aktuelles Foto ersetzt.
  Der vordere Meerblick-Balkon zeigt beide neuen Balkonfotos im Grundriss;
  `1st_balcony_front_2` ersetzt die reine Meerblick-Aufnahme in der Galerie.
- `script.js` aktualisiert Alttexte beim Sprachwechsel und beim Wechsel
  der Raumkartenfotos. Die Lightbox verwendet ebenfalls die Beschreibung
  des tatsächlich gezeigten Fotos und lädt die großen WebP-Varianten.
- `floorplan.js` verwendet denselben Katalog für Fotovorschau und Vergrößerung.
- Dekorative SVG-Symbole behalten `alt=""` und `aria-hidden="true"`, da
  ihre Bedeutung bereits im benachbarten Text steht.

`casaImages.dimensions` hält für jedes Foto die tatsächliche Breite und Höhe
von `small` (`-800`), `large` (`-1600`) und `original` (ohne Suffix) fest.
Das Dateinamensuffix allein garantiert keine entsprechende Bildbreite.
Die `srcset`-Deskriptoren müssen die realen Pixelbreiten verwenden.
`sizes` berücksichtigt die zwei mobilen Galeriespalten und die festen
Breiten der Raumkarten. Breite und Höhe reservieren den passenden Platz
für noch nicht geladene Galeriefotos.

Die Hero-Vorabladung verwendet wie das CSS AVIF und dieselbe Unterteilung
bei 768 Pixeln. Pro Bildschirmbreite trifft nur einer der beiden
Vorabladehinweise zu. Die WebP-Rückfallvariante bleibt im CSS erhalten.
Das Hero-Motiv ist `1st_living_terrace_1`: quadratisch mit 1254 × 1254 Pixeln
in der großen Variante. `cover` und separate Positionen für Desktop und
Handy halten den Meerblick und die neue Sitzecke im sichtbaren Ausschnitt.
Die Wohnzimmerkarte zeigt vier aktuelle Ansichten, die Küchenkarte drei;
die Anzahl der Bildindikatoren entspricht jeweils der Fotoanzahl.

## Metadaten und Auffindbarkeit

- Open Graph und Twitter referenzieren die aktuelle breite Aufnahme
  `2nd_pool_view_2-1600.webp`. Open Graph enthält den Dateityp sowie die
  Abmessungen 1600 × 900. Der Alttext folgt der gewählten Sprache.
- Die JSON-LD-Bilderliste des Ferienhauses referenziert aktuelle Fotos,
  die auch über den Grundriss zugänglich sind.
- `sitemap.xml` führt die 36 tatsächlich verwendeten Fotomotive als
  `image:loc` auf; das Änderungsdatum ist 2026-10-27. Damit sind auch Fotos
  benannt, die erst nach einem Raumwechsel angezeigt werden.
- Die Dateinamen des neuen Fotosatzes bleiben zur eindeutigen Zuordnung
  erhalten. Die zwei derzeit unbenutzten Duplikate sowie `seaview` und
  `1st_living_terrace_2` bleiben im Beschreibungskatalog vorbereitet,
  aber außerhalb der Bilder-Sitemap. Die 29 alten, ersetzten Motive liegen
  mit ihren Metadaten unter `archive/`.

## Spätere Änderungen

1. In `image-metadata.js` einen Motivnamen mit spanischer und englischer
   Beschreibung und den realen Abmessungen ergänzen bzw. anpassen.
2. Bei statischen Fotos `alt`, `width`, `height`, `data-image` und die
   `srcset`-Breiten in `index.html` passend halten.
3. Die Fotozuordnung in `floorplan.js` bzw. den bestehenden Raumkarten
   ergänzen; die Sitemap um neu verwendete Motive erweitern.
4. Versionsparameter an geänderten Skripten erhöhen und Raum-/Sprachwechsel,
   Vergrößerung sowie die Dateiverweise prüfen.

Grundlage: [Google-Bildempfehlungen](https://developers.google.com/search/docs/appearance/google-images)
und [Bildabmessungen zur Platzreservierung](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/Multimedia).

Die vollständige Zuordnung alter und neuer Fotos sowie die zwei weiterhin
benötigten Bestandsmotive stehen in [image-replacement-audit.md](image-replacement-audit.md).
