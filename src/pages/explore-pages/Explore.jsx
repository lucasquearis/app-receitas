import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import '../../styles/Header.css';
import Footer from '../../components/Footer';
import '../../styles/Footer.css';
import '../../styles/Explore.css';

function Explore() {
  return (
    <div>
      <Header brand="Explorar" className="img-search" />
      <div className="div-explore">
        <Link to="/explorar/comidas">
          <button data-testid="explore-food" type="button">Explorar Comidas</button>
        </Link>
        <Link to="/explorar/bebidas">
          <button data-testid="explore-drinks" type="button">Explorar Bebidas</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
