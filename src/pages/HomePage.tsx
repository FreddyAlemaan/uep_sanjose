import Hero         from '../components/Hero'
import StatsCounter from '../components/StatsCounter'
import About        from '../components/About'
import Levels       from '../components/Levels'
import Gallery      from '../components/Gallery'
import Contact      from '../components/Contact'

// Full landing page: hero + all sections.
// React Router mounts this for the "/" route.
export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsCounter />
      <About />
      <Levels />
      <Gallery />
      <Contact />
    </>
  )
}
