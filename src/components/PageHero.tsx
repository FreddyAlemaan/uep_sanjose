import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from '@phosphor-icons/react'
import { gsap } from 'gsap'

interface Props {
  title:     string
  subtitle?: string
}

// Branded section header used on every sub-page (/nosotros, /niveles, etc.)
export default function PageHero({ title, subtitle }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })
      tl.fromTo('.ph-back',     { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out' })
        .fromTo('.ph-title',    { opacity: 0, y: 28 },  { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.2')
        .fromTo('.ph-subtitle', { opacity: 0, y: 18 },  { opacity: 1, y: 0, duration: 0.5,  ease: 'power3.out' }, '-=0.35')
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      className="relative bg-brand text-white overflow-hidden pt-36 pb-16 px-4 sm:px-6"
    >
      {/* Decorative radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <Link
          to="/"
          className="ph-back opacity-0 inline-flex items-center gap-2 text-white/55 hover:text-white text-xs font-medium uppercase tracking-widest mb-8 transition-colors duration-200"
        >
          <ArrowLeft size={13} weight="bold" />
          Inicio
        </Link>

        <h1 className="ph-title opacity-0 text-4xl md:text-6xl font-bold tracking-tight leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="ph-subtitle opacity-0 text-white/60 mt-4 text-lg md:text-xl max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom fade into the next section's background */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/5 to-transparent"
      />
    </section>
  )
}
