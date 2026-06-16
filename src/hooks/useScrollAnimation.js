import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, fadeInUp, expandUnderline } from '../utils/gsapHelpers';

/* Hook genérico: recibe una función que describe la animación y
   la limpia automáticamente al desmontar el componente. */
export function useScrollAnimation(animFn, deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => animFn(ref.current), ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/* Hook específico: fadeInUp con ScrollTrigger al entrar al viewport */
export function useFadeInUp(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      fadeInUp(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          once: true,
        },
        ...options,
      });
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/* Hook para título de sección con subrayado animado.
   Retorna [titleRef, underlineRef]. */
export function useSectionTitle() {
  const titleRef     = useRef(null);
  const underlineRef = useRef(null);

  useEffect(() => {
    const els = [titleRef.current, underlineRef.current].filter(Boolean);
    if (!els.length) return;

    const ctx = gsap.context(() => {
      fadeInUp(titleRef.current, {
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', once: true },
      });
      if (underlineRef.current) {
        expandUnderline(underlineRef.current, {
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%', once: true },
          delay: 0.3,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return [titleRef, underlineRef];
}

export { gsap, ScrollTrigger };
