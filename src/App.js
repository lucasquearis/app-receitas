import React from 'react';
import { AppProvider } from './Context/ContextApp';
import Login from './Pages/Login/Login';

function App() {
  return (
    <AppProvider>
      <Login />
    </AppProvider>
  );
}

export default App;
