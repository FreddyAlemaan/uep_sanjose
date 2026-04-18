import { useState } from 'react';
import { GraduationCap, Book, Puzzle, Lightbulb, CheckCircle2, ChevronDown, Sparkles } from 'lucide-react';

const Niveles = () => {
  const [activeLevel, setActiveLevel] = useState(null);
  const [isTecnico, setIsTecnico] = useState(false);

  const levels = [
    {
      id: 'inicial',
      title: 'Educación Inicial',
      image: '/assets/inicial.png',
      icon: <Puzzle className="w-6 h-6" />,
      color: 'from-yellow-400 to-orange-500',
      description: 'Nuestros Pequeños Sabios. Brindamos un espacio seguro donde el niño desarrolla sus habilidades motrices, cognitivas y sociales con amor y valores cristianos.',
      items: ['2do Nivel (4 años)', '3er Nivel (5 años)'],
      features: ['Atención personalizada y afectiva', 'Iniciación a la lectura y escritura', 'Actividades lúdicas y recreativas dirigidas', 'Formación y catequesis infantil']
    },
    {
      id: 'primaria',
      title: 'Educación Primaria',
      image: '/assets/primaria.png',
      icon: <Book className="w-6 h-6" />,
      color: 'from-green-400 to-emerald-600',
      description: 'Bases para el Mañana. Consolidamos el pensamiento lógico, la lectura comprensiva y la curiosidad científica en un ambiente de sana convivencia.',
      items: ['1er Grado', '2do Grado', '3er Grado', '4to Grado', '5to Grado', '6to Grado'],
      features: ['Desarrollo del pensamiento lógico-matemático', 'Fomento de la lectura y escritura creativa', 'Educación física, deportes y cultura', 'Preparación sacramental (Primera Comunión)']
    },
    {
      id: 'bachillerato',
      title: 'Bachillerato',
      image: '/assets/bachillerato.png',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'from-blue-500 to-indigo-700',
      description: 'Formando Ciudadanos. Preparamos a nuestros jóvenes para los retos de la vida universitaria y profesional con disciplina y excelencia académica.',
      items: ['1er Año', '2do Año', '3er Año', '4to Año', '5to Año'],
      features: ['Preparación pre-universitaria integral', 'Laboratorios de ciencias e informática', 'Orientación vocacional profesional', 'Proyectos de servicio comunitario']
    }
  ];

  const toggleLevel = (id) => {
    if (activeLevel === id) {
      setActiveLevel(null);
      setIsTecnico(false);
    } else {
      setActiveLevel(id);
      setIsTecnico(false);
    }
  };

  const activeContent = levels.find(l => l.id === activeLevel);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-primary pt-32 pb-20 px-4 text-center text-white relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">Niveles Educativos</h1>
        <p className="text-blue-100 max-w-xl mx-auto relative z-10 italic">
          Calidad académica con formación espiritual.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pb-24">
        {/* Grid de Tarjeticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => toggleLevel(level.id)}
              className={`group relative h-[450px] rounded-[2rem] overflow-hidden shadow-xl transition-all duration-500 hover:-translate-y-4 border-4 ${
                activeLevel === level.id ? 'border-blue-600 ring-8 ring-blue-50' : 'border-white'
              }`}
            >
              {/* Image Header */}
              <div className="h-2/3 w-full bg-gray-100 overflow-hidden relative">
                <img 
                  src={level.image} 
                  alt={level.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${activeLevel === level.id ? 'opacity-100' : 'opacity-0'}`}></div>
              </div>

              {/* Title & Floating Icon */}
              <div className="h-1/3 bg-white p-6 flex flex-col justify-center items-center relative">
                <div className={`absolute -top-8 w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-500 bg-gradient-to-br ${level.color} ${activeLevel === level.id ? 'scale-110 -translate-y-2' : ''}`}>
                  {level.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-4 uppercase tracking-tighter">{level.title}</h3>
                <div className={`w-12 h-1 rounded-full mt-2 bg-gradient-to-r ${level.color} transition-all duration-500 ${activeLevel === level.id ? 'w-24' : ''}`}></div>
              </div>

              {/* Selection Indicator */}
              {activeLevel === level.id && (
                <div className="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-full animate-bounce">
                  <ChevronDown size={20} />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Panel de Detalle que se despliega fino */}
        <div className={`transition-all duration-700 ease-in-out overflow-hidden mt-16 ${
          activeLevel ? 'max-h-[800px] opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'
        }`}>
          {activeContent && (
            <div className="bg-gray-50 rounded-[3rem] p-8 md:p-16 border border-gray-100 shadow-2xl relative">
               <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <Sparkles size={150} />
               </div>
               
               <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-start relative z-10">
                  {/* Content Column */}
                  <div className="md:w-1/2 space-y-8">
                    <div>
                      <h2 className={`text-4xl font-bold uppercase tracking-tight bg-gradient-to-r ${activeContent.color} bg-clip-text text-transparent mb-4`}>
                        {activeContent.title}
                      </h2>
                      <p className="text-gray-600 text-lg leading-relaxed italic border-l-4 border-blue-600 pl-6">
                        {activeContent.description}
                      </p>
                    </div>

                    {/* Focos / Especialidades */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Programa Educativo</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {activeContent.features.map((feature, idx) => (
                           <div key={idx} className="flex items-center gap-3">
                             <div className={`p-1.5 rounded-full bg-gradient-to-br ${activeContent.color}`}>
                                <CheckCircle2 className="text-white w-4 h-4" />
                             </div>
                             <span className="font-medium text-gray-700">{feature}</span>
                           </div>
                        ))}
                      </div>
                    </div>

                    {/* Grados / Niveles Disponibles */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Grados Ofrecidos</h4>
                      <div className="flex flex-wrap gap-2">
                        {activeContent.items.map((item, idx) => (
                           <div key={idx} className="px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-xl text-gray-700 font-bold text-sm">
                             🎓 {item}
                           </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Special Column (Bachillerato Logic) */}
                  <div className="md:w-1/2 w-full pt-4 md:pt-0">
                    {activeLevel === 'bachillerato' ? (
                      <div className="space-y-6">
                        <button
                          onClick={() => setIsTecnico(!isTecnico)}
                          className={`w-full p-8 rounded-3xl border-2 border-dashed transition-all duration-500 text-left group overflow-hidden relative ${
                            isTecnico 
                              ? 'bg-primary border-primary text-white shadow-2xl' 
                              : 'bg-white border-blue-200 text-primary hover:border-blue-400'
                          }`}
                        >
                          <div className="flex items-center gap-6 relative z-10">
                            <Lightbulb className={isTecnico ? 'text-yellow-300 animate-pulse' : 'text-primary'} size={40} />
                            <div>
                              <h4 className="text-xl font-bold">¿Quieres ser Técnico Superior?</h4>
                              <p className={`text-sm ${isTecnico ? 'text-blue-100' : 'text-blue-600 font-medium'}`}>
                                {isTecnico ? 'Cerrar opciones técnicas' : 'Descubre nuestra oferta especializada'}
                              </p>
                            </div>
                          </div>
                        </button>

                        <div className={`transition-all duration-700 overflow-hidden ${
                          isTecnico ? 'max-h-[500px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
                        }`}>
                          <div className="bg-white p-8 rounded-3xl border border-blue-100 shadow-xl space-y-4">
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest text-center border-b pb-4">
                               6to y 7mo Año - Menciones
                            </p>
                            <div className="space-y-3 pt-2">
                              {['Informática', 'Contabilidad', 'Servicios'].map((mencion, i) => (
                                 <div key={i} className="px-6 py-4 bg-blue-50 rounded-2xl text-blue-900 font-bold border-l-8 border-blue-600 shadow-sm transition-transform hover:translate-x-2">
                                   ⚡ {mencion}
                                 </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="hidden md:flex h-full items-center justify-center p-10 opacity-20">
                         <img src="/assets/logo.png" alt="logo" className="w-56 grayscale hover:grayscale-0 transition-all duration-500" />
                      </div>
                    )}
                  </div>
               </div>
               
               {/* Close button inside panel */}
               <button 
                 onClick={() => setActiveLevel(null)}
                 className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white text-gray-400 p-4 rounded-full shadow-lg border border-gray-100 hover:text-blue-600 transition-colors"
               >
                  <ChevronDown className="rotate-180" size={24} />
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Niveles;
