import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';

export default function Explore() {
  const history = useHistory();
  const { pathname } = useLocation();
  const changeRoute = (route) => {
    history.push(route);
  };

  return (
    <section>
      <Header showExploreIcon pageTitle="Explorar" />
      <Button
        variant="light"
        onClick={ () => changeRoute(`${pathname}/comidas`) }
        data-testid="explore-food"
      >
        Explorar Comidas
      </Button>
      <Button
        variant="light"
        data-testid="explore-drinks"
        onClick={ () => changeRoute(`${pathname}/bebidas`) }
      >
        Explorar Bebidas
      </Button>
    </section>
  );
}
