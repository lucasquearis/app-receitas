import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Redirect, useLocation, Link } from 'react-router-dom';
import useRandom from '../hooks/useRandom';

function ExploreDrinksAndFoods() {
  const { pathname } = useLocation();
  const [redirectTo, setRedirectTo] = useState({
    ingredients: false,
    surprise: false });
  const [id] = useRandom();

  const handleClick = ({ target }) => {
    setRedirectTo({ ...redirectTo, [target.name]: true });
  };

  const handleSurpriseClick = () => {
    if (id !== '') {
      setRedirectTo({ ...redirectTo, surprise: true });
    }
  };

  if (pathname === '/explorar/comidas') {
    if (redirectTo.ingredients === true) {
      return <Redirect to="/explorar/comidas/ingredientes" />;
    }
    if (redirectTo.surprise === true) {
      return <Redirect to={ `/comidas/${id}` } />;
    }
    return (
      <>
        <Button
          name="ingredients"
          data-testid="explore-by-ingredient"
          variant="link"
          onClick={ handleClick }
        >
          Por Ingredientes
        </Button>
        <Link to="/explorar/comidas/area">
          <Button
            name="area"
            data-testid="explore-by-area"
            variant="link"
          >
            Por Local de Origem
          </Button>
        </Link>
        <Button
          name="surprise"
          data-testid="explore-surprise"
          variant="link"
          onClick={ handleSurpriseClick }
        >
          Me Surpreenda!
        </Button>
      </>
    );
  }

  if (pathname === '/explorar/bebidas') {
    if (redirectTo.ingredients === true) {
      return <Redirect to="/explorar/bebidas/ingredientes" />;
    }
    if (redirectTo.surprise === true) {
      return <Redirect to={ `/bebidas/${id}` } />;
    }
    return (
      <>
        <Button
          name="ingredients"
          data-testid="explore-by-ingredient"
          variant="link"
          onClick={ handleClick }
        >
          Por Ingredientes
        </Button>
        <Button
          name="surprise"
          data-testid="explore-surprise"
          variant="link"
          onClick={ handleSurpriseClick }
        >
          Me Surpreenda!
        </Button>
      </>
    );
  }
}

export default ExploreDrinksAndFoods;
