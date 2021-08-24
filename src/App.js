// vitals
import React from 'react';
import Routes from './Routes';
// components
import Header from './components/Header';
// styles
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Header />
      <Routes />
    </>
  );
}

export default App;
