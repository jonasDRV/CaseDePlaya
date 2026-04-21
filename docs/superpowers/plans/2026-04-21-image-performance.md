# Image & Gallery Performance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce image payload on mobile by ~60 %, eliminate gallery decode jank, and improve Core Web Vitals — without introducing any build step, dependencies, or visual redesign.

**Architecture:** All 30 photos are already exported in 4 variants (800/1600 × AVIF/WebP, 120 new files, confirmed present). Implementation converts 40 `<img>` tags to `<picture>` blocks with `srcset`/`sizes`, switches the hero CSS `background-image` to `image-set()`, adds `<picture>`-display rules for the masonry gallery and the room-card wrapper, paginates the gallery (9 initial + "show more" button), and updates JSON-LD + preload URLs to the new `-1600.webp` variants. (Earlier drafts proposed `content-visibility: auto` on `.gallery-item` and `aspect-ratio: 3/2` on `.room-img`; both were dropped during Task 1 review — `content-visibility` interacts badly with CSS-columns masonry, and the room-card wrapper already enforces `aspect-ratio: 4/3`.)

**Tech Stack:** Static site on GitHub Pages. Vanilla HTML/CSS/JS. Manual image exports via XnConvert (already done). No npm/node/build.

**Verification model:** No unit-test harness exists. Each task is verified by (a) running the Python-based validator scripts the plan spells out, (b) opening the live file in the browser and checking specific DevTools signals, and (c) a visual smoke check.

**Reference spec:** [docs/superpowers/specs/2026-04-21-image-performance-design.md](../specs/2026-04-21-image-performance-design.md)

**Pre-work already complete:**
- 120 new image files (`<name>-800.avif|webp`, `<name>-1600.avif|webp`) exist in `images/`.
- Original `<name>.webp` files remain as master backup.
- Spec approved, committed as `575ffc9`.

---

## Task 1: CSS foundations — aspect-ratio, content-visibility, hero image-set, gallery-more-wrap styles

**Files:**
- Modify: [style.css](../../../style.css) (lines 381-392 for hero block, append new rules near gallery + room blocks)

Why first: These rules are additive and safe before any HTML changes. Once the `<picture>` blocks and the `.gallery-more-wrap` button arrive in later tasks, the styles are already in place — no intermediate broken state.

- [ ] **Step 1: Update the `#hero` block to use `image-set()` with a `url()` fallback**

Open [style.css:381-392](../../../style.css#L381-L392). Replace the single `background-image: url(...)` line with the snippet below. Keep the rest of the `#hero` block (position, height, background-size/position/attachment, flex rules) exactly as-is.

```css
#hero {
  position: relative;
  height: 100vh;
  min-height: 620px;
  background-image: url('images/ChocayaSala-1600.webp');
  background-image:
    image-set(
      url('images/ChocayaSala-1600.avif') type('image/avif'),
      url('images/ChocayaSala-1600.webp') type('image/webp')
    );
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

The `url(...)` line immediately before `image-set(...)` is the fallback for browsers that don't understand `image-set()` (very old Safari). Modern browsers use the second declaration.

- [ ] **Step 2: Add the mobile-size override inside the existing 768px media query**

Find the existing `@media (max-width: 768px)` block that already contains `#hero { background-attachment: scroll; }` (around [style.css:1305-1307](../../../style.css#L1305-L1307)). Extend that `#hero` rule to also override `background-image`:

```css
  #hero {
    background-attachment: scroll; /* iOS Safari fix */
    background-image: url('images/ChocayaSala-800.webp');
    background-image:
      image-set(
        url('images/ChocayaSala-800.avif') type('image/avif'),
        url('images/ChocayaSala-800.webp') type('image/webp')
      );
  }
```

- [ ] **Step 3: Add gallery `<picture>` display rule after the existing `.gallery-caption` rule**

Append after [style.css:675](../../../style.css#L675) (end of `.gallery-item:hover .gallery-caption` block, before the `/* LOCATION */` comment):

```css
.gallery-item picture {
  display: block;
  width: 100%;
}
```

(Earlier draft added `content-visibility: auto` + `contain-intrinsic-size` on `.gallery-item` — dropped because CSS-columns masonry recalculates column breaks from the containment placeholder, causing visible jumps on scroll. Pagination in Task 5 already hides items past 9 via `hidden`, so the decode-jank gain is minimal.)

- [ ] **Step 4: Add room-card image rules**

Find the existing `.room-img` rule in [style.css](../../../style.css) (search for `.room-img {`). Replace the existing `.room-img` block with two rules: one to make `<picture>` fill the wrapper, one to make the `<img>` (whether bare or inside `<picture>`) cover the wrapper's existing 4/3 box. Preserve pre-existing declarations (`transition`, `cursor`):

```css
.room-img-wrapper picture {
  display: block;
  width: 100%;
  height: 100%;
}

.room-img,
.room-img-wrapper picture > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
  cursor: zoom-in;
}
```

The wrapper (`.room-img-wrapper`) already has `aspect-ratio: 4 / 3` and `overflow: hidden`, so layout space is already reserved — no extra `aspect-ratio` needed. `object-fit: cover` crops the image to fill. `object-fit` only applies to replaced elements, so it targets the inner `<img>`, not `<picture>`.

- [ ] **Step 5: Add `.gallery-more-wrap` styles at the bottom of the gallery section**

Append after the `.gallery-item picture` rule added in Step 3:

```css
.gallery-more-wrap {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}
```

(Earlier draft added `.gallery-more-wrap .btn[hidden] { display: none }` — dropped because `[hidden]` is already `display:none` via the UA stylesheet; the rule was a no-op.)

- [ ] **Step 6: Visual smoke check**

Open [index.html](../../../index.html) directly in a browser (double-click the file). Expected:
- Hero background image still loads (now pointing at `ChocayaSala-1600.webp`).
- Gallery and room cards render as before (no layout change yet — HTML still uses old `<img>` tags, but new CSS rules only apply when `<picture>` arrives, except `content-visibility` which is harmless).
- DevTools → Console: no errors.

If hero image does not appear, verify `images/ChocayaSala-1600.avif` and `images/ChocayaSala-1600.webp` exist.

- [ ] **Step 7: Commit**

```bash
git add style.css
git commit -m "css: add image-set hero, picture display, cover-fit rooms

Prepare styles for the <picture>/srcset rewrite:
- Hero background uses image-set() with AVIF+WebP variants plus a
  url() fallback, with a 768px mobile override pointing at -800
  variants.
- Adds .gallery-item picture { display:block; width:100% } so the new
  wrappers fill the masonry cell.
- Changes .room-img to object-fit: cover with width/height 100% so it
  fills the existing .room-img-wrapper 4/3 aspect box (the wrapper
  already reserves space). Adds a matching rule for <img> inside
  <picture> wrappers introduced later.
- Adds .gallery-more-wrap centering for the pagination button.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 2: Update hero preload link + JSON-LD image URLs

**Files:**
- Modify: [index.html](../../../index.html) lines 52-61 (JSON-LD `image` array), line 244 (existing preload link)

Why second: Tiny, safe change. Updates referenced image URLs to `-1600.webp` variants so the hero preload matches the `image-set()` resolved URL and the schema matches what will appear in `<picture>` tags later.

- [ ] **Step 1: Update the existing hero preload link at [index.html:244](../../../index.html#L244)**

Replace:

```html
<link rel="preload" as="image" href="images/ChocayaSala.webp">
```

with (add `imagesrcset` + `imagesizes` so the browser can preload the correct size for the viewport):

```html
<link rel="preload" as="image"
      href="images/ChocayaSala-1600.webp"
      imagesrcset="images/ChocayaSala-800.webp 800w, images/ChocayaSala-1600.webp 1600w"
      imagesizes="100vw">
```

- [ ] **Step 2: Update the JSON-LD `"image"` array (lines 52-61 in [index.html](../../../index.html))**

Replace this block:

```json
      "image": [
        "https://casa-chocaya.com/images/ChocayaDeFrente.webp",
        "https://casa-chocaya.com/images/ChocayaSala.webp",
        "https://casa-chocaya.com/images/ChocallaPool.webp",
        "https://casa-chocaya.com/images/PoolyMar.webp",
        "https://casa-chocaya.com/images/Terraza.webp",
        "https://casa-chocaya.com/images/ChocayaDormitorio.webp",
        "https://casa-chocaya.com/images/CocinaComedor.webp",
        "https://casa-chocaya.com/images/Comedor.webp",
        "https://casa-chocaya.com/images/VistaFrontisBalcon.webp",
        "https://casa-chocaya.com/images/Playa.webp"
      ],
```

with:

```json
      "image": [
        "https://casa-chocaya.com/images/ChocayaDeFrente-1600.webp",
        "https://casa-chocaya.com/images/ChocayaSala-1600.webp",
        "https://casa-chocaya.com/images/ChocallaPool-1600.webp",
        "https://casa-chocaya.com/images/PoolyMar-1600.webp",
        "https://casa-chocaya.com/images/Terraza-1600.webp",
        "https://casa-chocaya.com/images/ChocayaDormitorio-1600.webp",
        "https://casa-chocaya.com/images/CocinaComedor-1600.webp",
        "https://casa-chocaya.com/images/Comedor-1600.webp",
        "https://casa-chocaya.com/images/VistaFrontisBalcon-1600.webp",
        "https://casa-chocaya.com/images/Playa-1600.webp"
      ],
```

**Do not** update the `og:image` (line 25) or `twitter:image` (line 35) — Facebook/WhatsApp crawlers cache URLs aggressively and the stable original URL keeps the preview intact.

- [ ] **Step 3: Verify the JSON-LD still parses**

Run this Python snippet in the repo root:

```bash
python -c "
import json, re
with open('index.html','r',encoding='utf-8') as f: html=f.read()
blocks = re.findall(r'<script type=\"application/ld\+json\">([\s\S]*?)</script>', html)
for i,b in enumerate(blocks):
    try:
        j = json.loads(b)
        imgs = j.get('image', [])
        print(f'Block {i+1}: OK · type={j.get(\"@type\")} · images={len(imgs)}')
    except Exception as e:
        print(f'Block {i+1}: FAIL {e}')
"
```

Expected output:
```
Block 1: OK · type=VacationRental · images=10
Block 2: OK · type=FAQPage · images=0
```

- [ ] **Step 4: Verify all 10 referenced image URLs exist on disk**

```bash
python -c "
import os
names = ['ChocayaDeFrente','ChocayaSala','ChocallaPool','PoolyMar','Terraza','ChocayaDormitorio','CocinaComedor','Comedor','VistaFrontisBalcon','Playa']
for n in names:
    p = f'images/{n}-1600.webp'
    print(('OK  ' if os.path.exists(p) else 'MISS'), p)
"
```

Expected: 10 × `OK`. If any `MISS`, re-run XnConvert for that file before continuing.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "html: point hero preload and JSON-LD images at -1600.webp variants

Update the hero preload link to use imagesrcset/imagesizes so the
browser picks the correct size, and update the 10 URLs in the
VacationRental JSON-LD image array to the new -1600.webp files. Leaves
OG/Twitter images on the original URL since social-share crawlers cache
aggressively.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 3: Rewrite 31 gallery `<img>` tags to `<picture>` blocks

**Files:**
- Modify: [index.html](../../../index.html) lines 452-575 (gallery-masonry section)

**Transformation pattern:**

Every gallery item has this shape (`<name>` = image basename, `<alt>` = existing alt text):

```html
<div class="gallery-item">
  <img src="images/<name>.webp" alt="<alt>" loading="lazy">
  <div class="gallery-caption" data-i18n="...">...</div>
</div>
```

Rewrite each to:

```html
<div class="gallery-item">
  <picture>
    <source type="image/avif" srcset="images/<name>-800.avif 800w, images/<name>-1600.avif 1600w" sizes="(max-width: 768px) 100vw, 33vw">
    <source type="image/webp" srcset="images/<name>-800.webp 800w, images/<name>-1600.webp 1600w" sizes="(max-width: 768px) 100vw, 33vw">
    <img src="images/<name>-1600.webp" alt="<alt>" loading="lazy" decoding="async">
  </picture>
  <div class="gallery-caption" data-i18n="...">...</div>
</div>
```

Notes:
- `sizes="(max-width: 768px) 100vw, 33vw"` reflects the masonry: 3 columns on desktop (1/3 viewport each), 2 columns on tablet/mobile (but the breakpoint boundary at 768px uses `100vw` as a safe over-estimate; the browser still picks 800w on mobile viewports).
- `decoding="async"` on the fallback `<img>` tells the browser to decode off the main thread.
- Keep `loading="lazy"`.
- Do **not** change the `alt` text, the `<div class="gallery-caption">` line, or the `data-i18n` attributes.

**The 31 gallery image basenames, in file order:**

| Line | `<name>` |
|---:|---|
| 453 | ChocayaSala |
| 457 | ChocallaPool |
| 461 | ChocayaDeFrente |
| 465 | ChocayaDeAtras |
| 469 | CasaDeAtras |
| 473 | Terraza |
| 477 | ChocayaWohnzimmer2 |
| 481 | Wohnzimmer |
| 485 | LobbyAbajo |
| 489 | LobbyAbajo2 |
| 493 | Comedor |
| 497 | ChocayaCocina |
| 501 | CocinaDeNoche |
| 505 | ChocayaDormitorio |
| 509 | Dormitorio2 |
| 513 | Dormitorio3 |
| 517 | Dormitorio4 |
| 521 | ChocayaBanoAbajo |
| 525 | ChocayaBano2 |
| 529 | Bano3 |
| 533 | Bano4 |
| 537 | ChocayaCarPort |
| 541 | VistaFrontisBalcon |
| 545 | VistaParque |
| 549 | Playa |
| 553 | Playa2 |
| 557 | PoolyMar |
| 561 | PoolyVista |
| 565 | poolyvistafrontis |
| 569 | CocinaComedor |
| 573 | figura |

Note: line numbers will drift as edits are applied. Use the basename as the anchor, not the line number.

- [ ] **Step 1: Rewrite each of the 31 gallery `<img>` tags to `<picture>`**

Concrete worked example for the first item (`ChocayaSala`):

**Before** (around line 452):

```html
<div class="gallery-item">
  <img src="images/ChocayaSala.webp" alt="Sala de estar Casa Chocaya – casa de playa en Chocaya, Asia, Lima" loading="lazy">
  <div class="gallery-caption" data-i18n="cap.sala">Sala de estar</div>
</div>
```

**After:**

```html
<div class="gallery-item">
  <picture>
    <source type="image/avif" srcset="images/ChocayaSala-800.avif 800w, images/ChocayaSala-1600.avif 1600w" sizes="(max-width: 768px) 100vw, 33vw">
    <source type="image/webp" srcset="images/ChocayaSala-800.webp 800w, images/ChocayaSala-1600.webp 1600w" sizes="(max-width: 768px) 100vw, 33vw">
    <img src="images/ChocayaSala-1600.webp" alt="Sala de estar Casa Chocaya – casa de playa en Chocaya, Asia, Lima" loading="lazy" decoding="async">
  </picture>
  <div class="gallery-caption" data-i18n="cap.sala">Sala de estar</div>
</div>
```

Apply the same transformation to the remaining 30 items in the table above. For each one, use an `Edit` that matches the exact old `<img src="images/<name>.webp" alt="..." loading="lazy">` line as `old_string` (unique per image because `<name>` and `alt` differ); the surrounding `<div class="gallery-item">` opener typically is not required for uniqueness but can be added if an `Edit` returns "not unique".

Do the edits sequentially. Do not attempt a global regex replace — the `alt` texts are non-uniform and escaping them reliably across 31 items is more error-prone than 31 focused edits.

- [ ] **Step 2: Verify count of `<picture>` blocks in gallery-masonry**

```bash
python -c "
import re
with open('index.html','r',encoding='utf-8') as f: html=f.read()
gal = re.search(r'<div class=\"gallery-masonry\">([\s\S]*?)</div>\s*</div>\s*</section>', html)
if not gal:
    # Looser fallback: find the gallery block by its class
    gal = re.search(r'<div class=\"gallery-masonry\">([\s\S]*?)<!--', html)
section = gal.group(1) if gal else html
pic = len(re.findall(r'<picture>', section))
old = len(re.findall(r'<img src=\"images/[A-Za-z0-9]+\\.webp\"', section))
print(f'pictures={pic}  old-img-tags={old}')
"
```

Expected: `pictures=31  old-img-tags=0`. If `old-img-tags` > 0, some `<img>` tags are still unrewritten.

- [ ] **Step 3: Verify every referenced `-800`/`-1600` variant exists on disk**

```bash
python -c "
import re, os
with open('index.html','r',encoding='utf-8') as f: html=f.read()
refs = sorted(set(re.findall(r'images/([A-Za-z0-9]+-(?:800|1600)\\.(?:avif|webp))', html)))
missing = [r for r in refs if not os.path.exists('images/'+r)]
print(f'{len(refs)} referenced, {len(missing)} missing')
for m in missing: print('  MISS', m)
"
```

Expected: `0 missing`.

- [ ] **Step 4: Browser smoke check**

Open [index.html](../../../index.html) in the browser. Scroll to the gallery. Expected:
- All 31 images visible (pagination comes in Task 5; for now, gallery displays everything as before).
- DevTools → Network: images load from `-800.*` on a mobile-emulated viewport, `-1600.*` on desktop.
- DevTools → Console: no errors.
- Lightbox still opens on click and swipes through all images.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "html: convert 31 gallery <img> tags to <picture>/srcset

Serves AVIF with WebP fallback and two size variants (800w/1600w) so
mobile viewports pull ~80-150 KB per image instead of 300-400 KB.
Adds decoding=\"async\" on the fallback <img>.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 4: Rewrite 9 room-card `<img>` tags to `<picture>` blocks

**Files:**
- Modify: [index.html](../../../index.html) lines 593-820 (room-card section)

**Transformation pattern:**

Each room-card has this shape:

```html
<div class="room-card" data-images='["images/<name>.webp"]'>
  <div class="room-img-wrapper">
    <img src="images/<name>.webp" alt="<short alt>" class="room-img" loading="lazy">
  </div>
  ...
</div>
```

**Important:** the `data-images` JSON attribute on `.room-card` is consumed by the per-card image-cycling JS. Do **not** change the `data-images` value — JS still uses the old URL to cycle through alternates. Only rewrite the `<img>` inside `<div class="room-img-wrapper">`.

Rewrite each `<img>` to:

```html
<picture>
  <source type="image/avif" srcset="images/<name>-800.avif 800w, images/<name>-1600.avif 1600w" sizes="(max-width: 768px) 100vw, 50vw">
  <source type="image/webp" srcset="images/<name>-800.webp 800w, images/<name>-1600.webp 1600w" sizes="(max-width: 768px) 100vw, 50vw">
  <img src="images/<name>-1600.webp" alt="<short alt>" class="room-img" loading="lazy" decoding="async">
</picture>
```

Note: `sizes="(max-width: 768px) 100vw, 50vw"` because room cards take roughly half the viewport on desktop layout. The `class="room-img"` stays on the inner `<img>` so existing CSS and the card-cycling JS selector still work.

- [ ] **Step 1: Verify current room-card image list**

```bash
python -c "
import re
with open('index.html','r',encoding='utf-8') as f: html=f.read()
for m in re.finditer(r'<img src=\"images/([A-Za-z0-9]+)\\.webp\"[^>]*class=\"room-img\"', html):
    print(m.group(1))
"
```

Expected 9 basenames. Record them — these are the `<name>` values for Step 2.

- [ ] **Step 2: Rewrite each of the 9 room-card `<img>` tags**

Work through the list in file order. Per image: Edit the line `<img src="images/<name>.webp" alt="<alt>" class="room-img" loading="lazy">` (wrapped in enough surrounding context — typically the `<div class="room-img-wrapper">` opener makes it unique) to the `<picture>` block above.

Do **not** touch any `<div class="room-card" data-images='...'>` attribute.

- [ ] **Step 3: Verify no room-card `<img>` still points at a non-suffixed `.webp`**

```bash
python -c "
import re
with open('index.html','r',encoding='utf-8') as f: html=f.read()
old = re.findall(r'<img src=\"images/[A-Za-z0-9]+\\.webp\"[^>]*class=\"room-img\"', html)
new = re.findall(r'<img src=\"images/[A-Za-z0-9]+-1600\\.webp\"[^>]*class=\"room-img\"', html)
print(f'old-style remaining: {len(old) - len(new)}   new-style: {len(new)}')
"
```

Expected: `old-style remaining: 0   new-style: 9`.

- [ ] **Step 4: Browser smoke check**

Reload [index.html](../../../index.html). Scroll to Distribución. Expected:
- All 9 room cards render with the correct image.
- Hovering a card still cycles through the `data-images` alternates (old URLs still work — files remain as backup).
- Lightbox still opens from room cards.
- Layout does not shift (`.room-img-wrapper` already reserves the 4/3 box; the inner `<img>`/`<picture>` fills it via `object-fit: cover`).

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "html: convert 9 room-card <img> tags to <picture>/srcset

Same AVIF+WebP/800w+1600w pattern as the gallery. Leaves the room-card
data-images JSON attribute untouched since the cycling JS still reads
the original URLs (which remain as master files on disk).

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 5: Gallery "Show more" button — markup, i18n, and pagination JS

**Files:**
- Modify: [index.html](../../../index.html) immediately after the gallery-masonry closing `</div>`
- Modify: [script.js](../../../script.js) — add two i18n keys, add pagination logic at the end of the file

- [ ] **Step 1: Add the button markup after the gallery-masonry**

Find the closing `</div>` of `<div class="gallery-masonry">` in [index.html](../../../index.html) (it's followed by the gallery section's closing `</div></section>`). Insert a new wrapper **between** the `gallery-masonry` closing `</div>` and the next closing tag:

```html
        </div>
        <div class="gallery-more-wrap">
          <button type="button" class="btn btn-ghost" id="galleryLoadMore" data-i18n="gal.more">
            Mostrar más fotos
          </button>
        </div>
```

If the existing `.btn-ghost` class does not exist in the codebase, use plain `class="btn"`. (Grep to confirm before editing.)

- [ ] **Step 2: Add the two `gal.more` i18n keys**

In [script.js](../../../script.js), locate the `translations.es` object and add:

```js
    'gal.more':      'Mostrar más fotos',
```

adjacent to the other `gal.*` keys (e.g., `gal.title`, `gal.sub`).

Locate `translations.en` and add:

```js
    'gal.more':      'Show more photos',
```

adjacent to the other `gal.*` keys.

- [ ] **Step 3: Add gallery pagination logic at the end of [script.js](../../../script.js)**

Append this block after the last existing JS block (after the lightbox touch handlers). Do not place it earlier — it depends on the DOM being parsed and the markup from Step 1 being present.

```js
/* ============================================================
   GALLERY PAGINATION — initial 9, "load more" shows next 9
   ============================================================ */
const GALLERY_BATCH = 9;
const galleryItemsForPagination = document.querySelectorAll('.gallery-item');
let galleryShown = GALLERY_BATCH;

galleryItemsForPagination.forEach((el, i) => {
  if (i >= galleryShown) el.hidden = true;
});

const galleryLoadMoreBtn = document.getElementById('galleryLoadMore');
if (galleryLoadMoreBtn) {
  if (galleryItemsForPagination.length <= GALLERY_BATCH) {
    galleryLoadMoreBtn.hidden = true;
  }
  galleryLoadMoreBtn.addEventListener('click', () => {
    const end = Math.min(galleryShown + GALLERY_BATCH, galleryItemsForPagination.length);
    for (let i = galleryShown; i < end; i++) {
      galleryItemsForPagination[i].hidden = false;
    }
    galleryShown = end;
    if (galleryShown >= galleryItemsForPagination.length) {
      galleryLoadMoreBtn.hidden = true;
    }
  });
}
```

**Note on the lightbox:** The existing lightbox code builds its pool from `document.querySelectorAll('.gallery-item img')` and `img.src`. That selector still matches the fallback `<img>` inside each `<picture>`, so hidden items still contribute to the lightbox pool — swiping in the lightbox goes through all 30 even when only 9 are visible. No change needed there.

- [ ] **Step 4: Browser smoke check**

Reload [index.html](../../../index.html). Scroll to the gallery. Expected:
- Only 9 images visible; the rest are hidden.
- "Mostrar más fotos" button appears below the grid.
- Click → next 9 appear → click → next 9 → button disappears when all 31 are visible.
- Click on any image (visible or hidden-then-revealed) opens the lightbox. Swipe in lightbox cycles through all 31 images.
- Language toggle → button text switches to "Show more photos".

- [ ] **Step 5: Commit**

```bash
git add index.html script.js
git commit -m "feat(gallery): paginate with show-more button (9 initial + 9 per click)

Renders only the first 9 gallery-items on load and reveals the rest on
demand. Adds ES/EN i18n keys for the button label. Lightbox pool still
includes all 31 images so swipe navigation works across hidden items.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 6: Final end-to-end verification

**Files:** none (verification only)

- [ ] **Step 1: Image reference audit — every `<picture>` has all 4 variants on disk**

```bash
python -c "
import re, os
with open('index.html','r',encoding='utf-8') as f: html=f.read()
refs = sorted(set(re.findall(r'images/([A-Za-z0-9]+(?:-(?:800|1600))?\\.(?:avif|webp))', html)))
missing = [r for r in refs if not os.path.exists('images/'+r)]
print(f'{len(refs)} unique image refs, {len(missing)} missing')
for m in missing: print('  MISS', m)
"
```

Expected: `0 missing`.

- [ ] **Step 2: Count invariants — 40 `<picture>` blocks, zero unconverted foto `<img>` in gallery/rooms**

```bash
python -c "
import re
with open('index.html','r',encoding='utf-8') as f: html=f.read()
pic = len(re.findall(r'<picture>', html))
# old-style <img> pointing at unsuffixed photo webp (ignoring SVG icons and logo)
old = re.findall(r'<img[^>]+src=\"images/(?!LogoChocaya|[a-z-]+-svgrepo)[A-Za-z0-9]+\\.webp\"', html)
print(f'<picture> blocks: {pic}  unconverted photo <img>: {len(old)}')
for m in old[:10]: print('  leftover:', m[:120])
"
```

Expected: `<picture> blocks: 40  unconverted photo <img>: 0`.

- [ ] **Step 3: JSON-LD still parses and references -1600.webp variants**

```bash
python -c "
import json, re
with open('index.html','r',encoding='utf-8') as f: html=f.read()
blocks = re.findall(r'<script type=\"application/ld\+json\">([\s\S]*?)</script>', html)
j = json.loads(blocks[0])
imgs = j.get('image', [])
bad = [u for u in imgs if not u.endswith('-1600.webp')]
print(f'VacationRental images: {len(imgs)}  non-1600-webp: {len(bad)}')
for b in bad: print('  bad:', b)
json.loads(blocks[1])  # FAQPage still parses
print('FAQPage: OK')
"
```

Expected:
```
VacationRental images: 10  non-1600-webp: 0
FAQPage: OK
```

- [ ] **Step 4: Browser — Network panel, Mobile-emulated, Slow 4G**

Open [index.html](../../../index.html) in Chrome. DevTools → Toggle device toolbar → iPhone 12 (or similar 390 px viewport) → Network tab → Throttling "Slow 4G" → hard reload (Ctrl+Shift+R).

Expected:
- First 10 network entries include `ChocayaSala-800.avif` (or `.webp` if Firefox).
- No image with basename ending `.webp` without a `-800` / `-1600` suffix (except LogoChocaya.png and SVGs).
- Initial image payload (sum of image bytes before scroll) well below 1 MB. Record the number.
- LCP indicator in Performance panel < 2.5 s.

- [ ] **Step 5: Browser — Gallery scroll + pagination**

Still in mobile emulation, scroll to the gallery. Expected:
- Exactly 9 gallery items visible.
- "Mostrar más fotos" button present.
- Scrolling through the gallery does not produce dropped frames (Performance panel shows no long main-thread tasks > 50 ms during scroll).
- Tap the button → 9 more appear → tap again → all 31 visible → button hides.

- [ ] **Step 6: Browser — Lightbox navigation through hidden items**

With only 9 gallery items visible, tap the first image → lightbox opens → swipe left 15 times. Expected: reaches an image that was originally hidden (e.g., `figura` or `CocinaComedor`). The image loads on-demand.

- [ ] **Step 7: Browser — Language toggle sweeps the new key**

Switch ES ↔ EN via the existing language selector. Expected: the "Mostrar más fotos" button flips to "Show more photos" and back.

- [ ] **Step 8: Lighthouse audit**

DevTools → Lighthouse → Mobile → Performance + SEO + Best Practices → run. Expected:
- Performance score ≥ 90 (was typically 60-75 before).
- LCP < 2.5 s.
- CLS < 0.1.
- No "properly size images" or "serve images in next-gen formats" warnings.

If Performance < 85, inspect the Lighthouse report's top opportunities before declaring done.

- [ ] **Step 9: External validators**

Deploy to GitHub Pages (push to `main`) and wait ~1 min for the deploy. Then:
1. [Google Rich Results Test](https://search.google.com/test/rich-results) with `https://casa-chocaya.com/` → expect VacationRental + FAQPage both detected, 0 errors, 10 images recognized.
2. [Schema.org Validator](https://validator.schema.org/) → expect no warnings.
3. WhatsApp-share `https://casa-chocaya.com/` → expect the OG preview image still appears (was not migrated intentionally).

- [ ] **Step 10: Final commit (if Task 6 discovered fixups)**

If any verification step surfaced a bug, commit the fix separately. If everything passed, Task 6 requires no commit.

---

## Rollback notes

Every task is one commit. To roll back the entire feature:

```bash
git log --oneline docs/superpowers/plans/2026-04-21-image-performance.md..HEAD
git revert <commit-hash-range>
```

Originals (`<name>.webp` without suffix) remain on disk throughout the plan — a revert of the HTML changes is sufficient to restore the previous behavior without restoring any files.
