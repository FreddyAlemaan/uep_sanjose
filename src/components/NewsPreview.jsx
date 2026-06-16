import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../utils/gsapHelpers';
import { useSectionTitle } from '../hooks/useScrollAnimation';

const NOTICIAS = [
  {
    imagen:     'https://placehold.co/400x250/1B3A6B/FFFFFF?text=Acto+de+Clausura',
    categoria:  'Eventos',
    titulo:     'Gran acto de clausura y entrega de diplomas del año escolar 2024–2025',
    fecha:      '10 de junio de 2025',
    slug:       'clausura-2025',
  },
  {
    imagen:     'https://placehold.co/400x250/C8972B/FFFFFF?text=Banda+de+Música',
    categoria:  'Cultura',
    titulo:     'La Banda de Música de San José representará al Estado Vargas en festival nacional',
    fecha:      '2 de junio de 2025',
    slug:       'banda-festival-2025',
  },
  {
    imagen:     'https://placehold.co/400x250/2D2D2D/FFFFFF?text=Inscripciones',
    categoria:  'Admisiones',
    titulo:     'Inscripciones abiertas para el año escolar 2025–2026: todo lo que debes saber',
    fecha:      '20 de mayo de 2025',
    slug:       'inscripciones-2025-2026',
  },
];

const CATEGORIA_COLORES = {
  Eventos:    'bg-primary/10 text-primary',
  Cultura:    'bg-secondary/15 text-secondary',
  Admisiones: 'bg-green-100 text-green-700',
};

export default function NewsPreview() {
  const [titleRef, underlineRef] = useSectionTitle();
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current.children, {
        opacity: 0, y: 50, duration: 0.7, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 bg-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Encabezado + botón */}
        <div className="flex flex-col items-start gap-6 mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-3">
              Actualidad
            </p>
            <h2 ref={titleRef} className="font-display text-3xl font-bold text-primary sm:text-4xl">
              Últimas noticias
            </h2>
            <div ref={underlineRef} className="mt-3 h-1 w-16 rounded bg-secondary origin-left" />
          </div>
          <Link
            to="/noticias"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-primary
              hover:text-primary/70 transition-colors"
          >
            Ver todas las noticias
            <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Grid de noticias */}
        <div ref={cardsRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {NOTICIAS.map(({ imagen, categoria, titulo, fecha, slug }) => (
            <article
              key={slug}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm
                hover:shadow-md transition-shadow duration-200 group"
            >
              {/* Imagen */}
              <div className="overflow-hidden h-48">
                <img
                  src={imagen}
                  alt={titulo}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Contenido */}
              <div className="flex flex-col flex-1 gap-3 p-6">
                {/* Badge categoría */}
                <span className={`self-start rounded-full px-3 py-1 text-xs font-bold
                  ${CATEGORIA_COLORES[categoria] ?? 'bg-slate-100 text-slate-600'}`}>
                  {categoria}
                </span>

                <h3 className="font-display text-base font-bold text-primary leading-snug line-clamp-3">
                  {titulo}
                </h3>

                <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
                  <time className="font-sans text-xs text-neutral/50">{fecha}</time>
                  <Link
                    to={`/noticias/${slug}`}
                    className="text-xs font-semibold text-secondary hover:text-secondary/80 transition-colors"
                  >
                    Leer más →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
