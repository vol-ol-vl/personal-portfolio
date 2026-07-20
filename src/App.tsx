import { useState } from 'react'

import type { Skill } from './types/skill'

import { createSkill } from './utils/skill'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Hero from './components/sections/Hero'
import Contact from './components/sections/Contact'

const profile = {
  name: 'Olga Volkova',
  role: 'Frontend Developer',
}
const initialSkills: Skill[] = [
  {
    id: 1,
    name: 'JavaScript',
    category: 'language'
  },
  {
    id: 2,
    name: 'Ajax',
    category: 'other'
  },
  {
    id: 3,
    name: 'REST API',
    category: 'other'
  },
  {
    id: 4,
    name: 'HTML',
    category: 'other'
  },
  {
    id: 5,
    name: 'CSS',
    category: 'other'
  },
  {
    id: 6,
    name: 'Webpack',
    category: 'language'
  },
  {
    id: 7,
    name: 'Gulp',
    category: 'other'
  },
  {
    id: 8,
    name: 'Git',
    category: 'other'
  },
  {
    id: 9,
    name: 'SVN',
    category: 'other'
  },
  
];
let nextSkillId = initialSkills.length + 1;

const App = () => {
  const [skills, setSkills] = useState(initialSkills);
  const onAddSkill = (skillName: string) => {
    const newSkill = createSkill(
      nextSkillId++,
      skillName,
      'other'
    );
    setSkills(prev => [...prev, newSkill]);
  };

  return (
    <>
      <Header 
        name={profile.name}
        role={profile.role}
        skillCount={skills.length} />
      <Hero />
      <About />
      <Skills
        skills={skills}
        onAddSkill={onAddSkill} />
      <Contact />
      <Footer />
    </>
  )
};

export default App
