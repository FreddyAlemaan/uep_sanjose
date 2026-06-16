import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../utils/gsapHelpers';
import { useSectionTitle } from '../hooks/useScrollAnimation';

/* Íconos en línea — estilo Heroicons outline, sin emojis */
const IconAcademic = () => (
  <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L2 8l10 5 10-5-10-5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 10.5v4.5c0 1.5 2.5 3 6 3s6-1.5 6-3v-4.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M22 8v6" />
  </svg>
);

const IconFaith = () => (
  <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M7.5 8h9" />
  </svg>
);

const IconArts = () => (
  <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
  </svg>
);

const CARDS = [
  {
    Icon: IconAcademic,
    titulo: 'Formación Técnica Real',
    descripcion: 'Nuestros egresados obtienen título de bachiller con mención técnica, listos para el trabajo y la universidad.',
    link: '/academico',
  },
  {
    Icon: IconFaith,
    titulo: 'Valores y Fe',
    descripcion: 'Una educación evangelizadora y humanista que forma el carácter y el corazón de cada estudiante.',
    link: '/colegio',
  },
  {
    Icon: IconArts,
    titulo: 'Cultura y Arte',
    descripcion: 'Nuestra Banda de Música, activa desde 1967, es orgullo de Carayaca y escuela de disciplina y talento.',
    link: '/vida-estudiantil',
  },
];

export default function ValueCards() {
  const [titleRef, underlineRef] = useSectionTitle();
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Aparición escalonada de las cards */
      gsap.from(cardsRef.current.children, {
        opacity: 0, y: 50, duration: 0.7, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', once: true },
      });

      /* Hover lift para cada card */
      Array.from(cardsRef.current.children).forEach(card => {
        card.addEventListener('mouseenter', () =>
          gsap.to(card, { y: -8, boxShadow: '0 20px 40px rgba(27,58,107,0.15)', duration: 0.25 })
        );
        card.addEventListener('mouseleave', () =>
          gsap.to(card, { y: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', duration: 0.25 })
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 bg-accent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Encabezado */}
        <div className="text-center mb-14">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-3">
            Lo que nos distingue
          </p>
          <h2 ref={titleRef} className="font-display text-3xl font-bold text-primary sm:text-4xl">
            Nuestra propuesta de valor
          </h2>
          <div className="flex justify-center mt-3">
            <div ref={underlineRef} className="h-1 w-16 rounded bg-secondary origin-left" />
          </div>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CARDS.map(({ Icon, titulo, descripcion, link }) => (
            <article
              key={titulo}
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              className="flex flex-col gap-4 rounded-2xl bg-white p-8 cursor-default"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
                <Icon />
              </span>

              <h3 className="font-display text-xl font-bold text-primary">{titulo}</h3>

              <p className="font-sans text-sm text-neutral/75 leading-relaxed flex-1">
                {descripcion}
              </p>

              <Link
                to={link}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary
                  hover:text-secondary/80 transition-colors group"
              >
                Saber más
                <svg aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
