/* Photo descriptions are based on the visible subjects, not filename numbers.
 * Keep the Spanish default descriptions in index.html in sync when editing.
 * dimensions contains actual [width, height] pairs for small/large/original.
 */
const casaImages = (() => {
  'use strict';
  const descriptions = {
    LogoChocaya: ['Casa Chocaya, volver al inicio.', 'Casa Chocaya, return to the home section.'],
    ChocayaSala: ['Sala de Casa Chocaya con sofá de cuero, comedor de madera, baranda de vidrio y acceso a la terraza con vista al mar.', 'Casa Chocaya living room with a leather sofa, wooden dining table, glass balustrade and access to the sea-view terrace.'],
    ChocallaPool: ['Piscina elevada en la azotea, con escalera de madera, barandas de vidrio, sombrilla roja y banco junto al acceso.', 'Raised rooftop pool with wooden access steps, glass balustrades, a red parasol and a bench beside the steps.'],
    ChocayaDeFrente: ['Fachada blanca de Casa Chocaya con portón de madera, puerta de ingreso y terraza con baranda de vidrio.', 'White front facade of Casa Chocaya with wooden garage doors, an entrance door and a terrace with a glass balustrade.'],
    ChocayaDeAtras: ['Fachada posterior de Casa Chocaya al atardecer, con balcón cubierto, baranda de vidrio y acceso desde el parque.', 'Rear facade of Casa Chocaya at sunset, with a covered balcony, glass balustrade and entrance from the park.'],
    CasaDeAtras: ['Vista posterior de la casa, con balcón de vidrio, ventanas horizontales y puerta de acceso junto al césped del condominio.', 'Rear view of the house with a glass balcony, horizontal windows and an entrance beside the condominium lawn.'],
    Terraza: ['Zona de parrilla de la azotea con encimera en U, lavadero y espacio abierto para preparar comidas al aire libre.', 'Rooftop BBQ area with a U-shaped worktop, sink and open space for preparing meals outdoors.'],
    ChocayaWohnzimmer2: ['Sala con sofá de cuero, dos sillones oscuros, televisión en la pared y mamparas abiertas hacia la terraza.', 'Living room with a leather sofa, two dark armchairs, a wall-mounted television and sliding doors opening onto the terrace.'],
    Wohnzimmer: ['Sala y comedor iluminados de noche, con sofá de cuero, sillones, mesa de madera y ventanas decoradas con motivos de hojas.', 'Living and dining area at night, with a leather sofa, armchairs, wooden dining table and leaf-patterned window panels.'],
    LobbyAbajo: ['Zona de estar en planta baja con sofá pequeño, dos sillones de ratán y mesa redonda bajo la galería y la escalera.', 'Ground-floor sitting area with a small sofa, two rattan armchairs and a round table beneath the gallery and staircase.'],
    LobbyAbajo2: ['Vista de la sala de planta baja con mesa redonda de vidrio, asientos de ratán, espejo y escalera abierta junto a la galería.', 'Ground-floor lounge with a round glass table, rattan seating, a mirror and an open staircase beside the gallery.'],
    Comedor: ['Mesa de comedor de madera con mantel verde claro, sillas de respaldo cruzado y lámpara de fibras junto a la cocina.', 'Wooden dining table with a light green cloth, cross-back chairs and a woven pendant lamp beside the kitchen.'],
    ChocayaCocina: ['Cocina abierta con isla, taburetes, refrigeradora, lavadero bajo la ventana y puerta hacia el balcón.', 'Open kitchen with an island, stools, refrigerator, sink beneath the window and a door leading to the balcony.'],
    CocinaDeNoche: ['Cocina iluminada de noche con isla central, taburetes, lámparas colgantes y encimera junto a la ventana.', 'Kitchen at night with a central island, stools, pendant lamps and a worktop beneath the window.'],
    CocinaComedor: ['Vista nocturna desde la isla de cocina hacia el comedor de madera y las lámparas de fibras naturales.', 'Night view from the kitchen island towards the wooden dining table and woven pendant lights.'],
    ChocayaDormitorio: ['Dormitorio con cama doble de tonos grises, dos apliques de pared y puerta abierta al baño junto a la ventana.', 'Bedroom with a grey double bed, two wall lamps and an open bathroom door beside the window.'],
    Dormitorio2: ['Dormitorio con cama doble, almohada amarilla, lámparas colgantes y ventana horizontal alta sobre la cabecera.', 'Bedroom with a double bed, yellow pillow, pendant lights and a high horizontal window above the headboard.'],
    Dormitorio3: ['Dormitorio con cama de madera, sillón negro de trama abierta, cortinas claras y lámpara de techo de alambre.', 'Bedroom with a wooden bed, black open-weave chair, light curtains and a wire pendant lamp.'],
    Dormitorio4: ['Dormitorio con cama doble, cortinas beige, sillón junto a la ventana y puerta del baño al fondo.', 'Bedroom with a double bed, beige curtains, an armchair beside the window and a bathroom door at the far end.'],
    ChocayaBanoAbajo: ['Baño con ducha de lluvia negra, dos lavabos sobre mueble de madera y dos espejos ovalados sobre paredes claras.', 'Bathroom with a black rainfall shower, twin basins on a wooden vanity and two oval mirrors against light-coloured walls.'],
    ChocayaBano2: ['Baño de visitas con revestimiento gris, lavabo sobre mueble oscuro, espejo y ventana vertical junto al inodoro.', 'Guest bathroom with grey wall tiles, a basin on a dark vanity, mirror and a narrow vertical window beside the toilet.'],
    Bano3: ['Baño con ducha de lluvia y cortina a rayas, ventana de vidrio esmerilado y lavabo sobre un mueble de madera.', 'Bathroom with a rainfall shower and striped curtain, frosted window and a basin on a wooden vanity.'],
    Bano4: ['Baño con revestimiento blanco veteado, lavabo rectangular, grifería negra, espejo y ventana vertical.', 'Bathroom with white veined tiles, a rectangular basin, black tap, mirror and a vertical window.'],
    ChocayaCarPort: ['Cochera privada cubierta, con piso de baldosas y portón de madera hacia el estacionamiento del condominio.', 'Covered private garage with a tiled floor and wooden doors opening towards the condominium parking area.'],
    VistaFrontisBalcon: ['Vista desde la casa hacia las palmeras del condominio, el estacionamiento y el mar al fondo.', 'View from the house towards the condominium palm trees, parking area and the ocean in the distance.'],
    VistaParque: ['Vista desde el balcón hacia los senderos y áreas verdes del condominio, con casas blancas y cerros al fondo.', 'View from the balcony over the condominium paths and lawns, with white houses and hills in the distance.'],
    Playa: ['Atardecer en la playa de Chocaya, con cielo naranja reflejado en la arena mojada entre dos formaciones rocosas.', 'Sunset on Chocaya beach, with an orange sky reflected in wet sand between two rock formations.'],
    Playa2: ['Playa de Chocaya al atardecer, con rocas a ambos lados, arena mojada y una franja naranja sobre el horizonte.', 'Chocaya beach at sunset, with rocks on both sides, wet sand and an orange band above the horizon.'],
    PoolyMar: ['Detalle de la piscina con mosaicos turquesa, baranda de vidrio y vista sobre las palmeras hacia el océano.', 'Detail of the turquoise-tiled pool, glass balustrade and a view over the palm trees towards the ocean.'],
    PoolyVista: ['Piscina de mosaicos turquesa en la azotea, con baranda de vidrio y vista panorámica hacia la costa.', 'Turquoise-tiled rooftop pool with a glass balustrade and a panoramic view towards the coast.'],
    poolyvistafrontis: ['Vista de la piscina elevada, con plataforma de madera, pasamanos de acero y una figura de Buda junto al agua.', 'Raised pool with a wooden deck, steel handrails and a Buddha figure beside the water.'],
    figura: ['Figura de Buda junto a la piscina de la azotea, con palmeras, casas del condominio y cerros al fondo.', 'Buddha figure beside the rooftop pool, with palm trees, condominium houses and hills in the background.'],
    '1st_bathroom_of_bed1': ['Baño del dormitorio 1 con ducha de lluvia, cortina a rayas, ventana esmerilada y lavabo sobre mueble de madera.', 'Bedroom 1 bathroom with a rainfall shower, striped curtain, frosted window and a basin on a wooden vanity.'],
    '1st_bedroom1_1': ['Dormitorio 1 en el segundo piso, con cama doble gris, apliques de pared y baño junto a la ventana.', 'Upper-floor bedroom 1 with a grey double bed, wall lamps and a bathroom beside the window.'],
    '1st_dining_1': ['Comedor con mesa y sillas de madera, junto a la cocina abierta con isla y lámparas de fibras naturales.', 'Dining area with a wooden table and chairs, beside the open kitchen with an island and woven pendant lamps.'],
    '1st_dining_2': ['Vista frontal del comedor de madera con sillas de respaldo cruzado, lámpara colgante y cocina al fondo.', 'Front view of the wooden dining table and cross-back chairs, with a pendant lamp and kitchen in the background.'],
    '1st_dining_kitchen': ['Comedor con mesa y sillas de madera, junto a la cocina abierta con isla y lámparas de fibras naturales.', 'Dining area with a wooden table and chairs, beside the open kitchen with an island and woven pendant lamps.'],
    '1st_dining_living': ['Comedor de madera conectado con la sala, con sofá, sillones claros y ventanales hacia la terraza.', 'Wooden dining area connected to the living room, with a sofa, light armchairs and windows towards the terrace.'],
    '1st_kitchen': ['Cocina con muebles de madera clara, isla central, dos taburetes y lavadero bajo una ventana horizontal.', 'Kitchen with light wooden cabinetry, a central island, two stools and a sink beneath a horizontal window.'],
    '1st_kitchen_night': ['Cocina de noche con isla, taburetes, lámparas colgantes y encimera iluminada bajo la ventana.', 'Kitchen at night with an island, stools, pendant lamps and an illuminated worktop beneath the window.'],
    '1st_living_2': ['Sala renovada con sofá de cuero, asientos de madera y cojines claros, mesa baja y televisión en la pared.', 'Renovated living room with a leather sofa, wooden seating with light cushions, a coffee table and wall-mounted television.'],
    '1st_living_3': ['Sala del segundo piso con sofá y sillones claros, mesa de madera y baranda de vidrio junto a la escalera.', 'Upper-floor living room with a sofa and light armchairs, a wooden coffee table and glass balustrade beside the stairs.'],
    '1st_living_night': ['Sala iluminada de noche con sofá de cuero, asientos de cojines claros y puertas abiertas hacia la terraza.', 'Living room at night with a leather sofa, light-cushioned seating and doors opening onto the terrace.'],
    '1st_living_terrace_1': ['Sala renovada con sofá y sillones claros, junto a la terraza con sillas de madera y vista al mar.', 'Renovated living room with a sofa and light armchairs, beside a terrace with wooden chairs and a sea view.'],
    '1st_living_terrace_2': ['Vista desde la sala hacia las sillas de la terraza, con baranda de vidrio, palmeras y mar al fondo.', 'View from the living room towards the terrace chairs, with a glass balustrade, palm trees and the sea in the background.'],
    '2nd_pool_1': ['Acceso a la piscina elevada por escalones de madera, con pasamanos metálicos, baranda de vidrio y sombrilla roja.', 'Wooden steps leading to the raised pool, with metal handrails, glass balustrades and a red parasol.'],
    '2nd_pool_view_1': ['Esquina de la piscina de mosaicos turquesa, con vista al mar a través de la baranda de vidrio.', 'Corner of the turquoise-tiled pool, with a sea view through the glass balustrade.'],
    '2nd_pool_view_2': ['Vista amplia de la piscina en la azotea, con plataforma de madera, pasamanos de acero y palmeras al fondo.', 'Wide view of the rooftop pool, with a wooden deck, steel handrails and palm trees in the background.'],
    '2nd_pool_view_3': ['Figura de Buda junto a la piscina, con vista sobre las casas del condominio hacia los cerros de la costa.', 'Buddha figure beside the pool, overlooking the condominium houses towards the coastal hills.'],
    '2nd_terrace_bbq': ['Zona de parrilla con encimera en U bajo una pérgola de madera, abierta a la vista de los cerros.', 'BBQ area with a U-shaped worktop beneath a wooden pergola, open to views of the hills.'],
    '2nd_terrace_parkview': ['Terraza de la azotea bajo una pérgola de madera, con lámparas colgantes y vista hacia la costa y las casas vecinas.', 'Rooftop terrace beneath a wooden pergola, with pendant lamps and views towards the coast and neighbouring houses.'],
    '2nd_terrace_seaview': ['Terraza cubierta por una pérgola, con banco junto al muro y vistas abiertas al mar y a las rocas de la costa.', 'Pergola-covered terrace with a bench along the wall and open views of the ocean and coastal rocks.'],
    exterieur_back: ['Fachada posterior renovada de Casa Chocaya, con acceso de madera, balcón de vidrio y pérgola en la azotea.', 'Renovated rear facade of Casa Chocaya, with a wooden entrance, glass balcony and rooftop pergola.'],
    exterieur_front: ['Fachada de Casa Chocaya en Chocaya, Asia, con portón de madera, puerta de ingreso y terraza acristalada.', 'Front facade of Casa Chocaya in Chocaya, Asia, with wooden garage doors, an entrance door and a glazed terrace.'],
    gf_bathroom_of_bed2: ['Baño del dormitorio 2 con ducha de lluvia, cortina a rayas, ventana esmerilada y lavabo sobre mueble de madera.', 'Bedroom 2 bathroom with a rainfall shower, striped curtain, frosted window and a basin on a wooden vanity.'],
    gf_bedroom2_1: ['Dormitorio 2 en planta baja, con cama doble, cortinas beige y puerta del baño junto a la ventana.', 'Ground-floor bedroom 2 with a double bed, beige curtains and the bathroom door beside the window.'],
    gf_bedroom2_2: ['Otra vista del dormitorio 2, con cama doble, dos lámparas de pared, sillón junto a las cortinas y acceso al baño.', 'Another view of bedroom 2, with a double bed, two wall lamps, an armchair beside the curtains and bathroom access.'],
    gf_bedroom3: ['Dormitorio 3 en planta baja, con cama de madera, sillón negro, cortinas claras y lámpara de techo de alambre.', 'Ground-floor bedroom 3 with a wooden bed, black chair, light curtains and a wire pendant lamp.'],
    gf_bedroom4: ['Dormitorio 4 en planta baja, con cama doble, almohada amarilla y ventana horizontal alta sobre la cabecera.', 'Ground-floor bedroom 4 with a double bed, yellow pillow and a high horizontal window above the headboard.'],
    gf_garage: ['Interior de la cochera con piso de baldosas, portón de madera y un auto estacionado junto al muro.', 'Inside the garage with a tiled floor, wooden doors and a car parked beside the wall.'],
    gf_lounge: ['Sala de planta baja con sofá pequeño, dos sillones de ratán y mesa redonda bajo la galería de doble altura.', 'Ground-floor lounge with a small sofa, two rattan armchairs and a round table beneath the double-height gallery.'],
    gf_lounge_entrance: ['Sala y kitchenette de planta baja, con mesa redonda, asientos de ratán, escalera abierta y puerta hacia la cochera.', 'Ground-floor lounge and kitchenette, with a round table, rattan seating, open staircase and a door to the garage.'],
    gf_sharedbath_1: ['Baño compartido de planta baja con ducha de lluvia negra, dos lavabos y espejos ovalados sobre un mueble de madera.', 'Shared ground-floor bathroom with a black rainfall shower, twin basins and oval mirrors above a wooden vanity.'],
    gf_sharedbath_2: ['Baño compartido de planta baja con ducha de lluvia negra, dos lavabos y espejos ovalados sobre un mueble de madera.', 'Shared ground-floor bathroom with a black rainfall shower, twin basins and oval mirrors above a wooden vanity.'],
    gf_toilet: ['Baño de visitas de planta baja con paredes grises, lavabo sobre mueble oscuro, espejo y ventana junto al inodoro.', 'Ground-floor guest toilet with grey walls, a basin on a dark vanity, mirror and a window beside the toilet.'],
    seaview: ['Vista desde la casa hacia las palmeras y la playa, con el océano y una formación rocosa clara en el horizonte.', 'View from the house towards the palm trees and beach, with the ocean and a pale rock formation on the horizon.'],
  };

  const dimensions = {
    "LogoChocaya": {"original":[1000,1000]},
    "ChocayaSala": {"small":[800,533],"large":[1600,1067],"original":[1536,1024]},
    "ChocallaPool": {"small":[800,533],"large":[1600,1067],"original":[1536,1024]},
    "ChocayaDeFrente": {"small":[800,533],"large":[1600,1067],"original":[1536,1024]},
    "ChocayaDeAtras": {"small":[800,533],"large":[1600,1067],"original":[1536,1024]},
    "CasaDeAtras": {"small":[800,800],"large":[1600,1600],"original":[2266,2266]},
    "Terraza": {"small":[800,533],"large":[1600,1067],"original":[1536,1024]},
    "ChocayaWohnzimmer2": {"small":[800,533],"large":[1600,1067],"original":[1536,1024]},
    "Wohnzimmer": {"small":[800,450],"large":[1600,900],"original":[4032,2268]},
    "LobbyAbajo": {"small":[621,800],"large":[1242,1600],"original":[2986,3847]},
    "LobbyAbajo2": {"small":[600,800],"large":[1200,1600],"original":[960,1280]},
    "Comedor": {"small":[533,800],"large":[1067,1600],"original":[1024,1536]},
    "ChocayaCocina": {"small":[800,450],"large":[1600,900],"original":[2661,1497]},
    "CocinaDeNoche": {"small":[450,800],"large":[900,1600],"original":[720,1280]},
    "CocinaComedor": {"small":[544,800],"large":[1088,1600],"original":[2266,3331]},
    "ChocayaDormitorio": {"small":[800,533],"large":[1600,1067],"original":[2046,1364]},
    "Dormitorio2": {"small":[800,533],"large":[1600,1067],"original":[1536,1024]},
    "Dormitorio3": {"small":[600,800],"large":[1200,1600],"original":[960,1280]},
    "Dormitorio4": {"small":[800,600],"large":[1600,1200],"original":[3875,2906]},
    "ChocayaBanoAbajo": {"small":[800,533],"large":[1600,1067],"original":[1536,1024]},
    "ChocayaBano2": {"small":[533,800],"large":[1067,1600],"original":[1024,1536]},
    "Bano3": {"small":[600,800],"large":[1200,1600],"original":[3024,4032]},
    "Bano4": {"small":[533,800],"large":[1067,1600],"original":[1024,1536]},
    "ChocayaCarPort": {"small":[800,533],"large":[1600,1067],"original":[1536,1024]},
    "VistaFrontisBalcon": {"small":[800,450],"large":[1600,900],"original":[4032,2268]},
    "VistaParque": {"small":[800,450],"large":[1600,900],"original":[4032,2268]},
    "Playa": {"small":[600,800],"large":[1200,1600],"original":[3119,4160]},
    "Playa2": {"small":[800,565],"large":[1600,1130],"original":[5522,3900]},
    "PoolyMar": {"small":[800,800],"large":[1600,1600],"original":[1024,1024]},
    "PoolyVista": {"small":[800,800],"large":[1600,1600],"original":[2141,2141]},
    "poolyvistafrontis": {"small":[800,533],"large":[1600,1067],"original":[1536,1024]},
    "figura": {"small":[800,800],"large":[1600,1600],"original":[1024,1024]},
    "1st_bathroom_of_bed1": {"small":[800,800],"large":[1254,1254],"original":[1254,1254]},
    "1st_bedroom1_1": {"small":[800,600],"large":[1448,1086],"original":[1448,1086]},
    "1st_dining_1": {"small":[800,800],"large":[1254,1254],"original":[1254,1254]},
    "1st_dining_2": {"small":[800,800],"large":[1254,1254],"original":[1254,1254]},
    "1st_dining_kitchen": {"small":[800,800],"large":[1254,1254],"original":[1254,1254]},
    "1st_dining_living": {"small":[800,800],"large":[1254,1254],"original":[1254,1254]},
    "1st_kitchen": {"small":[800,800],"large":[1254,1254],"original":[1254,1254]},
    "1st_kitchen_night": {"small":[800,800],"large":[1254,1254],"original":[1254,1254]},
    "1st_living_2": {"small":[800,800],"large":[1254,1254],"original":[1254,1254]},
    "1st_living_3": {"small":[800,800],"large":[1254,1254],"original":[1254,1254]},
    "1st_living_night": {"small":[800,450],"large":[1600,900],"original":[1600,900]},
    "1st_living_terrace_1": {"small":[800,800],"large":[1254,1254],"original":[1254,1254]},
    "1st_living_terrace_2": {"small":[800,865],"large":[930,1005],"original":[930,1005]},
    "2nd_pool_1": {"small":[800,600],"large":[1448,1086],"original":[1448,1086]},
    "2nd_pool_view_1": {"small":[800,800],"large":[1024,1024],"original":[1024,1024]},
    "2nd_pool_view_2": {"small":[800,450],"large":[1600,900],"original":[1600,900]},
    "2nd_pool_view_3": {"small":[800,800],"large":[1024,1024],"original":[1024,1024]},
    "2nd_terrace_bbq": {"small":[800,800],"large":[1254,1254],"original":[1254,1254]},
    "2nd_terrace_parkview": {"small":[800,600],"large":[1448,1086],"original":[1448,1086]},
    "2nd_terrace_seaview": {"small":[800,600],"large":[1448,1086],"original":[1448,1086]},
    "exterieur_back": {"small":[800,842],"large":[1011,1064],"original":[1011,1064]},
    "exterieur_front": {"small":[800,849],"large":[1182,1254],"original":[1182,1254]},
    "gf_bathroom_of_bed2": {"small":[800,800],"large":[1254,1254],"original":[1254,1254]},
    "gf_bedroom2_1": {"small":[800,629],"large":[1262,993],"original":[1262,993]},
    "gf_bedroom2_2": {"small":[800,800],"large":[1254,1254],"original":[1254,1254]},
    "gf_bedroom3": {"small":[800,600],"large":[1448,1086],"original":[1448,1086]},
    "gf_bedroom4": {"small":[800,600],"large":[1448,1086],"original":[1448,1086]},
    "gf_garage": {"small":[800,800],"large":[1254,1254],"original":[1254,1254]},
    "gf_lounge": {"small":[800,981],"large":[1086,1332],"original":[1086,1332]},
    "gf_lounge_entrance": {"small":[800,980],"large":[1086,1330],"original":[1086,1330]},
    "gf_sharedbath_1": {"small":[800,600],"large":[1448,1086],"original":[1448,1086]},
    "gf_sharedbath_2": {"small":[800,600],"large":[1448,1086],"original":[1448,1086]},
    "gf_toilet": {"small":[800,800],"large":[1254,1254],"original":[1254,1254]},
    "seaview": {"small":[800,800],"large":[1600,1600],"original":[1600,1600]}
  };

  function key(value) {
    return String(value || '').split(/[?#]/)[0].split('/').pop()
      .replace(/-(?:800|1600)\.(?:avif|webp)$/i, '')
      .replace(/\.(?:avif|webp|png)$/i, '');
  }

  function alt(value, lang = 'es', fallback = '') {
    const text = descriptions[key(value)];
    return text ? text[lang === 'en' ? 1 : 0] : fallback;
  }

  function apply(img, lang = 'es') {
    const name = key(img.getAttribute('src') || img.dataset.image);
    if (!descriptions[name] || img.getAttribute('aria-hidden') === 'true') return;
    img.dataset.image = name;
    img.alt = alt(name, lang);
    const variant = /-800\.(?:avif|webp)$/i.test(img.getAttribute('src')) ? 'small'
      : /-1600\.(?:avif|webp)$/i.test(img.getAttribute('src')) ? 'large' : 'original';
    const size = dimensions[name]?.[variant];
    if (size) { img.width = size[0]; img.height = size[1]; }
  }

  function srcset(value, format) {
    const name = key(value);
    const sizes = dimensions[name];
    return `images/${name}-800.${format} ${sizes.small[0]}w, images/${name}-1600.${format} ${sizes.large[0]}w`;
  }

  function refresh(lang = 'es') {
    document.querySelectorAll('img').forEach(img => apply(img, lang));
    const shareImage = document.querySelector('meta[property="og:image"]')?.content;
    document.querySelectorAll('meta[property="og:image:alt"], meta[name="twitter:image:alt"]').forEach(meta => {
      meta.content = alt(shareImage, lang);
    });
  }

  return Object.freeze({ alt, apply, srcset, refresh, dimensions });
})();
