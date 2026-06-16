import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { gsap } from '../utils/gsapHelpers';
import { useNavbarScroll } from '../hooks/useNavbarScroll';
import logoSrc from '../assets/logo.png';

/* ─── Tabla de rutas ─────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Inicio',           path: '/'                },
  { label: 'El Colegio',       path: '/colegio',  hasDropdown: true },
  { label: 'Admisiones',       path: '/admisiones'      },
  { label: 'Académico',        path: '/academico'       },
  { label: 'Vida Estudiantil', path: '/vida-estudiantil'},
  { label: 'Noticias',         path: '/noticias'        },
  { label: 'Contáctanos',      path: '/contacto'        },
];

const DROPDOWN_ITEMS = [
  { label: 'Historia',        path: '/colegio#historia'      },
  { label: 'Misión y Visión', path: '/colegio#mision'        },
  { label: 'Nuestro Equipo',  path: '/colegio#equipo'        },
  { label: 'Instalaciones',   path: '/colegio#instalaciones' },
];

/* ─── Componente principal ───────────────────────────────────────────────── */
export default function Navbar() {
  const { isScrolled }         = useNavbarScroll(60);
  const [isOpen,   setIsOpen]  = useState(false);   // menú móvil
  const [dropOpen, setDropOpen]= useState(false);   // dropdown desktop
  const [mobileColegioOpen, setMobileColegioOpen] = useState(false);
  const { pathname } = useLocation();

  /* ── Refs ───────────────────────────────────────────────────────────────── */
  const navRef         = useRef(null);
  const logoRef        = useRef(null);
  const linksRef       = useRef(null);   // contenedor de links desktop
  const ctaRef         = useRef(null);
  const mobileRef      = useRef(null);   // panel fullscreen móvil
  const mobileLinkRef  = useRef(null);   // lista de links dentro del panel
  const dropdownRef    = useRef(null);
  const bar1Ref        = useRef(null);
  const bar2Ref        = useRef(null);
  const bar3Ref        = useRef(null);
  const dropTimerRef   = useRef(null);   // timeout para cerrar dropdown
  const isScrolledRef  = useRef(isScrolled); // valor sincrónico para GSAP

  /* ─── Sincronizar ref con estado ───────────────────────────────────────── */
  useEffect(() => { isScrolledRef.current = isScrolled; }, [isScrolled]);

  /* ─── Estado inicial del panel móvil (una sola vez, antes del primer pintado) ──
     Antes esto vivía en un atributo `style` fijo en el JSX, pero React lo
     volvía a aplicar en cada re-render (p. ej. al hacer setIsOpen(true)),
     pisando la animación de GSAP y dejando el botón hamburguesa "sin efecto".
     Al moverlo aquí, GSAP es el único dueño de display/transform del panel. */
  useLayoutEffect(() => {
    gsap.set(mobileRef.current, { display: 'none', y: '-100%' });
    gsap.set(dropdownRef.current, { opacity: 0, pointerEvents: 'none' });
  }, []);

  /* ─── Animación de entrada (solo al montar) ────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      /* Logo desde la izquierda */
      tl.fromTo(
        logoRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6 }
      );

      /* Links uno a uno con stagger */
      if (linksRef.current?.children.length) {
        tl.fromTo(
          linksRef.current.children,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 },
          '-=0.3'
        );
      }

      /* Botón CTA con ligero scale */
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' },
        '-=0.2'
      );
    });

    return () => ctx.revert();
  }, []);

  /* ─── Transición scroll: un solo tween sincronizado para todo el navbar ──
     Fondo, sombra, padding y tamaño del logo cambian juntos con la misma
     duración y easing, para que el efecto se sienta como una sola pieza
     en vez de elementos moviéndose a velocidades distintas.            */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 0.3, ease: 'power2.out' } });

    if (isScrolled) {
      tl.to(navRef.current, {
        backgroundColor: 'rgba(255, 255, 255, 0.97)',
        boxShadow:       '0 2px 20px rgba(0, 0, 0, 0.10)',
        paddingTop:      '12px',
        paddingBottom:   '12px',
      }, 0)
      .to(logoRef.current, { scale: 0.88, transformOrigin: 'left center' }, 0);
    } else {
      tl.to(navRef.current, {
        /* Tinte navy translúcido — visible desde el primer frame aunque la
           imagen de fondo del Hero no haya cargado todavía */
        backgroundColor: 'rgba(27, 77, 140, 0.35)',
        boxShadow:       '0 0px 0px rgba(0, 0, 0, 0)',
        paddingTop:      '20px',
        paddingBottom:   '20px',
      }, 0)
      .to(logoRef.current, { scale: 1, transformOrigin: 'left center' }, 0);
    }

    return () => tl.kill();
  }, [isScrolled]);

  /* ─── Bloquear scroll del body cuando el menú móvil está abierto ────────── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* ─── Cerrar menú móvil al cambiar de ruta ─────────────────────────────── */
  useEffect(() => {
    if (isOpen) cerrarMenu();
    setDropOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /* ─── Toggle menú móvil ─────────────────────────────────────────────────── */
  const abrirMenu = () => {
    setIsOpen(true);

    /* Forzar fondo navy sólido en el header mientras el menú está abierto,
       para que la X sea legible sin importar si había scroll o no */
    gsap.to(navRef.current, { backgroundColor: 'rgba(27, 77, 140, 0.97)', duration: 0.3 });

    /* Animar hamburguesa → X (siempre blanca mientras está abierta) */
    gsap.to(bar1Ref.current, { rotate: 45, y: 6,  duration: 0.3, ease: 'power2.inOut' });
    gsap.to(bar2Ref.current, { opacity: 0, scaleX: 0, duration: 0.2 });
    gsap.to(bar3Ref.current, { rotate: -45, y: -6, duration: 0.3, ease: 'power2.inOut' });

    /* Panel fullscreen desliza desde arriba */
    gsap.set(mobileRef.current, { display: 'flex', y: '-100%' });
    gsap.to(mobileRef.current, { y: '0%', duration: 0.45, ease: 'power3.out' });

    /* Links con stagger */
    if (mobileLinkRef.current?.children.length) {
      gsap.fromTo(
        mobileLinkRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, delay: 0.2, ease: 'power2.out' }
      );
    }
  };

  const cerrarMenu = () => {
    /* X → hamburguesa */
    gsap.to(bar1Ref.current, { rotate: 0, y: 0, duration: 0.3, ease: 'power2.inOut' });
    gsap.to(bar2Ref.current, { opacity: 1, scaleX: 1, duration: 0.25, delay: 0.05 });
    gsap.to(bar3Ref.current, { rotate: 0, y: 0, duration: 0.3, ease: 'power2.inOut' });

    /* Restaurar el fondo del header según el estado real de scroll */
    gsap.to(navRef.current, {
      backgroundColor: isScrolledRef.current
        ? 'rgba(255, 255, 255, 0.97)'
        : 'rgba(27, 77, 140, 0.35)',
      duration: 0.3,
    });

    /* Panel sube */
    gsap.to(mobileRef.current, {
      y: '-100%',
      duration: 0.35,
      ease: 'power3.in',
      onComplete: () => {
        gsap.set(mobileRef.current, { display: 'none' });
        setIsOpen(false);
        setMobileColegioOpen(false);
      },
    });
  };

  const toggleMenu = () => (isOpen ? cerrarMenu() : abrirMenu());

  /* ─── Dropdown "El Colegio" ─────────────────────────────────────────────── */
  const mostrarDropdown = () => {
    clearTimeout(dropTimerRef.current);
    setDropOpen(true);
    gsap.fromTo(
      dropdownRef.current,
      { opacity: 0, y: -8, pointerEvents: 'none' },
      { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out',
        onStart: () => { dropdownRef.current.style.pointerEvents = 'auto'; } }
    );
  };

  const ocultarDropdown = () => {
    dropTimerRef.current = setTimeout(() => {
      gsap.to(dropdownRef.current, {
        opacity: 0, y: -8, duration: 0.2, ease: 'power2.in',
        onComplete: () => {
          if (dropdownRef.current) dropdownRef.current.style.pointerEvents = 'none';
          setDropOpen(false);
        },
      });
    }, 80); /* pequeño delay para que no se cierre al mover el cursor al dropdown */
  };

  /* ─── Hover CTA con GSAP ────────────────────────────────────────────────── */
  const ctaHoverIn  = () => gsap.to(ctaRef.current, { scale: 1.03, filter: 'brightness(1.10)', duration: 0.2 });
  const ctaHoverOut = () => gsap.to(ctaRef.current, { scale: 1,    filter: 'brightness(1)',    duration: 0.2 });

  /* ─── Clase dinámica de link según estado scroll ────────────────────────── */
  const linkClass = ({ isActive }) =>
    [
      'relative text-sm font-medium transition-colors duration-300 ease-out py-1 group',
      isActive
        ? 'text-secondary'
        : isScrolled
          ? 'text-neutral hover:text-primary'
          : 'text-white hover:text-secondary',
    ].join(' ');

  /* ─── Render ─────────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ── Barra principal ─────────────────────────────────────────────────── */}
      <header
        ref={navRef}
        style={{
          backgroundColor: 'rgba(27, 77, 140, 0.35)',
          paddingTop:      '20px',
          paddingBottom:   '20px',
        }}
        className="fixed inset-x-0 top-0 z-50 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo + nombre del colegio */}
          <Link
            ref={logoRef}
            to="/"
            aria-label="Inicio — U.E.P. San José"
            className="flex items-center gap-3 shrink-0"
          >
            <img
              src={logoSrc}
              alt="Escudo U.E. Parroquial San José de Carayaca"
              className="h-12 w-12 object-contain drop-shadow-sm"
            />
            <span
              className={`font-display text-base sm:text-lg font-bold leading-tight
                transition-colors duration-300 ease-out
                ${isScrolled ? 'text-primary' : 'text-white'}`}
            >
              U.E. Parroquial<br className="hidden sm:block" />{' '}San José
            </span>
          </Link>

          {/* ── Links desktop ──────────────────────────────────────────────── */}
          <nav
            role="navigation"
            aria-label="Navegación principal"
            className="hidden lg:flex items-center gap-1"
          >
            <ul ref={linksRef} className="flex items-center gap-1">
              {NAV_LINKS.map(({ label, path, hasDropdown }) =>
                hasDropdown ? (
                  /* Item con dropdown */
                  <li
                    key={path}
                    className="relative"
                    onMouseEnter={mostrarDropdown}
                    onMouseLeave={ocultarDropdown}
                  >
                    <NavLink
                      to={path}
                      aria-haspopup="true"
                      aria-expanded={dropOpen}
                      className={linkClass}
                    >
                      {({ isActive }) => (
                        <>
                          <span className="flex items-center gap-1 px-3">
                            {label}
                            {/* Chevron */}
                            <svg
                              aria-hidden="true"
                              className={`h-3.5 w-3.5 transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`}
                              fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                          </span>
                          <ActiveUnderline isActive={isActive} />
                        </>
                      )}
                    </NavLink>

                    {/* Dropdown */}
                    <div
                      ref={dropdownRef}
                      onMouseEnter={() => clearTimeout(dropTimerRef.current)}
                      onMouseLeave={ocultarDropdown}
                      className="absolute top-full left-0 mt-2 w-52 z-40
                        rounded-xl bg-white shadow-lg
                        border-t-[3px] border-secondary overflow-hidden"
                    >
                      <ul className="py-1">
                        {DROPDOWN_ITEMS.map(({ label: dlabel, path: dpath }) => (
                          <li key={dpath}>
                            <Link
                              to={dpath}
                              className="block px-4 py-2.5 text-sm font-medium text-neutral
                                hover:bg-accent hover:text-primary transition-colors"
                            >
                              {dlabel}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : (
                  /* Item simple */
                  <li key={path}>
                    <NavLink to={path} className={linkClass}>
                      {({ isActive }) => (
                        <>
                          <span className="px-3">{label}</span>
                          <ActiveUnderline isActive={isActive} />
                        </>
                      )}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* ── CTA Inscripciones ───────────────────────────────────────────── */}
          <Link
            ref={ctaRef}
            to="/admisiones"
            onMouseEnter={ctaHoverIn}
            onMouseLeave={ctaHoverOut}
            className="hidden lg:inline-flex items-center gap-1.5 rounded-full
              bg-secondary px-5 py-2 text-sm font-bold text-white shadow-sm"
          >
            Inscripciones
          </Link>

          {/* ── Botón hamburguesa ───────────────────────────────────────────── */}
          <button
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            aria-controls="mobile-menu"
            className="lg:hidden flex flex-col justify-center items-center
              w-10 h-10 rounded-lg gap-[5px] focus:outline-none
              focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <span
              ref={bar1Ref}
              className={`block h-0.5 w-5 rounded-full origin-center
                transition-colors duration-300 ease-out
                ${isOpen ? 'bg-white' : isScrolled ? 'bg-primary' : 'bg-white'}`}
            />
            <span
              ref={bar2Ref}
              className={`block h-0.5 w-5 rounded-full
                transition-colors duration-300 ease-out
                ${isOpen ? 'bg-white' : isScrolled ? 'bg-primary' : 'bg-white'}`}
            />
            <span
              ref={bar3Ref}
              className={`block h-0.5 w-5 rounded-full origin-center
                transition-colors duration-300 ease-out
                ${isOpen ? 'bg-white' : isScrolled ? 'bg-primary' : 'bg-white'}`}
            />
          </button>
        </div>
      </header>

      {/* ── Panel móvil fullscreen ───────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        ref={mobileRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className="fixed inset-0 z-40 flex-col overflow-y-auto
          bg-gradient-to-br from-primary via-primary to-primary-dark"
      >
        {/* Marca de agua decorativa: escudo + nombre, ambos muy tenues */}
        <div
          aria-hidden="true"
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
            flex flex-col items-center select-none pointer-events-none"
        >
          <img src={logoSrc} alt="" className="h-[42vh] w-[42vh] max-h-80 max-w-80 object-contain opacity-[0.06]" />
          <p className="-mt-6 whitespace-nowrap font-display text-[22vw] font-bold text-white/[0.04]">
            San José
          </p>
        </div>

        {/* Encabezado del panel: logo + cierre explícito */}
        <div className="relative z-10 flex items-center justify-between px-6 pt-6">
          <div className="flex items-center gap-2.5">
            <img src={logoSrc} alt="" className="h-9 w-9 object-contain" />
            <span className="font-display text-sm font-bold text-white leading-tight">
              U.E. Parroquial<br />San José
            </span>
          </div>
          <button
            onClick={cerrarMenu}
            aria-label="Cerrar menú"
            className="flex h-10 w-10 items-center justify-center rounded-full
              bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav aria-label="Navegación móvil" className="relative z-10 flex-1 flex flex-col justify-center px-6 py-10">
          <ul ref={mobileLinkRef} className="flex flex-col items-stretch gap-1 w-full max-w-sm mx-auto">
            {NAV_LINKS.map(({ label, path, hasDropdown }, idx) => (
              <li key={path} className="w-full text-center">
                {idx > 0 && <div className="h-px bg-white/10 mx-auto w-full" />}

                {hasDropdown ? (
                  <>
                    {/* Trigger del submenú en móvil */}
                    <button
                      onClick={() => setMobileColegioOpen(p => !p)}
                      className="w-full flex items-center justify-center gap-2
                        py-4 text-lg font-semibold text-white hover:text-secondary
                        transition-colors"
                    >
                      {label}
                      <svg
                        aria-hidden="true"
                        className={`h-4 w-4 transition-transform duration-200
                          ${mobileColegioOpen ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>

                    {/* Sub-ítems indentados */}
                    {mobileColegioOpen && (
                      <ul className="mb-3 flex flex-col gap-1 pl-4 border-l-2 border-secondary/40 ml-auto mr-auto w-52">
                        {DROPDOWN_ITEMS.map(({ label: dl, path: dp }) => (
                          <li key={dp}>
                            <Link
                              to={dp}
                              onClick={cerrarMenu}
                              className="block py-2 text-base text-white/70 hover:text-secondary
                                transition-colors text-left"
                            >
                              {dl}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={path}
                    onClick={cerrarMenu}
                    className={({ isActive }) =>
                      `block w-full py-4 text-lg font-semibold transition-colors
                       ${isActive ? 'text-secondary' : 'text-white hover:text-secondary'}`
                    }
                  >
                    {label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          {/* CTA Inscripciones — full-width */}
          <div className="mt-8 w-full max-w-sm mx-auto px-2">
            <Link
              to="/admisiones"
              onClick={cerrarMenu}
              className="block w-full rounded-full bg-secondary py-4
                text-center text-base font-bold text-white shadow-lg
                hover:bg-secondary/90 transition-colors"
            >
              Iniciar inscripción
            </Link>
          </div>
        </nav>

        {/* Pie del panel */}
        <p className="relative z-10 pb-6 text-center font-sans text-xs uppercase tracking-[0.25em] text-white/40">
          Fe · Cultura · Vida
        </p>
      </div>
    </>
  );
}

/* ── Subrayado decorativo ───────────────────────────────────────────────────
   isActive viene del NavLink padre para que el subrayado pueda estar
   completamente visible cuando la ruta está activa, y en hover crece
   desde la izquierda.                                                      */
function ActiveUnderline({ isActive }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-secondary
        origin-left transition-transform duration-200 ease-out
        group-hover:scale-x-100
        ${isActive ? 'scale-x-100' : 'scale-x-0'}`}
    />
  );
}
