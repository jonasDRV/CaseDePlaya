# Design: Image & Gallery Performance Optimization

**Datum:** 2026-04-21
**Projekt:** casa-chocaya.com (statisches GitHub-Pages-Projekt, Vanilla HTML/CSS/JS)
**Autor:** jonasDRV + Claude

## Problem

Der One-Pager lädt langsam, vor allem auf schwachem Netz und älteren Geräten. Besonders spürbar: starkes Ruckeln in der Galerie, wenn alle Fotos gleichzeitig erscheinen. Ursachen laut Code-Analyse:

- 30 Foto-WebPs, mehrere davon 300-500 KB (z. B. `LobbyAbajo.webp` 479 KB, `Playa2.webp` 387 KB).
- Kein `srcset`, kein AVIF — Mobile lädt dieselben großen Bilder wie Desktop.
- Fehlende `width`/`height` und `decoding="async"` → Layout-Shift bei jedem dekodierten Bild.
- Galerie rendert alle ~30 Bilder im DOM; zusätzlich läuft die `reveal`-Animation (IntersectionObserver, `transform`/`opacity`) auf jedem Galerie-Item → Decode + Animation + Reflow gleichzeitig.

## Ziel

Ladezeit auf Mobile deutlich reduzieren, Galerie-Ruckeln beseitigen, Core-Web-Vitals verbessern — ohne Build-Step, ohne neue Dependencies, ohne Architektur- oder Designänderung.

## Nicht-Ziele

- Kein npm/Node-Build-Pipeline.
- Kein externes CDN / keine DNS-Umstellung (GitHub Pages bleibt Origin).
- Keine neue JS-Library.
- Kein Redesign der Galerie-Optik oder Lightbox-Logik.
- Keine Änderung an i18n, SEO-Inhalten, Maps-Consent, Datenschutzerklärung.

## Architektur im Überblick

Drei Hebel, die zusammenwirken:

1. **Bildpipeline (einmalig, manuell erledigt am 2026-04-21):** Alle 30 Foto-WebPs via XnConvert in 2 Größen × 2 Formate exportiert → 120 neue Dateien im `images/`-Ordner.
2. **HTML: `<picture>` + `srcset` + `sizes`:** Browser wählt automatisch das kleinste passende Format + Größe. Rein deklarativ, kein JS.
3. **Galerie-Pagination + Reveal-Entfernung:** Initial 9 Bilder sichtbar, „Mehr anzeigen"-Button zeigt Rest in 9er-Batches. `reveal`-Klasse wird von Galerie-Items entfernt.

## Komponenten & Datenfluss

### Bildpipeline (abgeschlossen)

Für jedes der 30 Foto-WebPs existieren nun:

```
<name>-800.avif   (~30-60 KB)   Mobile, modern
<name>-800.webp   (~50-90 KB)   Mobile, Fallback
<name>-1600.avif  (~80-130 KB)  Desktop, modern
<name>-1600.webp  (~120-180 KB) Desktop, Fallback
```

Originale (`<name>.webp` ohne Suffix) bleiben als Master-Backup im Repo.
SVG-Icons und `LogoChocaya.png` bleiben unverändert.

### HTML — `<picture>`-Pattern

Jedes Foto-`<img>` wird transformiert zu:

```html
<picture>
  <source type="image/avif"
          srcset="images/<name>-800.avif 800w, images/<name>-1600.avif 1600w"
          sizes="(max-width: 768px) 100vw, 50vw">
  <source type="image/webp"
          srcset="images/<name>-800.webp 800w, images/<name>-1600.webp 1600w"
          sizes="(max-width: 768px) 100vw, 50vw">
  <img src="images/<name>-1600.webp"
       alt="…"
       loading="lazy"
       decoding="async">
</picture>
```

**Umfang:** **40** `<img>`-Tags werden umgeschrieben:
- Galerie-Items: **31**
- Room-Cards: **9**
- Opiniones/FAQ/Location: keine Fotos

**Unangetastet:** SVG-Icons (Amenities, Location-Icons), `LogoChocaya.png` (Nav-Logo), OG-Image (`<meta property="og:image">` bleibt auf stabiler Original-URL, da Facebook/WhatsApp-Preview-Crawler konservativ sind).

### Hero-Section — CSS `background-image` mit `image-set()`

Das `#hero`-Element in [style.css](../../../style.css) nutzt aktuell `background-image: url('images/ChocayaSala.webp')`. Umstellung auf `image-set()` für Format-Fallback:

```css
#hero {
  background-image:
    image-set(
      url('images/ChocayaSala-1600.avif') type('image/avif'),
      url('images/ChocayaSala-1600.webp') type('image/webp')
    );
}
@media (max-width: 768px) {
  #hero {
    background-image:
      image-set(
        url('images/ChocayaSala-800.avif') type('image/avif'),
        url('images/ChocayaSala-800.webp') type('image/webp')
      );
  }
}
```

`image-set()` ist Baseline-Web ab 2023 (Chrome 88+, Firefox 88+, Safari 17.4+). Für ältere Safari-Versionen bleibt das `url(...)`-Fallback aus dem bestehenden `#hero`-Block stehen.

Zusätzlich im `<head>` von [index.html](../../../index.html) nach dem `preconnect`-Block:

```html
<link rel="preload" as="image"
      href="images/ChocayaSala-1600.webp"
      imagesrcset="images/ChocayaSala-800.webp 800w, images/ChocayaSala-1600.webp 1600w"
      imagesizes="100vw">
```

Preload auf WebP (nicht AVIF), da der Preload-Hint browserunabhängig feuern soll und WebP der stabilere Fallback ist — Browser, die AVIF können, nutzen später via `image-set()` trotzdem die AVIF-Variante aus dem Cache oder laden AVIF parallel; der Preload eliminiert vor allem den Startup-Rendering-Block.

### CSS — Layout-Shift- und Decode-Jank-Prävention

**Gallery (CSS-`columns`-Masonry mit natürlichen Bildhöhen):** `aspect-ratio` würde die Masonry-Optik zerstören. Stattdessen `content-visibility` + `contain-intrinsic-size`, damit off-screen-Galerie-Items gar nicht erst gerendert/dekodiert werden:

```css
.gallery-item {
  content-visibility: auto;
  contain-intrinsic-size: 1px 500px;
}
.gallery-item picture {
  display: block;
  width: 100%;
}
```

**Room-Cards (fixes Grid-Layout mit Crop):** Klassische `aspect-ratio`:

```css
.room-img,
.room-card picture {
  aspect-ratio: 3/2;
  object-fit: cover;
  width: 100%;
  display: block;
}
```

Hero-Section ist CSS-`background-image` — kein `<img>`, daher nicht betroffen.

### JS — Galerie-Pagination

Neue Logik in [script.js](../../../script.js), nach dem bestehenden Lightbox-Block:

```js
const GALLERY_BATCH = 9;
const galleryItems = document.querySelectorAll('.gallery-item');
let galleryShown = GALLERY_BATCH;

galleryItems.forEach((el, i) => {
  if (i >= galleryShown) el.hidden = true;
});

const loadMoreBtn = document.getElementById('galleryLoadMore');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    for (let i = galleryShown; i < galleryShown + GALLERY_BATCH && i < galleryItems.length; i++) {
      galleryItems[i].hidden = false;
    }
    galleryShown += GALLERY_BATCH;
    if (galleryShown >= galleryItems.length) loadMoreBtn.hidden = true;
  });
}
```

**Lightbox-Pool enthält weiterhin alle 30 Bilder** (auch versteckte) — beim Swipen innerhalb der Lightbox kommt man durch die gesamte Galerie. Bilder laden on-demand, da `<picture>` + Lightbox-Logik das src-Attribut erst beim Öffnen konsumiert.

Bestehender `galleryImgs`-Array-Build muss das `<picture>`-Wrapping berücksichtigen: statt `document.querySelectorAll('.gallery-item img')` bleibt die Query identisch (der Fallback-`<img>` innerhalb von `<picture>` ist weiterhin per Selector erreichbar).

### HTML-Struktur Galerie-Button

Nach dem Galerie-Grid in [index.html](../../../index.html):

```html
<div class="gallery-more-wrap">
  <button type="button" class="btn btn-ghost" id="galleryLoadMore" data-i18n="gal.more">
    Mostrar más fotos
  </button>
</div>
```

### i18n-Keys

In [script.js](../../../script.js) im `translations`-Objekt ergänzen:
- `gal.more` (ES): „Mostrar más fotos"
- `gal.more` (EN): „Show more photos"

### Reveal-Animation

Galerie-Items haben **aktuell keine** `reveal`-Klasse (geprüft in [index.html](../../../index.html):452) — es ist also nichts zu entfernen. Reveal-Animation bleibt unverändert für Section-Titel, Amenity-Items, Location, FAQ, Opiniones. Der Decode-Jank entsteht stattdessen aus CSS-`columns`-Masonry + simultanem Bilddekodieren; das wird durch `content-visibility`, kleinere Bildvarianten und Pagination adressiert.

### Weitere Micro-Optimierungen

- Passive Touch-Listener in der Lightbox: `lightbox.addEventListener('touchstart', handler, { passive: true })` → Scroll wird nicht blockiert.
- Bestehender `preconnect` auf Google Fonts bleibt.
- Bestehende IntersectionObserver-`unobserve`-Logik nach Reveal bleibt unverändert.

### JSON-LD Konsistenz

Im `VacationRental`-Block in [index.html](../../../index.html): `"image"`-Array enthält 10 URLs, die aktuell auf Original-WebPs zeigen. Update auf `-1600.webp`-Varianten:

```json
"image": [
  "https://casa-chocaya.com/images/ChocayaDeFrente-1600.webp",
  "https://casa-chocaya.com/images/ChocayaSala-1600.webp",
  ...
]
```

Begründung: Die im HTML sichtbaren Bilder sollen mit den im Schema referenzierten Bildern übereinstimmen, damit Google-Bildersuche und Rich-Results-Indexierung konsistent sind. Originale bleiben als Datei im Repo, aber nicht mehr im Schema.

## Fehlerbehandlung

- **AVIF-Browser-Support (Safari < 16.4, iOS < 16.4):** Browser ignoriert `<source type="image/avif">` stillschweigend und fällt auf `<source type="image/webp">` zurück. Keine extra Logik nötig.
- **WebP-Browser-Support:** Alle von Casa-Chocaya-Zielgruppe nutzbaren Browser (Chrome, Safari, Firefox, Edge — alle ab 2020) unterstützen WebP. Fallback-`<img src>` zeigt trotzdem auf `-1600.webp`.
- **Wenn `-800`/`-1600`-Datei fehlt:** Browser zeigt `alt`-Text. Verifikation während der Implementierung stellt sicher, dass alle 120 Varianten existieren.
- **Layout-Shift bei nicht-3:2-Bildern:** Wird per stichprobenartiger Sichtprüfung geklärt; falls ein Motiv abweicht, bekommt dessen Container eine lokale `aspect-ratio`-Override.

## Testing / Verifikation

1. **Lokale Vorschau** via `file://` oder lokalem HTTP-Server (z. B. Python `http.server`).
2. **DevTools Network-Tab** (Mobile-Emulation, „Slow 4G"):
   - Initial unter 1 MB Gesamtbild-Payload (vorher ~5-6 MB).
   - Hero-Bild erscheint als eine der ersten Ressourcen.
   - Nur 9 Galerie-Bilder initial geladen, Rest erst nach Klick auf „Mehr anzeigen".
   - Handy-Viewport (375px) lädt `-800`-Varianten, Desktop (1920px) lädt `-1600`.
3. **DevTools Performance-Tab** während Scroll durch Galerie:
   - Keine langen Main-Thread-Blöcke durch Decode (< 50 ms Tasks).
   - Keine Layout-Shift-Warnings (CLS nahe 0).
4. **Lighthouse (Mobile-Profil):**
   - Performance-Score > 90.
   - LCP < 2.5 s.
   - CLS < 0.1.
   - Vergleich vor/nach dokumentieren.
5. **Rich Results Test** (search.google.com/test/rich-results): JSON-LD mit aktualisierten Bild-URLs erkennt alle 10 Bilder; keine neuen Fehler.
6. **Regressionstests:**
   - Lightbox öffnet/swiped auch durch versteckte Galerie-Bilder.
   - Sprachwechsel ES ↔ EN übersetzt „Mehr anzeigen"-Button.
   - Galerie-Button verschwindet nach dem letzten Batch.
   - Room-Card-Hover-Cycling unverändert funktional.
   - OG-Preview (WhatsApp/Facebook-Share) zeigt weiterhin das erwartete Bild.
7. **Cross-Browser:** Chrome, Firefox, Safari Desktop + iOS Safari + Android Chrome.

## Zu liefernde Dateien

| Datei | Änderungsart |
|---|---|
| [index.html](../../../index.html) | 40 `<img>` → `<picture>`, Hero-Preload-Link im `<head>`, JSON-LD-Image-URLs auf `-1600.webp`, Galerie-Button-Markup |
| [script.js](../../../script.js) | Galerie-Pagination-Logik, `gal.more` i18n-Keys (ES+EN), passive Touch-Listener in der Lightbox |
| [style.css](../../../style.css) | `#hero` auf `image-set()` umstellen + Mobile-Override, `content-visibility` für `.gallery-item`, `aspect-ratio` für Room-Card-Bilder, `.gallery-more-wrap`-Styles |

Keine neuen Dateien, keine Dependencies.

## Offene Punkte

Keine. Alle Designentscheidungen sind getroffen und vom Nutzer approved.
