import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../utils/gsapHelpers';
import { useSectionTitle } from '../hooks/useScrollAnimation';

const CARDS = [
  {
    icon: '🎓',
    titulo: 'Formación Técnica Real',
    descripcion: 'Nuestros egresados obtienen título de bachiller con mención técnica, listos para el trabajo y la universidad.',
    link: '/academico',
  },
  {
    icon: '✝️',
    titulo: 'Valores y Fe',
    descripcion: 'Una educación evangelizadora y humanista que forma el carácter y el corazón de cada estudiante.',
    link: '/el-colegio',
  },
  {
    icon: '🎺',
    titulo: 'Cultura y Arte',
    descripcion: 'Nuestra Banda de Música, activa desde 1967, es orgullo de Carayaca y escuela de disciplina y talento.',
    link: '/vida',
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
          {CARDS.map(({ icon, titulo, descripcion, link }) => (
            <article
              key={titulo}
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              className="flex flex-col gap-4 rounded-2xl bg-white p-8 cursor-default"
            >
              <span className="text-4xl" aria-hidden="true">{icon}</span>

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
