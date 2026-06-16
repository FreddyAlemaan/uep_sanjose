import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../utils/gsapHelpers';
import { useSectionTitle } from '../hooks/useScrollAnimation';
import imgInicial      from '../assets/nivel-inicial.png';
import imgPrimaria     from '../assets/hero-primaria.png';
import imgBachillerato from '../assets/nivel-bachillerato.png';

/* Íconos en línea — estilo Heroicons outline, sin emojis */
const IconCode = () => (
  <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

const IconLeaf = () => (
  <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4-2.5-7-6.2-7-10.5A7 7 0 0112 3a7 7 0 017 7.5c0 4.3-3 8-7 10.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V9" />
  </svg>
);

const NIVELES = [
  {
    numero: '01',
    nombre: 'Educación Inicial',
    subtitulo: 'Maternal · 2do y 3er Nivel',
    rango: '3 a 6 años',
    uniforme: 'Camisa roja',
    swatch: '#B23A3A',
    imagen: imgInicial,
    descripcion:
      'La primera etapa del camino escolar. A través del juego, el arte y la ' +
      'exploración sensorial, sentamos las bases afectivas, sociales y cognitivas ' +
      'que acompañarán a cada niño durante el resto de su vida escolar.',
  },
  {
    numero: '02',
    nombre: 'Educación Primaria',
    subtitulo: '1er a 6to Grado',
    rango: '6 a 12 años',
    uniforme: 'Camisa blanca',
    swatch: '#FFFFFF',
    swatchBorder: true,
    imagen: imgPrimaria,
    descripcion:
      'Seis años de formación sólida en las áreas fundamentales del conocimiento. ' +
      'Nuestros docentes acompañan el desarrollo integral del estudiante con ' +
      'metodologías activas que fomentan la curiosidad, la lectura y el ' +
      'pensamiento lógico.',
  },
  {
    numero: '03',
    nombre: 'Educación Media General',
    subtitulo: 'Bachillerato · 1er a 5to Año',
    rango: '12 a 17 años',
    uniforme: 'Camisa blanca (1°–3°) y beige (4°–5°)',
    swatch: '#D8C49A',
    imagen: imgBachillerato,
    descripcion:
      'El bachillerato científico tradicional, que culmina en 5to año con el ' +
      'título de Bachiller. A partir de 4to año el uniforme cambia a camisa ' +
      'beige, marcando la transición hacia la etapa final de la educación media.',
  },
  {
    numero: '04',
    nombre: 'Educación Media Técnica',
    subtitulo: '6to Año Adicional · Menciones Informática y Agropecuaria',
    rango: 'Tras 5to año',
    uniforme: 'Camisa beige',
    swatch: '#D8C49A',
    imagen: imgBachillerato,
    destacado: true,
    descripcion:
      'Quienes desean una formación técnica pueden continuar un año más (6to ' +
      'año) en la mención de su elección. Al egresar obtienen el título de ' +
      '"Técnico Medio", y desde 2024 ese sexto año técnico es validado como el ' +
      'primer año de estudios universitarios en carreras afines.',
  },
];

export default function Academic() {
  const [titleRef, underlineRef] = useSectionTitle();
  const lineRef  = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Línea de tiempo vertical que se "dibuja" al hacer scroll */
      gsap.from(lineRef.current, {
        scaleY: 0, transformOrigin: 'top center', ease: 'none',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 75%',
          end: 'bottom center',
          scrub: true,
        },
      });

      /* Cada nivel entra alternando desde su lado correspondiente */
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0,
          x: i % 2 === 0 ? -40 : 40,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* ── Encabezado ─────────────────────────────────────────────────────── */}
      <section className="bg-primary-dark py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-3">
            Oferta educativa
          </p>
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Un camino completo, desde maternal hasta el título técnico
          </h1>
          <p className="mt-5 font-sans text-base text-white/75 leading-relaxed max-w-2xl mx-auto">
            Cuatro etapas que acompañan a cada estudiante desde sus primeros pasos
            hasta su ingreso al mundo universitario o laboral.
          </p>
        </div>
      </section>

      {/* ── Línea de tiempo de niveles ────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-light">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Línea vertical central (solo desktop) */}
            <div
              ref={lineRef}
              aria-hidden="true"
              className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-secondary/40 -translate-x-1/2"
            />

            <div className="flex flex-col gap-16 lg:gap-24">
              {NIVELES.map((nivel, i) => (
                <div
                  key={nivel.numero}
                  ref={el => (itemsRef.current[i] = el)}
                  className={`relative grid gap-8 items-center lg:grid-cols-2 ${
                    nivel.destacado ? 'lg:bg-accent/60 lg:rounded-3xl lg:p-8 lg:-mx-8' : ''
                  }`}
                >
                  {/* Marcador central (desktop) */}
                  <span
                    aria-hidden="true"
                    className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                      h-12 w-12 items-center justify-center rounded-full bg-primary
                      text-white font-display font-bold text-sm z-10 shadow-lg"
                  >
                    {nivel.numero}
                  </span>

                  {/* Imagen — orden alterna en desktop */}
                  <div className={`rounded-2xl overflow-hidden shadow-lg
                    ${i % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
                  >
                    <img
                      src={nivel.imagen}
                      alt={nivel.nombre}
                      className="w-full h-64 object-cover lg:h-72"
                    />
                  </div>

                  {/* Texto */}
                  <div className={`flex flex-col gap-3 ${i % 2 === 0 ? 'lg:order-2 lg:pl-10' : 'lg:order-1 lg:pr-10 lg:text-right lg:items-end'}`}>
                    <span className="lg:hidden font-display text-3xl font-bold text-secondary">
                      {nivel.numero}
                    </span>
                    <h2 className="font-display text-2xl font-bold text-primary sm:text-3xl">
                      {nivel.nombre}
                    </h2>
                    <p className="font-sans text-sm font-semibold uppercase tracking-wide text-secondary">
                      {nivel.subtitulo}
                    </p>
                    <p className="font-sans text-sm text-neutral/75 leading-relaxed">
                      {nivel.descripcion}
                    </p>

                    <div className={`mt-2 flex flex-wrap gap-4 text-xs font-sans text-neutral/60 ${i % 2 !== 0 ? 'lg:justify-end' : ''}`}>
                      <span className="inline-flex items-center gap-1.5">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {nivel.rango}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="h-3 w-3 rounded-full shrink-0"
                          style={{
                            backgroundColor: nivel.swatch,
                            border: nivel.swatchBorder ? '1px solid #cbd5e1' : 'none',
                          }}
                        />
                        {nivel.uniforme}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Menciones técnicas ────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-accent">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 ref={titleRef} className="font-display text-3xl font-bold text-primary sm:text-4xl">
            Menciones técnicas
          </h2>
          <div className="flex justify-center mt-3 mb-12">
            <div ref={underlineRef} className="h-1 w-16 rounded bg-secondary origin-left" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 text-left shadow-sm">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
                <IconCode />
              </span>
              <h3 className="font-display text-xl font-bold text-primary mt-4 mb-2">Informática</h3>
              <p className="font-sans text-sm text-neutral/75 leading-relaxed">
                Programación, ofimática avanzada y fundamentos de redes. Egresa con
                título de Técnico Medio en Informática, validado como primer año
                universitario en carreras afines desde 2024.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-8 text-left shadow-sm">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
                <IconLeaf />
              </span>
              <h3 className="font-display text-xl font-bold text-primary mt-4 mb-2">Agropecuaria</h3>
              <p className="font-sans text-sm text-neutral/75 leading-relaxed">
                Producción agrícola y pecuaria con un fuerte componente práctico,
                ideal para quienes buscan vincular la educación técnica con el
                desarrollo del entorno rural de Carayaca.
              </p>
            </div>
          </div>

          <p className="mt-8 font-sans text-xs text-neutral/50 max-w-2xl mx-auto leading-relaxed">
            El título de Técnico Medio es distinto a una licenciatura universitaria;
            es el reconocimiento oficial otorgado al completar la educación media
            técnica en Venezuela (6 años, de 1° a 6° año).
          </p>
        </div>
      </section>

      {/* ── CTA final ──────────────────────────────────────────────────────── */}
      <section className="py-16 bg-primary">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            ¿Quieres que tu hijo forme parte de este camino?
          </h2>
          <Link
            to="/admisiones"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-secondary
              px-8 py-4 text-base font-bold text-white shadow-lg
              hover:bg-secondary/90 transition-all hover:scale-105"
          >
            Iniciar proceso de inscripción
          </Link>
        </div>
      </section>
    </main>
  );
}
