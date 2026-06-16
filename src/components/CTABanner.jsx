import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../utils/gsapHelpers';

export default function CTABanner() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        opacity: 0, y: 40, duration: 0.7, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Imagen de fondo */}
      <img
        src="https://placehold.co/1440x600/0F2347/C8972B?text=Únete+a+la+familia+San+José"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-cta-gradient" />

      {/* Contenido */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <div ref={contentRef} className="flex flex-col items-center gap-6">

          <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Inscripciones abiertas 2025–2026
          </span>

          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-tight">
            ¿Listo para ser parte de la{' '}
            <span className="text-secondary italic">familia San José?</span>
          </h2>

          <p className="font-sans text-base text-white/80 max-w-xl leading-relaxed">
            Las inscripciones para el próximo año escolar están abiertas. Acompáñanos
            a construir el futuro de tu hijo en un ambiente de valores, excelencia y comunidad.
          </p>

          <Link
            to="/admision"
            className="inline-flex items-center gap-3 rounded-xl bg-secondary px-10 py-4
              text-base font-bold text-white shadow-xl hover:bg-secondary/90
              transition-all hover:scale-105 hover:shadow-2xl"
          >
            Iniciar proceso de inscripción
            <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
