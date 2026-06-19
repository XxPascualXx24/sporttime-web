import Hero from '../components/Hero'
import QuienesSomos from '../components/QuienesSomos'
import Diferencias from '../components/Diferencias'
import Calendario from '../components/Calendario'
import CTAHero from '../components/CTAHero'
import Actualidad from '../components/Actualidad'
import HistoriasClub from '../components/HistoriasClub'
import Sponsors from '../components/Sponsors'

export default function Home() {
  return (
    <main>
      <Hero />
      <QuienesSomos />
      <Diferencias />
      <Calendario />
      <CTAHero />
      <Actualidad />
      <HistoriasClub />
      <Sponsors />
    </main>
  )
}
