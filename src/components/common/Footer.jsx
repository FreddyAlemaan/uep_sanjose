import { Link } from 'react-router-dom';

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Marca */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">
                SJ
              </span>
              <span className="text-white font-bold text-lg">Colegio San José</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Formando líderes con valores desde 1994. Una comunidad educativa comprometida
              con la excelencia y el desarrollo integral.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">Navegación</h3>
            <ul className="space-y-2 text-sm">
              {[
                ['Inicio',    '/'],
                ['Nosotros',  '/nosotros'],
                ['Admisión',  '/admision'],
                ['Contacto',  '/contacto'],
              ].map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto rápido */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li>+58 (212) 000-0000</li>
              <li>info@colegiosanjose.edu</li>
              <li>Lun – Vie: 7:00 am – 4:00 pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-xs text-center">
          © {YEAR} Colegio San José. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
