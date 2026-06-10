import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout        from './components/Layout'
import HomePage      from './pages/HomePage'
import NosotrosPage  from './pages/NosotrosPage'
import NivelesPage   from './pages/NivelesPage'
import GaleriaPage   from './pages/GaleriaPage'
import ContactoPage  from './pages/ContactoPage'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/"          element={<HomePage />}     />
          <Route path="/nosotros"  element={<NosotrosPage />} />
          <Route path="/niveles"   element={<NivelesPage />}  />
          <Route path="/galeria"   element={<GaleriaPage />}  />
          <Route path="/contacto"  element={<ContactoPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
