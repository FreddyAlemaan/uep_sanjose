import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar    from './components/Navbar';
import Footer    from './components/Footer';
import Home      from './pages/Home';
import About     from './pages/About';
import Admissions from './pages/Admissions';
import Contact   from './pages/Contact';

/* Páginas pendientes — stub temporal hasta que se desarrollen */
const Placeholder = ({ titulo }) => (
  <main className="min-h-screen flex items-center justify-center pt-24">
    <h1 className="font-display text-3xl text-primary">{titulo}</h1>
  </main>
);

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      {/* El padding-top compensa el navbar fijo de 80px en desktop */}
      <div className="pt-20">
        <Routes>
          <Route path="/"                 element={<Home />} />
          <Route path="/colegio"          element={<About />} />
          <Route path="/admisiones"       element={<Admissions />} />
          <Route path="/academico"        element={<Placeholder titulo="Académico" />} />
          <Route path="/vida-estudiantil" element={<Placeholder titulo="Vida Estudiantil" />} />
          <Route path="/noticias"         element={<Placeholder titulo="Noticias" />} />
          <Route path="/contacto"         element={<Contact />} />
          {/* Rutas legacy conservadas para compatibilidad */}
          <Route path="/nosotros"         element={<About />} />
          <Route path="/admision"         element={<Admissions />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}
