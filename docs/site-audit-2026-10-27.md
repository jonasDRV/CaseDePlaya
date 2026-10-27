# Website-Prüfung vom 27.10.2026

Geprüft wurden die aktive Website, alle drei HTML-Seiten, CSS und JavaScript,
Grundriss, Bildkatalog, Sitemap, robots.txt sowie die öffentlichen HTTP-Antworten.
Die Codekorrekturen sind lokal vorbereitet; die Live-Prüfung beschreibt den
vorher veröffentlichten Stand. Es wurde noch nichts committet oder gepusht.

## Inhalt und Raumzuordnung

Die bestätigte Zuordnung bleibt unverändert:

| Raum | Etage | Bad |
| --- | --- | --- |
| Schlafzimmer 1 | Obergeschoss / Segundo piso | Privat, nur durch das Schlafzimmer |
| Schlafzimmer 2 | Erdgeschoss / Planta baja | Privat, nur durch das Schlafzimmer |
| Schlafzimmer 3 | Erdgeschoss / Planta baja | Mit Schlafzimmer 4 geteilt |
| Schlafzimmer 4 | Erdgeschoss / Planta baja | Mit Schlafzimmer 3 geteilt |

Fotos und Nummern stimmen in Galerie, Karten und Grundriss überein. Bereinigt
wurden abweichende Bezeichnungen wie „Dormitorio principal“ statt „Dormitorio 1“,
„Lobby“ statt Lounge im Erdgeschoss und „Terrasse“ statt Meerblick-Balkon.
Der hintere Balkon ist nun eindeutig als solcher mit Parkblick bezeichnet.
Die Beschreibung zählt zwei Balkone, Patio und Dachterrasse; die unbelegte
Behauptung „zwei Terrassen“ entfällt. Für die Dachterrasse wird in Englisch
„Rooftop“ verwendet, damit „First/Third floor“ nicht anders interpretiert wird.
Die alte Hängematten-Angabe wurde durch die vom Eigentümer genannten
Sonnenliegen ersetzt. Eine nicht bestätigte Aussage über ruhiges Meer entfällt.

Der Eigentümer bestätigte den Richtwert ab USD 100 pro Nacht und die ungefähren
Koordinaten `-12.742939, -76.632833`. Auf nachträglichen Wunsch bleibt der Preis
nur im bisherigen `Offer`-Markup; sichtbarer Preistext, Preis-FAQ und
Preisangaben in den Vorschau-Beschreibungen wurden wieder entfernt. Die
Koordinaten sind in strukturierten Daten, Kartenlink und eingebettetem
Kartenausschnitt angeglichen. Ein Google-Maps-Business-Profil ist nicht vorhanden.

Der bereits im Impressum veröffentlichte E-Mail-Kontakt
`info@casa-chocaya.com` ist jetzt zusätzlich im Anfragebereich und in den
Reservierungsinformationen erreichbar.

## Technische SEO-Korrekturen

- Seitentitel und Beschreibungen sind fokussierter und werden einschließlich
  Open Graph/Twitter beim Sprachwechsel konsistent aktualisiert.
- Die veraltete Keyword-Metaliste wurde entfernt.
- Die drei Hreflang-Verweise auf exakt dieselbe URL wurden entfernt. Die
  Website hat weiterhin einen spanischen, indexierbaren Hauptpfad; die
  englische Übersetzung ist eine clientseitige Ansicht.
- Canonical, indexierbare Hauptseite, große Bildvorschauen, Favicon und die
  Bilder-Sitemap bleiben erhalten. Die Sitemap enthält 36 aktive Fotomotive.
- Das Business-Markup enthält die bestätigten Hausdaten und den Kontakt.
  `numberOfRooms: 4` wurde entfernt: Bestätigt sind vier Schlafzimmer, nicht
  insgesamt vier Räume. `numberOfBedrooms: 4` bleibt erhalten.
- Das bisherige `Offer` mit USD 100 pro Nacht wurde auf ausdrücklichen Wunsch
  wiederhergestellt. Der Betrag wird auf der Seite nicht sichtbar angezeigt.
  Das entspricht nicht Googles Empfehlung, nur sichtbare Inhalte auszuzeichnen,
  und ist daher keine empfohlene Konfiguration für Rich Results.
  [Google-Richtlinie](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- Eigenbewertungen im `review`-/`aggregateRating`-Markup wurden entfernt.
  Die sichtbaren Kundenstimmen bleiben erhalten; ihre Echtheit wurde bei
  dieser technischen Prüfung nicht unabhängig verifiziert. Google erlaubt
  selbst kontrollierte LocalBusiness-/Organization-Bewertungen nicht als
  Grundlage für Bewertungssterne. [Google-Richtlinie](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
- Die FAQs bleiben als normale HTML-Inhalte bestehen. Das doppelte
  FAQPage-JSON-LD wurde entfernt: Google hat die FAQ-Rich-Results zum
  7. Mai 2026 eingestellt. [Google-Änderungsprotokoll](https://developers.google.com/search/updates)
- robots.txt blockiert die Rechtstexte nicht mehr. Deren `noindex`-Metatag
  bleibt erhalten und kann nun beim Crawlen gelesen werden.
  [Google zu noindex und Crawling](https://developers.google.com/search/docs/crawling-indexing/block-indexing)

`_config.yml` schließt `archive`, `docs` und `.claude` beim üblichen
GitHub-Pages-/Jekyll-Build aus. Das Archiv bleibt im Git-Repository erhalten,
gehört aber nicht mehr zum veröffentlichten Website-Verzeichnis. Rund
14,1 MB Archivdateien entfallen dadurch aus dem Build. Das ist keine
Ersparnis von 14 MB pro Seitenbesuch: Die Archivbilder wurden ohnehin nicht
von der Hauptseite geladen. [GitHub-Pages-Konfiguration](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll)

## Auffindbarkeit in KI-Suchen

Wichtige Fakten stehen bereits im ursprünglichen HTML: Ort, Hausaufteilung,
Kapazität, Ausstattung, Kontakt und FAQs. Diese Inhalte sind auch ohne
JavaScript lesbar. Bilder haben beschreibende Alttexte; die strukturierten
Daten verwenden die bestätigte Schlafzimmerzahl. Der ausschließlich im
`Offer` hinterlegte Preis ist eine ausdrücklich gewünschte Ausnahme von der
Empfehlung, nur sichtbare Inhalte auszuzeichnen.

Es wurde kein `llms.txt` oder besonderes „KI-Schema“ ergänzt. Google nennt
für AI Overviews und AI Mode keine solchen zusätzlichen Voraussetzungen;
entscheidend bleiben Crawling, indexierbare Seiten, nachvollziehbarer Text
und passende strukturierte Daten. Das garantiert keine Erwähnung in einem
KI-Ergebnis. [Google zu KI-Suchfunktionen](https://developers.google.com/search/docs/appearance/ai-features)

Die tatsächliche Google-Indexierung und ausgewählte Canonical-URL müssen
nach Veröffentlichung in Search Console geprüft werden. Zugriff auf das
Search-Console-Konto und Cloudflare-Botregeln bestand bei dieser Prüfung
nicht. Aus allgemeinem `Allow: /` lässt sich nicht ableiten, dass jeder
Crawler auch jede CDN-/Firewall-Prüfung passiert.

## Performance und Bedienung

- Der Grundriss setzt beim Neuzeichnen das ausgewählte Foto nur einmal.
  Zuvor wurde zunächst Foto 0 gesetzt und danach das zuvor ausgewählte Foto
  nochmals eingetragen. Der Sprachwechsel erhält weiterhin Raum und Foto.
- Nicht verfügbare oder gesperrte localStorage-Zugriffe brechen die Seite
  nicht mehr ab. Ungültige gespeicherte Sprachen fallen sicher auf Spanisch zurück.
- Reveal-Animationen verstecken Inhalte erst nach erfolgreicher
  JavaScript-Initialisierung. Ohne JavaScript oder IntersectionObserver
  bleibt der Inhalt direkt sichtbar.
- Raumkarten öffnen ihre Bilder über native Buttons. Enter und Leertaste
  funktionieren; Bildindikatoren fangen keine Klicks mehr ab. Auf Geräten
  ohne Hover bleiben die Fotopfeile sichtbar. Die Maus-Effekte bleiben erhalten.
- Ein leerer `src` am geschlossenen Lightbox-Bild wurde entfernt.
- Neun nicht mehr verwendete Übersetzungsschlüssel wurden pro Sprache entfernt.
- Responsive AVIF/WebP-Dateien, Lazy Loading, Bildabmessungen und die jeweils
  passende Hero-Vorabladung bleiben erhalten. Großformatige Quelldateien
  werden nicht allein durch ihre Existenz im Repository im Browser geladen.
- Das unveränderte Header-Logo erhält zusätzliche PNG-Größen mit 256 und
  512 Pixeln. Der Browser wählt passend zur 135-Pixel-Darstellung und
  Pixeldichte; das Original mit 1000 Pixeln bleibt für hohe Dichten verfügbar.
  Dies reduziert die tatsächlich geladene Logo-Datei auf üblichen Bildschirmen,
  ohne Position, Größe, Weißfilter oder Motiv zu ändern.
  Dateigrößen: 8.094 / 23.823 statt 103.503 Byte. Im Browser wurden bei
  Pixeldichte 1, 2 und 4 jeweils die Varianten 256, 512 und 1000 gewählt.

Das Haupt-HTML wurde gegenüber dem Ausgangsstand um 3.900 Byte kleiner;
JavaScript erhielt etwa 1,3 KB für Robustheit und Metadatenabgleich hinzu.
Einzelne Code- und Markup-Einsparungen ersetzen keine Messung echter Ladezeiten.
Es wurden weder Lighthouse-Scores noch Verbesserungen realer Core Web Vitals
behauptet. Für diese Bewertung sind PageSpeed/CrUX und Search Console nach
dem Deployment die geeigneten nächsten Messstellen.

## Live-Befunde und noch nötige Einstellungen

| Öffentliche Adresse | Ergebnis der Live-Prüfung |
| --- | --- |
| `https://casa-chocaya.com/` | HTTP 200, kein X-Robots-Tag mit noindex |
| `/robots.txt` | HTTP 200, text/plain |
| `/sitemap.xml` | HTTP 200, gültiges XML |
| `/images/favicon-192.png` | HTTP 200, image/png |
| `http://casa-chocaya.com/` | HTTP 200; keine Weiterleitung auf HTTPS |
| `https://www.casa-chocaya.com/` | Chrome meldet `net::ERR_CERT_COMMON_NAME_INVALID` |

Der öffentliche Server meldet Cloudflare. Dort sollte die HTTPS-Weiterleitung
am Rand aktiviert werden; außerdem DNS, Zertifikat und gewünschte
Weiterleitung von `www` auf die Hauptadresse prüfen. Eine Weiterleitung im
JavaScript wäre dafür kein gleichwertiger Ersatz. Änderungen an Cloudflare-
oder GitHub-Kontoeinstellungen wurden nicht vorgenommen.
[Cloudflare: Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/),
[GitHub: Enforce HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)

Für eigenständige englische Suchergebnisse wäre ein eigener, statisch
ausgelieferter Pfad wie `/en/` mit vollständigem englischem HTML, eigener
Canonical-URL und gegenseitigem Hreflang sinnvoll. Dieser zusätzliche
Veröffentlichungs-/Übersetzungsprozess wurde nicht ohne Weiteres in die
bisherige Ein-Datei-Website eingebaut.

Die Rechtstexte brauchen eine eigene fachliche Aktualisierung: Sie enthalten
noch TMG-Verweise, Aussagen zur privaten/nicht kommerziellen Nutzung und
einen Link zur früheren EU-ODR-Plattform. Diese Plattform ist seit
20. Juli 2025 geschlossen. Die technische Prüfung bestätigt keine rechtliche
Vollständigkeit dieser Texte. [Europäische Kommission](https://consumer-redress.ec.europa.eu/site-relocation_en)

## Nachweise der lokalen Prüfung

Die folgenden Zahlen dokumentieren die ursprüngliche Audit-Prüfung vor den
anschließenden Anpassungen an Balkonfotos, E-Mail und Preisdarstellung.

- 323 bestandene Funktionsprüfungen auf Desktop und 324 auf Mobilbreite:
  Raumzuordnung, Fotowechsel, Vergrößerung, Sprachen, Abmessungen und
  sämtliche 144 aktiven AVIF-/WebP-Varianten.
- 14 zusätzliche bestandene Prüfungen: Schema und Koordinaten, Metadaten,
  Richtpreis und E-Mail, Kartenbuttons, mobile Pfeile, ein einziges
  Foto-src-Update beim Sprachwechsel, Tastatureingaben, gesperrter Speicher,
  ungültige Sprache und lesbare Inhalte ohne JavaScript.
- Keine JavaScript-Laufzeitfehler in diesen Prüfungen; kein horizontaler
  Überlauf auf den geprüften Desktop- und Mobilbreiten.
- Google-Maps-Koordinaten, alle lokalen Bildverweise, Sitemap und
  Crawling-Einstellungen wurden zusätzlich im Quelltext abgeglichen.

Nach den anschließenden Anpassungen bestanden 337 Prüfungen bei 1440 Pixeln
und 338 bei 390 Pixeln Breite. Zusätzlich geprüft wurden beide neuen
Balkonfotos im Grundriss, die Galerie-Vergrößerung, der Erhalt des ausgewählten
Fotos beim Sprachwechsel, die neue Kontaktadresse und die Entfernung des
sichtbaren Preises einschließlich der Vorschau-Beschreibungen. Keine
JavaScript-Laufzeitfehler; alle 144 aktiven Bildvarianten wurden geladen und
mit ihren hinterlegten Abmessungen abgeglichen. Das wiederhergestellte
`Offer` stimmt mit dem vorherigen Commit überein, und alle 36 Bildverweise
der Sitemap existieren. Die alte E-Mail-Adresse kommt in den aktuellen
Repository-Dateien nicht mehr vor.
