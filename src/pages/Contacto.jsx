import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const { name, message } = formData;
    
    // WhatsApp configuration
    const phoneNumber = "582123361155";
    const text = `Hola, mi nombre es ${name}. %0A%0A${message}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-primary py-24 px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contáctanos</h1>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto">
          Estamos aquí para resolver tus dudas. Acércate a nuestra sede o envíanos un mensaje vía WhatsApp.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
              <p className="text-gray-600 text-lg mb-4">
                Puedes visitarnos en nuestra sede principal, llamarnos por teléfono o dejarnos un mensaje a través del formulario. Te responderemos a la brevedad posible.
              </p>
              <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-bold text-sm mb-8">
                "FE - Cultura - Vida"
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start group">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <MapPin size={24} />
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-bold text-gray-900">Ubicación</h3>
                  <p className="text-gray-600 mt-1">Maiquetía, Estado La Guaira, Venezuela.</p>
                  <a 
                    href="https://www.google.com/maps/place/UE+Parroquial+San+Jos%C3%A9/@10.5310501,-67.1202563,17z/data=!3m1!4b1!4m6!3m5!1s0x8c2a63bf1ab40c17:0x71cb827fae565d19!8m2!3d10.5310501!4d-67.1202563!16s%2Fg%2F1z44bdc4g?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline inline-block mt-2"
                  >
                    Ver en Google Maps
                  </a>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Phone size={24} />
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-bold text-gray-900">WhatsApp / Teléfono</h3>
                  <a href="https://wa.me/582123361155" className="text-gray-600 mt-1 block hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                    +58 (212) 336-1155
                  </a>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mail size={24} />
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-bold text-gray-900">Correo Electrónico</h3>
                  <a href="mailto:dptoevaluacion2000@gmail.com" className="text-gray-600 mt-1 block hover:text-blue-600">
                    dptoevaluacion2000@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Clock size={24} />
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-bold text-gray-900">Horario de Atención</h3>
                  <p className="text-gray-600 mt-1">Lunes a Viernes: 7:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un WhatsApp</h3>
            <form className="space-y-6" onSubmit={handleSendMessage}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                  placeholder="Ej. María Pérez"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow resize-none"
                  placeholder="Escribe tu mensaje aquí..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-xl transition-colors flex items-center justify-center group"
              >
                Enviar a WhatsApp
                <Send size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contacto;
