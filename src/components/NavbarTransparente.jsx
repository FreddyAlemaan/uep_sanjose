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
            <Link to="/" className="flex items-center gap-2 md:gap-3">
              <img
                src="/assets/logo.png"
                alt="Logo UEP San José"
                className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-10' : 'h-10 md:h-12'}`}
              />
              <div className="flex flex-col text-white font-serif tracking-widest leading-none">
                <span className={`transition-all duration-300 font-light ${isScrolled ? 'text-[10px] md:text-lg' : 'text-xs md:text-xl'}`}>UEP</span>
                <span className={`transition-all duration-300 font-semibold ${isScrolled ? 'text-[10px] md:text-lg' : 'text-xs md:text-xl'}`}>SAN JOSÉ</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-white text-xs font-bold tracking-widest hover:text-blue-300 transition-colors uppercase"
              >
                {link.name}
              </Link>
            ))}
            
            <Link 
              to="/contacto" 
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-black py-2.5 px-6 rounded-none transition-all shadow-lg hover:shadow-red-600/20 uppercase tracking-tighter"
            >
              INSCRÍBETE YA
            </Link>
            
            <button className="text-white hover:text-blue-300 transition-colors">
              <Search size={18} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay with Glassmorphism */}
      <div 
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen 
            ? 'translate-x-0 opacity-100 visible' 
            : 'translate-x-full opacity-0 invisible'
        }`}
      >
        {/* Blurred Background */}
        <div className="absolute inset-0 bg-[#001731]/95 backdrop-blur-xl"></div>
        
        <div className="relative flex flex-col h-full items-center justify-center space-y-10 p-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-white text-3xl font-extrabold tracking-[0.2em] uppercase transition-all duration-300 hover:text-blue-400 hover:scale-110 transform ${
                isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {link.name}
            </Link>
          ))}
          
          <div 
            className={`w-full max-w-xs transition-all duration-500 delay-300 transform ${
              isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Link 
              to="/contacto" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center bg-red-600 hover:bg-red-700 text-white text-xl font-black py-5 rounded-none uppercase tracking-tighter shadow-2xl transition-all active:scale-95"
            >
              INSCRÍBETE YA
            </Link>
          </div>

          {/* Decorative element */}
          <div className="absolute bottom-10 opacity-10">
            <img src="/assets/logo.png" alt="watermark" className="w-32 grayscale" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarTransparente;
