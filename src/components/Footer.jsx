import { MessageCircle, Camera, Send, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contacto" className="bg-primary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Column 1: Information */}
          <div>
            <h3 className="text-xl font-bold mb-6">UEP "San José"</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="text-blue-300 flex-shrink-0" size={24} />
                <p className="text-blue-100">Av. Principal, La Guaira, Estado La Guaira, Venezuela.</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-blue-300 flex-shrink-0" size={24} />
                <p className="text-blue-100">+58 (212) 000-0000</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-blue-300 flex-shrink-0" size={24} />
                <p className="text-blue-100">contacto@uepsanjose.edu.ve</p>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-4 text-blue-100">
              <li><a href="#" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#nosotros" className="hover:text-white transition-colors">Nosotros</a></li>
              <li><a href="#niveles" className="hover:text-white transition-colors">Niveles Educativos</a></li>
              <li><a href="#contacto" className="hover:text-white transition-colors">Admisiones</a></li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-6">Síguenos</h3>
            <p className="text-blue-100 mb-6">Mantente conectado con nuestra comunidad educativa.</p>
            <div className="flex gap-6">
              <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                <MessageCircle size={24} title="Facebook" />
              </a>
              <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                <Camera size={24} title="Instagram" />
              </a>
              <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                <Send size={24} title="Twitter" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 text-center text-blue-200 text-sm">
          <p>© {new Date().getFullYear()} UEP "San José". Todos los derechos reservados.</p>
          <p className="mt-2">Diseñado con compromiso y fe.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
