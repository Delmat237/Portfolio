import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Certifications from '@/components/Certification';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Competitions from '@/components/Compétitions';
import Associations from '@/components/Associations';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen transition-colors duration-300">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Certifications />
      <Projects />
      <Experience />
      <Competitions />
      <Associations />
      <Contact />
      <Footer />

    </main>
  );
}