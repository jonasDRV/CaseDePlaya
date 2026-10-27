# Cache-Regeln für die bestehenden GitHub Pages

Die PageSpeed-Prüfung vom 27.10.2026 meldet für eigene statische Dateien
eine Browser-Cachezeit von vier Stunden. Die HTTP-Header werden außerhalb
des Repositories verwaltet. Diese Anleitung ist vorbereitet; die Regeln
wurden nicht im Cloudflare-Konto aktiviert.

## Regel im Cloudflare-Dashboard

Unter **Caching → Cache Rules → Create rule** eine Regel für die statischen
Dateien der Hauptdomain anlegen. Benutzerdefinierter Filter:

```text
(http.host eq "casa-chocaya.com" and (
  starts_with(http.request.uri.path, "/images/") or
  starts_with(http.request.uri.path, "/fonts/") or
  http.request.uri.path in {"/style.css" "/floorplan.css" "/script.js" "/floorplan.js" "/image-metadata.js"}
))
```

- **Cache eligibility:** Eligible for cache.
- **Browser TTL:** Override origin and use 30 days.
- **Edge TTL:** Respect the origin Cache-Control settings initially; an
  edge-cache override is not needed to extend browser storage.
- Keep the default **Standard** cache key, including query strings. Do not
  use **Ignore Query String**: the CSS/JS URLs use `?v=…` for new versions.
- Do not apply this rule to HTML, robots.txt, sitemap.xml or `/cdn-cgi/`.

## Aktualisierungen und Prüfung

1. Vor dem Aktivieren müssen alle Website-Änderungen veröffentlicht sein.
2. CSS-/JS-Änderungen erhalten einen neuen Versionsparameter in allen
   HTML-Seiten, die die Datei verwenden.
3. Geänderte Bild- und Schriftdateien erhalten einen neuen Dateinamen und
   entsprechend aktualisierte Verweise. Neue 400-/600er-Vorschauen tragen
   bereits eigene URLs; bestehende Fotos wurden nicht überschrieben.
4. Die Hauptseite soll nach einem Deployment weiterhin die aktuellen
   Dateiversionen anfordern. HTML daher nicht pauschal 30 Tage speichern.
5. In den Browser-Entwicklertools oder per HTTP-Header-Prüfung für ein Foto,
   eine Schrift und versioniertes CSS `Cache-Control` kontrollieren.
   30 Tage entsprechen `max-age=2592000`. Bei einem zweiten Aufruf dürfen
   unveränderte Dateien aus dem Browser-Cache kommen.

Ein Cloudflare-Purge leert keinen bereits gefüllten Browser-Cache. Deshalb
ist die Dateiversionierung Teil der Regel, nicht nur eine optionale Ergänzung.
Der Nutzen liegt besonders bei wiederkehrenden Besuchern; die erste
Seitenladung wird dadurch nicht automatisch um die gemeldeten KiB kleiner.

Quellen: [Browser Cache TTL](https://developers.cloudflare.com/cache/how-to/edge-browser-cache-ttl/),
[Cache keys und Query Strings](https://developers.cloudflare.com/cache/how-to/set-caching-levels/).
