import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes';
import myProvider from './context/myProvider';

function App() {
  return (
    <myProvider>
      <Routes />
    </myProvider>
  );
}

export default App;
