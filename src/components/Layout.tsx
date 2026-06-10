import type { ReactNode } from 'react'
import Navbar         from './Navbar'
import Footer         from './Footer'
import PageTransition from './PageTransition'
import ScrollToTop    from './ScrollToTop'

interface Props {
  children: ReactNode
}

// Shared shell that wraps every page: handles scroll reset, page transition,
// and renders the persistent Navbar and Footer.
export default function Layout({ children }: Props) {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <Footer />
    </>
  )
}
