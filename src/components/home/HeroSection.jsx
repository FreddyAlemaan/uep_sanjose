import { Link } from 'react-router-dom';

// Reemplaza este URL con la imagen real del colegio (o importa desde /assets)
const HERO_IMAGE_URL =
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&auto=format&fit=crop&q=80';

const STATS = [
  { value: '+30',   label: 'Años de trayectoria' },
  { value: '1,200', label: 'Estudiantes activos'  },
  { value: '98%',   label: 'Aprobación bachillerato' },
  { value: '85+',   label: 'Docentes certificados'  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Imagen de fondo */}
      <img
        src={HERO_IMAGE_URL}
        alt="Instalaciones del Colegio San José"
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
        fetchPriority="high"
      />

      {/* Gradiente oscuro sobre la imagen */}
      <div className="absolute inset-0 bg-gradient-to-b
        from-blue-950/80 via-blue-900/70 to-slate-950/90" />

      {/* Contenido principal */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">

        {/* Etiqueta superior */}
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20
          bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-200
          backdrop-blur-sm mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          Inscripciones abiertas 2025–2026
        </span>

        {/* Título */}
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white
          sm:text-5xl lg:text-6xl xl:text-7xl">
          Formando líderes{' '}
          <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
            con valores
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-blue-100/90 leading-relaxed">
          Más de 30 años brindando educación de excelencia en un ambiente seguro,
          inclusivo y orientado al futuro de nuestros estudiantes.
        </p>

        {/* Botones CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/admision#inscripcion"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl
              bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg
              hover:bg-blue-500 active:bg-blue-700
              transition-all duration-200 hover:scale-105 hover:shadow-blue-500/40 hover:shadow-xl"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
            </svg>
            Iniciar inscripción
          </Link>

          <Link
            to="/admision#pagos"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl
              border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-bold text-white
              backdrop-blur-sm hover:bg-white/20 active:bg-white/5
              transition-all duration-200 hover:scale-105"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
            Realizar un pago
          </Link>
        </div>

        {/* Indicador de scroll */}
        <div className="mt-14 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs tracking-widest uppercase">Descubre más</span>
          <svg
            className="h-5 w-5 animate-bounce"
            fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>

      {/* Franja de estadísticas — parte inferior del hero */}
      <div className="absolute bottom-0 inset-x-0 z-10">
        <div className="bg-white/10 backdrop-blur-md border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
              {STATS.map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center py-4 px-3 gap-0.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">{value}</span>
                  <span className="text-xs sm:text-sm text-blue-200/80 text-center leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
