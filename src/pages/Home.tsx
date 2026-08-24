import Hero from '../components/Hero';
import Services from '../components/Services';
import Process from '../components/Process'; // <-- IMPORT RAJOUTÉ
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Process /> {/* <-- SECTION RAJOUTÉE ICI */}
      <Portfolio />
      <Contact />
    </>
  );
}
