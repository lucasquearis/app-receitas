import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';
import ButtonsExplore from '../../components/ButtonsExplore';
import './Explore.css';

function Explore() {
  return (
    <div className="ex-container">
      <Header title="Explorar" />
      <ButtonsExplore />
      <Footer />
    </div>
  );
}

export default Explore;
