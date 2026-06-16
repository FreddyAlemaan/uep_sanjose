import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../utils/gsapHelpers';
import { useSectionTitle } from '../hooks/useScrollAnimation';
import imgInicial      from '../assets/nivel-inicial.png';
import imgBasica       from '../assets/hero-primaria.png';
import imgBachillerato from '../assets/nivel-bachillerato.png';

const NIVELES = [
  {
    id: 'preescolar',
    label: 'Preescolar',
    imagen: imgInicial,
    descripcion:
      'Nuestro nivel preescolar ofrece un ambiente cálido y estimulante para niñas y niños de 3 a 6 años. ' +
      'A través del juego, el arte y la exploración, sentamos las bases cognitivas, emocionales y sociales ' +
      'que acompañarán a cada estudiante durante toda su vida escolar.',
    menciones: ['Maternal y Preescolar', 'Enfoque lúdico-afectivo', 'Atención personalizada'],
  },
  {
    id: 'basica',
    label: 'Educación Básica',
    imagen: imgBasica,
    descripcion:
      'Desde 1° hasta 9° grado, brindamos una formación sólida en las áreas fundamentales del conocimiento. ' +
      'Nuestros docentes acompañan el desarrollo integral del estudiante con metodologías activas que ' +
      'fomentan la curiosidad, la lectura y el pensamiento crítico.',
    menciones: ['1° a 9° Grado', 'Laboratorio de Informática', 'Actividades culturales y deportivas'],
  },
  {
    id: 'bachillerato',
    label: 'Bachillerato Técnico',
    imagen: imgBachillerato,
    descripcion:
      'Nuestro Bachillerato Técnico forma egresados con título medio que les abre las puertas tanto ' +
      'al mundo laboral como a la educación superior. Con menciones en Informática y Agropecuaria, ' +
      'preparamos jóvenes con habilidades reales para el siglo XXI.',
    menciones: ['Mención Informática', 'Mención Agropecuaria', 'Pasantías comunitarias'],
  },
];

export default function AcademicLevels() {
  const [activo,    setActivo]    = useState(0);
  const [prevActivo, setPrevActivo] = useState(null);
  const [titleRef, underlineRef]  = useSectionTitle();
  const contentRef = useRef(null);
  const sectionRef = useRef(null);

  /* Animación de la sección al entrar al viewport */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0, y: 40, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  /* Transición GSAP al cambiar de tab */
  useEffect(() => {
    if (prevActivo === null) return;
    const el = contentRef.current;
    gsap.fromTo(
      el,
      { opacity: 0, x: activo > prevActivo ? 30 : -30 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
    );
  }, [activo]);

  const cambiarTab = (idx) => {
    if (idx === activo) return;
    setPrevActivo(activo);
    setActivo(idx);
  };

  const nivel = NIVELES[activo];

  return (
    <section ref={sectionRef} className="py-20 bg-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Encabezado */}
        <div className="text-center mb-12">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-3">
            Oferta educativa
          </p>
          <h2 ref={titleRef} className="font-display text-3xl font-bold text-primary sm:text-4xl">
            Niveles educativos
          </h2>
          <div className="flex justify-center mt-3">
            <div ref={underlineRef} className="h-1 w-16 rounded bg-secondary origin-left" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap" role="tablist">
          {NIVELES.map(({ id, label }, idx) => (
            <button
              key={id}
              role="tab"
              aria-selected={activo === idx}
              aria-controls={`panel-${id}`}
              onClick={() => cambiarTab(idx)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200
                ${activo === idx
                  ? 'bg-primary text-white shadow-md shadow-primary/30'
                  : 'bg-accent text-neutral hover:bg-primary/10 hover:text-primary'
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Contenido del tab activo */}
        <div
          ref={contentRef}
          id={`panel-${nivel.id}`}
          role="tabpanel"
          className="grid gap-10 items-center lg:grid-cols-2"
        >
          {/* Imagen */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={nivel.imagen}
              alt={`Nivel ${nivel.label} — U.E.P. San José`}
              className="w-full h-72 object-cover lg:h-80"
            />
          </div>

          {/* Descripción */}
          <div className="flex flex-col gap-5">
            <h3 className="font-display text-2xl font-bold text-primary">{nivel.label}</h3>
            <p className="font-sans text-sm text-neutral/80 leading-relaxed">{nivel.descripcion}</p>

            <ul className="flex flex-col gap-2">
              {nivel.menciones.map(m => (
                <li key={m} className="flex items-center gap-2 text-sm font-medium text-neutral">
                  <span className="h-2 w-2 rounded-full bg-secondary shrink-0" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Botón global */}
        <div className="mt-12 text-center">
          <Link
            to="/academico"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3
              text-sm font-bold text-white hover:bg-primary/90 transition-colors"
          >
            Ver oferta académica completa
          </Link>
        </div>
      </div>
    </section>
  );
}
