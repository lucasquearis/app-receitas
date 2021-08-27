import React from 'react';
import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';

function ExploreDrinks() {
  return (
    <div>
      <HeaderWithoutSearch>Explorar Bebidas</HeaderWithoutSearch>
      <Button
        variant="success"
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Button>
      <Button
        variant="primary"
        data-testid="explore-by-area"
      >
        Por Local de Origem
      </Button>
      <Button
        variant="warning"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </Button>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
