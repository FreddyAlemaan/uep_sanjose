import { MessageCircle } from 'lucide-react';

const WhatsAppBubble = () => {
  return (
    <a
      href="https://wa.me/582123361155"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:bg-[#20ba5a] transition-all duration-300 flex items-center justify-center group"
      aria-label="Contactar por WhatsApp"
    >
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:mr-2 transition-all duration-500 ease-in-out whitespace-nowrap font-medium">
        ¿Te ayudamos?
      </span>
      <MessageCircle size={32} />
      
      {/* Pulse Effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 -z-10"></span>
    </a>
  );
};

export default WhatsAppBubble;
