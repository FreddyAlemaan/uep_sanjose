import { MapPin } from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa';
import WeatherWidget from './WeatherWidget';

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white pt-16 pb-8 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Blur Background Element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 mb-12">
          
          {/* Brand & Slogan Column */}
          <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
            <div>
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 mb-1">
                UEP "San José"
              </h3>
              <p className="text-blue-300 text-sm italic tracking-widest uppercase font-medium">"FE - Cultura - Vida"</p>
            </div>
            {/* Weather Widget */}
            <div className="mt-2">
              <WeatherWidget />
            </div>
          </div>

          {/* Contact Information Column */}
          <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
            <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              Ubicación
            </h4>
            <div className="flex flex-col gap-3 text-sm text-gray-400 items-center md:items-start">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <p>Calle 10, Caracas 1073,<br />Miranda, Venezuela</p>
              </div>
            </div>
          </div>

          {/* Socials Column */}
          <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
            <h4 className="text-lg font-semibold text-white mb-2">
              Síguenos
            </h4>
            <div className="flex items-center gap-4">
              <a href="https://wa.me/582123361155" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-[#25D366] hover:-translate-y-1 transition-all text-white border border-white/10 hover:border-transparent shadow-sm">
                <FaWhatsapp size={20} />
              </a>
              <a href="https://www.instagram.com/uepsanjose/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:-translate-y-1 transition-all text-white border border-white/10 hover:border-transparent shadow-sm">
                <FaInstagram size={20} />
              </a>
              <a href="mailto:dptoevaluacion2000@gmail.com" className="p-3 bg-white/5 rounded-full hover:bg-[#EA4335] hover:-translate-y-1 transition-all text-white border border-white/10 hover:border-transparent shadow-sm">
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar minimal */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-xs text-center md:text-left">
          <p>© {new Date().getFullYear()} UEP "San José". Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">Diseñado con <span className="text-red-500 text-sm">♥</span> para la comunidad estudiantil.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
