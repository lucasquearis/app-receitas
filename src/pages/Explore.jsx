import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explore() {
  const history = useHistory();
  const { pathname } = useLocation();
  const changeRoute = (route) => {
    history.push(route);
  };

  return (
    <section className="body">
      <Header showExploreIcon pageTitle="Explorar" />
      <main className="d-flex flex-column w-100 p-3">
        <Button
          style={ { 'font-size': '20pt' } }
          className="border bg-color w-100"
          onClick={ () => changeRoute(`${pathname}/comidas`) }
          data-testid="explore-food"
        >
          Explorar Comidas
        </Button>
        <Button
          style={ { 'font-size': '20pt' } }
          className="border bg-color w-100 mt-2"
          data-testid="explore-drinks"
          onClick={ () => changeRoute(`${pathname}/bebidas`) }
        >
          Explorar Bebidas
        </Button>
      </main>
      <Footer />
    </section>
  );
}
