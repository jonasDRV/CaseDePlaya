# Galerie auf Touch-Geräten

## Reproduzierter Fehler

Die untere Bildbeschriftung (`.gallery-caption`) lag auch bei `opacity: 0`
als eigene Trefferfläche über dem Bild. Der Click-Handler war nur am
`img` registriert. Ein Klick auf die Beschriftung erreichte das Bild nicht.

Vor der Änderung wurde in Chrome mit 390 × 844 Pixeln und emuliertem Touch
ein echter Touch auf den unteren Bereich der ersten Galeriekachel gesendet:
`elementFromPoint` lieferte die Beschriftung mit `pointer-events: auto`,
und die Lightbox blieb nach dem ersten Tippen geschlossen.

## Änderung

- Jede Kachel ist ein natives `button` mit `type="button"` und Dialogbezug.
  Ein Click-Handler auf der ganzen Kachel öffnet das Foto.
- Die dekorative Beschriftung verwendet `pointer-events: none`.
- Hover-Effekte gelten nur für Geräte mit Hover und feinem Zeiger.
  Auf Touch-Geräten sind die Bildunterschriften dauerhaft sichtbar.
- Es gibt keine zusätzlichen `touchstart`- oder `touchend`-Handler an der
  Galerie. Scrollen und native Button-Aktivierung bleiben beim Browser.
- Die vorhandene Pagination bleibt mit einer expliziten Hidden-Regel wirksam.
  Enter und Leertaste funktionieren über den nativen Button; die Lightbox
  gibt den Fokus beim Schließen dorthin zurück.

CSS-Grundlagen: [Pointer-Ereignisse](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/pointer-events)
und [Hover-Erkennung](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/hover).

## Prüfung nach der Änderung

In Chrome mit Touch-Emulation öffnet der erste Tap im Beschriftungsbereich
bei mehreren Kacheln jeweils genau einmal die richtige Aufnahme. Auch das
neue Badfoto nach „Mehr anzeigen“ öffnet sofort. Vertikales Scrollen öffnet
keine Aufnahme; beim Schließen wird die Scrollsperre aufgehoben.

Native Tastatureingaben für Enter und Leertaste öffnen die Galerie; Escape
schließt sie und gibt den Fokus an die auslösende Kachel zurück. Geprüft
wurden Browser-Emulation und Tastatureingaben, kein physisches iPhone.
