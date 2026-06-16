/* Punto central de registro de GSAP y ScrollTrigger.
   Todos los componentes importan gsap desde aquí para garantizar
   que el plugin se registre una sola vez. */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/* Aparición desde abajo con fundido */
export function fadeInUp(targets, options = {}) {
  return gsap.from(targets, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power2.out',
    ...options,
  });
}

/* Aparición escalonada de múltiples elementos */
export function staggerFadeIn(targets, stagger = 0.15, options = {}) {
  return gsap.from(targets, {
    opacity: 0,
    y: 40,
    duration: 0.7,
    ease: 'power2.out',
    stagger,
    ...options,
  });
}

/* Subrayado decorativo que crece desde la izquierda */
export function expandUnderline(el, options = {}) {
  return gsap.from(el, {
    scaleX: 0,
    transformOrigin: 'left center',
    duration: 0.6,
    ease: 'power2.inOut',
    ...options,
  });
}

/* Contador numérico animado — actualiza el DOM directamente */
export function animateCounter(el, endValue, suffix = '', options = {}) {
  const proxy = { val: 0 };
  return gsap.to(proxy, {
    val: endValue,
    duration: 2,
    ease: 'power1.out',
    onUpdate() {
      el.textContent = Math.round(proxy.val).toLocaleString('es-VE') + suffix;
    },
    ...options,
  });
}
