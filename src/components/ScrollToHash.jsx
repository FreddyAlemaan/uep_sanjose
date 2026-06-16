import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router no hace scroll automático a anclas (#hash) al navegar
 * entre rutas con <Link>. Este componente lo implementa: cuando la URL
 * tiene un hash, busca el elemento con ese id y hace scroll suave hasta
 * él. Reintenta brevemente porque, al navegar desde otra página, el DOM
 * de la página destino puede tardar uno o dos renders en montarse.
 */
export default function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }

    const id = hash.replace('#', '');
    let attempts = 0;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      attempts += 1;
      if (attempts < 10) setTimeout(tryScroll, 50);
    };

    tryScroll();
  }, [hash, pathname]);

  return null;
}
