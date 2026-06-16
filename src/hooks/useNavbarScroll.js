import { useState, useEffect } from 'react';

/**
 * Escucha la posición de scroll de la ventana y retorna si
 * se superó el umbral indicado, más el valor exacto de scrollY.
 * Usa un listener nativo con { passive: true } para máximo rendimiento.
 */
export function useNavbarScroll(threshold = 60) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY,    setScrollY]    = useState(0);

  useEffect(() => {
    /* Verificar posición inicial (página precargada o con anchor) */
    const y0 = window.scrollY;
    setScrollY(y0);
    setIsScrolled(y0 > threshold);

    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setIsScrolled(y > threshold);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { isScrolled, scrollY };
}
