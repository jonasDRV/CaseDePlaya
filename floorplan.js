/* Guest floor plans, traced schematically from BOOK DE ANTEPROYECTO, pp. 6–8.
 * The owner confirmed the walls and the three/one bedroom split on 2026-10-25.
 * Geometry describes spaces; the ground-floor seating is an illustrative
 * outline of the existing photos, not a furniture survey. Never infer photo
 * assignments from legacy bedroom numbers. The renovated photo set uses
 * gf_ / 1st_ / 2nd_ for ground / upper / rooftop, matching the plan's rooms.
 * Add/replace each room's photo basenames below when the new photos arrive.
 * Expected assets: images/<basename>-{800,1600}.{avif,webp}.
 */
(() => {
  'use strict';
  const root = document.getElementById('floorplan');
  if (!root) return;

  const copy = {
    es: {
      eyebrow: 'EXPLORA LA CASA', heading: 'Tres niveles, un lugar para desconectar',
      intro: 'Elige un piso y toca un espacio para descubrirlo en fotos.',
      floors: 'Pisos de la casa', tabs: ['01 · Primer piso', '02 · Segundo piso', '03 · Azotea'],
      levels: ['Primer piso · Planta baja', 'Segundo piso', 'Azotea'],
      summaries: ['3 dormitorios · Accesos', '1 dormitorio · Zona social', 'Piscina · Terraza · Parrilla'],
      legend: 'Selecciona un espacio en el plano.',
      selected: 'DESCUBRE CADA ESPACIO', enlarge: 'Ampliar fotos ↗',
      previous: 'Foto anterior', next: 'Foto siguiente', noPhotos: 'Próximamente: fotos de este espacio.',
      note: 'Plano orientativo, sin escala. La distribución sigue el plano arquitectónico; los muebles pueden variar.',
      front: 'Acceso principal · Estacionamiento', rear: 'Parque del condominio',
      stairs: 'Escalera', patio: 'Patio', circulation: 'Paso', back: 'Volver al plano ↑',
      voidLegend: 'Trama: vacío / sin suelo en este nivel.',
      seating: 'Sofá, dos sillones y mesa redonda en la sala de la planta baja.',
      imageCount: (i, total) => `${i} / ${total}`,
    },
    en: {
      eyebrow: 'EXPLORE THE HOUSE', heading: 'Three levels, room to unwind',
      intro: 'Choose a floor and select a space to explore its photos.',
      floors: 'House floors', tabs: ['01 · Ground floor', '02 · Upper floor', '03 · Rooftop'],
      levels: ['Ground floor', 'Upper floor', 'Rooftop'],
      summaries: ['3 bedrooms · Entrances', '1 bedroom · Living spaces', 'Pool · Terrace · BBQ'],
      legend: 'Select a space on the plan.',
      selected: 'DISCOVER EACH SPACE', enlarge: 'Enlarge photos ↗',
      previous: 'Previous photo', next: 'Next photo', noPhotos: 'Photos of this space coming soon.',
      note: 'Illustrative plan, not to scale. The layout follows the architectural plan; furnishings may vary.',
      front: 'Main entrance · Parking', rear: 'Condominium park',
      stairs: 'Stairs', patio: 'Patio', circulation: 'Passage', back: 'Back to the plan ↑',
      voidLegend: 'Hatching: open void / no floor on this level.',
      seating: 'Sofa, two armchairs and a round table in the ground-floor lounge.',
      imageCount: (i, total) => `${i} / ${total}`,
    },
  };


  // Coordinates share the same footprint and orientation on all three floors.
  // Bedroom numbers match the existing room cards and the owner's photo mapping.
  const floors = [
    {
      defaultRoom: 'ground-lounge',
      rooms: [
        { id: 'entrance', name: ['Ingreso y hall', 'Entrance and hall'], label: [['Ingreso', 'y hall'], ['Entrance', '& hall']],
          description: ['El acceso peatonal desde el estacionamiento común continúa en el hall y conecta con la escalera y la sala.', 'The pedestrian entrance from the shared parking area continues into the hall, connecting to the staircase and lounge.'],
          path: 'M40 95 145 87V300H40Z', at: [92, 196], photos: ['exterieur_front', 'gf_lounge_entrance'] },
        { id: 'garage', name: ['Cochera', 'Garage'], label: [['Cochera'], ['Garage']],
          description: ['Cochera privada con espacio para estacionar hasta 2 autos.\nAcceso directo al interior de la casa.', 'Private garage with parking space for up to 2 cars.\nDirect access to the house.'],
          path: 'M205 83 460 65V354H205Z', at: [332, 215], kind: 'service', photos: ['gf_garage'] },
        { id: 'technical-room', name: ['Cuarto técnico', 'Technical room'], label: [['Cuarto', 'técnico'], ['Technical', 'room']],
          description: ['Espacio técnico junto a la cochera.', 'Technical space beside the garage.'],
          path: 'M145 87 205 83V230H145Z', at: [175, 156], labelSize: 12, kind: 'service', interactive: false, photos: [] },
        { id: 'ground-wc', name: ['Baño de visitas · Planta baja', 'Guest bathroom · Ground floor'], label: [['Baño'], ['WC']],
          description: ['Medio baño ubicado junto al ingreso principal.\nCuenta con inodoro y lavatorio.', 'Half bathroom beside the main entrance.\nIncludes a toilet and sink.'],
          path: 'M145 230H205V330H145Z', at: [175, 280], kind: 'service', photos: ['gf_toilet'] },
        { id: 'ground-lounge', name: ['Sala · Planta baja', 'Ground-floor lounge'], label: [['Sala'], ['Lounge']],
          description: ['Un espacio acogedor con sillones de ratán para conversar o relajarse.\nMesa de centro y un ambiente de doble altura que aporta amplitud y luz natural.', 'A cosy space with rattan seating for relaxing or enjoying a conversation.\nA coffee table and double-height space bring in natural light and create an airy feel.'],
          path: 'M85 330H205V535H40V480H85Z', at: [145, 365], photos: ['gf_lounge', 'gf_lounge_entrance'] },
        { id: 'kitchenette', name: ['Kitchenette · Planta baja', 'Ground-floor kitchenette'], label: [['Kitchenette'], ['Kitchenette']],
          description: ['Kitchenette en una sola línea, con área de lavandería y puerta de conexión con la cochera.', 'A single-run kitchenette with a laundry area and a connecting door to the garage.'],
          path: 'M205 354H295V535H205Z', at: [250, 430], kind: 'service', photos: ['gf_lounge_entrance'] },
        { id: 'ground-bedroom-front', name: ['Dormitorio 3 · Planta baja', 'Bedroom 3 · Ground floor'], label: [['Dormitorio 3'], ['Bedroom 3']],
          description: ['Cama de plaza y media.\nComparte un baño completo con ducha tipo lluvia y dos lavatorios con el dormitorio 4.\nAmbiente tranquilo con iluminación natural.', 'A wide single bed (Peruvian plaza y media size).\nShares a full bathroom with a rainfall shower and two sinks with bedroom 4.\nA peaceful room with natural light.'],
          path: 'M295 354H460V535H295Z', at: [378, 440], photos: ['gf_bedroom3'] },
        { id: 'ground-bedroom-left', name: ['Dormitorio 2 · Planta baja', 'Bedroom 2 · Ground floor'], label: [['Dormitorio 2'], ['Bedroom 2']],
          description: ['Cama de 2 plazas con colchón adicional extraíble de plaza y media.\nBaño privado completo con ducha tipo lluvia.\nSalida al área posterior de la casa, con vista al parque del condominio.', 'Double bed with an additional pull-out mattress (Peruvian plaza y media size).\nPrivate full bathroom with a rainfall shower.\nAccess to the rear outdoor area overlooking the condominium park.'],
          path: 'M40 535H205V680H40Z', at: [122, 606], photos: ['gf_bedroom2_1', 'gf_bedroom2_2'] },
        { id: 'ground-shared-bath', name: ['Baño compartido · Planta baja', 'Shared bathroom · Ground floor'], label: [['Baño', 'compartido'], ['Shared', 'bathroom']],
          description: ['Baño completo con ducha tipo lluvia.\nDos lavatorios para mayor comodidad.\nCompartido entre los dormitorios 3 y 4 de la planta baja.', 'Full bathroom with a rainfall shower.\nTwo sinks for added convenience.\nShared between ground-floor bedrooms 3 and 4.'],
          path: 'M350 535H460V640H350Z', at: [405, 581], kind: 'service', photos: ['gf_sharedbath_1'] },
        { id: 'ground-bedroom-main', name: ['Dormitorio 4 · Planta baja', 'Bedroom 4 · Ground floor'], label: [['Dormitorio 4'], ['Bedroom 4']],
          description: ['Cama de 2 plazas con colchón adicional extraíble de plaza y media.\nComparte un baño completo con el dormitorio 3.\nMampara con salida al área posterior y vista al parque.', 'Double bed with an additional pull-out mattress (Peruvian plaza y media size).\nShares a full bathroom with bedroom 3.\nSliding glass doors lead to the rear outdoor area with park views.'],
          path: 'M255 595H350V640H460V787L255 805Z', at: [356, 727], photos: ['gf_bedroom4'] },
        { id: 'ground-rear-bath', name: ['Baño privado · Dormitorio 2', 'Private bathroom · Bedroom 2'], label: [['Baño', 'privado'], ['Private', 'bath']],
          description: ['Baño privado completo del dormitorio 2, junto al patio posterior.\nAcceso únicamente desde el dormitorio 2.\nCuenta con ducha tipo lluvia, inodoro y lavatorio.', 'Private full bathroom for bedroom 2, beside the rear patio.\nAccess only through bedroom 2.\nIncludes a rainfall shower, toilet and sink.'],
          path: 'M40 680H110V819L40 825Z', at: [75, 750], labelSize: 12, kind: 'service', photos: ['gf_bathroom_of_bed2'] },
        { id: 'ground-patio', name: ['Patio · Planta baja', 'Ground-floor patio'], label: [['Patio'], ['Patio']],
          description: ['Patio exterior junto al dormitorio 4 y al acceso posterior desde el parque.\nEl paso de la planta baja conduce directamente al patio.', 'Outdoor patio beside bedroom 4 and the rear entrance from the park.\nThe ground-floor passage leads directly into the patio.'],
          path: 'M110 680H255V805L110 819Z', at: [182, 756], kind: 'outdoor', photos: ['exterieur_back'] },
      ],
      stairs: [{ id: 'ground-stairs', outline: 'M40 310H85V480H40Z',
        flights: [{ axis: 'y', from: 322, to: 480, start: 40, end: 85 }],
        route: 'M63 465V325', name: ['Escalera al segundo piso', 'Stairs to the upper floor'] }],
      fixtures: 'M450 370H420V520H450 M276 374H289V478H276Z M276 410H289 M276 444H289 M279 384H286V402H279Z M259 493H285V524H259Z',
      doors: [
        { id: 'garage-kitchenette', gap: 'M220 354H278', leaf: 'M220 354V412', swing: 'M220 412A58 58 0 0 0 278 354',
          name: ['Puerta entre la cochera y la kitchenette', 'Connecting door between garage and kitchenette'] },
        { id: 'bedroom-2-private-bath', gap: 'M61 680H99', leaf: 'M61 680V718', swing: 'M61 718A38 38 0 0 0 99 680',
          name: ['Único acceso al baño privado desde el dormitorio 2', 'Private bathroom access only through bedroom 2'] },
      ],
      passages: [{ id: 'hall-patio', gap: 'M211 680H249', route: 'M230 641V717',
        name: ['Paso hacia el patio, junto al dormitorio 4', 'Passage leading into the patio beside bedroom 4'] }],
      seating: true,
      contexts: [['circulation', 230, 620]],
    },
    {
      defaultRoom: 'upper-living',
      // The front forecourt and rear patio exist only at ground level.
      outline: 'M40 180H460V787L205 810V680H110V819L40 825Z',
      rooms: [
        { id: 'upper-wc', name: ['Baño de visitas · Segundo piso', 'Guest bathroom · Upper floor'], label: [['Baño'], ['WC']],
          description: ['Medio baño disponible para quienes utilizan las áreas sociales del segundo piso.\nCuenta con inodoro y lavatorio.', 'Half bathroom serving the main living areas on the upper floor.\nIncludes a toilet and sink.'],
          path: 'M145 180H205V300H145Z', at: [175, 240], kind: 'service', photos: ['1st_toilet'] },
        { id: 'upper-terrace', name: ['Balcón con vista al mar', 'Ocean-view balcony'], label: [['Balcón'], ['Balcony']],
          description: ['Un rincón para descansar y disfrutar de la brisa marina.\nDos butacas y una mesa auxiliar bajo un techo tipo sol y sombra.\nVista hacia el mar y el Real Club. El Real Club es independiente y no forma parte del condominio.', 'A relaxing spot to enjoy the sea breeze.\nTwo lounge chairs and a small table beneath a slatted pergola.\nViews of the ocean and Real Club. Real Club is independent and is not part of the condominium.'],
          path: 'M205 180H460V300H205Z', at: [332, 240], kind: 'outdoor', photos: ['1st_balcony_front_2', '1st_balcony_front_1'] },
        { id: 'upper-living', name: ['Sala de estar · Segundo piso', 'Upper-floor living room'], label: [['Sala de estar'], ['Living room']],
          description: ['Un espacio amplio para relajarse y compartir en familia o con amigos.\nSofás y sillones con capacidad aproximada para 8 personas.\nTelevisor y acceso directo al balcón con vista al mar.', 'A spacious area to relax and spend time with family or friends.\nSofas and armchairs seat approximately 8 people.\nA television and direct access to the ocean-view balcony.'],
          path: 'M205 300H460V535H205Z', at: [332, 420], photos: ['1st_living_terrace_1', '1st_living_3', '1st_living_2', '1st_living_night'] },
        { id: 'upper-bedroom', name: ['Dormitorio 1 · Segundo piso', 'Bedroom 1 · Upper floor'], label: [['Dormitorio 1'], ['Bedroom 1']],
          description: ['Un dormitorio acogedor con detalles de inspiración costera.\nBaño privado completo con ducha tipo lluvia.\nVentana con vista al parque interior del condominio.', 'A cosy bedroom with coastal-inspired details.\nPrivate full bathroom with a rainfall shower.\nA window overlooks the condominium’s central park.'],
          path: 'M40 535H205V680H40Z', at: [122, 607], photos: ['1st_bedroom1_1'] },
        { id: 'dining', name: ['Comedor', 'Dining area'], label: [['Comedor'], ['Dining']],
          description: ['Un espacio pensado para compartir las comidas en familia o con amigos.\nMesa de comedor para 8 personas.\nIntegrado con la sala de estar y la cocina.', 'A welcoming space to share meals with family or friends.\nA dining table for 8 people.\nConnected to the living room and kitchen.'],
          path: 'M205 535H460V625H205Z', at: [332, 580], photos: ['1st_dining_2', '1st_dining_1', '1st_dining_living'] },
        { id: 'kitchen', name: ['Cocina · Segundo piso', 'Upper-floor kitchen'], label: [['Cocina'], ['Kitchen']],
          description: ['Cocina con isla central, iluminación y tomacorrientes.\nRefrigeradora, cafetera, licuadora, tostadora y hervidor.\nOllas, vajilla, cubiertos y utensilios para preparar tus comidas.\nMuebles inferiores con espacio de almacenamiento.\nSalida al balcón posterior con vista al parque del condominio.', 'Kitchen with a central island, lighting and power outlets.\nRefrigerator, coffee maker, blender, toaster and electric kettle.\nPots, dishes, cutlery and cooking utensils.\nLower cabinets provide storage space.\nAccess to the rear balcony overlooking the condominium park.'],
          path: 'M205 625H460V745H205Z', at: [332, 682], kind: 'service', photos: ['1st_kitchen', '1st_kitchen_night', '1st_dining_1'] },
        { id: 'upper-bath', name: ['Baño privado · Dormitorio 1', 'Private bathroom · Bedroom 1'], label: [['Baño', 'privado'], ['Private', 'bath']],
          description: ['Baño privado completo del dormitorio 1 en el segundo piso.\nAcceso únicamente desde el dormitorio 1.\nCuenta con ducha tipo lluvia, inodoro y lavatorio.', 'Private full bathroom for upper-floor bedroom 1.\nAccess only through bedroom 1.\nIncludes a rainfall shower, toilet and sink.'],
          path: 'M40 680H110V819L40 825Z', at: [75, 750], labelSize: 12, kind: 'service', photos: ['1st_bathroom_of_bed1'] },
        { id: 'balcony', name: ['Balcón posterior · Vista al parque', 'Rear balcony · Park view'], label: [['Balcón', 'posterior'], ['Rear', 'balcony']],
          description: ['Balcón posterior con vista al parque interior del condominio.\nAcceso desde la cocina del segundo piso.', 'Rear balcony overlooking the condominium’s central park.\nAccess from the upper-floor kitchen.'],
          path: 'M205 745H460V787L205 810Z', at: [332, 774], kind: 'outdoor', photos: ['exterieur_back', 'view_park'] },
      ],
      voids: [
        { id: 'entrance-void', path: 'M40 180H145V300H40Z', at: [92, 240],
          name: ['Vacío sobre el hall de ingreso', 'Open void above the entrance hall'],
          label: [['Vacío', 'sobre hall'], ['Void above', 'entrance']] },
        { id: 'gallery-void', path: 'M85 350H205V490H85Z', at: [145, 420],
          name: ['Galería abierta sobre la sala: doble altura, sin suelo en este nivel', 'Open gallery above the lounge: double-height void with no floor at this level'],
          label: [['Vacío', 'doble altura'], ['Double-height', 'void']] },
      ],
      stairs: [{ id: 'upper-stairs', outline: 'M40 350H85V490H145V535H40Z',
        flights: [{ axis: 'y', from: 362, to: 490, start: 40, end: 85 }, { axis: 'x', from: 97, to: 145, start: 490, end: 535 }],
        route: 'M135 512H63V365', name: ['Escalera en L hacia la azotea', 'L-shaped stairs to the rooftop'],
        label: [['A la azotea'], ['To rooftop']], at: [140, 329] }],
      fixtures: 'M217 732V713H450V640 M430 640V713 M300 717H334V737H300Z',
      doors: [{ id: 'bedroom-1-private-bath', gap: 'M61 680H99', leaf: 'M61 680V718', swing: 'M61 718A38 38 0 0 0 99 680',
        name: ['Único acceso al baño privado desde el dormitorio 1', 'Private bathroom access only through bedroom 1'] }],
      contexts: [],
    },
    {
      defaultRoom: 'pool',
      // Above the upper-floor balcony, beside the pool, there is no roof slab.
      outline: 'M40 180H205V300H460V680H40Z',
      rooms: [
        { id: 'pool', name: ['Piscina en la azotea', 'Rooftop pool'], label: [['Piscina'], ['Pool']],
          description: ['Piscina privada con vistas hacia el mar y el Real Club.\nEspacio con reposeras para descansar y tomar sol.\nBarra con bancos para compartir una bebida y disfrutar de las vistas.\nEl Real Club es independiente y no forma parte del condominio.', 'Private pool overlooking the ocean and Real Club.\nSun loungers for relaxing and enjoying the sunshine.\nA bar counter with stools for enjoying drinks and taking in the views.\nReal Club is independent and is not part of the condominium.'],
          path: 'M40 180H205V300H40Z', water: 'M47 187H198V275H47Z', at: [122, 235], kind: 'water', photos: ['2nd_pool_view_2', '2nd_pool_1', '2nd_pool_view_1', '2nd_pool_view_3'] },
        { id: 'bbq', name: ['Zona de parrilla', 'BBQ area'], label: [['Zona de', 'parrilla'], ['BBQ', 'area']],
          description: ['Un ambiente para compartir comidas y reuniones al aire libre.\nParrilla y barra de apoyo para preparar y servir.\nÁrea parcialmente techada, con iluminación para disfrutar también por la noche.', 'A welcoming space for outdoor meals and gatherings.\nA BBQ grill and counter space for preparing and serving food.\nA partially covered area with lighting for evening use.'],
          path: 'M40 535H215V680H40Z', at: [127, 607], kind: 'outdoor', photos: ['2nd_terrace_bbq'] },
        { id: 'roof-terrace', name: ['Terraza · Azotea', 'Rooftop terrace'], label: [['Terraza'], ['Terrace']],
          description: ['Un espacio al aire libre para disfrutar del sol y las vistas.\nZonas abiertas y parcialmente techadas.\nVistas hacia el mar, los cerros y los alrededores.', 'An outdoor space to enjoy the sunshine and scenic views.\nOpen-air and partially covered areas.\nViews of the ocean, surrounding hills and neighbourhood.'],
          path: 'M40 300H460V680H215V535H145V490H85V350H40Z', at: [337, 497], kind: 'outdoor', photos: ['2nd_terrace_seaview', '2nd_terrace_parkview', '2nd_terrace_bbq'] },
      ],
      stairs: [
        { id: 'roof-house-stairs', outline: 'M40 350H85V490H145V535H40Z',
          flights: [{ axis: 'y', from: 362, to: 490, start: 40, end: 85 }, { axis: 'x', from: 97, to: 145, start: 490, end: 535 }],
          route: 'M63 365V512H135', name: ['Escalera de la casa al segundo piso', 'House stairs to the upper floor'],
          label: [['Al segundo', 'piso'], ['To upper', 'floor']], at: [144, 432] },
        { id: 'roof-pool-stairs', outline: 'M85 300H130V365H85Z',
          flights: [{ axis: 'y', from: 311, to: 365, start: 85, end: 130 }],
          route: 'M107 354V310', name: ['Escalera de acceso a la piscina elevada', 'Steps up to the raised pool area'],
          label: [['Acceso', 'piscina'], ['Pool', 'steps']], at: [185, 329], kind: 'pool' },
      ],
      fixtures: 'M49 548H68V670H49Z M429 315H451V665H429',
      contexts: [],
    },
  ];

  const ns = 'http://www.w3.org/2000/svg';
  const byId = id => document.getElementById(id);
  const map = byId('floorplan-map');
  const photo = byId('floorplan-photo');
  const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
  let floorIndex = 0;
  let roomId = floors[0].defaultRoom;
  let photoIndex = 0;
  let lang = document.documentElement.lang === 'en' ? 'en' : 'es';
  const languageIndex = () => lang === 'en' ? 1 : 0;
  const selectedRoom = () => floors[floorIndex].rooms.find(room => room.id === roomId);

  function svgElement(tag, attributes, parent) {
    const node = document.createElementNS(ns, tag);
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
    if (parent) parent.append(node);
    return node;
  }

  function svgLabel(parent, lines, at, className) {
    const [x, y] = at;
    const label = svgElement('text', { x, y: y - ((lines.length - 1) * 9), class: className, 'aria-hidden': 'true' }, parent);
    lines.forEach((line, index) => {
      svgElement('tspan', { x, dy: index === 0 ? 0 : 20 }, label).textContent = line;
    });
    return label;
  }

  function drawSeating(svg) {
    const seating = svgElement('g', { class: 'floorplan-furniture', role: 'img', 'aria-label': copy[lang].seating, 'data-plan-furniture': 'lounge' }, svg);
    // A small sofa, two separate armchairs and a round table, as in LobbyAbajo.
    svgElement('rect', { x: 114, y: 406, width: 66, height: 29, rx: 4 }, seating);
    svgElement('path', { d: 'M120 413H174V430H120Z M147 413V430' }, seating);
    svgElement('rect', { x: 109, y: 407, width: 8, height: 29, rx: 3 }, seating);
    svgElement('rect', { x: 177, y: 407, width: 8, height: 29, rx: 3 }, seating);
    [[94, -25], [174, 25]].forEach(([x, angle]) => {
      const chair = svgElement('g', { transform: `rotate(${angle} ${x + 13} 479)` }, seating);
      svgElement('rect', { x, y: 464, width: 26, height: 30, rx: 5 }, chair);
      svgElement('path', { d: `M${x + 4} 471H${x + 22}V489H${x + 4}Z` }, chair);
    });
    svgElement('circle', { cx: 147, cy: 466, r: 17, class: 'floorplan-table' }, seating);
  }

  function drawArchitecture(svg, floor) {
    (floor.voids || []).forEach(voidArea => {
      const group = svgElement('g', { class: 'floorplan-void', role: 'img', 'aria-label': voidArea.name[languageIndex()], 'data-plan-void': voidArea.id }, svg);
      svgElement('path', { d: voidArea.path, class: 'floorplan-void-shape' }, group);
      svgLabel(group, voidArea.label[languageIndex()], voidArea.at, 'floorplan-annotation');
    });

    const symbols = svgElement('g', { class: 'floorplan-symbols', 'aria-hidden': 'true' }, svg);
    if (floor.fixtures) svgElement('path', { d: floor.fixtures }, symbols);
    floor.stairs.forEach(stair => {
      const group = svgElement('g', { class: `floorplan-staircase${stair.kind ? ` floorplan-staircase--${stair.kind}` : ''}`, role: 'img', 'aria-label': stair.name[languageIndex()], 'data-plan-stairs': stair.id }, svg);
      svgElement('path', { d: stair.outline, class: 'floorplan-stair-outline' }, group);
      stair.flights.forEach(flight => {
        for (let step = flight.from; step < flight.to; step += 12) {
          const d = flight.axis === 'y' ? `M${flight.start} ${step}H${flight.end}` : `M${step} ${flight.start}V${flight.end}`;
          svgElement('path', { d, class: 'floorplan-stair-tread' }, group);
        }
      });
      svgElement('path', { d: stair.route, class: 'floorplan-stair-direction', 'marker-end': 'url(#floorplan-stair-arrow)' }, group);
      if (stair.label) svgLabel(group, stair.label[languageIndex()], stair.at, 'floorplan-annotation');
    });

    (floor.doors || []).forEach(door => {
      const group = svgElement('g', { class: 'floorplan-door', role: 'img', 'aria-label': door.name[languageIndex()], 'data-plan-door': door.id }, svg);
      svgElement('path', { d: door.gap, class: 'floorplan-door-gap' }, group);
      svgElement('path', { d: door.leaf, class: 'floorplan-door-leaf' }, group);
      svgElement('path', { d: door.swing, class: 'floorplan-door-swing' }, group);
    });
    (floor.passages || []).forEach(passage => {
      const group = svgElement('g', { class: 'floorplan-passage', role: 'img', 'aria-label': passage.name[languageIndex()], 'data-plan-passage': passage.id }, svg);
      svgElement('path', { d: passage.gap, class: 'floorplan-passage-gap' }, group);
      svgElement('path', { d: passage.route, class: 'floorplan-stair-direction', 'marker-end': 'url(#floorplan-stair-arrow)' }, group);
    });
    if (floor.seating) drawSeating(svg);
  }

  function drawPlan() {
    const t = copy[lang];
    const floor = floors[floorIndex];
    const svg = svgElement('svg', {
      viewBox: '0 0 500 880', class: 'floorplan-map', role: 'group',
      'aria-labelledby': 'floorplan-svg-title floorplan-svg-description',
    });
    svgElement('title', { id: 'floorplan-svg-title' }, svg).textContent = t.levels[floorIndex];
    svgElement('desc', { id: 'floorplan-svg-description' }, svg).textContent = t.legend;
    const defs = svgElement('defs', {}, svg);
    const hatch = svgElement('pattern', { id: 'floorplan-void-hatch', width: 9, height: 9, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs);
    svgElement('rect', { width: 9, height: 9, class: 'floorplan-hatch-background' }, hatch);
    svgElement('path', { d: 'M0 0V9', class: 'floorplan-hatch-line' }, hatch);
    const arrow = svgElement('marker', { id: 'floorplan-stair-arrow', markerWidth: 7, markerHeight: 7, refX: 6, refY: 3.5, orient: 'auto', markerUnits: 'userSpaceOnUse' }, defs);
    svgElement('path', { d: 'M0 0 7 3.5 0 7Z', class: 'floorplan-arrowhead' }, arrow);
    svgElement('text', { x: 250, y: 36, class: 'floorplan-context' }, svg).textContent = t.front;
    svgElement('path', { d: floor.outline || 'M40 95 460 65V787L40 825Z', class: 'floorplan-outline' }, svg);

    floor.rooms.forEach(room => {
      const interactive = room.interactive !== false;
      const group = svgElement('g', {
        class: `${interactive ? 'floorplan-room' : 'floorplan-static-room'}${room.kind ? ` floorplan-room--${room.kind}` : ''}`,
        'aria-label': room.name[languageIndex()],
        ...(interactive ? {
          role: 'button', tabindex: '0',
          'aria-pressed': String(room.id === roomId), 'aria-controls': 'floorplan-room-details',
          'data-room': room.id,
        } : { role: 'img', 'data-static-room': room.id }),
      }, svg);
      svgElement('path', { d: room.path, class: 'floorplan-room-shape' }, group);
      if (room.water) svgElement('path', { d: room.water, class: 'floorplan-pool-water', 'aria-hidden': 'true' }, group);
      const text = svgLabel(group, room.label[languageIndex()], room.at, 'floorplan-room-label');
      if (room.labelSize) text.style.fontSize = `${room.labelSize}px`;
      if (!interactive) return;
      group.addEventListener('click', () => selectRoom(room.id, true));
      group.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectRoom(room.id, true);
        }
      });
    });

    drawArchitecture(svg, floor);
    floor.contexts.forEach(([key, x, y]) => {
      svgElement('text', { x, y, class: 'floorplan-context' }, svg).textContent = t[key];
    });
    svgElement('text', { x: 250, y: 855, class: 'floorplan-context' }, svg).textContent = t.rear;
    map.replaceChildren(svg);

  }

  function showPhoto() {
    const room = selectedRoom();
    const t = copy[lang];
    const available = room.photos.length > 0;
    byId('floorplan-photos').hidden = !available;
    byId('floorplan-empty').hidden = available;
    if (!available) {
      photo.removeAttribute('src');
      byId('floorplan-photo-avif').removeAttribute('srcset');
      byId('floorplan-photo-webp').removeAttribute('srcset');
      return;
    }
    const name = room.photos[photoIndex];

    const sizes = '(max-width: 520px) calc(100vw - 5rem), (max-width: 768px) calc(100vw - 6.5rem), (max-width: 1200px) calc(42.55vw - 5.8rem), 420px';
    ['avif', 'webp'].forEach(format => {
      const source = byId(`floorplan-photo-${format}`);
      source.srcset = casaImages.srcset(name, format);
      source.sizes = sizes;
    });
    photo.src = `images/${name}-1600.webp`;
    casaImages.apply(photo, lang);
    byId('floorplan-photo-count').textContent = t.imageCount(photoIndex + 1, room.photos.length);
    byId('floorplan-photo-prev').hidden = room.photos.length < 2;
    byId('floorplan-photo-next').hidden = room.photos.length < 2;
    byId('floorplan-photo-open').setAttribute('aria-label', `${t.enlarge} · ${room.name[languageIndex()]}`);
  }

  function selectRoom(id, reveal = false, selectedPhoto = 0) {
    roomId = id;
    photoIndex = selectedPhoto;
    root.querySelectorAll('[data-room]').forEach(node => node.setAttribute('aria-pressed', String(node.dataset.room === id)));
    const room = selectedRoom();
    byId('floorplan-room-name').textContent = room.name[languageIndex()];
    byId('floorplan-room-description').textContent = room.description[languageIndex()];
    showPhoto();
    if (reveal && window.matchMedia('(max-width: 768px)').matches) {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      root.querySelector('.floorplan-details').scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });
    }
  }

  function render() {
    const t = copy[lang];
    root.querySelectorAll('[data-plan-text]').forEach(node => { node.textContent = t[node.dataset.planText]; });
    root.querySelectorAll('[data-plan-aria]').forEach(node => { node.setAttribute('aria-label', t[node.dataset.planAria]); });
    tabs.forEach((tab, index) => {
      tab.textContent = t.tabs[index];
      tab.setAttribute('aria-selected', String(index === floorIndex));
      tab.tabIndex = index === floorIndex ? 0 : -1;
    });
    byId('floorplan-panel').setAttribute('aria-labelledby', `floorplan-tab-${floorIndex}`);
    byId('floorplan-level-title').textContent = t.levels[floorIndex];
    byId('floorplan-level-summary').textContent = t.summaries[floorIndex];
    byId('floorplan-void-legend').textContent = t.voidLegend;
    byId('floorplan-void-legend').hidden = !(floors[floorIndex].voids || []).length;
    drawPlan();
    // Language changes preserve both the selected room and photo.
    selectRoom(roomId, false, photoIndex);
  }

  function selectFloor(index) {
    floorIndex = index;
    roomId = floors[index].defaultRoom;
    photoIndex = 0;
    render();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectFloor(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      selectFloor(next);
      tabs[next].focus();
    });
  });

  function cyclePhoto(direction) {
    const count = selectedRoom().photos.length;
    if (!count) return;
    photoIndex = (photoIndex + direction + count) % count;
    showPhoto();
  }
  byId('floorplan-photo-prev').addEventListener('click', () => cyclePhoto(-1));
  byId('floorplan-photo-next').addEventListener('click', () => cyclePhoto(1));
  byId('floorplan-photo-open').addEventListener('click', () => {
    const room = selectedRoom();
    if (!room.photos.length) return;
    openLightbox(room.photos.map(name => `images/${name}-1600.webp`), photoIndex, room.name[languageIndex()]);
  });

  const back = document.createElement('button');
  back.type = 'button';
  back.className = 'floorplan-back';
  back.dataset.planText = 'back';
  back.addEventListener('click', () => {
    const selected = map.querySelector('[aria-pressed="true"]');
    selected.focus({ preventScroll: true });
    map.scrollIntoView({ block: 'start', behavior: 'instant' });
  });
  root.querySelector('.floorplan-details').append(back);

  new MutationObserver(() => {
    const next = document.documentElement.lang === 'en' ? 'en' : 'es';
    if (next === lang) return;
    lang = next;
    render();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  render();
  root.hidden = false;
})();
