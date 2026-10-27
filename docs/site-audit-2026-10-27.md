# Website-Prüfung vom 27.10.2026

Geprüft wurden die aktive Website, alle drei HTML-Seiten, CSS und JavaScript,
Grundriss, Bildkatalog, Sitemap, robots.txt sowie die öffentlichen HTTP-Antworten.
Die ursprünglichen Codekorrekturen einschließlich der anschließenden
Balkonfoto- und Kontaktanpassungen wurden mit Commit `2dfc8a6` veröffentlicht.
Die Live-Prüfung weiter unten beschreibt den Stand vor diesem Commit.
Die am Ende dokumentierten PageSpeed-Optimierungen wurden anschließend
im Repository umgesetzt. Die Cloudflare-Cache-Regel ist weiterhin separat
im Konto zu aktivieren.

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

## Anschließende Umsetzung der PageSpeed-Befunde

Grundlage ist der vom Eigentümer geteilte Bericht vom 27.10.2026, 13:35 MEZ:
[Mobil](https://pagespeed.web.dev/analysis/https-casa-chocaya-com/hlyr1bmxee?hl=de&form_factor=mobile),
[Desktop](https://pagespeed.web.dev/analysis/https-casa-chocaya-com/hlyr1bmxee?hl=de&form_factor=desktop).

| Messwert vor den Optimierungen | Mobil | Desktop |
| --- | --- | --- |
| Leistung | 84 | 95 |
| FCP | 3,0 s | 1,0 s |
| LCP | 3,3 s | 1,0 s |
| TBT | 0 ms | 0 ms |
| CLS | 0 | 0,053 |
| Barrierefreiheit | 94 | 94 |

Dies sind Labormessungen. Der Bericht enthält keine CrUX-Nutzerdaten.
Das LCP-Element ist die Überschrift `Casa Chocaya`, nicht das Hintergrundfoto.

### Lokal umgesetzt

- Die unveränderten Latin-WOFF2-Dateien von Cormorant Garamond und Jost liegen
  samt SIL-OFL-Lizenzen unter `fonts/`. Die vorhandenen Schriftarten,
  Schriftschnitte und Gewichte bleiben erhalten. Auf allen drei HTML-Seiten
  entfallen die Google-Fonts-Verbindungen und das externe Stylesheet. Die
  beiden aufrechten Schriften werden gezielt vorab geladen; Kursivschrift
  lädt nach Bedarf. Der technische Abschnitt der Datenschutzerklärung
  beschreibt jetzt die tatsächlich lokale Bereitstellung.
- Das CSS des unterhalb liegenden Grundrisses lädt mit `media="print"` und
  wechselt nach dem Laden auf `all`. Der JavaScript-Grundriss wartet auf seine
  Gestaltung, bevor er sichtbar wird. Die bestehende Raumkartenübersicht
  bleibt auch bei fehlgeschlagenem CSS-Download verfügbar. Das kleine
  allgemeine Stylesheet bleibt regulär eingebunden, damit keine ungestaltete
  Kopfzeile oder Hero-Ansicht sichtbar wird.
- Die drei Bewertungssterne besitzen `role="img"` mit ihrer vorhandenen,
  übersetzten Beschriftung. Das behebt den im Bericht genannten unzulässigen
  ARIA-Namen auf einem allgemeinen Container und damit denselben Befund
  unter „Agentisches Browsing“.
- WhatsApp-Grün, kleine Grundrissüberschriften, Ortsangabe und Footer-Texte
  haben ausreichenden Kontrast. Die gedeckte Textfarbe wurde leicht
  abgedunkelt, damit sie auch auf den beigen Abschnitten besteht. Das Layout
  bleibt erhalten. Die Prüfungen erfolgen nach Abschluss der Reveal-Animationen.
- Für alle 40 Fotomotive sind 400-/600er-Vorschauen in AVIF und WebP ergänzt:
  insgesamt 160 Dateien. Originale, bisherige 800-/1600er-Dateien und das
  Hero-Motiv wurden nicht überschrieben. Statische Galerie, Raumkarten und
  dynamischer Grundriss verwenden die erweiterten `srcset`-Listen mit echten,
  eindeutigen Pixelbreiten. Die Vergrößerung nutzt weiterhin große Fotos.
- Beispiel für die tatsächliche Dateiersparnis einer kleinen Vorschau:
  `1st_living_3` benötigt als 400er-AVIF 20.013 statt 62.937 Byte als 800er-AVIF
  (rund 68 % weniger). Das ist eine Dateigrößenersparnis für diese Auswahl,
  keine behauptete Verbesserung der gesamten Seitenladezeit.
- `scripts/update-photo-previews.ps1` erzeugt die Vorschauen mit FFmpeg aus
  den vorhandenen Original-WebPs und hält Bildkatalog sowie statische Quellen
  synchron. Vorhandene Vorschauen werden standardmäßig nicht überschrieben.
  Die erzeugten Dateien liegen im Repository; ein Build beim Seitenbesuch
  oder zusätzliche Browser-Abhängigkeiten sind nicht erforderlich.

### Cache und nachrangige Befunde

Die Browser-Cachezeit von vier Stunden wird durch Cloudflare ausgeliefert.
Ohne Kontozugriff lässt sie sich nicht aus diesem GitHub-Pages-Repository
ändern. Eine auf statische Dateien begrenzte 30-Tage-Regel einschließlich
Versionierung und Prüfablauf steht in [cloudflare-cache.md](cloudflare-cache.md).
HTML bleibt von dieser Regel ausgenommen. Die Regel ist noch nicht aktiviert.

Die rund 10 KiB „veraltetes JavaScript“ sowie die 54-ms-Aufgabe stammen aus
Cloudflares Analyse-Beacon. Dafür wurde kein eigener Website-Code umgebaut.
Auch die jeweils etwa 2 KiB Minifizierungspotenzial rechtfertigen hier keinen
zusätzlichen Build-Prozess. Der gemeldete nicht zugeordnete Layoutumbruch
von 87 ms wurde nicht ohne Trace einer bestimmten Codezeile zugeschrieben.

### Prüfung nach der Umsetzung

- 384 bestandene Browserprüfungen auf Desktop und 385 auf Mobilbreite:
  Raumzuordnung, Sprachen, Bildwechsel, Vergrößerung, Metadaten, Layout und
  alle 288 aktiven AVIF-/WebP-Bildvarianten.
- axe-core 4.14.0 meldet in den geprüften spanischen und englischen Ansichten
  auf beiden Breiten keine Verstöße gegen `aria-prohibited-attr` oder
  `color-contrast`. Dies ersetzt keine vollständige manuelle Prüfung.
- 10 zusätzliche bestandene Prüfungen für absichtlich verzögertes und
  fehlgeschlagenes Grundriss-CSS, ohne JavaScript lesbare Inhalte, lokale
  Schriften auf den Rechtstextseiten, drei mobile Pixeldichten und alle
  160 zusätzlich erzeugten Bilddateien einschließlich ihrer Abmessungen.
- Bei rund 173 CSS-Pixeln Galeriefotobreite wählt Chrome bei DPR 1/2 die
  400er-Datei und bei DPR 3 die 600er-Datei. Die hohe Pixeldichte wird also
  berücksichtigt; die Auflösung wird nicht pauschal reduziert.
- Keine JavaScript-Laufzeitfehler oder horizontalen Überläufe in den
  geprüften Hauptseitenansichten. Grundriss und kleinere Vorschauen wurden
  zusätzlich visuell kontrolliert.

Ein neuer PageSpeed-Wert ist erst nach Veröffentlichung und erneuter Messung
bekannt. Die oben genannten ursprünglichen Scores sind keine Nachher-Werte.
