import Hero from '../components/Hero';
import StatsBanner from '../components/StatsBanner';
import InteractiveLevels from '../components/InteractiveLevels';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Star } from 'lucide-react';

const Home = () => {
  return (
    <>
      <Hero />
      
      {/* Interactive Educational Levels Section */}
      <InteractiveLevels />

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
