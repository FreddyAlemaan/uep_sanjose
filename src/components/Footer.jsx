import { MessageCircle, Camera, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Brand & Slogan */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold">UEP "San José"</h3>
            <p className="text-blue-200 text-sm mt-1 italic">"FE - Cultura - Vida"</p>
          </div>

          {/* Quick Links Horizontal */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <Link to="/" className="text-blue-100 hover:text-white transition-colors text-sm font-medium">Inicio</Link>
            <Link to="/nosotros" className="text-blue-100 hover:text-white transition-colors text-sm font-medium">Nosotros</Link>
            <Link to="/niveles" className="text-blue-100 hover:text-white transition-colors text-sm font-medium">Niveles</Link>
            <Link to="/contacto" className="text-blue-100 hover:text-white transition-colors text-sm font-medium">Contacto</Link>
          </nav>

          {/* Socials & Contact Simple */}
          <div className="flex items-center gap-4">
            <a href="https://wa.me/582123361155" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-blue-100">
              <MessageCircle size={20} />
            </a>
            <a href="https://www.instagram.com/uepsanjose/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-blue-100">
              <Camera size={20} />
            </a>
            <a href="mailto:dptoevaluacion2000@gmail.com" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-blue-100">
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Bottom Bar Minimal */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-blue-300 text-xs">
          <p>© {new Date().getFullYear()} UEP "San José". Maiquetía, La Guaira.</p>
          <div className="flex gap-4">
            <a href="tel:+582123361155" className="hover:text-white transition-colors flex items-center gap-1">
              <Phone size={12} /> +58 (212) 336-1155
            </a>
            <p className="hidden md:block">|</p>
            <a href="https://www.google.com/maps/place/UE+Parroquial+San+Jos%C3%A9/@10.5310501,-67.1202563,17z/data=!3m1!4b1!4m6!3m5!1s0x8c2a63bf1ab40c17:0x71cb827fae565d19!8m2!3d10.5310501!4d-67.1202563!16s%2Fg%2F1z44bdc4g?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <MapPin size={12} /> Ver Mapa
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
