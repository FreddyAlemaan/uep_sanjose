const About = () => {
  return (
    <section id="nosotros" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Text Content */}
          <div className="md:w-1/2">
            <h2 className="text-primary text-sm font-bold tracking-widest uppercase mb-4">Nuestra Identidad</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Valores Parroquiales en el corazón de La Guaira
            </h3>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              La Unidad Educativa Parroquial "San José" tiene más de 50 años de trayectoria 
              educativa, comprometidos con el desarrollo integral de nuestros estudiantes 
              en el estado La Guaira. 
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Nuestra misión es brindar una educación de excelencia basada en los valores 
              cristianos, fomentando la disciplina, el respeto y el amor al prójimo. 
              Ubicados en un entorno privilegiado, formamos ciudadanos líderes capaces 
              de transformar su comunidad.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-primary text-2xl">Excellencia</h4>
                <p className="text-gray-500">Académica y Humana</p>
              </div>
              <div>
                <h4 className="font-bold text-primary text-2xl">Fe</h4>
                <p className="text-gray-500">Compromiso Cristiano</p>
              </div>
            </div>
          </div>

          {/* Image Placeholder / Visual Element */}
          <div className="md:w-1/2 w-full h-[400px] bg-blue-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-blue-200">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="text-primary font-medium">Vista de Nuestra Sede en La Guaira</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
