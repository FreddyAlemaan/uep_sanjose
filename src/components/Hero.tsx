import { useRef, useEffect, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Video specs (updated: 6 s · 1280×720 · 24 fps = 144 frames) ────────────
const VIDEO_SRC  = '/hero.mp4'
const VIDEO_W    = 1280
const VIDEO_H    = 720

// 6 s × 24 fps = 144 frames. Half on mobile to save ~70 MB GPU memory.
const FRAME_COUNT: number =
  typeof window !== 'undefined' && window.innerWidth < 768 ? 72 : 144

// ─── WHY canvas + ImageBitmap instead of <video>.currentTime ─────────────────
// Setting video.currentTime triggers async decoder seek — the browser must
// find the nearest keyframe, decompress backwards, and render. That latency
// is what makes video scrub feel "choppy" or "frame-flippy."
//
// ImageBitmap objects are GPU-resident textures. drawImage() on a bitmap is
// purely a GPU blit — synchronous, zero decode cost, identical to how Apple's
// iPhone page works. The extraction phase (loadedmetadata + seeked loop) pays
// the decode cost once up front, then playback is instant on every scroll tick.
//
// ─── WHY sticky div instead of GSAP pin ──────────────────────────────────────
// GSAP pin:true injects a transparent spacer div. Against the white page body
// that spacer is visible as a white flash while scrolling. Using a 400vh outer
// div + CSS position:sticky achieves the same visual pinning with no spacer.
// ─────────────────────────────────────────────────────────────────────────────

// Module-level frame cache — survives React unmount/remount (e.g. back navigation).
// Reset this to null whenever the video file is replaced.
let _cachedFrames: ImageBitmap[] | null = null

export default function Hero() {
  const outerRef   = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  // loadRef removed — loading overlay is no longer rendered
  const framesRef  = useRef<ImageBitmap[]>(_cachedFrames ?? [])

  // Honour prefers-reduced-motion: skip extraction and scroll animation entirely
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [loadPct, setLoadPct] = useState<number>(_cachedFrames ? 100 : 0)  // eslint-disable-line @typescript-eslint/no-unused-vars
  const [ready,   setReady]   = useState<boolean>(!!_cachedFrames || reduced)

  // ── 1. Frame extraction ───────────────────────────────────────────────────
  useEffect(() => {
    if (_cachedFrames || reduced) return   // cache hit or motion disabled

    const video      = document.createElement('video')
    video.src        = VIDEO_SRC
    video.muted      = true
    video.preload    = 'auto'
    video.playsInline = true

    const off        = document.createElement('canvas')
    off.width        = VIDEO_W
    off.height       = VIDEO_H
    const offCtx     = off.getContext('2d')!

    let cancelled    = false

    ;(async () => {
      // Wait for duration to be known
      await new Promise<void>(res =>
        video.addEventListener('loadedmetadata', () => res(), { once: true })
      )

      const dur    = video.duration
      const frames: ImageBitmap[] = []

      for (let i = 0; i < FRAME_COUNT; i++) {
        if (cancelled) return

        video.currentTime = (i / (FRAME_COUNT - 1)) * dur

        // Wait for seek to complete (with 2 s safety timeout per frame)
        await new Promise<void>(res => {
          const t = setTimeout(() => res(), 2000)
          video.addEventListener('seeked', () => { clearTimeout(t); res() }, { once: true })
        })

        if (cancelled) return

        offCtx.drawImage(video, 0, 0, VIDEO_W, VIDEO_H)
        frames.push(await createImageBitmap(off))
        setLoadPct(Math.round(((i + 1) / FRAME_COUNT) * 100))
      }

      framesRef.current = frames
      _cachedFrames     = frames
      setReady(true)
    })()

    return () => { cancelled = true; video.src = '' }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── 2. Entrance animation (fires on mount — no need to wait for frames) ──
  // The hero background is brand blue while extraction runs, so the text
  // animating in immediately looks intentional, not like a broken loading state.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: reduced ? 0 : 0.35 })
        .fromTo('.hero-eyebrow',
          { opacity: 0, y: reduced ? 0 : 18 },
          { opacity: 1, y: 0, duration: reduced ? 0.01 : 0.6, ease: 'power3.out' }
        )
        .fromTo('.hero-headline',
          { opacity: 0, y: reduced ? 0 : 38 },
          { opacity: 1, y: 0, duration: reduced ? 0.01 : 0.9, ease: 'power3.out' },
          '-=0.35'
        )
        .fromTo('.hero-sub',
          { opacity: 0, y: reduced ? 0 : 22 },
          { opacity: 1, y: 0, duration: reduced ? 0.01 : 0.7, ease: 'power3.out' },
          '-=0.45'
        )
        .fromTo('.hero-ctas',
          { opacity: 0, y: reduced ? 0 : 18 },
          { opacity: 1, y: 0, duration: reduced ? 0.01 : 0.6, ease: 'power3.out' },
          '-=0.35'
        )
    }, sectionRef)
    return () => ctx.revert()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── 3. Canvas scrub + text parallax ──────────────────────────────────────
  useLayoutEffect(() => {
    if (!ready || reduced) return
    const canvas  = canvasRef.current
    const outer   = outerRef.current
    const content = contentRef.current
    if (!canvas || !outer || !content) return

    const ctx2d = canvas.getContext('2d')!
    ctx2d.imageSmoothingEnabled = true
    ctx2d.imageSmoothingQuality = 'high'

    // Cap DPR at 2 — prevents 4K canvas on high-density displays
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const sizeCanvas = () => {
      canvas.width  = window.innerWidth  * dpr
      canvas.height = window.innerHeight * dpr
    }
    sizeCanvas()

    // object-fit:cover equivalent for canvas: crop from centre, fill canvas
    const drawFrame = (bmp: ImageBitmap) => {
      const cw    = canvas.width
      const ch    = canvas.height
      const scale = Math.max(cw / bmp.width, ch / bmp.height)
      const sw    = cw / scale
      const sh    = ch / scale
      const sx    = (bmp.width  - sw) / 2
      const sy    = (bmp.height - sh) / 2
      ctx2d.drawImage(bmp, sx, sy, sw, sh, 0, 0, cw, ch)
    }

    // Paint frame 0 immediately so canvas is never blank on load
    const first = framesRef.current[0]
    if (first) drawFrame(first)

    // Track current scroll progress so resize can repaint the correct frame
    let currentProgress = 0

    const stCtx = gsap.context(() => {
      // Frame swap: no lerp needed — ImageBitmap drawImage is a GPU blit (instant)
      ScrollTrigger.create({
        trigger:  outer,
        start:    'top top',
        end:      'bottom bottom',
        onUpdate: (self) => {
          currentProgress = self.progress
          const frames    = framesRef.current
          const idx       = Math.min(
            Math.round(self.progress * (frames.length - 1)),
            frames.length - 1
          )
          if (frames[idx]) drawFrame(frames[idx])
        },
      })

      // Text parallax: Emil Kowalski-style weighted lag (scrub:1.5)
      gsap.to(content, {
        y:    -90,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: outer,
          start:   'top top',
          end:     '+=1100',
          scrub:   1.5,
        },
      })
    }, outer)

    // On resize: re-size canvas and repaint the current frame
    const onResize = () => {
      sizeCanvas()
      const frames = framesRef.current
      const idx    = Math.min(
        Math.round(currentProgress * (frames.length - 1)),
        frames.length - 1
      )
      if (frames[idx]) drawFrame(frames[idx])
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      stCtx.revert()
    }
  }, [ready]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    // ── Outer container: 400vh with brand-blue bg fills the scroll space ───
    // Brand blue is always visible during scroll — no white flash from spacers.
    <div
      ref={outerRef}
      className="relative"
      style={{ height: reduced ? 'auto' : '400vh', background: '#1A3A6B' }}
    >
      {/* ── Sticky section: viewport-pinned via CSS, no GSAP pin needed ── */}
      <section
        ref={sectionRef}
        id="inicio"
        className={[
          'flex items-center overflow-hidden bg-brand',
          reduced ? 'min-h-[100dvh]' : 'sticky top-0 min-h-[100dvh]',
        ].join(' ')}
      >
        {/* ── Canvas: GPU bitmap draw on every scroll tick ── */}
        {!reduced && (
          <canvas
            ref={canvasRef}
            width={VIDEO_W}
            height={VIDEO_H}
            className="absolute inset-0"
            style={{ width: '100%', height: '100%' }}
            aria-hidden="true"
          />
        )}

        {/* ── Gradient overlays: depth without hiding the video ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-brand/92 via-brand/65 to-brand/20 pointer-events-none z-10"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/38 via-transparent to-black/16 pointer-events-none z-10"
        />

        {/* ── Text content (parallax-scrubbed away on scroll) ── */}
        <div
          ref={contentRef}
          className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-24 pb-20"
        >
          <div className="max-w-[600px]">
            <p className="hero-eyebrow opacity-0 text-white/65 text-[11px] font-semibold uppercase tracking-[0.24em] mb-5">
              Bienvenidos a
            </p>

            <h1 className="hero-headline opacity-0 text-white font-bold text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.04] tracking-tight mb-6">
              Unidad Educativa
              <br />
              <span className="text-white/75">Parroquial</span> San Jose
            </h1>

            <p className="hero-sub opacity-0 text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-[480px]">
              Formamos lideres con valores solidos desde Preescolar hasta Bachillerato.
            </p>

            <div className="hero-ctas opacity-0 flex flex-col sm:flex-row gap-4">
              <Link
                to="/nosotros"
                className="btn btn-shine inline-flex items-center justify-center px-7 py-3.5 bg-white text-brand font-semibold rounded-lg text-base shadow-md hover:shadow-lg hover:shadow-white/20"
              >
                Conoce mas
              </Link>
              <Link
                to="/contacto"
                className="btn inline-flex items-center justify-center px-7 py-3.5 border-2 border-white/50 text-white font-semibold rounded-lg text-base hover:border-white hover:bg-white/10"
              >
                Contactanos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient bridge: brand-blue scroll space seamlessly into next section */}
      {!reduced && (
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: '18vh', background: 'linear-gradient(to bottom, transparent, #ffffff)' }}
        />
      )}
    </div>
  )
}
