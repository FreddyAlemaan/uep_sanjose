import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppBubble = () => {
  return (
    <a
      href="https://wa.me/582123361155"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      aria-label="Contactar por WhatsApp"
    >
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:mr-2 transition-all duration-500 ease-in-out whitespace-nowrap font-medium bg-white text-gray-800 px-0 group-hover:px-4 py-0 group-hover:py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100">
        ¿Te ayudamos?
      </span>
      <div className="relative flex items-center justify-center text-[#25D366] bg-white rounded-full shadow-2xl">
        <FaWhatsapp size={56} />
        {/* Pulse Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 -z-10"></span>
      </div>
    </a>
  );
};

export default WhatsAppBubble;
