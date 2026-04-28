import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-[550px] flex items-center justify-center overflow-hidden">
      {/* Background Image Full Width */}
      <div className="absolute inset-0">
        <img 
          src="/assets/hero.png" 
          alt="Colegio Background" 
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay suave para legibilidad */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        
        {/* Minimal Subtitle / Slogan */}
        <p className="text-sm md:text-base font-bold tracking-[0.3em] uppercase text-blue-200 mb-4 drop-shadow-md">
          Fe • Cultura • Vida
        </p>

        {/* Elegant Typography Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-xl">
          Unidad Educativa <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">
            Parroquial San José
          </span>
        </h1>

        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed text-gray-200 drop-shadow-md">
          Liderando con excelencia el proceso educativo evangelizador en nuestra comunidad.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contacto"
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/50 transform hover:-translate-y-1 text-sm md:text-base"
            >
              Inscripciones Abiertas
            </Link>
            <Link 
              to="/niveles"
              className="px-8 py-3 bg-transparent border-2 border-white/80 text-white font-bold rounded-full hover:bg-white hover:text-primary transition-all transform hover:-translate-y-1 text-sm md:text-base"
            >
              Ver Niveles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
