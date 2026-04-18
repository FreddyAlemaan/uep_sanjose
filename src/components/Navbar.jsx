import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: 'Inicio', href: '#' },
    { title: 'Nosotros', href: '#nosotros' },
    { title: 'Niveles', href: '#niveles' },
    { title: 'Contacto', href: '#contacto' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <img 
              className="h-12 w-auto" 
              src="assets/logo-uep-sanjose.png" 
              alt="UEP San José Logo" 
              onError={(e) => { e.target.src = 'https://via.placeholder.com/150x50?text=UEP+SJ'; }}
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="text-primary hover:text-blue-700 font-medium transition-colors"
              >
                {item.title}
              </a>
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
            <a
              key={item.title}
              href={item.href}
              className="block px-3 py-4 text-primary hover:bg-blue-50 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
