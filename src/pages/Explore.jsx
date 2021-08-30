import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore() {
  return (
    <>
      <Header title="Explorar" />
      <Link to="/explorar/comidas">
        <Button data-testid="explore-food" type="button">Explorar Comidas</Button>
      </Link>
      <Link to="/explorar/bebidas">
        <Button data-testid="explore-drinks" type="button">Explorar Bebidas</Button>
      </Link>
      <Footer />
    </>
  );
}

export default Explore;
