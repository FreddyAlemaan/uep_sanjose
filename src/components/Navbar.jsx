import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { title: 'Inicio', href: '/' },
    { title: 'Nosotros', href: '/nosotros' },
    { title: 'Niveles', href: '/niveles' },
    { title: 'Contacto', href: '/contacto' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <img 
                className="h-16 w-auto mix-blend-multiply bg-transparent group-hover:scale-105 transition-transform duration-300 object-contain" 
                src="/assets/logo.png" 
                alt="Logo UEP San José" 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/150x150?text=LOGO+SJ'; }}
              />
              <span className="hidden lg:block font-bold text-primary text-xl tracking-tight">UEP San José</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className={`font-medium transition-colors ${
                  location.pathname === item.href 
                    ? 'text-blue-700 border-b-2 border-blue-700' 
                    : 'text-primary hover:text-blue-700'
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburguer Menu */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary hover:text-blue-700 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className={`block px-3 py-4 font-medium transition-colors ${
                location.pathname === item.href
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-primary hover:bg-blue-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
