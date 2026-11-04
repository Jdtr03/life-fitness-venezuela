import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Mapeo de alias de hashes Y de rutas legacy para auto-scroll automático
const HASH_ALIASES = {
  'caminadoras': 'trotadoras',
  'trotadoras': 'trotadoras',
  'elipticas': 'elipticas',
  'multifuerzas': 'multigimnasios',
  'multigimnasios': 'multigimnasios',
  'ciclismo-estacionario': 'ciclismo-indoor',
  'ciclismo': 'ciclismo-indoor',
  'ciclismo-indoor': 'ciclismo-indoor',
  'bicicletas': 'bicicletas-verticales',
  'bicicletas-de-ejercicio-lifecycle': 'bicicletas-verticales',
  'bicicletas-verticales': 'bicicletas-verticales',
  'bicicletas-reclinadas': 'bicicletas-reclinadas',
  'contactanos': 'contacto',
  'contacto': 'contacto',
  'planos': 'serie-selectorizada',
  'planner-desing': 'serie-selectorizada',
  'planner-design': 'serie-selectorizada',
  'selectorizada': 'serie-selectorizada',
  'serie-selectorizada': 'serie-selectorizada',
  'banco': 'bancos',
  'bancos': 'bancos',
  'bancos-y-racks': 'bancos'
};

/**
 * ScrollToHash Component
 * Detecta tanto hashes (#seccion) como rutas directas (/bicicletas, /caminadoras, etc.)
 * y realiza un desplazamiento suave automático hacia la sección tan pronto los productos
 * se carguen en el DOM, sin necesidad de recargar la página.
 */
const ScrollToHash = () => {
  const location = useLocation();
  const { pathname, hash, key, search } = location;

  useEffect(() => {
    // 1. Obtener el ID objetivo (sea por hash # o por nombre de ruta limpia)
    const cleanPath = pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    const rawHashId = hash ? decodeURIComponent(hash.replace('#', '')).toLowerCase() : '';
    
    const targetId = rawHashId 
      ? (HASH_ALIASES[rawHashId] || rawHashId)
      : (HASH_ALIASES[cleanPath] || null);

    const searchParams = new URLSearchParams(search);
    const targetItemId = searchParams.get('item');

    if (targetItemId || targetId) {
      const scrollToTarget = () => {
        // Priorizar el elemento específico del producto si existe en el DOM
        if (targetItemId) {
          const productEl = document.getElementById(`product-${targetItemId}`);
          if (productEl) {
            productEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            productEl.classList.add('product-highlight-glow');
            setTimeout(() => productEl.classList.remove('product-highlight-glow'), 2500);
            return true;
          }
        }

        // Si aún no está el producto o se busca la sección general
        if (targetId) {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            return true;
          }
        }
        return false;
      };

      // Si ya está en el DOM, hacer scroll de inmediato
      if (scrollToTarget()) return;

      // Si los productos están cargando desde Supabase, observar el DOM y hacer scroll apenas aparezca
      const observer = new MutationObserver(() => {
        if (scrollToTarget()) {
          observer.disconnect();
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });

      // Límite de seguridad de 4 segundos
      const timer = setTimeout(() => {
        observer.disconnect();
      }, 4000);

      return () => {
        observer.disconnect();
        clearTimeout(timer);
      };
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash, key, search]);

  return null;
};

export default ScrollToHash;
