import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HeartStraight, Star, Users } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const VALUES = [
  {
    Icon:  HeartStraight,
    title: 'Fe y Valores',
    desc:  'Cultivamos la formacion espiritual y moral como base de una vida plena y comprometida.',
  },
  {
    Icon:  Star,
    title: 'Excelencia Academica',
    desc:  'Nos comprometemos con los mas altos estandares de calidad en cada area del conocimiento.',
  },
  {
    Icon:  Users,
    title: 'Comunidad',
    desc:  'Construimos un ambiente de respeto, colaboracion y pertenencia para estudiantes y familias.',
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left text block slides in from left
      gsap.fromTo(
        '.about-text',
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-text', start: 'top 80%', once: true },
        }
      )

      // Right image block slides in from right
      gsap.fromTo(
        '.about-image',
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-image', start: 'top 80%', once: true },
        }
      )

      // Value cards stagger in
      gsap.utils.toArray<HTMLElement>('.value-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: card, start: 'top 85%', once: true },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="nosotros" ref={sectionRef} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Split: text left / image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">

          <div className="about-text opacity-0">
            <h2 className="text-brand font-bold text-4xl md:text-5xl leading-tight tracking-tight mb-6">
              Formando personas integrales desde el corazon de la parroquia
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                La Unidad Educativa Parroquial San Jose nacio del compromiso de la comunidad parroquial
                por ofrecer una educacion fundamentada en valores cristianos y excelencia academica.
              </p>
              <p>
                A lo largo de los anos hemos acompanado a miles de familias en la formacion de sus hijos,
                desde los primeros pasos en el Preescolar hasta la graduacion en el Bachillerato.
              </p>
              <p className="font-medium text-brand">
                Nuestra mision es formar personas integras, capaces de transformar positivamente
                su entorno con sabiduria, fe y servicio.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div className="text-center">
                <p className="text-brand font-bold text-3xl">30+</p>
                <p className="text-gray-500 text-sm mt-0.5">Anos de trayectoria</p>
              </div>
              <div className="h-10 w-px bg-gray-200" />
              <div className="text-center">
                <p className="text-brand font-bold text-3xl">800+</p>
                <p className="text-gray-500 text-sm mt-0.5">Estudiantes formados</p>
              </div>
              <div className="h-10 w-px bg-gray-200" />
              <div className="text-center">
                <p className="text-brand font-bold text-3xl">3</p>
                <p className="text-gray-500 text-sm mt-0.5">Niveles educativos</p>
              </div>
            </div>
          </div>

          <div className="about-image opacity-0 relative">
            <img
              src="https://picsum.photos/seed/school-children-classroom-smiling/700/520"
              alt="Estudiantes de U.E.P. San Jose en el aula"
              className="w-full rounded-2xl object-cover aspect-[4/3] shadow-xl"
              loading="lazy"
            />
            {/* Accent card */}
            <div className="absolute -bottom-5 -left-5 bg-brand text-white px-6 py-4 rounded-xl shadow-xl">
              <p className="text-2xl font-bold leading-none">Excelencia</p>
              <p className="text-white/75 text-xs mt-1 font-medium uppercase tracking-wider">con vocacion de servicio</p>
            </div>
          </div>
        </div>

        {/* Values grid - NOT three equal cards: using different sizes/emphasis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {VALUES.map(({ Icon, title, desc }, i) => (
            <div
              key={title}
              className={[
                'value-card opacity-0 rounded-2xl p-8 transition-shadow duration-200 hover:shadow-md',
                i === 0
                  ? 'bg-brand text-white'
                  : 'bg-brand-pale text-brand',
              ].join(' ')}
            >
              <div className={[
                'w-11 h-11 rounded-lg flex items-center justify-center mb-6',
                i === 0 ? 'bg-white/15' : 'bg-brand',
              ].join(' ')}>
                <Icon
                  size={22}
                  weight="fill"
                  className={i === 0 ? 'text-white' : 'text-white'}
                />
              </div>
              <h3 className={[
                'font-bold text-xl mb-3',
                i === 0 ? 'text-white' : 'text-brand',
              ].join(' ')}>
                {title}
              </h3>
              <p className={[
                'leading-relaxed text-sm',
                i === 0 ? 'text-white/80' : 'text-gray-600',
              ].join(' ')}>
                {desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
