import { Routes, Route } from 'react-router-dom';
// Components
import NavbarTransparente from './components/NavbarTransparente';
import Footer from './components/Footer';
import WhatsAppBubble from './components/WhatsAppBubble';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import Niveles from './pages/Niveles';
import Contacto from './pages/Contacto';

function App() {
  console.log('App component rendering');
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ScrollToTop />
      <NavbarTransparente />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/niveles" element={<Niveles />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppBubble />
    </div>
  );
}

export default App;
