import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const NavbarTransparente = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'INICIO', path: '/' },
    { name: 'NOSOTROS', path: '/nosotros' },
    { name: 'NIVELES', path: '/niveles' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#001731] shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-3">
              {/* Usamos invert y mix-blend-screen para intentar quitar un fondo blanco y hacer la imagen blanca. 
                  Si la imagen original es un PNG transparente de color, solo 'brightness-0 invert' funcionaría mejor para hacerla blanca. */}
              <img
                src="/assets/logo.png"
                alt="Logo UEP San José"
                className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-10' : 'h-12'}`}
              />
              <div className="flex flex-col text-white font-serif tracking-widest leading-none">
                <span className={`transition-all duration-300 font-light ${isScrolled ? 'text-xs md:text-lg' : 'text-sm md:text-xl'}`}>UEP</span>
                <span className={`transition-all duration-300 font-semibold ${isScrolled ? 'text-xs md:text-lg' : 'text-sm md:text-xl'}`}>SAN JOSÉ</span>
              </div>
            </Link>
          </div>

          {/* Menú (Igual en Desktop y Móvil) */}
          <div className="flex items-center space-x-2 md:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-white text-[9px] md:text-xs tracking-wider hover:text-gray-300 transition-colors whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Botón Inscríbete */}
            <Link 
              to="/contacto" 
              className="bg-red-600 hover:bg-red-700 text-white text-[9px] md:text-xs font-bold py-1.5 px-2 md:py-2 md:px-4 rounded-none uppercase transition-colors shadow-sm whitespace-nowrap"
            >
              INSCRÍBETE YA
            </Link>
            
            {/* Search Icon */}
            <button className="text-white hover:text-gray-300 transition-colors ml-1 md:ml-0">
              <Search size={14} className="md:w-[18px] md:h-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarTransparente;
