import React from 'react';
import Provider from './context/Provider';
import Routes from './routes/Routes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';

function App() {
  return (
    <Provider>
      <Routes />
      <Footer />
    </Provider>
  );
}

export default App;
