import { useState } from 'react';
import { Shield, Target, ScrollText, Users, ChevronDown, ChevronUp } from 'lucide-react';

const Nosotros = () => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-primary py-24 px-4 sm:px-6 lg:px-8 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">Nuestra Institución</h1>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto relative z-10 italic">
          "FE - Cultura - Vida"
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-24">
        
        {/* Reseña Histórica Section (Accordion Style) */}
        <section className="bg-gray-50 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden transition-all duration-300">
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="w-full p-8 md:p-12 flex flex-col md:flex-row items-center justify-between text-left group hover:bg-gray-100/50 transition-colors"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                <ScrollText size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Reseña Histórica</h2>
                <p className="text-blue-600 font-medium mt-1">
                  {showHistory ? 'Cerrar historia' : 'Haz clic para conocer nuestra trayectoria desde 1957'}
                </p>
              </div>
            </div>
            <div className={`mt-6 md:mt-0 p-3 rounded-full bg-white shadow-md text-blue-600 transition-transform duration-500 ${showHistory ? 'rotate-180' : ''}`}>
              <ChevronDown size={24} />
            </div>
          </button>
          
          {/* Animated Expansion */}
          <div className={`transition-all duration-700 ease-in-out overflow-hidden ${
            showHistory ? 'max-h-[1200px] opacity-100 border-t border-gray-200' : 'max-h-0 opacity-0'
          }`}>
            <div className="p-8 md:p-12">
              <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-inner max-h-[600px] overflow-y-auto custom-scrollbar">
                <div className="space-y-6 text-gray-600 leading-relaxed pr-4 text-lg">
                  <p>
                    El colegio Parroquial San José de Carayaca fue fundado el 16 de septiembre de 1957, por el Pbro. Elio de Bonaventura, párroco de carayaca, un salcedote joven emprendedor, progresista humanista y con grandes deseos de trabajar por el pueblo.
                  </p>
                  <p>
                    Dos años atrás, en 1955, funda en la casa parroquial un pequeño kinder, siendo su maestra Tirza Álvarez Padilla. Este kinder funciona con la colaboración y apoyo de personas preocupadas por el progreso de la parroquia y la educación de sus hijos. Los resultados del kinder son tan valiosos que surge la idea de crear una escuela mas amplia, con grados donde los representantes pudieran dar un aporte económico a fin de cubrir los gastos del plantel para que los niños de pocos recursos estudiaran allí.
                  </p>
                  <p>
                    La escuela con alumnos hasta el 4º comienza a funcionar en la casa que esta en frente a la hoy Jefatura Civil. En 1958 es nombrado párroco Francisco Troiani, quien se dedica a tiempo completo a mejorar la obra recién iniciada, su meta era; logra la educación de los niños, incluyendo la educación religiosa.
                  </p>
                  <p>
                    Para el año 1960 debido al aumento de la matricula y dado al auge que tomo el plantel, se pensó en la necesidad de buscar un nuevo local, en 1961 el padre Troiani, con la venida del santo padre, el Papa construye e inaugura el edifico propio al lado de la iglesia Parroquial, para reunir fondos se vendieron algunos terrenos de la parroquia además del aporte de algunas personas y la colaboración de algunos obreros del MTC.
                  </p>
                  <p>
                    En 1957, el párroco Crescencio Torrealba nombra directora a Tirza Álvarez Padilla y como administrador al Sr. Leoncio González. La cual solo dura dos años y es sustituida por Carmen de Blanco, quien había ejercido ese cargo y la docencia en años anteriores.
                  </p>
                  <p>
                     Durante el año escolar 1967-1968 se funda la Banda Seca, cuyos instrumentos fueron donados por la comandancia General de la Marina y los instrumentos eran del cuerpo de Bomberos. En 1972, el Gobierno Nacional a instancias de AVEC, concede un pequeño subsidio que le servirá de mucha ayuda para el aumento de sueldo al personal.
                  </p>
                  <p>
                    El colegio parroquial a lo largo de sus años siempre a sido ejemplo de disciplina, respeto, cultura, orden religiosidad, catequesis, solidaridad, unidad, uniformidad, moral y buenas costumbres. Con los cambios administrativos ocurridos en octubre de 1995, comienza una nueva era en la institución.
                  </p>
                  <p>
                    Se conforma la asociación Civil sin fines lucros Parroquial San José, Rif J-30348946-0. Para el año 1996 continúan Monseñor Cesar Porras (Administrador) y el Lic. Carlos Acosta (Director) logrando frutos para la institución, esta vez con la prosecución a la tercera etapa y diversificado en la especialidad Comercio y Servicios Administrativos.
                  </p>
                  <p>
                    En octubre del 1998 se cumple un deseo de la comunidad educativa como lo es la reactivación de la Banda seca del colegio conformada por 75 instrumentos. Para el año 1999 recibimos 110.000.000 Bs. Donados por la CANTV, esta donación y la del Fondo Único se invirtieron en las construcciones de las fundaciones y del edificio.
                  </p>
                  <p>
                    Para el año escolar 2002-2003 el 27 de Noviembre es la Inauguración de nuestro tan esperado Liceo Parroquial “San José”. Actualmente el liceo cuenta con una matricula de más de 1.000 alumnos. 
                  </p>
                  <p>
                    La primera promoción de Técnicos Medio, mención Informática egresó en el mes de julio del año escolar 2001-2002. En el año 2003 se construyo el edificio de la Escuela gracias al D.V.C y los aportes económicos de la Electricidad de Caracas C.A.
                  </p>
                  <p>
                    Año escolar 2004-2005 se inicio con la creación de una coordinación de pastoral. En este nuevo año escolar 2006-2007 se apertura la mención de Servicios Administrativos y se logró la dotación de nuevos Laboratorios de Informática tanto para la Escuela como para el Liceo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Misión */}
          <div className="group bg-white p-10 rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-900/5 relative overflow-hidden transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-600/30">
              <Target size={32} />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6 font-primary italic">Misión</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Incorporar todos aquellos elementos que nuestros jóvenes necesitan para lograr una formación integral fundamentada en saber, valores y vida que nos garanticen su integración efectiva a los campos laborales y universitarios en nuestra sociedad actual.
            </p>
          </div>

          {/* Visión */}
          <div className="group bg-white p-10 rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-900/5 relative overflow-hidden transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-primary/30">
              <Shield size={32} />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6 font-primary italic">Visión</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Involucrar a toda nuestra institución y su entorno en un proceso educativo evangelizador que ayude al alumno a hacer la síntesis:
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-600">
              <span className="text-2xl font-bold text-blue-700 italic">"FE – Cultura – Vida"</span>
            </div>
          </div>
        </section>

        {/* Synthesis / Core Values */}
        <section className="text-center py-20 bg-primary rounded-[3rem] text-white overflow-hidden relative shadow-2xl shadow-blue-900/40">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <Users className="w-16 h-16 mx-auto mb-8 text-blue-300" />
            <h2 className="text-4xl font-bold mb-8 uppercase tracking-widest">Nuestra Identidad</h2>
            <p className="text-xl text-blue-100 leading-relaxed italic border-t border-blue-100/20 pt-8">
              "Educamos para la vida, guiados por la fe y arraigados en nuestra cultura parroquial."
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Nosotros;
