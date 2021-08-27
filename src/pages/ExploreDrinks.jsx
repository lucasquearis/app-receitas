import React from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import useRedirect from '../hooks/useRedirect';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';

function ExploreDrinks() {
  const { shouldRedirect, redirect } = useRedirect();

  if (redirect.should) return <Redirect to={ redirect.path } />;

  return (
    <div>
      <HeaderWithoutSearch>Explorar Bebidas</HeaderWithoutSearch>
      <Button
        variant="success"
        data-testid="explore-by-ingredient"
        onClick={ () => shouldRedirect('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
      </Button>
      <Button
        variant="primary"
        data-testid="explore-by-area"
        onClick={ () => shouldRedirect('/explorar/bebidas/area') }
      >
        Por Local de Origem
      </Button>
      <Button
        variant="warning"
        data-testid="explore-surprise"
        onClick={ () => shouldRedirect('/explorar/bebidas/{random}') }
      >
        Me Surpreenda!
      </Button>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
