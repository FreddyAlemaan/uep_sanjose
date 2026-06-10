import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 2000, suffix: '+', label: 'Estudiantes Graduados' },
  { value: 1500, suffix: '+', label: 'Familias Unidas'       },
  { value: 60,   suffix: '+', label: 'Anos de Historia'      },
  { value: 100,  suffix: '%', label: 'Excelencia'            },
]

export default function StatsCounter() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const cardRef  = useRef<HTMLDivElement>(null)
  const numRefs  = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Card entrance: lift + fade + subtle scale
      gsap.fromTo(
        cardRef.current,
        { y: 56, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 1.05,
          ease: 'power4.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 90%', once: true },
        }
      )

      // 2. Column stagger reveal
      gsap.fromTo(
        '.stat-item',
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.11,
          duration: 0.72,
          ease: 'power3.out',
          delay: 0.22,
          scrollTrigger: { trigger: cardRef.current, start: 'top 87%', once: true },
        }
      )

      // 3. Number count-up (direct DOM write - no React re-render on each tick)
      STATS.forEach(({ value }, i) => {
        const el = numRefs.current[i]
        if (!el) return

        const proxy = { val: 0 }
        gsap.to(proxy, {
          val: value,
          duration: 2.4,
          ease: 'power2.out',
          delay: 0.38 + i * 0.13,
          scrollTrigger: { trigger: cardRef.current, start: 'top 84%', once: true },
          onUpdate() {
            el.textContent = Math.round(proxy.val).toLocaleString('es-ES')
          },
        })
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={wrapRef}
      aria-label="Estadisticas institucionales"
      className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14"
    >
      {/* Card */}
      <div
        ref={cardRef}
        className="stats-card opacity-0 relative overflow-hidden rounded-2xl md:rounded-3xl border border-[#E8B84B]/12 shadow-2xl shadow-[#0B1D3A]/60"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% 0%, rgba(232,184,75,0.10) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 100% 100%, rgba(30,81,168,0.18) 0%, transparent 60%),
            linear-gradient(150deg, #0D2245 0%, #071326 100%)
          `,
        }}
      >
        {/* Subtle top-edge gold line */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#E8B84B]/40 to-transparent"
        />

        {/* Noise texture overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Grid */}
        <div className="relative grid grid-cols-2 md:grid-cols-4">
          {STATS.map(({ suffix, label }, i) => (
            <div
              key={label}
              className={[
                'stat-item opacity-0',
                'flex flex-col items-center justify-center text-center',
                'px-6 py-9 md:px-8 md:py-12',
                // Vertical dividers (gold-tinted)
                i < STATS.length - 1
                  ? 'border-b md:border-b-0 md:border-r border-[#E8B84B]/12'
                  : '',
                // Mobile: second row items lose the bottom border
                i === 2 ? 'border-b-0' : '',
              ].join(' ')}
            >
              {/* Number + suffix */}
              <div className="flex items-start leading-none mb-3">
                <span
                  ref={(el) => { numRefs.current[i] = el }}
                  className="font-bold tabular-nums"
                  aria-live="polite"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    background: 'linear-gradient(180deg, #F5D06A 0%, #C9950A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  0
                </span>
                <span
                  className="font-bold mt-1 ml-0.5"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
                    background: 'linear-gradient(180deg, #F5D06A 0%, #C9950A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {suffix}
                </span>
              </div>

              {/* Label */}
              <p
                className="font-semibold uppercase tracking-[0.18em] leading-tight"
                style={{
                  fontSize: 'clamp(0.6rem, 1vw, 0.7rem)',
                  color: '#B8963A',
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom-edge subtle glow */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[#E8B84B]/20 to-transparent"
        />
      </div>
    </section>
  )
}
