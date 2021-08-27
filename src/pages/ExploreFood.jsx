import React from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import useRedirect from '../hooks/useRedirect';

export default function ExploreFood() {
  const { shouldRedirect, redirect } = useRedirect();

  if (redirect.should) return <Redirect to={ redirect.path } />;

  return (
    <div>
      <HeaderWithoutSearch>Explorar Comidas</HeaderWithoutSearch>
      <Button
        variant="success"
        data-testid="explore-by-ingredient"
        onClick={ () => shouldRedirect('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </Button>
      <Button
        variant="primary"
        data-testid="explore-by-area"
        onClick={ () => shouldRedirect('/explorar/comidas/area') }
      >
        Por Local de Origem
      </Button>
      <Button
        variant="warning"
        data-testid="explore-surprise"
        onClick={ () => shouldRedirect('/explorar/comidas/{random}') }
      >
        Me Surpreenda!
      </Button>
      <Footer />
    </div>
  );
}
