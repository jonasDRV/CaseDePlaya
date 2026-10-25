/* Guest floor plans, traced schematically from BOOK DE ANTEPROYECTO, pp. 6–8.
 * The owner confirmed the walls and the three/one bedroom split on 2026-10-25.
 * Geometry describes spaces; the ground-floor seating is an illustrative
 * outline of the existing photos, not a furniture survey. Never infer photo
 * assignments from legacy bedroom numbers. Bedroom photo positions were
 * confirmed by the owner; other unconfirmed spaces keep their photos empty.
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
      photo: (name, i, total) => `${name} · Foto ${i} de ${total}`,
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
      stairs: 'Stairs', patio: 'Patio', circulation: 'Hall', back: 'Back to the plan ↑',
      voidLegend: 'Hatching: open void / no floor on this level.',
      seating: 'Sofa, two armchairs and a round table in the ground-floor lounge.',
      photo: (name, i, total) => `${name} · Photo ${i} of ${total}`,
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
          path: 'M40 95 145 87V300H40Z', at: [92, 196], photos: [] },
        { id: 'garage', name: ['Cochera', 'Garage'], label: [['Cochera'], ['Garage']],
          description: ['Estacionamiento dentro de la propiedad, con espacio para dos autos.', 'Parking inside the property, with room for two cars.'],
          path: 'M205 83 460 65V354H205Z', at: [332, 215], kind: 'service', photos: ['ChocayaCarPort'] },
        { id: 'technical-room', name: ['Cuarto técnico', 'Technical room'], label: [['Cuarto', 'técnico'], ['Technical', 'room']],
          description: ['Espacio técnico junto a la cochera.', 'Technical space beside the garage.'],
          path: 'M145 87 205 83V230H145Z', at: [175, 156], labelSize: 12, kind: 'service', interactive: false, photos: [] },
        { id: 'ground-wc', name: ['Baño de visitas · Planta baja', 'Guest bathroom · Ground floor'], label: [['Baño'], ['WC']],
          description: ['Baño junto al hall de ingreso.', 'Bathroom beside the entrance hall.'],
          path: 'M145 230H205V330H145Z', at: [175, 280], kind: 'service', photos: [] },
        { id: 'ground-lounge', name: ['Sala · Planta baja', 'Ground-floor lounge'], label: [['Sala'], ['Lounge']],
          description: ['Un espacio de estar junto a la escalera que conecta los pisos de la casa.', 'A sitting area beside the staircase connecting the house’s floors.'],
          path: 'M85 330H205V535H40V480H85Z', at: [145, 365], photos: ['LobbyAbajo', 'LobbyAbajo2'] },
        { id: 'kitchenette', name: ['Kitchenette · Planta baja', 'Ground-floor kitchenette'], label: [['Kitchenette'], ['Kitchenette']],
          description: ['Kitchenette en una sola línea, con área de lavandería y puerta de conexión con la cochera.', 'A single-run kitchenette with a laundry area and a connecting door to the garage.'],
          path: 'M205 354H295V535H205Z', at: [250, 430], kind: 'service', photos: [] },
        { id: 'ground-bedroom-front', name: ['Dormitorio 3 · Planta baja', 'Bedroom 3 · Ground floor'], label: [['Dormitorio 3'], ['Bedroom 3']],
          description: ['Dormitorio en la planta baja, situado detrás de la cochera en el plano.', 'Ground-floor bedroom immediately behind the garage on the plan.'],
          path: 'M295 354H460V535H295Z', at: [378, 440], photos: ['Dormitorio3'] },
        { id: 'ground-bedroom-left', name: ['Dormitorio 2 · Planta baja', 'Bedroom 2 · Ground floor'], label: [['Dormitorio 2'], ['Bedroom 2']],
          description: ['Dormitorio en la planta baja, junto al patio posterior.', 'Ground-floor bedroom beside the rear patio.'],
          path: 'M40 535H205V680H40Z', at: [122, 606], photos: ['Dormitorio4'] },
        { id: 'ground-shared-bath', name: ['Baño compartido · Planta baja', 'Shared bathroom · Ground floor'], label: [['Baño', 'compartido'], ['Shared', 'bathroom']],
          description: ['Baño compartido situado entre los dormitorios de la planta baja.', 'Shared bathroom between the ground-floor bedrooms.'],
          path: 'M350 535H460V640H350Z', at: [405, 581], kind: 'service', photos: [] },
        { id: 'ground-bedroom-main', name: ['Dormitorio 4 · Planta baja', 'Bedroom 4 · Ground floor'], label: [['Dormitorio 4'], ['Bedroom 4']],
          description: ['Dormitorio de la planta baja, en el lado del parque del condominio.', 'Ground-floor bedroom on the condominium park side.'],
          path: 'M255 595H350V640H460V787L255 805Z', at: [356, 727], photos: ['Dormitorio2'] },
        { id: 'ground-rear-bath', name: ['Baño junto al patio', 'Bathroom beside the patio'], label: [['Baño'], ['Bath']],
          description: ['Baño posterior de la planta baja, junto al patio.', 'Rear ground-floor bathroom beside the patio.'],
          path: 'M40 680H110V819L40 825Z', at: [75, 750], kind: 'service', photos: [] },
        { id: 'ground-patio', name: ['Patio · Planta baja', 'Ground-floor patio'], label: [['Patio'], ['Patio']],
          description: ['Espacio exterior junto al acceso posterior desde el parque.', 'Outdoor space beside the rear entrance from the park.'],
          path: 'M110 680H205V810L110 819Z', at: [157, 752], kind: 'outdoor', photos: [] },
      ],
      stairs: [{ id: 'ground-stairs', outline: 'M40 310H85V480H40Z',
        flights: [{ axis: 'y', from: 322, to: 480, start: 40, end: 85 }],
        route: 'M63 465V325', name: ['Escalera al segundo piso', 'Stairs to the upper floor'] }],
      fixtures: 'M450 370H420V520H450 M276 374H289V478H276Z M276 410H289 M276 444H289 M279 384H286V402H279Z M259 493H285V524H259Z',
      doors: [{ gap: 'M220 354H278', leaf: 'M220 354V412', swing: 'M220 412A58 58 0 0 0 278 354',
        name: ['Puerta entre la cochera y la kitchenette', 'Connecting door between garage and kitchenette'] }],
      seating: true,
      contexts: [['circulation', 230, 713]],
    },
    {
      defaultRoom: 'upper-living',
      // The front forecourt and rear patio exist only at ground level.
      outline: 'M40 180H460V787L205 810V680H110V819L40 825Z',
      rooms: [
        { id: 'upper-wc', name: ['Baño de visitas · Segundo piso', 'Guest bathroom · Upper floor'], label: [['Baño'], ['WC']],
          description: ['Baño de visitas junto a la terraza del segundo piso.', 'Guest bathroom beside the upper-floor terrace.'],
          path: 'M145 180H205V300H145Z', at: [175, 240], kind: 'service', photos: [] },
        { id: 'upper-terrace', name: ['Terraza · Segundo piso', 'Upper-floor terrace'], label: [['Terraza'], ['Terrace']],
          description: ['Terraza contigua a la sala del segundo piso.', 'Terrace adjoining the upper-floor living room.'],
          path: 'M205 180H460V300H205Z', at: [332, 240], kind: 'outdoor', photos: [] },
        { id: 'upper-living', name: ['Sala de estar · Segundo piso', 'Upper-floor living room'], label: [['Sala de estar'], ['Living room']],
          description: ['La zona social principal de la casa, conectada con el comedor, la cocina y la terraza.', 'The main living space, connected to the dining area, kitchen and terrace.'],
          path: 'M205 300H460V535H205Z', at: [332, 420], photos: ['ChocayaSala', 'ChocayaWohnzimmer2', 'Wohnzimmer'] },
        { id: 'upper-bedroom', name: ['Dormitorio 1 · Segundo piso', 'Bedroom 1 · Upper floor'], label: [['Dormitorio 1'], ['Bedroom 1']],
          description: ['El único dormitorio del segundo piso, junto al baño posterior.', 'The only bedroom on the upper floor, beside the rear bathroom.'],
          path: 'M40 535H205V680H40Z', at: [122, 607], photos: ['ChocayaDormitorio'] },
        { id: 'dining', name: ['Comedor', 'Dining area'], label: [['Comedor'], ['Dining']],
          description: ['Comedor junto a la cocina, integrado en la zona social del segundo piso.', 'Dining area beside the kitchen, within the upper-floor living space.'],
          path: 'M205 535H460V625H205Z', at: [332, 580], photos: ['Comedor', 'CocinaComedor'] },
        { id: 'kitchen', name: ['Cocina · Segundo piso', 'Upper-floor kitchen'], label: [['Cocina'], ['Kitchen']],
          description: ['Cocina equipada en el segundo piso, junto al comedor y el balcón.', 'Equipped upper-floor kitchen beside the dining area and balcony.'],
          path: 'M205 625H460V745H205Z', at: [332, 682], kind: 'service', photos: ['ChocayaCocina', 'CocinaDeNoche', 'CocinaComedor'] },
        { id: 'upper-bath', name: ['Baño junto al dormitorio · Segundo piso', 'Bathroom beside the upper-floor bedroom'], label: [['Baño'], ['Bath']],
          description: ['Baño posterior del segundo piso, junto al dormitorio.', 'Rear upper-floor bathroom, beside the bedroom.'],
          path: 'M40 680H110V819L40 825Z', at: [75, 750], kind: 'service', photos: [] },
        { id: 'balcony', name: ['Balcón · Segundo piso', 'Upper-floor balcony'], label: [['Balcón'], ['Balcony']],
          description: ['Balcón en el lado del parque, junto a la cocina.', 'Balcony on the park side, beside the kitchen.'],
          path: 'M205 745H460V787L205 810Z', at: [332, 774], kind: 'outdoor', photos: ['VistaFrontisBalcon', 'VistaParque'] },
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
      contexts: [],
    },
    {
      defaultRoom: 'pool',
      // Above the upper-floor balcony, beside the pool, there is no roof slab.
      outline: 'M40 180H205V300H460V680H40Z',
      rooms: [
        { id: 'pool', name: ['Piscina en la azotea', 'Rooftop pool'], label: [['Piscina'], ['Pool']],
          description: ['Piscina elevada, con una escalera de acceso propia desde la terraza.', 'Raised pool, reached by a separate set of steps from the terrace.'],
          path: 'M40 180H205V300H40Z', water: 'M47 187H198V275H47Z', at: [122, 235], kind: 'water', photos: ['ChocallaPool', 'PoolyMar', 'PoolyVista', 'poolyvistafrontis'] },
        { id: 'bbq', name: ['Zona de parrilla', 'BBQ area'], label: [['Zona de', 'parrilla'], ['BBQ', 'area']],
          description: ['Área de parrilla en la azotea, contigua a la terraza.', 'Rooftop BBQ area adjoining the terrace.'],
          path: 'M40 535H215V680H40Z', at: [127, 607], kind: 'outdoor', photos: ['Terraza'] },
        { id: 'roof-terrace', name: ['Terraza · Azotea', 'Rooftop terrace'], label: [['Terraza'], ['Terrace']],
          description: ['Terraza exterior en el tercer nivel, con vistas al mar.', 'Outdoor terrace on the third level, with sea views.'],
          path: 'M40 300H460V680H215V535H145V490H85V350H40Z', at: [337, 497], kind: 'outdoor', photos: ['ChocallaPool'] },
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
      const group = svgElement('g', { class: 'floorplan-door', role: 'img', 'aria-label': door.name[languageIndex()], 'data-plan-door': 'garage-kitchenette' }, svg);
      svgElement('path', { d: door.gap, class: 'floorplan-door-gap' }, group);
      svgElement('path', { d: door.leaf, class: 'floorplan-door-leaf' }, group);
      svgElement('path', { d: door.swing, class: 'floorplan-door-swing' }, group);
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
    const sizes = '(max-width: 768px) 90vw, 400px';
    ['avif', 'webp'].forEach(format => {
      const source = byId(`floorplan-photo-${format}`);
      source.srcset = `images/${name}-800.${format} 800w, images/${name}-1600.${format} 1600w`;
      source.sizes = sizes;
    });
    photo.src = `images/${name}-1600.webp`;
    photo.alt = t.photo(room.name[languageIndex()], photoIndex + 1, room.photos.length);
    byId('floorplan-photo-count').textContent = t.imageCount(photoIndex + 1, room.photos.length);
    byId('floorplan-photo-prev').hidden = room.photos.length < 2;
    byId('floorplan-photo-next').hidden = room.photos.length < 2;
    byId('floorplan-photo-open').setAttribute('aria-label', `${t.enlarge} · ${room.name[languageIndex()]}`);
  }

  function selectRoom(id, reveal = false) {
    roomId = id;
    photoIndex = 0;
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
    const previousPhoto = photoIndex;
    selectRoom(roomId);
    photoIndex = previousPhoto;
    showPhoto();
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
