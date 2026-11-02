/**
 * Clasificador biomecánico inteligente y riguroso de enfoque corporal / muscular.
 * Analiza el título, la descripción y la subcategoría del equipo para determinar
 * de forma precisa qué grupo muscular o zona del cuerpo se beneficia:
 * - 'Tren Inferior' (Piernas, Cuádriceps, Isquiotibiales, Glúteos, Gemelos, Trotadoras, Ciclismo)
 * - 'Tren Superior' (Pectoral, Espalda, Hombros, Bíceps, Tríceps, Bancos de Press, Dominadas)
 * - 'Abdominales' (Core, Pared Abdominal, Hiperextensión Lumbar, Elevación de Piernas)
 * - 'Cuerpo Completo' (Elípticas, Remos, Air Bikes, Multigimnasios, Entrenamiento Funcional)
 */
export function classifyMuscleFocus(title = '', desc = '', subCatName = '') {
  const t = (title || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const d = (desc || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const s = (subCatName || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const full = `${t} ${d} ${s}`;

  // 1. TROTADORAS / CAMINADORAS (TREN INFERIOR: Cuádriceps, Isquiotibiales, Glúteos, Gemelos)
  if (
    s.includes('trotadora') || 
    s.includes('treadmill') || 
    /trotadora|caminadora|treadmill|cinta de correr|runner/i.test(t) ||
    /cinta de correr|trotadora|caminadora/i.test(d)
  ) {
    return 'Tren Inferior';
  }

  // 2. BICICLETAS / CICLISMO (TREN INFERIOR: Cuádriceps, Femorales, Gemelos, Glúteos)
  // Nota: Air Bike combina tren superior e inferior coordinados, se clasifica en Cuerpo Completo
  if (!/air bike/i.test(full)) {
    if (
      s.includes('bicicleta') || 
      s.includes('ciclismo') || 
      /indoor bike|switchcycle|estatica|pedal/i.test(t) ||
      /\bbicicleta\b/i.test(d) ||
      (/c1|c3|rs1|rs3|ic3|ic5|ic6|ic7/i.test(t) && /bike|bicicleta|pedal/i.test(full))
    ) {
      return 'Tren Inferior';
    }
  }

  // 3. CUERPO COMPLETO / FULL BODY (Elípticas, Remos, Air Bikes, Multigimnasios, Flexibilidad Asistida)
  if (
    s.includes('air bike') || 
    s.includes('eliptica') || 
    s.includes('remo') ||
    /air bike/i.test(full) ||
    /cross trainer|crosstrainer|eliptica/i.test(full) ||
    ((/row trainer|heat row|\bremo\b|\brow\b/i.test(full)) && !/seated row|low row/i.test(t)) ||
    /flexibility trainer|estiramiento asistido/i.test(full)
  ) {
    return 'Cuerpo Completo';
  }

  // 4. MULTIGIMNASIOS (Home Gyms G2, G4, G7: Estaciones multifuerza integrales para todo el cuerpo)
  if (
    s.includes('multigimnasio') || 
    ((/home gym|multigimnasio/i.test(t) || /\bg2\b|\bg4\b|\bg7\b/i.test(t)) && !/bench|banco/i.test(t))
  ) {
    return 'Cuerpo Completo';
  }

  // 5. BANCOS Y ESTACIONES ESPECÍFICAS
  // A. Estaciones de dominadas y fondos (Chin / Dip) -> Tren Superior (Dorsal, Bíceps, Pectoral, Tríceps)
  if (/chin|dip/i.test(t) && /chin/i.test(t)) {
    return 'Tren Superior';
  }

  // B. Bancos y torres de elevación de piernas (Leg Raise sin dominadas) -> Abdominales / Core
  if (/leg raise/i.test(t) && !/chin/i.test(t)) {
    return 'Abdominales';
  }

  // C. Bancos de abdominales, hiperextensión lumbar y rotación de tronco -> Abdominales
  if (
    /abdom|crunch|back extension|hiperextension/i.test(t) ||
    /banco abdominal|flexion de tronco|hiperextensiones/i.test(full)
  ) {
    return 'Abdominales';
  }

  // D. Bancos de pesas libres (Plano, Inclinado, Declinado, Ajustable, Militar, Arm Curl, Storage, etc.) -> Tren Superior
  if (
    /bench|banco|arm curl|military|flat|incline|decline|press/i.test(t) && 
    (s.includes('banco') || /bench|banco/i.test(t))
  ) {
    return 'Tren Superior';
  }

  // 6. SERIE SELECTORIZADA Y MÁQUINAS ESPECÍFICAS
  // A. Abdominales y Core
  if (
    /abdom|crunch|torso rotation|core|tronco|lumbar|back extension|oblicuo/i.test(t) ||
    /recto abdominal|rotadores del tronco|flexion de tronco/i.test(full)
  ) {
    return 'Abdominales';
  }

  // B. Tren Inferior (Piernas, Glúteos, Femorales, Cuádriceps, Gemelos, Aductores, Abductores, Prensas)
  if (
    /leg|pierna|squat|prensa|press leg|femoral|cuadric|glute|calf|gemelo|pantorrilla|abduct|adduct|hip |hip&|cadera|soleo/i.test(t) ||
    /isquiotibial|cuadricep|gluteo|gemelo|pantorrilla|aductores|abductores|prensa de pierna|curl femoral|puente de gluteo|extension de pierna|curl de pierna/i.test(full)
  ) {
    return 'Tren Inferior';
  }

  // C. Estaciones de polea doble cruzada (DAP / Dual Adjustable Pulley)
  if (/dual adjustable pulley|cable motion/i.test(t)) {
    return 'Cuerpo Completo';
  }

  // D. Tren Superior (Pecho, Espalda, Hombros, Brazos, Bíceps, Tríceps)
  if (
    /chest|press|pecho|pec |pectoral|fly|pulldown|pull down|row|remo|dorsal|espalda|shoulder|deltoid|lateral raise|hombro|bicep|tricep|curl|arm |brazo|dip|chin/i.test(t) ||
    /pectoral|dorsal|deltoides|biceps|triceps|trapecio|romboides|pecho|espalda/i.test(full)
  ) {
    return 'Tren Superior';
  }

  // 7. Respaldo general para fuerza
  return 'Tren Superior';
}
