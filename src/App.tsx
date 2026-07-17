import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Hero from './components/sections/Hero'
import Contact from './components/sections/Contact'

const App = () => {

  const profile = {
    name: 'Olga Volkova',
    role: 'Frontend Developer',
  }

  return (
    <>
      <Header 
        name={profile.name}
        role={profile.role} />
      <Hero />
      <About />
      <Skills />
      <Contact />
      <Footer />
    </>
  )
};

export default App
