import { useRef, useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

interface Props {
  children: ReactNode
}

// Emil Kowalski-style page transition:
// Every route change triggers a fast lift + fade-in using power4.out (spring-like deceleration).
export default function PageTransition({ children }: Props) {
  const ref      = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 26 },
        {
          opacity:  1,
          y:        0,
          duration: 0.52,
          ease:     'power4.out',
          clearProps: 'transform',
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [location.pathname])

  return (
    <div ref={ref} style={{ willChange: 'transform, opacity' }}>
      {children}
    </div>
  )
}
