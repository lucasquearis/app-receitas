import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import AppProvider from './context/AppProvider';
import Home from './pages/Home';
import theme from './theme/theme';

function App() {
  return (
    <AppProvider>
      <ThemeProvider theme={ theme }>
        <Home />
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
