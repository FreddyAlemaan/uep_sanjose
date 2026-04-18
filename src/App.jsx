import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  console.log('App component rendering');
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        {/* Aditional sections like Levels could be added here */}
        <section id="niveles" className="py-24 bg-gray-50 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary mb-8">Niveles Educativos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-4">Inicial</h3>
                <p className="text-gray-600">Primeros pasos con valores y alegría.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-4">Primaria</h3>
                <p className="text-gray-600">Bases sólidas para el futuro.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-4">Media General</h3>
                <p className="text-gray-600">Formando líderes y ciudadanos.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
