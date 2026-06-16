import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../utils/gsapHelpers';
import { useSectionTitle } from '../hooks/useScrollAnimation';

const PUNTOS = [
  'Educación integral que une lo académico, lo espiritual y lo humano',
  'Bachillerato Técnico con mención en Informática y Agropecuaria',
  'Banda de música activa desde 1967 y amplia oferta extracurricular',
];

export default function AboutPreview() {
  const [titleRef, underlineRef] = useSectionTitle();
  const imageRef = useRef(null);
  const textRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Imagen: fadeInLeft */
      gsap.from(imageRef.current, {
        opacity: 0, x: -60, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: imageRef.current, start: 'top 80%', once: true },
      });

      /* Texto: fadeInRight */
      gsap.from(textRef.current.children, {
        opacity: 0, x: 50, duration: 0.7, ease: 'power2.out', stagger: 0.12,
        scrollTrigger: { trigger: textRef.current, start: 'top 80%', once: true },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 bg-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 items-center lg:grid-cols-2">

          {/* Columna imagen */}
          <div ref={imageRef} className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src="https://placehold.co/600x500/F5F0E8/1B3A6B?text=Nuestra+Comunidad"
                alt="Estudiantes y docentes de la U.E.P. San José"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Badge superpuesto */}
            <div className="absolute -bottom-5 -right-5 sm:-right-6 bg-secondary text-white
              rounded-2xl px-6 py-4 shadow-lg text-center">
              <p className="font-display text-3xl font-bold leading-none">1957</p>
              <p className="font-sans text-xs font-semibold uppercase tracking-widest mt-1 text-white/90">
                Fundado en
              </p>
            </div>
          </div>

          {/* Columna texto */}
          <div ref={textRef} className="flex flex-col gap-6">
            {/* Eyebrow */}
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">
              Quiénes somos
            </p>

            {/* Título con subrayado */}
            <div>
              <h2 ref={titleRef} className="font-display text-3xl font-bold text-primary sm:text-4xl leading-tight">
                Un colegio construido por su comunidad
              </h2>
              <div ref={underlineRef} className="mt-3 h-1 w-16 rounded bg-secondary origin-left" />
            </div>

            {/* Párrafo */}
            <p className="font-sans text-base text-neutral/80 leading-relaxed">
              Desde sus humildes comienzos en 1957, la U.E.P. San José de Carayaca ha crecido
              de la mano de sus familias, sus docentes y su comunidad. Somos una institución
              parroquial que cree en la fuerza de los valores, el poder de la educación y
              el calor del trabajo colectivo.
            </p>

            {/* Puntos clave */}
            <ul className="flex flex-col gap-3">
              {PUNTOS.map(punto => (
                <li key={punto} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center
                    rounded-full bg-secondary/15 text-secondary">
                    <svg aria-hidden="true" className="h-3 w-3" fill="none" viewBox="0 0 24 24"
                      strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  <span className="font-sans text-sm text-neutral/80">{punto}</span>
                </li>
              ))}
            </ul>

            {/* Botón */}
            <Link
              to="/historia"
              className="self-start inline-flex items-center gap-2 rounded-lg border-2
                border-primary px-6 py-3 text-sm font-bold text-primary
                hover:bg-primary hover:text-white transition-all duration-200"
            >
              Nuestra historia completa
              <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
