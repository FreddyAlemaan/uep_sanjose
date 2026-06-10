import { useRef, useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { List, X } from '@phosphor-icons/react'
import logo from '../assets/logo.png'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { to: '/',          label: 'Inicio'    },
  { to: '/nosotros',  label: 'Nosotros'  },
  { to: '/niveles',   label: 'Niveles'   },
  { to: '/galeria',   label: 'Galeria'   },
  { to: '/contacto',  label: 'Contacto'  },
]

export default function Navbar() {
  const navRef                    = useRef<HTMLElement>(null)
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    // Entrance: slide down from above
    gsap.fromTo(
      navRef.current,
      { y: -90, opacity: 0 },
      { y: 0,   opacity: 1, duration: 0.85, ease: 'power3.out', delay: 0.15 }
    )

    // Toggle solid bg when scrolled past 60 px
    const st = ScrollTrigger.create({
      start:    'top -60',
      end:      99999,
      onToggle: ({ isActive }) => setScrolled(isActive),
    })

    return () => st.kill()
  }, [])

  const close = () => setMenuOpen(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'text-sm font-medium transition-colors duration-200',
      'relative after:absolute after:-bottom-0.5 after:left-0',
      'after:h-[2px] after:rounded-full after:bg-white after:transition-all after:duration-200',
      isActive
        ? 'text-white after:w-full'
        : 'text-white/80 hover:text-white after:w-0 hover:after:w-full',
    ].join(' ')

  return (
    <nav
      ref={navRef}
      aria-label="Navegacion principal"
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-brand shadow-lg shadow-brand/25 py-3' : 'bg-transparent py-5',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

        {/* Brand */}
        <Link
          to="/"
          onClick={close}
          className="flex items-center gap-3 shrink-0"
          aria-label="U.E.P. San Jose - Inicio"
        >
          <img
            src={logo}
            alt=""
            aria-hidden="true"
            className="h-10 w-10 object-contain drop-shadow-sm"
          />
          <span className="text-white font-semibold text-lg leading-tight tracking-tight">
            U.E.P. San Jose
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-7" role="list">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={linkClass}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          to="/contacto"
          className="btn btn-shine hidden md:inline-flex px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-brand shadow-sm hover:shadow-md"
        >
          Inscribete
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2 -mr-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Cerrar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={[
          'md:hidden overflow-hidden transition-all duration-300',
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
          'bg-brand border-t border-white/10',
        ].join(' ')}
      >
        <ul className="flex flex-col px-4 py-4 gap-0.5" role="list">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                onClick={close}
                className={({ isActive }) =>
                  [
                    'block py-2.5 text-base font-medium transition-colors',
                    isActive ? 'text-white' : 'text-white/80 hover:text-white',
                  ].join(' ')
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li className="pt-3">
            <Link
              to="/contacto"
              onClick={close}
              className="btn btn-shine block text-center bg-white text-brand py-3 rounded-lg font-semibold text-sm"
            >
              Inscribete
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
