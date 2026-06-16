import { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsapHelpers';

/* Número de WhatsApp del colegio — formato internacional sin signos */
const WHATSAPP_NUMBER = '582123361155';
const WHATSAPP_MESSAGE = 'Hola, quisiera más información sobre la U.E. Parroquial San José';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export default function WhatsAppButton() {
  const btnRef  = useRef(null);
  const pingRef = useRef(null);

  /* Entrada con bounce + pulso continuo del anillo exterior */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(btnRef.current, {
        scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(1.7)', delay: 1,
      });

      gsap.to(pingRef.current, {
        scale: 1.6, opacity: 0, duration: 1.8, ease: 'power1.out',
        repeat: -1, repeatDelay: 1.4, delay: 1.5,
      });
    });
    return () => ctx.revert();
  }, []);

  const hoverIn  = () => gsap.to(btnRef.current, { scale: 1.08, duration: 0.2, ease: 'power2.out' });
  const hoverOut = () => gsap.to(btnRef.current, { scale: 1,    duration: 0.2, ease: 'power2.out' });

  return (
    <a
      ref={btnRef}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir al colegio por WhatsApp"
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
      className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center
        rounded-full bg-[#25D366] shadow-lg shadow-black/20"
    >
      {/* Anillo de pulso */}
      <span
        ref={pingRef}
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-60"
      />

      {/* Ícono WhatsApp */}
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="relative z-10 h-8 w-8 fill-white"
      >
        <path d="M16.004 3C9.376 3 4 8.373 4 14.999c0 2.382.654 4.61 1.892 6.555L4 29l7.652-1.84a12.93 12.93 0 0 0 4.352.752h.004c6.628 0 12.003-5.373 12.003-12s-5.375-11.912-12.007-11.912Zm.001 21.6h-.003a10.55 10.55 0 0 1-5.382-1.47l-.386-.23-4.004.963.97-3.91-.252-.402a10.55 10.55 0 0 1-1.628-5.553c0-5.842 4.756-10.598 10.605-10.598 2.832 0 5.49 1.103 7.49 3.106a10.515 10.515 0 0 1 3.106 7.49c0 5.843-4.756 10.604-10.516 10.604Zm5.81-7.94c-.318-.16-1.882-.928-2.174-1.034-.291-.107-.504-.16-.716.16-.213.318-.823 1.034-1.01 1.246-.186.213-.372.24-.69.08-.318-.16-1.344-.495-2.561-1.58-.946-.844-1.584-1.886-1.77-2.204-.187-.318-.02-.49.16-.65.16-.144.358-.372.537-.558.18-.187.24-.318.358-.53.119-.213.06-.398-.027-.558-.087-.16-.785-1.89-1.075-2.59-.284-.685-.573-.592-.79-.6-.205-.009-.439-.011-.674-.011-.234 0-.614.087-.94.408-.327.32-1.246 1.218-1.246 2.97 0 1.751 1.276 3.443 1.453 3.683.18.24 2.45 3.736 5.937 5.092 2.943 1.142 3.55 1.005 4.193.94.643-.066 2.072-.844 2.364-1.659.292-.815.292-1.512.205-1.659-.087-.146-.318-.232-.636-.392Z" />
      </svg>
    </a>
  );
}
