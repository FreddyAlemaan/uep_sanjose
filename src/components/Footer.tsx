import { Link } from 'react-router-dom'
import { FacebookLogo, InstagramLogo, YoutubeLogo, ArrowUp } from '@phosphor-icons/react'
import logo from '../assets/logo.png'

const NAV_LINKS = [
  { to: '/',          label: 'Inicio'    },
  { to: '/nosotros',  label: 'Nosotros'  },
  { to: '/niveles',   label: 'Niveles'   },
  { to: '/galeria',   label: 'Galeria'   },
  { to: '/contacto',  label: 'Contacto'  },
]

const SOCIALS = [
  { Icon: FacebookLogo,  href: '#', label: 'Facebook de U.E.P. San Jose'  },
  { Icon: InstagramLogo, href: '#', label: 'Instagram de U.E.P. San Jose' },
  { Icon: YoutubeLogo,   href: '#', label: 'YouTube de U.E.P. San Jose'   },
]

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-brand text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">

          {/* Brand column */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt=""
                aria-hidden="true"
                className="h-10 w-10 object-contain"
              />
              <span className="font-bold text-lg leading-tight">U.E.P. San Jose</span>
            </Link>
            <p className="text-white/65 text-sm leading-relaxed max-w-xs">
              Unidad Educativa Parroquial San Jose. Formando lideres con valores
              en Preescolar, Primaria y Bachillerato.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
                >
                  <Icon size={18} weight="fill" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-5">
              Navegacion
            </h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-5">
              Contacto
            </h3>
            <address className="not-italic flex flex-col gap-3 text-sm text-white/70">
              <p>Parroquia San Jose, Av. Principal s/n</p>
              <p>
                <a href="tel:+5930200000000" className="hover:text-white transition-colors duration-200">
                  +593 (02) 000-0000
                </a>
              </p>
              <p>
                <a
                  href="mailto:informacion@uepsanjose.edu.ec"
                  className="hover:text-white transition-colors duration-200"
                >
                  informacion@uepsanjose.edu.ec
                </a>
              </p>
              <p>Lunes a Viernes, 7:30 - 16:00</p>
            </address>
            <Link
              to="/contacto"
              className="btn mt-6 w-full px-5 py-3 rounded-lg border border-white/25 text-white text-sm font-semibold hover:bg-white/10"
            >
              Proceso de inscripcion
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-xs">
          <p>
            &copy; {new Date().getFullYear()} Unidad Educativa Parroquial San Jose. Todos los derechos reservados.
          </p>
          <button
            onClick={scrollTop}
            aria-label="Volver al inicio"
            className="flex items-center gap-2 hover:text-white/70 transition-colors duration-200"
          >
            <ArrowUp size={14} weight="bold" /> Subir
          </button>
        </div>
      </div>
    </footer>
  )
}
