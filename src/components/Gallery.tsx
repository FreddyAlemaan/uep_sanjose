import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PHOTOS = [
  {
    seed:   'school-sports-day-children-running',
    alt:    'Dia deportivo - estudiantes corriendo en el patio',
    aspect: 'aspect-[4/3]',
  },
  {
    seed:   'school-classroom-teacher-board',
    alt:    'Clase con pizarron - docente ensenando',
    aspect: 'aspect-square',
  },
  {
    seed:   'school-library-reading-kids',
    alt:    'Biblioteca - ninos leyendo',
    aspect: 'aspect-[3/4]',
  },
  {
    seed:   'school-science-lab-experiment',
    alt:    'Laboratorio de ciencias - experimento estudiantil',
    aspect: 'aspect-[4/3]',
  },
  {
    seed:   'school-graduation-ceremony-teens',
    alt:    'Ceremonia de graduacion del bachillerato',
    aspect: 'aspect-[3/4]',
  },
  {
    seed:   'school-art-class-painting-children',
    alt:    'Clase de arte - pintura creativa',
    aspect: 'aspect-square',
  },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gallery-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.gallery-header', start: 'top 82%', once: true },
        }
      )

      gsap.utils.toArray<HTMLElement>('.gallery-item').forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 28, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power3.out',
            delay: i * 0.08,
            scrollTrigger: { trigger: item, start: 'top 88%', once: true },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="galeria" ref={sectionRef} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header - left aligned, no eyebrow */}
        <div className="gallery-header opacity-0 flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-brand font-bold text-4xl md:text-5xl leading-tight tracking-tight">
              Vida en nuestra escuela
            </h2>
            <p className="text-gray-500 mt-3 text-lg">
              Momentos que reflejan nuestra comunidad educativa.
            </p>
          </div>
          <Link
            to="/contacto"
            className="btn btn-shine shrink-0 px-5 py-2.5 rounded-lg border-2 border-brand text-brand font-semibold text-sm hover:bg-brand hover:text-white"
          >
            Visita nuestras instalaciones
          </Link>
        </div>

        {/* Masonry columns - CSS columns for natural staggering */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {PHOTOS.map(({ seed, alt, aspect }) => (
            <div
              key={seed}
              className="gallery-item opacity-0 break-inside-avoid rounded-xl overflow-hidden group"
            >
              <img
                src={`https://picsum.photos/seed/${seed}/700/700`}
                alt={alt}
                loading="lazy"
                className={[
                  'w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]',
                  aspect,
                ].join(' ')}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
