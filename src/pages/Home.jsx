import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Star } from 'lucide-react';

const Home = () => {
  return (
    <>
      <Hero />
      
      {/* Quick Links Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">Bienvenidos a nuestra Institución</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Más de 50 años formando líderes con valores y excelencia académica en La Guaira.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-blue-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 border border-blue-100">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6 text-white">
                <BookOpen size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Descubre nuestros niveles</h3>
              <p className="text-gray-600 mb-6">
                Desde educación inicial hasta media general, acompañamos cada etapa del desarrollo.
              </p>
              <Link to="/niveles" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
                Ver niveles <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-blue-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 border border-blue-100">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6 text-white">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Conoce nuestra historia</h3>
              <p className="text-gray-600 mb-6">
                Una gran familia dedicada a la educación con bases sólidas y compromiso cristiano.
              </p>
              <Link to="/nosotros" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
                Ver nosotros <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-blue-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 border border-blue-100">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6 text-white">
                <Star size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ponte en contacto</h3>
              <p className="text-gray-600 mb-6">
                ¿Tienes dudas o quieres formar parte de la UEP San José? Escríbenos hoy.
              </p>
              <Link to="/contacto" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
                Contáctanos <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
