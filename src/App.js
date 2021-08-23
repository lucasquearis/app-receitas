import React from 'react';
import { AppProvider } from './Context/ContextApp';
import Header from './components/Header';

function App() {
  return (
    <AppProvider>
      <Header title="Comida" />
    </AppProvider>
  );
}

export default App;
