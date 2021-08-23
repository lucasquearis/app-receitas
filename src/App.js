import React from 'react';
import { AppProvider } from './Context/ContextApp';
import Trybe from './Pages/Trybe/Trybe';

function App() {
  return (
    <AppProvider>
      <Trybe />
    </AppProvider>
  );
}

export default App;
