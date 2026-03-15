import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Servicii from '@/components/Servicii'
import Despre from '@/components/Despre'
import Galerie from '@/components/Galerie'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Servicii />
      <Despre />
      <Galerie />
      <Contact />
      <Footer />
    </>
  )
}
