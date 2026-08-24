import Hero from '../components/Hero';
import Services from '../components/Services';
import Process from '../components/Portofolio'; // <-- IMPORT RAJOUTÉ
import Portfolio from '../components/Process';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Portofolio /> 
      <Process />
      <Contact />
    </>
  );
}
