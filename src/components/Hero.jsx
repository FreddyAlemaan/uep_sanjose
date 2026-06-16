import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../utils/gsapHelpers';
import heroImg from '../assets/hero-primaria.png';

export default function Hero() {
  const sectionRef  = useRef(null);
  const imgRef      = useRef(null);
  const eyebrowRef  = useRef(null);
  const titleRef    = useRef(null);
  const lemaRef     = useRef(null);
  const subtitleRef = useRef(null);
  const btnsRef     = useRef(null);
  const arrowRef    = useRef(null);

  /* Animaciones de entrada al montar — no usan ScrollTrigger.
     Se usa gsap.context() para que la limpieza (ctx.revert()) restaure
     los estilos originales; esto evita que React StrictMode (que monta
     los efectos dos veces en desarrollo) deje los elementos atascados
     en opacidad 0 por una condición de carrera entre tweens. */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      /* Efecto "Ken Burns": la foto arranca ligeramente ampliada, se
         asienta, y luego sigue con un zoom lento continuo — todo dentro
         del mismo timeline para evitar dos tweens compitiendo por "scale" */
      tl.from(imgRef.current, { scale: 1.15, duration: 1.8, ease: 'power1.out' })
        .from(eyebrowRef.current,  { opacity: 0, y: 30, duration: 0.6 }, 0.2)
        .from(titleRef.current,    { opacity: 0, y: 40, duration: 0.7 }, '-=0.3')
        .from(lemaRef.current,     { opacity: 0, y: 20, duration: 0.5 }, '-=0.35')
        .from(subtitleRef.current, { opacity: 0, y: 30, duration: 0.6 }, '-=0.25')
        .from(btnsRef.current.children, { opacity: 0, y: 20, duration: 0.5, stagger: 0.15 }, '-=0.2')
        .to(imgRef.current, { scale: 1.08, duration: 18, ease: 'none', repeat: -1, yoyo: true });

      /* Flecha con bounce infinito */
      gsap.to(arrowRef.current, {
        y: 10, duration: 0.8, ease: 'power1.inOut',
        repeat: -1, yoyo: true, delay: 1.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Imagen de fondo — foto real de estudiantes de la institución */}
      <img
        ref={imgRef}
        src={heroImg}
        alt="Estudiantes de la U.E. Parroquial San José de Carayaca celebrando en clase"
        className="absolute inset-0 h-full w-full object-cover object-center"
        fetchPriority="high"
      />

      {/* Overlay degradado */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Contenido central */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">

        {/* Eyebrow */}
        <p ref={eyebrowRef} className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-secondary mb-4">
          Desde 1957 formando personas íntegras
        </p>

        {/* Título principal — nombre completo del colegio */}
        <h1
          ref={titleRef}
          className="font-display text-4xl font-bold leading-tight text-white
            sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          U.E.P.{' '}
          <span className="text-secondary italic">San José</span>
        </h1>

        {/* Lema institucional oficial */}
        <p
          ref={lemaRef}
          className="mt-4 flex items-center justify-center gap-2 sm:gap-3
            font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-white/90"
        >
          <span>Fe</span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-secondary" />
          <span>Cultura</span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-secondary" />
          <span>Vida</span>
        </p>

        {/* Subtítulo */}
        <p
          ref={subtitleRef}
          className="mt-6 mx-auto max-w-2xl text-base sm:text-lg text-white/85 leading-relaxed"
        >
          Más de 65 años acompañando a las familias de Carayaca con educación,
          valores y corazón
        </p>

        {/* Botones CTA */}
        <div ref={btnsRef} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/colegio"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl
              bg-primary px-8 py-4 text-base font-bold text-white shadow-lg
              hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-xl"
          >
            Conoce el colegio
          </Link>
          <Link
            to="/admisiones"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl
              border-2 border-secondary px-8 py-4 text-base font-bold text-secondary
              hover:bg-secondary hover:text-white transition-all hover:scale-105"
          >
            Proceso de inscripción
          </Link>
        </div>
      </div>

      {/* Flecha scroll */}
      <div ref={arrowRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs text-white/50 uppercase tracking-widest font-sans">Descubre más</span>
        <svg aria-hidden="true" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  );
}
