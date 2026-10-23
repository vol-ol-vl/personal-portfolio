import { ThemeProvider } from './context/ThemeContext'
import { SkillsProvider } from './context/SkillsContext';
import { RouterProvider } from 'react-router'
import { Provider } from 'react-redux';
import store from './store/store';

import { router } from './router'


const App = () => {
  return (
    <ThemeProvider>
      <SkillsProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </SkillsProvider>
    </ThemeProvider>
  );
};

export default App;
