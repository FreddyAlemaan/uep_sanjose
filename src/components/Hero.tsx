import { useRef, useEffect, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Place hero.mp4 inside /public so it is served directly (no bundling for large binaries).
const HERO_VIDEO_SRC = '/hero.mp4'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const videoRef     = useRef<HTMLVideoElement>(null)
  const contentRef   = useRef<HTMLDivElement>(null)

  // ── Entrance animation (fires once on mount, before any scroll) ──────────
  // Operates on individual elements; does NOT touch contentRef wrapper opacity.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.55 })

      tl.fromTo(
        '.hero-eyebrow',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
        .fromTo(
          '.hero-headline',
          { opacity: 0, y: 38 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.35'
        )
        .fromTo(
          '.hero-sub',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.45'
        )
        .fromTo(
          '.hero-ctas',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.35'
        )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // ── Video scrub + text parallax via ScrollTrigger ────────────────────────
  // useLayoutEffect ensures ScrollTrigger is registered before first paint.
  useLayoutEffect(() => {
    const video     = videoRef.current
    const container = containerRef.current
    const content   = contentRef.current
    if (!video || !container || !content) return

    let ctx: ReturnType<typeof gsap.context> | null = null

    const initScrub = () => {
      ctx = gsap.context(() => {
        // 1. Pin the hero and drive video.currentTime via scroll progress.
        //    end "+=300%" = 3 × viewport-height of scroll travel.
        ScrollTrigger.create({
          trigger:  container,
          start:    'top top',
          end:      '+=300%',
          pin:      true,
          scrub:    true,
          onUpdate: (self) => {
            const dur = video.duration
            if (dur && !isNaN(dur)) {
              video.currentTime = dur * self.progress
            }
          },
        })

        // 2. Text parallax: content wrapper drifts up and fades out in the
        //    first third of the pinned scroll (Emil-style cinematic reveal).
        gsap.to(content, {
          y:        -80,
          opacity:  0,
          ease:     'none',
          scrollTrigger: {
            trigger: container,
            start:   'top top',
            end:     '+=110%',
            scrub:   1.5,
          },
        })
      }, container)
    }

    // Wait for video metadata so video.duration is available.
    if (video.readyState >= 1) {
      initScrub()
    } else {
      video.addEventListener('loadedmetadata', initScrub, { once: true })
    }

    return () => {
      video.removeEventListener('loadedmetadata', initScrub)
      ctx?.revert()
    }
  }, [])

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Background video — scrubbed by scroll, no autoPlay */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        preload="auto"
        muted
        playsInline
        aria-hidden="true"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Brand overlay: stronger left, fades right for depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-brand/92 via-brand/65 to-brand/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/38 via-transparent to-black/16"
      />

      {/* Text content — controlled by parallax scrub */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-24 pb-20"
      >
        <div className="max-w-[600px]">
          <p className="hero-eyebrow opacity-0 text-white/65 text-xs font-semibold uppercase tracking-[0.22em] mb-5">
            Bienvenidos a
          </p>

          <h1 className="hero-headline opacity-0 text-white font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.04] tracking-tight mb-6">
            Unidad Educativa
            <br />
            <span className="text-white/75">Parroquial</span> San Jose
          </h1>

          <p className="hero-sub opacity-0 text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-[480px]">
            Formando lideres con valores solidos en Preescolar, Primaria y Bachillerato desde hace decadas.
          </p>

          <div className="hero-ctas opacity-0 flex flex-col sm:flex-row gap-4">
            <Link
              to="/nosotros"
              className="btn btn-shine px-7 py-3.5 bg-white text-brand font-semibold rounded-lg text-base shadow-md hover:shadow-lg hover:shadow-white/20"
            >
              Conoce mas
            </Link>
            <Link
              to="/contacto"
              className="btn px-7 py-3.5 border-2 border-white/50 text-white font-semibold rounded-lg text-base hover:border-white hover:bg-white/10"
            >
              Contactanos
            </Link>
          </div>
        </div>
      </div>

      {/* Soft bottom fade into next section */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent"
      />
    </section>
  )
}
