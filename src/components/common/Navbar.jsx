import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Inicio',    path: '/'           },
  { label: 'Nosotros',  path: '/nosotros'   },
  { label: 'Admisión',  path: '/admision'   },
  { label: 'Contacto',  path: '/contacto'   },
];

export default function Navbar() {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const { pathname } = useLocation();

  // Cerrar menú al navegar
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Sombra al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-shadow duration-300
        bg-white ${scrolled ? 'shadow-md' : 'shadow-none'}`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-700 text-white font-bold text-sm select-none">
            SJ
          </span>
          <span className="hidden sm:block text-blue-900 font-bold text-lg leading-tight">
            Colegio<br />
            <span className="text-blue-600 font-extrabold">San José</span>
          </span>
        </Link>

        {/* Links — escritorio */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, path }) => (
            <li key={path}>
              <Link
                to={path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${pathname === path
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA — escritorio */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/admision#pagos"
            className="text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors"
          >
            Pagos
          </Link>
          <Link
            to="/admision#inscripcion"
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white
              hover:bg-blue-800 active:bg-blue-900 transition-colors"
          >
            Inscribirme
          </Link>
        </div>

        {/* Botón hamburguesa — móvil */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg
            hover:bg-slate-100 transition-colors gap-[5px]"
        >
          <span className={`block h-0.5 w-6 bg-slate-700 rounded transition-all duration-300
            ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block h-0.5 w-6 bg-slate-700 rounded transition-all duration-300
            ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-slate-700 rounded transition-all duration-300
            ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </nav>

      {/* Menú móvil — drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${menuOpen ? 'max-h-96 border-t border-slate-100' : 'max-h-0'}`}
      >
        <ul className="flex flex-col px-4 pb-4 pt-2 gap-1 bg-white">
          {NAV_LINKS.map(({ label, path }) => (
            <li key={path}>
              <Link
                to={path}
                className={`block w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${pathname === path
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                  }`}
              >
                {label}
              </Link>
            </li>
          ))}

          <li className="pt-2 border-t border-slate-100 mt-1 flex flex-col gap-2">
            <Link
              to="/admision#pagos"
              className="block w-full text-center px-4 py-3 rounded-lg border border-blue-600
                text-blue-700 text-sm font-semibold hover:bg-blue-50 transition-colors"
            >
              Pagos en línea
            </Link>
            <Link
              to="/admision#inscripcion"
              className="block w-full text-center px-4 py-3 rounded-lg bg-blue-700 text-white
                text-sm font-semibold hover:bg-blue-800 transition-colors"
            >
              Inscribirme ahora
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
