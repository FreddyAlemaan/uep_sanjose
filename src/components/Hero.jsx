const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-primary overflow-hidden">
      {/* Background Pattern / Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
          Unidad Educativa Parroquial <br />
          <span className="text-blue-200">"San José"</span>
        </h1>
        <p className="text-lg md:text-2xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Formando con valores, excelencia académica y fe en el corazón de La Guaira.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg transform hover:-translate-y-1">
            Inscripciones Abiertas
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all">
            Conoce más
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
