import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Mapeo de alias comunes de hashes para asegurar compatibilidad con redirecciones antiguas de SEO
const HASH_ALIASES = {
  'caminadoras': 'trotadoras',
  'multifuerzas': 'multigimnasios',
  'ciclismo-estacionario': 'ciclismo-indoor',
  'bicicletas': 'bicicletas-verticales',
  'contactanos': 'contacto'
};

/**
 * ScrollToHash Component
 * Escucha cambios en la URL (pathname, hash, key) usando useLocation de react-router-dom.
 * Si se detecta un #hash, busca el elemento por su ID (o alias) y realiza un desplazamiento suave (scrollIntoView({ behavior: 'smooth' })).
 * Si no hay hash, desplaza al inicio de la página.
 */
const ScrollToHash = () => {
  const location = useLocation();
  const { pathname, hash, key } = location;

  useEffect(() => {
    if (hash) {
      const rawId = decodeURIComponent(hash.replace('#', '')).toLowerCase();
      const aliasId = HASH_ALIASES[rawId];
      let attempts = 0;
      const maxAttempts = 10;

      const scrollToElement = () => {
        const element = document.getElementById(rawId) || (aliasId ? document.getElementById(aliasId) : null);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return true;
        }
        return false;
      };

      // Si el elemento no se encuentra inmediatamente (por ejemplo durante la carga de productos o renderizado), reintentar brevemente
      if (!scrollToElement()) {
        const interval = setInterval(() => {
          attempts += 1;
          if (scrollToElement() || attempts >= maxAttempts) {
            clearInterval(interval);
          }
        }, 100);

        return () => clearInterval(interval);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash, key]);

  return null;
};

export default ScrollToHash;
