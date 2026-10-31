/**
 * Clasificador biomecánico inteligente de enfoque muscular
 * Asigna 'Tren Superior', 'Tren Inferior' o 'Abdominales'
 * analizando el título y la descripción del equipo.
 */
export function classifyMuscleFocus(title = '', desc = '') {
  const t = (title || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const d = (desc || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const full = `${t} ${d}`;

  // 1. Abdominales y Core (Abdomen, Torso Rotation, Back Extension / Lumbar)
  if (
    /abdom|crunch|core|torso rotation|oblicuo|tronco|lumbar|back extension/i.test(t) || 
    /abdom|crunch|oblicuo|rotadores del tronco|flexion de tronco/i.test(full)
  ) {
    return 'Abdominales';
  }

  // 2. Tren Inferior (Piernas, Glúteos, Femoral, Cuádriceps, Gemelos, Aductores, Abductores, Calf, Hip)
  if (
    /leg|pierna|squat|prensa|press leg|femoral|cuadric|glute|calf|gemelo|abduct|adduct|hip |hip&|cadera|soleo|talon/i.test(t) ||
    /isquiotibial|cuadricep|gluteo|gemelo|pantorrilla|aductores|abductores|prensa de pierna|curl femoral|puente de gluteo/i.test(full)
  ) {
    return 'Tren Inferior';
  }

  // 3. Tren Superior (Pecho, Espalda, Hombros, Brazos, Bíceps, Tríceps, Deltoides, etc.)
  return 'Tren Superior';
}
