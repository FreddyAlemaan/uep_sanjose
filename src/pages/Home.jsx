import Hero from '../components/Hero';
import StatsBanner from '../components/StatsBanner';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Star } from 'lucide-react';

const Home = () => {
  return (
    <>
      <Hero />
      
      {/* Intro & Educational Levels Section */}
      <section className="py-24 bg-white overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl opacity-5">
           <img src="/assets/logo.png" alt="watermark" className="w-full" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8 text-left">
            <div className="max-w-2xl">
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Nuestra Oferta Académica</span>
              <h2 className="text-4xl md:text-6xl font-black text-[#001731] leading-none uppercase tracking-tighter">
                Formación Integral <br/>
                <span className="text-blue-600">Para el Futuro</span>
              </h2>
            </div>
            <p className="text-xl text-gray-500 max-w-md font-light leading-relaxed border-l-4 border-gray-100 pl-6">
              Desde el primer paso en inicial hasta el éxito profesional en bachillerato, acompañamos cada etapa con valores y excelencia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: "Inicial (2do y 3er Nivel)",
                image: "/assets/inicial.png",
                color: "from-yellow-400 to-orange-500",
                desc: "2do y 3er Nivel. Fomentando la curiosidad y valores."
              },
              {
                title: "Primaria (1er a 6to Grado)",
                image: "/assets/primaria.png",
                color: "from-green-400 to-emerald-600",
                desc: "1ero a 6to Grado. Bases sólidas para un gran futuro."
              },
              {
                title: "Bachillerato (1er a 3er Año)",
                image: "/assets/bachillerato.png",
                color: "from-blue-400 to-blue-600",
                desc: "1er Año a 3er Año. Iniciando la etapa de madurez."
              },
              {
                title: "Bachillerato (3er a 5to Año)",
                image: "/assets/bachillerato.png",
                color: "from-blue-600 to-indigo-800",
                desc: "3er Año a 5to Año. El gran cambio de camisa."
              },
              {
                title: "Técnico Medio (5to a 7mo Año)",
                image: "/assets/bachillerato.png",
                color: "from-indigo-600 to-purple-800",
                desc: "5to Año a 7mo Año. Especialización técnica."
              }
            ].map((level, idx) => (
              <Link 
                key={idx}
                to="/niveles"
                className="group relative h-[380px] rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-4"
              >
                {/* Background Image */}
                <img 
                  src={level.image} 
                  alt={level.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay with Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t from-[#001731] via-[#001731]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <div className={`w-10 h-1 bg-gradient-to-r ${level.color} rounded-full mb-3 transform origin-left transition-all duration-500 group-hover:w-16`}></div>
                  <h3 className="text-lg font-black mb-1 uppercase tracking-tighter leading-tight">
                    {level.title.split(' (')[0]} <br/>
                    <span className="text-[10px] font-medium opacity-60 tracking-wider">
                      ({level.title.split(' (')[1]}
                    </span>
                  </h3>
                  <p className="text-gray-200 text-[10px] font-medium leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 line-clamp-2">
                    {level.desc}
                  </p>
                  <div className="flex items-center gap-2 text-white font-bold text-[10px] tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-all">
                    Explorar <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <StatsBanner />

      {/* Quick Links Section with Images */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4 uppercase tracking-wider">Servicios y Comunidad</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explora más sobre nuestra familia educativa y procesos administrativos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-[2rem] h-64 shadow-lg">
              <img src="/assets/hero.png" alt="historia" className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-blue-900/60 group-hover:bg-blue-900/40 transition-colors"></div>
              <div className="relative p-8 h-full flex flex-col justify-between text-white">
                <div>
                   <BookOpen size={28} className="mb-4 text-blue-300" />
                   <h3 className="text-xl font-bold mb-2">Proyecto Educativo</h3>
                   <p className="text-sm text-gray-200 line-clamp-2">Conoce nuestra propuesta pedagógica basada en valores cristianos.</p>
                </div>
                <Link to="/niveles" className="inline-flex items-center text-sm font-bold hover:text-blue-200 transition-colors">
                  Leer más <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-[2rem] h-64 shadow-lg">
              <img src="/assets/primaria.png" alt="nosotros" className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-blue-900/60 group-hover:bg-blue-900/40 transition-colors"></div>
              <div className="relative p-8 h-full flex flex-col justify-between text-white">
                <div>
                   <Users size={28} className="mb-4 text-blue-300" />
                   <h3 className="text-xl font-bold mb-2">Nuestra Familia</h3>
                   <p className="text-sm text-gray-200 line-clamp-2">Más de 50 años formando líderes con compromiso y excelencia.</p>
                </div>
                <Link to="/nosotros" className="inline-flex items-center text-sm font-bold hover:text-blue-200 transition-colors">
                  Conócenos <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-[2rem] h-64 shadow-lg">
              <img src="/assets/hero.png" alt="contacto" className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-blue-900/60 group-hover:bg-blue-900/40 transition-colors"></div>
              <div className="relative p-8 h-full flex flex-col justify-between text-white">
                <div>
                   <Star size={28} className="mb-4 text-blue-300" />
                   <h3 className="text-xl font-bold mb-2">Admisiones</h3>
                   <p className="text-sm text-gray-200 line-clamp-2">¿Deseas formar parte de la UEP San José? Escríbenos hoy mismo.</p>
                </div>
                <Link to="/contacto" className="inline-flex items-center text-sm font-bold hover:text-blue-200 transition-colors">
                  Contactar <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
