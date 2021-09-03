import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Explore.css';

function Explore() {
  return (
    <>
      <Header title="Explorar" />
      <div className="explore">
        <Link to="/explorar/comidas">
          <Button
            className="btn-explore"
            data-testid="explore-food"
            type="button"
          >
            Explorar Comidas

          </Button>
        </Link>
        <Link to="/explorar/bebidas">
          <Button
            className="btn-explore"
            data-testid="explore-drinks"
            type="button"
          >
            Explorar Bebidas

          </Button>
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Explore;
