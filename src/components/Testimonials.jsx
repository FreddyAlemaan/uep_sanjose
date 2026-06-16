import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapHelpers';
import { useSectionTitle } from '../hooks/useScrollAnimation';

const TESTIMONIOS = [
  {
    nombre:     'Carmen Rodríguez',
    año:        'Egresada 2008 · Representante actual',
    avatar:     'https://placehold.co/80x80/C8972B/FFFFFF?text=CR',
    cita:       'Confié en San José para mi educación y ahora confío en ellos para la de mis hijos. Es un colegio que realmente se preocupa por cada familia.',
  },
  {
    nombre:     'José Ángel Martínez',
    año:        'Egresado 2015',
    avatar:     'https://placehold.co/80x80/1B3A6B/FFFFFF?text=JM',
    cita:       'La mención en Informática me abrió las puertas a la universidad. Siempre recuerdo a mis profesores con gratitud; me enseñaron más que materias, me enseñaron a pensar.',
  },
  {
    nombre:     'Mariela Fuentes',
    año:        'Representante — 3 hijos en la institución',
    avatar:     'https://placehold.co/80x80/C8972B/FFFFFF?text=MF',
    cita:       'El nivel de atención y compromiso de los docentes no lo he visto en otro colegio. Mis tres hijos han crecido aquí y estoy muy orgullosa de esta comunidad.',
  },
  {
    nombre:     'Andrés Tovar',
    año:        'Egresado 2019',
    avatar:     'https://placehold.co/80x80/1B3A6B/FFFFFF?text=AT',
    cita:       'La banda de música fue la experiencia más transformadora de mi vida. Aprendí disciplina, trabajo en equipo y amor por el arte. San José me formó como persona.',
  },
  {
    nombre:     'Lucía Bermúdez',
    año:        'Representante — Preescolar',
    avatar:     'https://placehold.co/80x80/C8972B/FFFFFF?text=LB',
    cita:       'Desde el primer día mi hija se sintió amada y segura. El equipo de preescolar es extraordinario; se nota que disfrutan lo que hacen.',
  },
  {
    nombre:     'Rafael Pérez',
    año:        'Egresado 2011',
    avatar:     'https://placehold.co/80x80/1B3A6B/FFFFFF?text=RP',
    cita:       'Carayaca nos une, San José nos forma. Es más que un colegio: es el corazón de nuestra comunidad y estoy feliz de haber crecido entre sus pasillos.',
  },
];

const VISIBLE = 3; // Cuántos testimonios mostrar simultáneamente en desktop

export default function Testimonials() {
  const [inicio, setInicio] = useState(0);
  const [titleRef, underlineRef] = useSectionTitle();
  const sliderRef  = useRef(null);
  const sectionRef = useRef(null);
  const timerRef   = useRef(null);

  const total    = TESTIMONIOS.length;
  const maxInicio = total - VISIBLE;

  /* Avanzar al siguiente grupo con fade GSAP */
  const siguiente = useCallback(() => {
    const el = sliderRef.current;
    gsap.to(el, {
      opacity: 0, x: -20, duration: 0.25, ease: 'power1.in',
      onComplete: () => {
        setInicio(prev => (prev >= maxInicio ? 0 : prev + 1));
        gsap.fromTo(el, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power1.out' });
      },
    });
  }, [maxInicio]);

  const anterior = () => {
    const el = sliderRef.current;
    gsap.to(el, {
      opacity: 0, x: 20, duration: 0.25, ease: 'power1.in',
      onComplete: () => {
        setInicio(prev => (prev <= 0 ? maxInicio : prev - 1));
        gsap.fromTo(el, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power1.out' });
      },
    });
  };

  /* Auto-slide cada 4 segundos */
  useEffect(() => {
    timerRef.current = setInterval(siguiente, 4000);
    return () => clearInterval(timerRef.current);
  }, [siguiente]);

  /* Animación de entrada al viewport */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0, y: 40, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  /* Determinar cuántos cards mostrar según tamaño de pantalla */
  const visibles = TESTIMONIOS.slice(inicio, inicio + VISIBLE);

  return (
    <section ref={sectionRef} className="py-20 bg-accent overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Encabezado */}
        <div className="text-center mb-12">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-3">
            Testimonios
          </p>
          <h2 ref={titleRef} className="font-display text-3xl font-bold text-primary sm:text-4xl">
            Lo que dicen las familias San José
          </h2>
          <div className="flex justify-center mt-3">
            <div ref={underlineRef} className="h-1 w-16 rounded bg-secondary origin-left" />
          </div>
        </div>

        {/* Slider */}
        <div ref={sliderRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibles.map(({ nombre, año, avatar, cita }) => (
            <article
              key={nombre}
              className="flex flex-col gap-5 rounded-2xl bg-white p-8 shadow-sm border border-white"
            >
              {/* Comillas decorativas */}
              <svg aria-hidden="true" className="h-8 w-8 text-secondary/30" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>

              <p className="font-sans text-sm text-neutral/80 leading-relaxed flex-1 italic">"{cita}"</p>

              {/* Autor */}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <img
                  src={avatar}
                  alt={`Foto de ${nombre}`}
                  className="h-10 w-10 rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="font-sans text-sm font-semibold text-primary">{nombre}</p>
                  <p className="font-sans text-xs text-neutral/60">{año}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Controles */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={anterior}
            aria-label="Testimonio anterior"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30
              text-primary hover:bg-primary hover:text-white transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Puntos de posición */}
          <div className="flex gap-2">
            {Array.from({ length: maxInicio + 1 }).map((_, i) => (
              <button
                key={i}
                aria-label={`Ir al grupo ${i + 1}`}
                onClick={() => setInicio(i)}
                className={`h-2 rounded-full transition-all duration-300
                  ${inicio === i ? 'w-6 bg-secondary' : 'w-2 bg-primary/20 hover:bg-primary/40'}`}
              />
            ))}
          </div>

          <button
            onClick={siguiente}
            aria-label="Testimonio siguiente"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30
              text-primary hover:bg-primary hover:text-white transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
