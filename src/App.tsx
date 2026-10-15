import { ThemeProvider } from './context/ThemeContext'
import { SkillsProvider } from './context/SkillsContext';
import { RouterProvider } from 'react-router'

import { router } from './router'


const App = () => {
  return (
    <ThemeProvider>
      <SkillsProvider>
        <RouterProvider router={router} />
      </SkillsProvider>
    </ThemeProvider>
  );
};

export default App;
