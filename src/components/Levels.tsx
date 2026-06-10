import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Pencil, BookOpen, GraduationCap, ArrowRight } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const LEVELS = [
  {
    Icon:      Pencil,
    label:     'Preescolar',
    ages:      '3 - 5 anos',
    image:     'https://picsum.photos/seed/preschool-happy-children-art/800/700',
    desc:      'Un espacio lleno de juego, descubrimiento y afecto donde cada nino da sus primeros pasos hacia el aprendizaje con confianza y alegria.',
    features:  ['Estimulacion temprana', 'Desarrollo socioafectivo', 'Iniciacion a la lectoescritura'],
    large:     true,
  },
  {
    Icon:      BookOpen,
    label:     'Primaria',
    ages:      '6 - 11 anos',
    image:     'https://picsum.photos/seed/primary-school-students-reading/800/420',
    desc:      'Consolidamos las bases del conocimiento en un ambiente estructurado, fomentando la curiosidad, la disciplina y los valores.',
    features:  ['Formacion integral', 'Ciencias y matematicas', 'Arte y cultura'],
    large:     false,
  },
  {
    Icon:      GraduationCap,
    label:     'Bachillerato',
    ages:      '12 - 17 anos',
    image:     'https://picsum.photos/seed/high-school-graduation-teens/800/420',
    desc:      'Preparamos a nuestros jovenes para la educacion superior y la vida con rigor academico, liderazgo y compromiso social.',
    features:  ['Orientacion vocacional', 'Bachillerato en Ciencias', 'Proyectos de investigacion'],
    large:     false,
  },
]

export default function Levels() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.levels-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.levels-header', start: 'top 82%', once: true },
        }
      )

      gsap.utils.toArray<HTMLElement>('.level-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: { trigger: card, start: 'top 84%', once: true },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const [preescolar, primaria, bachillerato] = LEVELS

  return (
    <section id="niveles" ref={sectionRef} className="py-24 md:py-32 bg-brand-pale">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="levels-header opacity-0 max-w-2xl mb-14">
          <h2 className="text-brand font-bold text-4xl md:text-5xl leading-tight tracking-tight mb-4">
            Tres niveles, una misma vocacion
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Acompanamos a cada estudiante en cada etapa de su desarrollo con un programa adaptado a
            sus necesidades y potencial.
          </p>
        </div>

        {/* Asymmetric grid: Preescolar (big, left) + Primaria & Bachillerato stacked (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Preescolar - tall feature card */}
          <div className="level-card opacity-0 relative overflow-hidden rounded-2xl min-h-[480px] lg:min-h-[580px] group">
            <img
              src={preescolar.image}
              alt={`Nivel ${preescolar.label} de U.E.P. San Jose`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand/95 via-brand/50 to-brand/10" />

            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <preescolar.Icon size={18} weight="bold" className="text-white" />
                </div>
                <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                  {preescolar.ages}
                </span>
              </div>
              <h3 className="text-white font-bold text-3xl md:text-4xl mb-3">{preescolar.label}</h3>
              <p className="text-white/75 text-sm leading-relaxed mb-5 max-w-sm">{preescolar.desc}</p>
              <ul className="flex flex-wrap gap-2 mb-6">
                {preescolar.features.map((f) => (
                  <li
                    key={f}
                    className="text-white/80 text-xs font-medium bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full"
                  >
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:gap-3 transition-all duration-200"
              >
                Solicitar informacion <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>

          {/* Primaria + Bachillerato stacked in right column */}
          <div className="flex flex-col gap-5">
            {[primaria, bachillerato].map(({ Icon, label, ages, image, desc, features }) => (
              <div
                key={label}
                className="level-card opacity-0 relative overflow-hidden rounded-2xl min-h-[270px] group flex-1"
              >
                <img
                  src={image}
                  alt={`Nivel ${label} de U.E.P. San Jose`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand/95 via-brand/55 to-brand/10" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <Icon size={16} weight="bold" className="text-white" />
                    </div>
                    <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                      {ages}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-2xl md:text-3xl mb-2">{label}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4 max-w-md">{desc}</p>
                  <ul className="flex flex-wrap gap-2 mb-4">
                    {features.map((f) => (
                      <li
                        key={f}
                        className="text-white/80 text-xs font-medium bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contacto"
                    className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:gap-3 transition-all duration-200"
                  >
                    Solicitar informacion <ArrowRight size={15} weight="bold" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
