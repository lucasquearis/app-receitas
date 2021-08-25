import React from 'react';
import Header from '../../components/Header';
import '../../styles/Header.css';
import Footer from '../../components/Footer';
import '../../styles/Footer.css';

function ExploreFoods() {
  return (
    <div>
      <Header brand="Explorar Comidas" className="img-search" />
      <Footer />
    </div>
  );
}

export default ExploreFoods;
