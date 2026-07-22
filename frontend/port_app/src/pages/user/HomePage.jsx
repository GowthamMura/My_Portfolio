import About from "../../components/user/About.jsx";
import Blogs from "../../components/user/Blogs.jsx";
import ContactForm from "../../components/user/ContactForm.jsx";
import HomeHero from "../../components/user/HomeHero.jsx";
import Projects from "../../components/user/Projects.jsx";
import Skills from "../../components/user/Skills.jsx";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <About />
      <Skills />
      <Projects limit={6} />
      <Blogs limit={3} />
      <ContactForm />
    </>
  );
}

