// vitals
import React from 'react';
import Routes from './Routes';
// styles
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import SearchBar from './components/SearchBar';

function App() {
  return (
    <>
      <SearchBar />
      <Routes />
    </>
  );
}

export default App;
