import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Book, Baby, CheckCircle2, ChevronDown, Sparkles, X, BookOpen } from 'lucide-react';

const Niveles = () => {
  const [activeLevel, setActiveLevel] = useState(null);

  const levels = [
    {
      id: 'inicial',
      title: 'Inicial',
      subtitle: '2do y 3er Nivel',
      image: '/assets/inicial.png',
      icon: <Baby className="w-6 h-6" />,
      description: "Nuestra etapa inicial se centra en el desarrollo integral del niño, fomentando la curiosidad natural, la socialización y el desarrollo psicomotor. Utilizamos un enfoque pedagógico basado en el juego y el amor.",
      requirements: [
        "Partida de Nacimiento (Original y Copia)",
        "Copia de Cédula de Identidad de los Padres",
        "4 Fotos tipo carnet del estudiante",
        "Copia de la Tarjeta de Vacunación",
        "Constancia de Trabajo de los Padres",
        "Informe descriptivo del año anterior"
      ],
      items: ['2do Nivel (4 años)', '3er Nivel (5 años)']
    },
    {
      id: 'primaria',
      title: 'Primaria',
      subtitle: '1ero a 6to Grado',
      image: '/assets/primaria.png',
      icon: <BookOpen className="w-6 h-6" />,
      description: "En la educación primaria, consolidamos las bases del pensamiento lógico, la comprensión lectora y la formación en valores. Nuestro currículo integra la excelencia académica con actividades culturales.",
      requirements: [
        "Certificado de Promoción de Educación Inicial",
        "Boleta de Calificaciones del grado anterior",
        "Copia de Cédula del Estudiante",
        "2 Fotos tipo carnet",
        "Solvencia administrativa",
        "Copia de Cédula de Representantes"
      ],
      items: ['1er a 3er Grado', '4to a 6to Grado']
    },
    {
      id: 'bachillerato-1-3',
      title: 'Media G. I',
      subtitle: '1er a 3er Año',
      image: '/assets/bachillerato1.png',
      icon: <GraduationCap className="w-6 h-6" />,
      description: "El ciclo básico de Media General busca fortalecer el pensamiento crítico y analítico. Nos enfocamos en la transición a la adolescencia con herramientas sólidas en ciencias y humanidades.",
      requirements: [
        "Certificación de Calificaciones de 6to Grado",
        "Título de Educación Primaria",
        "Copia de Cédula de Identidad vigente",
        "Carta de Buena Conducta",
        "2 Fotos tipo carnet",
        "Copia de Cédula de los Representantes"
      ],
      items: ['1er Año', '2do Año', '3er Año']
    },
    {
      id: 'bachillerato-4-5',
      title: 'Media G. II',
      subtitle: '4to y 5to Año',
      image: '/assets/bachillerato2.png',
      icon: <GraduationCap className="w-6 h-6" />,
      description: "El ciclo diversificado prepara a nuestros estudiantes para la excelencia universitaria. Profundizamos en áreas científicas y humanísticas, orientando al alumno hacia su vocación.",
      requirements: [
        "Certificación de Calificaciones (1ero a 3er Año)",
        "Inscripción en el SNI",
        "Copia de Cédula de Identidad vigente",
        "4 Fotos tipo carnet con uniforme",
        "Solvencia Administrativa",
        "Actualización de datos"
      ],
      items: ['4to Año', '5to Año']
    },
    {
      id: 'tecnico',
      title: 'Técnico M.',
      subtitle: '5to a 7mo Año',
      image: '/assets/bachillerato3.png',
      icon: <GraduationCap className="w-6 h-6 text-blue-500" />,
      description: "La Media Técnica es nuestra especialidad de vanguardia. Preparamos a los estudiantes para el campo laboral con menciones en Informática y Administración, incluyendo pasantías profesionales.",
      requirements: [
        "Certificación de Calificaciones de 1ero a 5to Año",
        "Título de Educación Media General",
        "Pasantías aprobadas",
        "Inscripción en el SNI",
        "2 Fotos tipo carnet",
        "Copia de Cédula de Identidad"
      ],
      items: ['5to Año', '6to Año', '7mo Año']
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

  const toggleLevel = (id) => {
    setActiveLevel(activeLevel === id ? null : id);
    if (activeLevel !== id) {
      setTimeout(() => {
        const element = document.getElementById('details-section');
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  const activeContent = levels.find(l => l.id === activeLevel);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-[#001731] pt-32 pb-20 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="relative z-10"
        >
          <span className="text-blue-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">UEP San José</span>
          <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter">Niveles Educativos</h1>
          <div className="w-24 h-1.5 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pb-24">
        
        {/* Intro Fina */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-black text-[#001731] mb-6 tracking-tighter uppercase">
            Formando Líderes del Futuro
          </h2>
          <p className="text-lg text-gray-500 font-light leading-relaxed italic px-4">
            "Nuestra oferta académica está diseñada para formar líderes del mañana, 
            combinando excelencia académica, valores sólidos y un ambiente de 
            crecimiento integral."
          </p>
        </motion.div>

        {/* Grid de Grados (Diseño Compacto con Imágenes) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {levels.map((level) => (
            <motion.div
              key={level.id}
              variants={itemVariants}
              whileHover={{ 
                y: -12, 
                boxShadow: "0 20px 40px -15px rgba(30, 58, 138, 0.3)",
              }}
              onClick={() => toggleLevel(level.id)}
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
                activeLevel === level.id ? 'opacity-95' : 'opacity-80 group-hover:opacity-90'
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

        {/* Panel de Detalle */}
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
              <div className="bg-gray-50 rounded-[3.5rem] p-8 md:p-16 mt-12 border border-gray-100 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Sparkles size={150} className="text-primary" />
                 </div>
                 
                 <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
                    {/* Left Column: Intro & Items */}
                    <div className="space-y-10">
                      <div>
                        <h2 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter mb-4 leading-none">
                          {activeContent.title}
                        </h2>
                        <p className="text-xl font-bold text-blue-600 mb-6 uppercase tracking-widest">
                           {activeContent.subtitle}
                        </p>
                        <div className="relative rounded-3xl overflow-hidden h-60 shadow-xl mb-8 group">
                           <img src={activeContent.image} alt={activeContent.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                           <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed font-light border-l-4 border-blue-600 pl-6 italic">
                          {activeContent.description}
                        </p>
                      </div>

                      {/* Grados Ofrecidos */}
                      <div>
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-4">Grados Disponibles</h4>
                        <div className="flex flex-wrap gap-2">
                          {activeContent.items.map((item, idx) => (
                             <div key={idx} className="px-5 py-2.5 bg-white border border-blue-100 shadow-sm rounded-2xl text-primary font-bold text-xs">
                               {item}
                             </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Requirements Box */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-blue-50 relative">
                      <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
                         <CheckCircle2 size={24} />
                      </div>
                      <h4 className="text-xl font-black text-[#001731] mb-8 uppercase tracking-tight">Requisitos de Inscripción</h4>
                      
                      <ul className="space-y-5">
                        {activeContent.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-4 group">
                            <div className="mt-1 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0">
                              <CheckCircle2 size={12} />
                            </div>
                            <span className="text-gray-700 font-medium text-sm leading-tight">{req}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-10 pt-8 border-t border-gray-100 text-center">
                         <button className="w-full bg-primary hover:bg-blue-800 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg hover:shadow-primary/30 active:scale-95">
                            Iniciar Admisión
                         </button>
                      </div>
                    </div>
                 </div>
                 
                 {/* Close button */}
                 <button 
                   onClick={() => setActiveLevel(null)}
                   className="absolute top-8 right-8 text-gray-300 hover:text-red-500 transition-colors"
                 >
                    <X size={32} />
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Niveles;
