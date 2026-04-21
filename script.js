/* ============================================================
   CASA CHOCAYA — script.js
   ============================================================ */


/* ============================================================
   TRANSLATIONS (i18n)
   ============================================================ */
const translations = {
  es: {
    'page.title':    'Casa Chocaya · Casa de Playa Asia Lima · Beach House Peru',
    'page.description': 'Casa Chocaya en Chocaya, Asia – Lima, Perú. Casa privada de 4 dormitorios, 5 baños, piscina en azotea, zona de parrilla y acceso directo al mar. A 10 min del Boulevard de Asia. Desde $100/noche.',
    'nav.lacasa':    'La Casa',
    'nav.dist':      'Distribución',
    'nav.galeria':   'Galería',
    'nav.ubicacion': 'Ubicación',
    'nav.opiniones': 'Opiniones',
    'nav.faq':       'FAQ',
    'nav.consultar': 'Consultar',
    'aria.menu':     'Abrir menú',
    'aria.scroll':   'Desplazarse hacia abajo',
    'hero.tagline':  'Chocaya · Lima · Perú',
    'hero.subtitle': 'Tu refugio privado en el Pacífico',
    'hero.cta':      'Consultar ahora',
    'casa.location': 'Chocaya, Asia, Lima, Perú',
    'casa.specs':    '4 dormitorios · 5 baños · 308 m² aprox.',
    'casa.desc1':    'Ubicada dentro de un condominio privado en Chocaya, Casa Chocaya ofrece una experiencia de descanso sofisticada para familias que valoran privacidad, seguridad y comodidad. A solo 80 metros del mar, combina la tranquilidad de la playa con el confort, la amplitud y el nivel de una casa pensada para disfrutarse plenamente.',
    'casa.desc2':    'Distribuida en tres pisos, la casa reúne amplios espacios interiores y exteriores, balcones, terrazas, piscina en la azotea y zona de parrilla con vista al mar. A solo 10 minutos en auto del Boulevard de Asia, es una escapada exclusiva cerca de Lima, con todo lo necesario para vivir la estadía con comodidad, como en casa, pero junto al mar.',
    'am1.h': 'Acceso directo a la playa',
    'am1.p': 'A solo 80 metros del mar, con acceso directo para disfrutar días de playa con comodidad y total tranquilidad.',
    'am2.h': 'Condominio privado con vigilancia 24/7',
    'am2.p': 'Un entorno exclusivo y seguro, con acceso bajo registro y vigilancia las 24 horas, los 365 días del año.',
    'am3.h': 'Piscina en la terraza',
    'am3.p': 'Ubicada en el tercer piso, perfecta para relajarse, compartir y disfrutar con vista al mar.',
    'am4.h': 'Zona de parrilla',
    'am4.p': 'Ideal para almuerzos al aire libre, tardes largas y encuentros especiales en familia.',
    'am5.h': 'Balcones y terrazas',
    'am5.p': 'Dos balcones y dos terrazas que amplían la experiencia de la casa con luz, aire y espacios para disfrutar.',
    'am6.h': 'Cocina equipada',
    'am6.p': 'Cuenta con lo necesario para acompañar la estadía con practicidad y comodidad.',
    'am7.h': 'Estacionamiento privado',
    'am7.p': 'Cochera dentro de la propiedad con espacio para dos autos.',
    'am8.h': 'Pet friendly',
    'am8.p': 'Las mascotas son bienvenidas, previa coordinación con el propietario, para que toda la familia disfrute la estadía.',
    'casa.btn':      'Ver todas las comodidades',
    'gal.title':     'Galería',
    'gal.sub':       'Un vistazo a tu próximo paraíso de vacaciones',
    'gal.more':      'Mostrar más fotos',
    'cap.sala':      'Sala de estar',
    'cap.piscina':   'Piscina',
    'cap.fachada':   'Fachada',
    'cap.trasera':   'Vista trasera',
    'cap.jardin':    'Jardín trasero',
    'cap.terraza':   'Terraza',
    'cap.sala2':     'Sala de estar',
    'cap.living':    'Living',
    'cap.lobby':     'Lobby',
    'cap.acceso':    'Acceso',
    'cap.comedor':   'Comedor',
    'cap.cocina':    'Cocina',
    'cap.cocinanoche': 'Cocina de noche',
    'cap.dorm1':     'Dormitorio principal',
    'cap.dorm2':     'Dormitorio 2',
    'cap.dorm3':     'Dormitorio 3',
    'cap.dorm4':     'Dormitorio 4',
    'cap.bano1':     'Baño planta baja',
    'cap.bano2':     'Baño 2',
    'cap.bano3':     'Baño 3',
    'cap.bano4':     'Baño 4',
    'cap.estac':     'Estacionamiento',
    'cap.balcon':    'Vista desde el balcón',
    'cap.parque':    'Vista del parque',
    'cap.playa':     'Playa',
    'cap.playa2':    'Playa',
    'cap.poolmar':   'Piscina y mar',
    'cap.poolvista': 'Piscina y vista',
    'cap.poolfrontis': 'Piscina y frontis',
    'cap.cocinacom': 'Cocina y comedor',
    'cap.casa':      'Casa Chocaya',
    'dist.title':    'Distribución',
    'dist.sub':      'Conoce cada espacio de la casa',
    'room.more':     'Ver más',
    'room.less':     'Ver menos',
    'r1.name': 'Dormitorio 1',   'r1.sub': 'Cama matrimonial · Baño incorporado',
    'r1.d1': 'Cama matrimonial', 'r1.d2': 'Baño incorporado con ducha tipo lluvia',
    'r1.d3': 'Armario',          'r1.d4': 'Planta alta',
    'r2.name': 'Dormitorio 2',   'r2.sub': 'Cama doble 140×200 cm · Baño compartido',
    'r2.d1': 'Cama doble 140×200 cm', 'r2.d2': 'Baño compartido',
    'r2.d3': 'Armario',          'r2.d4': 'Planta alta',
    'r3.name': 'Dormitorio 3',   'r3.sub': 'Cama doble 140×200 cm',
    'r3.d1': 'Cama doble 140×200 cm', 'r3.d2': 'Armario', 'r3.d3': 'Baño compartido',
    'r4.name': 'Dormitorio 4',   'r4.sub': 'Cama doble 140×200 cm · Baño incorporado',
    'r4.d1': 'Cama doble 140×200 cm', 'r4.d2': 'Baño incorporado con ducha tipo lluvia',
    'r4.d3': 'Armario',          'r4.d4': 'Planta baja',
    'rsala.name': 'Sala de estar', 'rsala.sub': 'TV · Comedor para 8',
    'rsala.d1': 'TV',            'rsala.d2': 'Sofás y zona de descanso',
    'rsala.d3': 'Comedor para 8 personas', 'rsala.d4': 'Acceso directo a terraza',
    'rsala.d5': 'Vista al mar',
    'rcoc.name': 'Cocina',       'rcoc.sub': 'Totalmente equipada',
    'rcoc.d1': 'Refrigerador con congeladora', 'rcoc.d2': 'Cafetera, hervidor y licuadora',
    'rcoc.d3': 'Horno pequeño',  'rcoc.d4': 'Platos y cubiertos',
    'rcoc.d5': 'Utensilios básicos de cocina',
    'rpis.name': 'Piscina y terraza', 'rpis.sub': 'Tercer piso · Vista al mar',
    'rpis.d1': 'Piscina en la azotea', 'rpis.d2': 'Zona de parrilla',
    'rpis.d3': 'Vista panorámica al mar', 'rpis.d4': 'Zona de descanso y hamacas',
    'rbanos.name': 'Baños',      'rbanos.sub': '5 baños · 2 con ducha tipo lluvia',
    'rbanos.d1': '2 baños en suite con ducha tipo lluvia (Dormitorios 1 y 4)',
    'rbanos.d2': '3 baños adicionales',
    'rplaya.name': 'Playa',      'rplaya.sub': 'A 80 metros · Acceso directo',
    'rplaya.d1': 'A solo 80 metros del mar', 'rplaya.d2': 'Acceso directo a la playa',
    'rplaya.d3': 'A 2 minutos a pie', 'rplaya.d4': 'Arena fina y aguas tranquilas',
    'loc.desc': 'Chocaya ofrece un entorno familiar, privado y tranquilo, ideal para desconectarse y disfrutar en familia. A solo 10 minutos en auto del Boulevard de Asia, cuenta con vigilancia las 24 horas, los 365 días del año, acceso directo a la playa y todo lo necesario para escapar de la rutina.',
    'loc.f1': 'A la altura del km 92.5 de la Panamericana Sur',
    'loc.f2': 'A solo 1 hora y 10 minutos de Lima',
    'loc.f3': 'Ubicación tranquila y privada frente al mar',
    'loc.f4': 'Restaurantes a pocos minutos a pie',
    'loc.f5': 'A solo 10 minutos del Boulevard de Asia',
    'cta.title': '¿Listo para darte una escapada de Lima?',
    'cta.sub':   'Contáctanos por WhatsApp – respondemos rápido y sin complicaciones.',
    'cta.btn':   'Consultar por WhatsApp ahora',
    'footer.copy': '© 2026 Casa Chocaya. Todos los derechos reservados.',
    'modal.title': 'Comodidades incluidas',
    'mcat1': 'Común',
    'mcat1.l1': 'Casa de 3 pisos',    'mcat1.l2': 'Sala de estar',
    'mcat1.l3': 'Sala con TV',        'mcat1.l4': 'Comedor para 8 personas',
    'mcat1.l5': 'Entrada privada',
    'mcat1.l6': '4 dormitorios, 2 de ellos con baño incorporado',
    'mcat1.l7': '5 baños en total, 3 de ellos completos con ducha tipo lluvia',
    'mcat1.l8': 'Ropa de cama',       'mcat1.l9': 'Almohadas',
    'mcat2': 'Instalaciones',
    'mcat2.l1': 'Cochera privada para 2 autos', 'mcat2.l2': 'Piscina en la terraza',
    'mcat2.l3': 'Zona de parrilla',   'mcat2.l4': 'Condominio privado',
    'mcat3': 'Seguridad del hogar',
    'mcat3.l1': 'Portería y vigilancia 24/7', 'mcat3.l2': 'Acceso bajo registro',
    'mcat3.l3': 'Seguridad los 365 días del año',
    'mcat4': 'Cocina',
    'mcat4.l1': 'Cocina equipada',    'mcat4.l2': 'Utensilios básicos de cocina',
    'mcat4.l3': 'Platos y cubiertos', 'mcat4.l4': 'Refrigerador con congeladora',
    'mcat4.l5': 'Cafetera, hervidor y licuadora', 'mcat4.l6': 'Horno pequeño',
    'mcat5': 'Ubicación',
    'mcat5.l1': 'Acceso directo a la playa', 'mcat5.l2': 'A 80 metros del mar',
    'mcat5.l3': 'A 2 minutos a pie de la playa',
    'mcat5.l4': 'A 10 minutos en auto del Boulevard de Asia',
    'mcat6': 'Exterior',
    'mcat6.l1': '2 balcones',         'mcat6.l2': '2 terrazas',
    'mcat6.l3': 'Terraza con vista al mar',
    'mcat6.l4': 'Salida directa al jardín y parque del condominio',
    'mcat7': 'Información adicional',
    'mcat7.l1': 'Pet friendly',       'mcat7.l2': 'Previa coordinación con el propietario',
    // Google Maps consent
    'map.title':     'Cargar Google Maps',
    'map.text':      'Al cargar el mapa se transferirán datos (incluida tu dirección IP) a Google LLC en Estados Unidos. Más información en nuestra ',
    'map.textEnd':   '.',
    'map.link':      'Política de Privacidad',
    'map.accept':    'Cargar mapa y aceptar',
    'map.remember':  'Recordar mi decisión',
    'map.iframeTitle': 'Ubicación de Casa Chocaya en Google Maps',
    // Reviews
    'rev.title':     'Lo que dicen nuestros huéspedes',
    'rev.sub':       'Opiniones reales de quienes ya se alojaron en Casa Chocaya',
    'rev.date1':     'Marzo 2026',
    'rev.date2':     'Febrero 2026',
    'rev.date3':     'Abril 2026',
    'rev.note':      'Reseñas en español – el idioma original en que fueron compartidas por nuestros huéspedes.',
    // FAQ
    'faq.title':     'Preguntas frecuentes',
    'faq.sub':       'Todo lo que necesitas saber antes de reservar',
    'faq.q1':        '¿Cuántas personas caben en Casa Chocaya?',
    'faq.a1':        'Casa Chocaya tiene capacidad para 8 personas, distribuidas en 4 dormitorios con camas matrimoniales.',
    'faq.q2':        '¿Dónde queda exactamente Casa Chocaya?',
    'faq.a2':        'La casa está ubicada en el condominio Chocaya, en Asia, al sur de Lima, Perú. A la altura del km 92.5 de la Panamericana Sur, a aproximadamente 1 hora y 10 minutos del centro de Lima.',
    'faq.q3':        '¿Se admiten mascotas en Casa Chocaya?',
    'faq.a3':        'Sí, la casa es pet friendly. Las mascotas son bienvenidas previa coordinación con el propietario.',
    'faq.q4':        '¿Qué incluye Casa Chocaya?',
    'faq.a4':        'La casa cuenta con 4 dormitorios, 5 baños, piscina en la azotea con vista al mar, zona de parrilla, cocina totalmente equipada, estacionamiento privado para 2 autos y acceso directo a la playa.',
    'faq.q5':        '¿A qué distancia está del Boulevard de Asia?',
    'faq.a5':        'Casa Chocaya está a solo 10 minutos en auto del Boulevard de Asia, donde encontrarás restaurantes, tiendas y vida nocturna en temporada.',
    'faq.q6':        '¿Cómo puedo reservar Casa Chocaya?',
    'faq.a6':        'Para consultar disponibilidad y reservar, contáctanos por WhatsApp al +49 176 56891136. Respondemos rápido y sin complicaciones.',
  },

  en: {
    'page.title':    'Casa Chocaya · Beach House Asia Lima · Vacation Rental Peru',
    'page.description': 'Casa Chocaya in Chocaya, Asia – Lima, Peru. Private beach house: 4 bedrooms, 5 bathrooms, rooftop pool, BBQ area and direct ocean access. 10 min from Boulevard de Asia. From $100/night.',
    'nav.lacasa':    'The House',
    'nav.dist':      'Layout',
    'nav.galeria':   'Gallery',
    'nav.ubicacion': 'Location',
    'nav.opiniones': 'Reviews',
    'nav.faq':       'FAQ',
    'nav.consultar': 'Enquire',
    'aria.menu':     'Open menu',
    'aria.scroll':   'Scroll down',
    'hero.tagline':  'Chocaya · Lima · Peru',
    'hero.subtitle': 'Your private retreat on the Pacific',
    'hero.cta':      'Enquire now',
    'casa.location': 'Chocaya, Asia, Lima, Peru',
    'casa.specs':    '4 bedrooms · 5 bathrooms · approx. 308 m²',
    'casa.desc1':    'Located within a private condominium in Chocaya, Casa Chocaya offers a sophisticated retreat for families who value privacy, security and comfort. Just 80 metres from the sea, it combines the peace of the beach with the comfort, space and quality of a home designed to be fully enjoyed.',
    'casa.desc2':    'Spread across three floors, the house combines spacious indoor and outdoor areas, balconies, terraces, a rooftop pool and a barbecue area with sea views. Just 10 minutes by car from the Boulevard de Asia, it is an exclusive getaway near Lima, with everything you need to enjoy your stay in comfort — like home, but by the sea.',
    'am1.h': 'Direct beach access',
    'am1.p': 'Just 80 metres from the sea, with direct access to enjoy beach days in complete comfort and tranquillity.',
    'am2.h': 'Private condominium with 24/7 security',
    'am2.p': 'An exclusive, secure environment with registered access and round-the-clock security, 365 days a year.',
    'am3.h': 'Rooftop pool',
    'am3.p': 'Located on the third floor, perfect for relaxing and enjoying the sea view.',
    'am4.h': 'BBQ area',
    'am4.p': 'Ideal for outdoor lunches, long afternoons and special family gatherings.',
    'am5.h': 'Balconies and terraces',
    'am5.p': 'Two balconies and two terraces that extend the living experience with light, fresh air and space to enjoy.',
    'am6.h': 'Fully equipped kitchen',
    'am6.p': 'Has everything needed to complement your stay with practicality and comfort.',
    'am7.h': 'Private parking',
    'am7.p': 'Garage within the property with space for two cars.',
    'am8.h': 'Pet friendly',
    'am8.p': 'Pets are welcome, subject to prior coordination with the owner, so the whole family can enjoy the stay.',
    'casa.btn':      'View all amenities',
    'gal.title':     'Gallery',
    'gal.sub':       'A glimpse of your next holiday paradise',
    'gal.more':      'Show more photos',
    'cap.sala':      'Living room',
    'cap.piscina':   'Pool',
    'cap.fachada':   'Facade',
    'cap.trasera':   'Rear view',
    'cap.jardin':    'Back garden',
    'cap.terraza':   'Terrace',
    'cap.sala2':     'Living room',
    'cap.living':    'Living area',
    'cap.lobby':     'Lobby',
    'cap.acceso':    'Entrance',
    'cap.comedor':   'Dining room',
    'cap.cocina':    'Kitchen',
    'cap.cocinanoche': 'Kitchen at night',
    'cap.dorm1':     'Master bedroom',
    'cap.dorm2':     'Bedroom 2',
    'cap.dorm3':     'Bedroom 3',
    'cap.dorm4':     'Bedroom 4',
    'cap.bano1':     'Ground floor bathroom',
    'cap.bano2':     'Bathroom 2',
    'cap.bano3':     'Bathroom 3',
    'cap.bano4':     'Bathroom 4',
    'cap.estac':     'Parking',
    'cap.balcon':    'View from the balcony',
    'cap.parque':    'Park view',
    'cap.playa':     'Beach',
    'cap.playa2':    'Beach',
    'cap.poolmar':   'Pool and sea',
    'cap.poolvista': 'Pool and view',
    'cap.poolfrontis': 'Pool and front view',
    'cap.cocinacom': 'Kitchen and dining',
    'cap.casa':      'Casa Chocaya',
    'dist.title':    'Layout',
    'dist.sub':      'Explore every room in the house',
    'room.more':     'Show more',
    'room.less':     'Show less',
    'r1.name': 'Bedroom 1',      'r1.sub': 'Double bed · En-suite bathroom',
    'r1.d1': 'Double bed',       'r1.d2': 'En-suite with rainfall shower',
    'r1.d3': 'Wardrobe',         'r1.d4': 'Upper floor',
    'r2.name': 'Bedroom 2',      'r2.sub': 'Double bed 140×200 cm · Shared bathroom',
    'r2.d1': 'Double bed 140×200 cm', 'r2.d2': 'Shared bathroom',
    'r2.d3': 'Wardrobe',         'r2.d4': 'Upper floor',
    'r3.name': 'Bedroom 3',      'r3.sub': 'Double bed 140×200 cm',
    'r3.d1': 'Double bed 140×200 cm', 'r3.d2': 'Wardrobe', 'r3.d3': 'Shared bathroom',
    'r4.name': 'Bedroom 4',      'r4.sub': 'Double bed 140×200 cm · En-suite bathroom',
    'r4.d1': 'Double bed 140×200 cm', 'r4.d2': 'En-suite with rainfall shower',
    'r4.d3': 'Wardrobe',         'r4.d4': 'Ground floor',
    'rsala.name': 'Living room', 'rsala.sub': 'TV · Dining for 8',
    'rsala.d1': 'TV',            'rsala.d2': 'Sofas and lounge area',
    'rsala.d3': 'Dining table for 8', 'rsala.d4': 'Direct terrace access',
    'rsala.d5': 'Sea view',
    'rcoc.name': 'Kitchen',      'rcoc.sub': 'Fully equipped',
    'rcoc.d1': 'Fridge-freezer', 'rcoc.d2': 'Coffee maker, kettle and blender',
    'rcoc.d3': 'Small oven',     'rcoc.d4': 'Plates and cutlery',
    'rcoc.d5': 'Basic kitchen utensils',
    'rpis.name': 'Pool and terrace', 'rpis.sub': 'Third floor · Sea view',
    'rpis.d1': 'Rooftop pool',   'rpis.d2': 'BBQ area',
    'rpis.d3': 'Panoramic sea view', 'rpis.d4': 'Lounge area and hammocks',
    'rbanos.name': 'Bathrooms',  'rbanos.sub': '5 bathrooms · 2 with rainfall shower',
    'rbanos.d1': '2 en-suite bathrooms with rainfall shower (Bedrooms 1 & 4)',
    'rbanos.d2': '3 additional bathrooms',
    'rplaya.name': 'Beach',      'rplaya.sub': '80 metres away · Direct access',
    'rplaya.d1': 'Just 80 metres from the sea', 'rplaya.d2': 'Direct beach access',
    'rplaya.d3': '2 minutes on foot', 'rplaya.d4': 'Fine sand and calm waters',
    'loc.desc': 'Chocaya offers a family-friendly, private and peaceful setting, ideal for switching off and enjoying time together. Just 10 minutes by car from the Boulevard de Asia, the condominium has 24-hour security all year round, direct beach access and everything you need to escape the everyday.',
    'loc.f1': 'At km 92.5 of the Pan-American Highway South',
    'loc.f2': 'Just 1 hour 10 minutes from Lima',
    'loc.f3': 'Quiet, private location by the sea',
    'loc.f4': 'Restaurants a few minutes on foot',
    'loc.f5': 'Just 10 minutes from the Boulevard de Asia',
    'cta.title': 'Ready for a getaway from Lima?',
    'cta.sub':   'Contact us on WhatsApp – we reply quickly and without fuss.',
    'cta.btn':   'Enquire on WhatsApp now',
    'footer.copy': '© 2026 Casa Chocaya. All rights reserved.',
    'modal.title': 'Amenities included',
    'mcat1': 'General',
    'mcat1.l1': '3-storey house',     'mcat1.l2': 'Living room',
    'mcat1.l3': 'TV lounge',          'mcat1.l4': 'Dining room for 8',
    'mcat1.l5': 'Private entrance',
    'mcat1.l6': '4 bedrooms, 2 with en-suite bathroom',
    'mcat1.l7': '5 bathrooms in total, 3 full bathrooms with rainfall shower',
    'mcat1.l8': 'Bed linen',          'mcat1.l9': 'Pillows',
    'mcat2': 'Facilities',
    'mcat2.l1': 'Private garage for 2 cars', 'mcat2.l2': 'Rooftop pool',
    'mcat2.l3': 'BBQ area',           'mcat2.l4': 'Private condominium',
    'mcat3': 'Home security',
    'mcat3.l1': 'Reception and 24/7 security', 'mcat3.l2': 'Registered access',
    'mcat3.l3': 'Security 365 days a year',
    'mcat4': 'Kitchen',
    'mcat4.l1': 'Equipped kitchen',   'mcat4.l2': 'Basic kitchen utensils',
    'mcat4.l3': 'Plates and cutlery', 'mcat4.l4': 'Fridge-freezer',
    'mcat4.l5': 'Coffee maker, kettle and blender', 'mcat4.l6': 'Small oven',
    'mcat5': 'Location',
    'mcat5.l1': 'Direct beach access', 'mcat5.l2': '80 metres from the sea',
    'mcat5.l3': '2 minutes on foot to the beach',
    'mcat5.l4': '10 minutes by car from the Boulevard de Asia',
    'mcat6': 'Exterior',
    'mcat6.l1': '2 balconies',        'mcat6.l2': '2 terraces',
    'mcat6.l3': 'Terrace with sea view',
    'mcat6.l4': 'Direct access to the garden and condominium park',
    'mcat7': 'Additional information',
    'mcat7.l1': 'Pet friendly',       'mcat7.l2': 'Subject to prior coordination with the owner',
    // Google Maps consent
    'map.title':     'Load Google Maps',
    'map.text':      'Loading the map will transfer data (including your IP address) to Google LLC in the United States. More information in our ',
    'map.textEnd':   '.',
    'map.link':      'Privacy Policy',
    'map.accept':    'Load map & accept',
    'map.remember':  'Remember my choice',
    'map.iframeTitle': 'Casa Chocaya location on Google Maps',
    // Reviews
    'rev.title':     'What our guests say',
    'rev.sub':       'Real reviews from people who have stayed at Casa Chocaya',
    'rev.date1':     'March 2026',
    'rev.date2':     'February 2026',
    'rev.date3':     'April 2026',
    'rev.note':      'Reviews shown in Spanish – the original language in which they were shared by our guests.',
    // FAQ
    'faq.title':     'Frequently asked questions',
    'faq.sub':       'Everything you need to know before booking',
    'faq.q1':        'How many guests can stay at Casa Chocaya?',
    'faq.a1':        'Casa Chocaya can accommodate up to 8 guests, spread across 4 bedrooms with double beds.',
    'faq.q2':        'Where exactly is Casa Chocaya located?',
    'faq.a2':        'The house is located in the Chocaya condominium, in Asia, south of Lima, Peru. At km 92.5 of the Pan-American Highway South, approximately 1 hour and 10 minutes from central Lima.',
    'faq.q3':        'Are pets allowed at Casa Chocaya?',
    'faq.a3':        'Yes, the house is pet friendly. Pets are welcome subject to prior coordination with the owner.',
    'faq.q4':        'What does Casa Chocaya include?',
    'faq.a4':        'The house features 4 bedrooms, 5 bathrooms, a rooftop pool with sea view, BBQ area, fully equipped kitchen, private parking for 2 cars and direct beach access.',
    'faq.q5':        'How far is it from the Boulevard de Asia?',
    'faq.a5':        'Casa Chocaya is just 10 minutes by car from the Boulevard de Asia, where you will find restaurants, shops and nightlife in season.',
    'faq.q6':        'How can I book Casa Chocaya?',
    'faq.a6':        'To check availability and book, contact us via WhatsApp at +49 176 56891136. We reply quickly and without fuss.',
  }
};

let currentLang = 'es';

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.title = translations[lang]['page.title'];

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && translations[lang]['page.description']) {
    metaDesc.setAttribute('content', translations[lang]['page.description']);
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const text = translations[lang][el.dataset.i18n];
    if (text !== undefined) el.textContent = text;
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const text = translations[lang][el.dataset.i18nAria];
    if (text !== undefined) el.setAttribute('aria-label', text);
  });

  // Sync "Ver más / Show more" — text may have been toggled
  document.querySelectorAll('.room-more-btn').forEach(btn => {
    const details = btn.closest('.room-card').querySelector('.room-details');
    btn.textContent = details.hidden
      ? translations[lang]['room.more']
      : translations[lang]['room.less'];
  });

  document.querySelectorAll('.lang-btn').forEach(b => {
    const active = b.dataset.lang === lang;
    b.classList.toggle('active', active);
    b.setAttribute('aria-pressed', String(active));
  });

  localStorage.setItem('lang', lang);
}


/* ============================================================
   HEADER — transparent → opaque on scroll
   ============================================================ */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });


/* ============================================================
   HAMBURGER MENU
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('active');
  mobileNav.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});


/* ============================================================
   GALLERY LIGHTBOX — shared by gallery and room cards
   ============================================================ */
let lightboxPool = [];   // current image src array
let lightboxIdx  = 0;

const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev  = document.getElementById('lightboxPrev');
const lightboxNext  = document.getElementById('lightboxNext');

function openLightbox(srcs, index) {
  lightboxPool = srcs;
  lightboxIdx  = index;
  lightboxImg.src = srcs[index];
  lightboxImg.alt = '';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}

function navigateLightbox(direction) {
  lightboxIdx = (lightboxIdx + direction + lightboxPool.length) % lightboxPool.length;
  lightboxImg.src = lightboxPool[lightboxIdx];
}

// Gallery images
const galleryImgs = Array.from(document.querySelectorAll('.gallery-item img'));
const gallerySrcs = galleryImgs.map(img => img.src);
galleryImgs.forEach((img, i) => {
  img.addEventListener('click', () => openLightbox(gallerySrcs, i));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
lightboxNext.addEventListener('click', () => navigateLightbox(1));

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
});

let touchStartX = 0;
lightbox.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });
lightbox.addEventListener('touchend', e => {
  const delta = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(delta) > 50) navigateLightbox(delta < 0 ? 1 : -1);
}, { passive: true });


/* ============================================================
   DISTRIBUCIÓN — ROOM CAROUSEL
   ============================================================ */
const layoutTrack = document.getElementById('layoutTrack');
const layoutPrev  = document.getElementById('layoutPrev');
const layoutNext  = document.getElementById('layoutNext');

function getCardStep() {
  const card = layoutTrack.querySelector('.room-card');
  if (!card) return 340;
  return card.offsetWidth + 24;
}

layoutPrev.addEventListener('click', () => {
  layoutTrack.scrollBy({ left: -getCardStep(), behavior: 'smooth' });
});
layoutNext.addEventListener('click', () => {
  layoutTrack.scrollBy({ left: getCardStep(), behavior: 'smooth' });
});

// Per-card image cycling + lightbox on click
document.querySelectorAll('.room-card').forEach(card => {
  const images = JSON.parse(card.dataset.images || '[]');
  const img  = card.querySelector('.room-img');
  const dots = card.querySelectorAll('.room-dot');
  const prev = card.querySelector('.room-img-prev');
  const next = card.querySelector('.room-img-next');
  let idx = 0;

  function goTo(n) {
    idx = (n + images.length) % images.length;
    img.src = images[idx];
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  if (images.length > 1) {
    prev.addEventListener('click', e => { e.stopPropagation(); goTo(idx - 1); });
    next.addEventListener('click', e => { e.stopPropagation(); goTo(idx + 1); });
  }

  // Click image → open lightbox with this card's full image set
  img.addEventListener('click', () => {
    const srcs = images.length > 0 ? images : [img.getAttribute('src')];
    openLightbox(srcs, idx);
  });
});

// "Ver más / Show more" toggle
document.querySelectorAll('.room-more-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const details = btn.closest('.room-card').querySelector('.room-details');
    const isOpen  = !details.hidden;
    details.hidden = isOpen;
    btn.textContent = isOpen
      ? translations[currentLang]['room.more']
      : translations[currentLang]['room.less'];
  });
});


/* ============================================================
   MODAL COMODIDADES
   ============================================================ */
const modalOverlay = document.getElementById('modalComodidades');
const btnAmenities = document.getElementById('btnAmenities');
const modalClose   = document.getElementById('modalClose');

function openModal() {
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  btnAmenities.setAttribute('aria-expanded', 'true');
  modalClose.focus();
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
  btnAmenities.setAttribute('aria-expanded', 'false');
}

btnAmenities.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});

/* Focus trap inside modal */
modalOverlay.addEventListener('keydown', e => {
  if (!modalOverlay.classList.contains('active')) return;

  if (e.key === 'Escape') {
    closeModal();
    btnAmenities.focus();
    return;
  }

  if (e.key !== 'Tab') return;

  const focusable = Array.from(modalOverlay.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )).filter(el => !el.disabled);

  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) { e.preventDefault(); last.focus(); }
  } else {
    if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
  }
});


/* ============================================================
   SCROLL REVEAL — IntersectionObserver
   ============================================================ */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));


/* ============================================================
   LANGUAGE SWITCHER — init
   ============================================================ */
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

applyLang(localStorage.getItem('lang') || 'es');


/* ============================================================
   GOOGLE MAPS — Two-click consent (GDPR / TTDSG)
   The iframe is created dynamically only after explicit consent,
   so no request is sent to Google before the user opts in.
   ============================================================ */
const MAPS_CONSENT_KEY = 'maps-consent';
const MAPS_EMBED_SRC = 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1945.7747017133515!2d-76.63415946125683!3d-12.74279199688801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDQ0JzM0LjEiUyA3NsKwMzcnNTguMyJX!5e0!3m2!1sde!2ses!4v1775253185858!5m2!1sde!2ses';

function loadMapsIframe() {
  const container = document.getElementById('mapConsent');
  if (!container) return;
  const iframe = document.createElement('iframe');
  iframe.src = MAPS_EMBED_SRC;
  iframe.style.border = '0';
  iframe.loading = 'lazy';
  iframe.referrerPolicy = 'no-referrer-when-downgrade';
  iframe.allowFullscreen = true;
  iframe.title = translations[currentLang]['map.iframeTitle'] || 'Casa Chocaya – Google Maps';
  container.replaceWith(iframe);
}

const mapConsentBtn = document.getElementById('mapConsentBtn');
if (mapConsentBtn) {
  mapConsentBtn.addEventListener('click', () => {
    const remember = document.getElementById('mapConsentRemember');
    if (remember && remember.checked) {
      try { localStorage.setItem(MAPS_CONSENT_KEY, 'granted'); } catch (e) { /* storage unavailable */ }
    }
    loadMapsIframe();
  });
}

try {
  if (localStorage.getItem(MAPS_CONSENT_KEY) === 'granted') {
    loadMapsIframe();
  }
} catch (e) { /* storage unavailable */ }


/* ============================================================
   PERFORMANCE — async image decoding for all images
   ============================================================ */
document.querySelectorAll('img').forEach(img => {
  if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
});

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
