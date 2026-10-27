# Local web fonts

These are unchanged Latin-subset WOFF2 files of the fonts previously loaded
through Google Fonts. The website serves them from its own domain. Their
SIL Open Font License texts are included alongside the files.

- Cormorant Garamond: normal 300/400/600 and italic 300/400.
- Jost: normal 300/400/500.
- Downloaded on 2026-10-27 using the same Google Fonts CSS request as before:
  `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap`
- License sources: [Cormorant Garamond](https://github.com/google/fonts/blob/main/ofl/cormorantgaramond/OFL.txt)
  and [Jost](https://github.com/google/fonts/blob/main/ofl/jost/OFL.txt).

The same variable font file is shared by the original CSS declarations for
several weights. Only the upright heading and body fonts are preloaded;
italic is loaded on demand. `font-display: swap` keeps text visible while
fonts load. The original font families, styles and weights are preserved.

When replacing a font binary, use a new filename, then update `style.css` and
the HTML preload links. This permits long browser cache lifetimes without
showing an outdated font to returning visitors.
