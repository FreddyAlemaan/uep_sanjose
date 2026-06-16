import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapHelpers';
import { useSectionTitle } from '../hooks/useScrollAnimation';
import fachadaImg    from '../assets/fachada.png';
import primariaImg   from '../assets/hero-primaria.png';
import bachilleratoImg from '../assets/nivel-bachillerato.png';

const EQUIPO_STATS = [
  { valor: '+100', label: 'Docentes y administrativos' },
  { valor: '+65',  label: 'Años de trayectoria conjunta' },
  { valor: '3',    label: 'Niveles educativos atendidos' },
];

const INSTALACIONES = [
  { imagen: fachadaImg,      titulo: 'Fachada e infraestructura', desc: 'Instalaciones de larga trayectoria en el corazón de Carayaca.' },
  { imagen: primariaImg,     titulo: 'Aulas de clase',            desc: 'Espacios equipados para primaria y educación media.' },
  { imagen: bachilleratoImg, titulo: 'Espacios estudiantiles',    desc: 'Áreas para actos, proyectos y actividades del bachillerato.' },
];

export default function About() {
  const [titleRef, underlineRef] = useSectionTitle();
  const imageRef   = useRef(null);
  const textRef    = useRef(null);
  const panelsRef  = useRef(null);
  const equipoRef  = useRef(null);
  const galeriaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        opacity: 0, x: -50, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: imageRef.current, start: 'top 80%', once: true },
      });
      gsap.from(textRef.current.children, {
        opacity: 0, x: 40, duration: 0.7, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 80%', once: true },
      });
      gsap.from(panelsRef.current.children, {
        opacity: 0, y: 50, duration: 0.8, stagger: 0.2, ease: 'power2.out',
        scrollTrigger: { trigger: panelsRef.current, start: 'top 80%', once: true },
      });
      gsap.from(equipoRef.current.children, {
        opacity: 0, y: 30, duration: 0.6, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: equipoRef.current, start: 'top 85%', once: true },
      });
      gsap.from(galeriaRef.current.children, {
        opacity: 0, y: 40, duration: 0.7, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: galeriaRef.current, start: 'top 80%', once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* ── Historia ──────────────────────────────────────────────────────── */}
      <section id="historia" className="py-20 sm:py-24 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-3">
            Quiénes somos
          </p>
          <h1 className="font-display text-4xl font-bold text-primary sm:text-5xl">
            Nuestra historia
          </h1>

          <div className="mt-12 grid gap-12 items-center lg:grid-cols-2">
            <div ref={imageRef} className="rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
              <img
                src={fachadaImg}
                alt="Fachada de la U.E. Parroquial San José de Carayaca"
                className="w-full h-80 object-cover lg:h-96"
              />
            </div>

            <div ref={textRef} className="flex flex-col gap-5 order-1 lg:order-2">
              <p className="font-sans text-base text-neutral/80 leading-relaxed">
                Desde <strong className="text-primary">1957</strong>, la U.E. Parroquial
                San José de Carayaca acompaña a las familias de la parroquia con una
                educación que nace de la fe y se sostiene en la comunidad. Lo que
                comenzó como una iniciativa parroquial para servir a los hijos de
                Carayaca, hoy es una institución que ha visto pasar generaciones
                completas por sus aulas.
              </p>
              <p className="font-sans text-base text-neutral/80 leading-relaxed">
                Más de seis décadas después, seguimos guiados por el mismo principio
                que nos dio origen: formar personas a través de la síntesis entre
                fe, cultura y vida — preparando a cada estudiante tanto para los
                estudios superiores como para los retos del mundo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Misión y Visión — tratamiento editorial ──────────────────────── */}
      <section id="mision" className="bg-primary-dark py-24 sm:py-28 relative overflow-hidden scroll-mt-24">
        {/* Lema de fondo, enorme y tenue, como marca de agua */}
        <p
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            whitespace-nowrap font-display text-[18vw] font-bold text-white/[0.03]
            select-none pointer-events-none"
        >
          San José
        </p>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-3">
              Nuestra identidad institucional
            </p>
            <h2 ref={titleRef} className="font-display text-3xl font-bold text-white sm:text-4xl">
              Misión y Visión
            </h2>
            <div className="flex justify-center mt-4">
              <div ref={underlineRef} className="h-px w-20 bg-secondary origin-left" />
            </div>
          </div>

          <div ref={panelsRef} className="grid gap-px sm:grid-cols-2 bg-white/10 rounded-2xl overflow-hidden">
            {/* Misión */}
            <div className="bg-primary-dark p-10 sm:p-12 relative">
              <span className="font-display text-7xl font-bold text-white/[0.08] absolute top-6 right-8 select-none">
                01
              </span>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-secondary mb-5">
                Misión
              </p>
              <p className="font-display text-xl sm:text-2xl text-white leading-snug italic">
                "Incorporar todos aquellos elementos que nuestros jóvenes necesitan
                para lograr una formación integral, fundamentada en saber, valores
                y vida."
              </p>
            </div>

            {/* Visión */}
            <div className="bg-white p-10 sm:p-12 relative">
              <span className="font-display text-7xl font-bold text-primary/[0.06] absolute top-6 right-8 select-none">
                02
              </span>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-secondary mb-5">
                Visión
              </p>
              <p className="font-display text-xl sm:text-2xl text-primary leading-snug italic">
                "Involucrar a toda nuestra institución y su entorno en un proceso
                educativo evangelizador que ayude al estudiante a hacer la síntesis:
                Fe – Cultura – Vida."
              </p>
            </div>
          </div>

          {/* Lema como cierre */}
          <div className="mt-14 flex items-center justify-center gap-3 sm:gap-4
            font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-white/70">
            <span>Fe</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-secondary" />
            <span>Cultura</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-secondary" />
            <span>Vida</span>
          </div>
        </div>
      </section>

      {/* ── Nuestro Equipo ─────────────────────────────────────────────────── */}
      <section id="equipo" className="py-20 sm:py-24 bg-light scroll-mt-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-3">
            Quiénes nos acompañan
          </p>
          <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl">
            Nuestro Equipo
          </h2>
          <p className="mt-5 font-sans text-base text-neutral/75 leading-relaxed max-w-2xl mx-auto">
            Detrás de cada estudiante hay un equipo docente y administrativo
            comprometido con su formación integral — desde maternal hasta el
            último año de bachillerato técnico. Educadores con vocación, que
            conocen a cada familia de Carayaca por su nombre.
          </p>

          <div ref={equipoRef} className="mt-12 grid gap-6 sm:grid-cols-3">
            {EQUIPO_STATS.map(({ valor, label }) => (
              <div key={label} className="rounded-2xl border border-slate-100 bg-accent/40 p-8">
                <p className="font-display text-3xl font-bold text-primary">{valor}</p>
                <p className="mt-2 font-sans text-sm text-neutral/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Instalaciones ──────────────────────────────────────────────────── */}
      <section id="instalaciones" className="py-20 sm:py-24 bg-accent scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-3">
              Nuestros espacios
            </p>
            <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl">
              Instalaciones
            </h2>
          </div>

          <div ref={galeriaRef} className="grid gap-6 sm:grid-cols-3">
            {INSTALACIONES.map(({ imagen, titulo, desc }) => (
              <div key={titulo} className="rounded-2xl overflow-hidden shadow-sm bg-white">
                <img src={imagen} alt={titulo} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="font-display text-base font-bold text-primary">{titulo}</h3>
                  <p className="mt-1 font-sans text-sm text-neutral/70">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
