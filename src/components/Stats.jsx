import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, animateCounter } from '../utils/gsapHelpers';

const STATS = [
  { prefix: '+', value: 65,   suffix: '',  label: 'Años de historia'           },
  { prefix: '+', value: 1030, suffix: '',  label: 'Estudiantes activos'         },
  { prefix: '',  value: 3,    suffix: '',  label: 'Niveles educativos'          },
  { prefix: '+', value: 100,  suffix: '',  label: 'Docentes y administrativos'  },
];

export default function Stats() {
  const sectionRef  = useRef(null);
  const counterRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Contenedor: fadeIn al entrar */
      gsap.from(sectionRef.current, {
        opacity: 0, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      });

      /* Cada número: contador animado */
      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const { value, prefix, suffix } = STATS[i];
        el.textContent = prefix + '0' + suffix;

        animateCounter(el, value, suffix, {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
          onUpdate() {
            const proxy = this.targets()[0];
            el.textContent = prefix + Math.round(proxy.val).toLocaleString('es-VE') + suffix;
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-primary py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {STATS.map(({ prefix, value, suffix, label }, i) => (
            <div key={label} className="flex flex-col items-center text-center px-4">
              <span
                ref={el => (counterRefs.current[i] = el)}
                className="font-display text-4xl font-bold text-secondary sm:text-5xl"
                aria-label={`${prefix}${value}${suffix} ${label}`}
              >
                {prefix}0{suffix}
              </span>
              <span className="mt-2 text-sm font-medium text-white/80 font-sans">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
