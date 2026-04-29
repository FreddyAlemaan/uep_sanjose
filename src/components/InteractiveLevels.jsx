import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, BookOpen, Baby, CheckCircle2, ChevronRight, X, Sparkles } from 'lucide-react';

const InteractiveLevels = () => {
  const [activeLevel, setActiveLevel] = useState(null);

  const levels = [
    {
      id: 'inicial',
      title: 'Inicial',
      subtitle: '2do y 3er Nivel',
      image: '/assets/inicial.png',
      icon: <Baby className="w-6 h-6" />,
      intro: "Nuestra etapa inicial se centra en el desarrollo integral del niño, fomentando la curiosidad natural, la socialización y el desarrollo psicomotor. Utilizamos un enfoque pedagógico basado en el juego y el amor.",
      requirements: [
        "Partida de Nacimiento (Original y Copia)",
        "Copia de Cédula de Identidad de los Padres",
        "4 Fotos tipo carnet del estudiante",
        "Copia de la Tarjeta de Vacunación",
        "Constancia de Trabajo de los Padres",
        "Informe descriptivo del año anterior"
      ],
      color: "#1e3a8a"
    },
    {
      id: 'primaria',
      title: 'Primaria',
      subtitle: '1ero a 6to Grado',
      image: '/assets/primaria.png',
      icon: <BookOpen className="w-6 h-6" />,
      intro: "En la educación primaria, consolidamos las bases del pensamiento lógico, la comprensión lectora y la formación en valores. Nuestro currículo integra la excelencia académica con actividades culturales.",
      requirements: [
        "Certificado de Promoción de Educación Inicial",
        "Boleta de Calificaciones del grado anterior",
        "Copia de Cédula del Estudiante",
        "2 Fotos tipo carnet",
        "Solvencia administrativa",
        "Copia de Cédula de Representantes"
      ],
      color: "#1e3a8a"
    },
    {
      id: 'bachillerato-1-3',
      title: 'Media G. I',
      subtitle: '1er a 3er Año',
      image: '/assets/bachillerato1.png',
      icon: <GraduationCap className="w-6 h-6" />,
      intro: "El ciclo básico de Media General busca fortalecer el pensamiento crítico y analítico. Nos enfocamos en la transición a la adolescencia con herramientas sólidas en ciencias y humanidades.",
      requirements: [
        "Certificación de Calificaciones de 6to Grado",
        "Título de Educación Primaria",
        "Copia de Cédula de Identidad vigente",
        "Carta de Buena Conducta",
        "2 Fotos tipo carnet",
        "Copia de Cédula de los Representantes"
      ],
      color: "#1e3a8a"
    },
    {
      id: 'bachillerato-4-5',
      title: 'Media G. II',
      subtitle: '4to y 5to Año',
      image: '/assets/bachillerato2.png',
      icon: <GraduationCap className="w-6 h-6" />,
      intro: "El ciclo diversificado prepara a nuestros estudiantes para la excelencia universitaria. Profundizamos en áreas científicas y humanísticas, orientando al alumno hacia su vocación.",
      requirements: [
        "Certificación de Calificaciones (1ero a 3er Año)",
        "Inscripción en el SNI",
        "Copia de Cédula de Identidad vigente",
        "4 Fotos tipo carnet con uniforme",
        "Solvencia Administrativa",
        "Actualización de datos"
      ],
      color: "#1e3a8a"
    },
    {
      id: 'tecnico',
      title: 'Técnico M.',
      subtitle: '5to a 7mo Año',
      image: '/assets/bachillerato3.png',
      icon: <GraduationCap className="w-6 h-6 text-blue-500" />,
      intro: "La Media Técnica es nuestra especialidad de vanguardia. Preparamos a los estudiantes para el campo laboral con menciones en Informática y Administración, incluyendo pasantías profesionales.",
      requirements: [
        "Certificación de Calificaciones de 1ero a 5to Año",
        "Título de Educación Media General",
        "Pasantías aprobadas",
        "Inscripción en el SNI",
        "2 Fotos tipo carnet",
        "Copia de Cédula de Identidad"
      ],
      color: "#1e3a8a"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const handleToggle = (id) => {
    setActiveLevel(activeLevel === id ? null : id);
    if (activeLevel !== id) {
      setTimeout(() => {
        const element = document.getElementById('details-section');
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden" id="educational-levels">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Fina */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-4 block opacity-60">Nuestra Oferta Académica</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#001731] mb-6 tracking-tighter uppercase leading-none">
            Formando Líderes <br/>
            <span className="text-blue-600">del Mañana</span>
          </h2>
          <p className="text-lg text-gray-500 font-light leading-relaxed italic px-4">
            "Nuestra oferta académica está diseñada para formar líderes del mañana, 
            combinando excelencia académica, valores sólidos y un ambiente de 
            crecimiento integral."
          </p>
          <div className="w-16 h-1 bg-blue-100 mx-auto mt-8 rounded-full"></div>
        </motion.div>

        {/* Grid de Grados (Diseño Compacto con Imágenes) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16"
        >
          {levels.map((level) => (
            <motion.div
              key={level.id}
              variants={itemVariants}
              whileHover={{ 
                y: -12, 
                boxShadow: "0 20px 40px -15px rgba(30, 58, 138, 0.3)",
              }}
              onClick={() => handleToggle(level.id)}
              className={`cursor-pointer group relative h-[320px] rounded-[2rem] overflow-hidden transition-all duration-500 border-4 ${
                activeLevel === level.id 
                  ? 'border-primary ring-4 ring-blue-50 shadow-lg' 
                  : 'border-white'
              }`}
            >
              {/* Background Image */}
              <img 
                src={level.image} 
                alt={level.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-[#001731] via-[#001731]/40 to-transparent transition-opacity duration-500 ${
                activeLevel === level.id ? 'opacity-95' : 'opacity-70 group-hover:opacity-85'
              }`}></div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end items-center text-center text-white">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 bg-white/20 backdrop-blur-sm ${
                  activeLevel === level.id ? 'scale-110 -translate-y-2 bg-primary' : ''
                }`}>
                  {level.icon}
                </div>
                <h3 className="text-sm font-black uppercase tracking-tighter mb-1">{level.title}</h3>
                <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">{level.subtitle}</p>
                
                <div className={`mt-4 w-6 h-0.5 bg-blue-400 group-hover:w-10 transition-all duration-500 ${
                  activeLevel === level.id ? 'w-10 bg-white' : ''
                }`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed View Section */}
        <AnimatePresence mode="wait">
          {activeLevel && (
            <motion.div 
              id="details-section"
              key={activeLevel}
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <div className="bg-gray-50 rounded-[3rem] shadow-2xl border border-gray-100 p-8 md:p-16 mt-8 relative">
                {/* Decorative */}
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <Sparkles size={150} className="text-primary" />
                </div>
                
                <div className="flex justify-between items-start mb-12 relative z-10">
                  <div>
                    <h3 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tighter leading-none mb-2">
                      {levels.find(l => l.id === activeLevel).title}
                    </h3>
                    <p className="text-lg font-bold text-blue-400 uppercase tracking-widest">
                       {levels.find(l => l.id === activeLevel).subtitle}
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveLevel(null)}
                    className="p-3 bg-white hover:bg-red-50 hover:text-red-500 rounded-full transition-all duration-300 shadow-sm border border-gray-100"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
                  {/* Left: Intro & Image */}
                  <div className="space-y-8">
                    <div className="relative rounded-[2rem] overflow-hidden h-64 shadow-2xl group">
                       <img 
                          src={levels.find(l => l.id === activeLevel).image} 
                          alt="Nivel" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-[#001731]/60 to-transparent"></div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Enfoque Académico</h4>
                      <p className="text-gray-600 text-lg leading-relaxed font-light italic border-l-4 border-blue-600 pl-6">
                        {levels.find(l => l.id === activeLevel).intro}
                      </p>
                    </div>
                  </div>

                  {/* Right: Requirements Box */}
                  <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-blue-100 shadow-xl relative">
                    <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
                       <CheckCircle2 size={24} />
                    </div>
                    <h4 className="text-xl font-black text-[#001731] mb-8 uppercase tracking-tight">Requisitos de Inscripción</h4>
                    <ul className="space-y-4">
                      {levels.find(l => l.id === activeLevel).requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-4 group">
                          <div className="mt-1 bg-blue-50 p-1 rounded-full text-blue-600 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            <CheckCircle2 size={14} />
                          </div>
                          <span className="text-gray-700 font-medium text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-10 pt-6 border-t border-blue-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center sm:text-left">
                        * Documentación oficial obligatoria
                      </p>
                      <button className="bg-primary hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-primary/30 active:scale-95">
                        Inscribirse
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractiveLevels;
