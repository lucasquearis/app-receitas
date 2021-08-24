import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

function ExploreDrinks(props) {
  const id = 0;
  const { location } = props;
  const [redirectTo, setRedirectTo] = useState({
    ingredients: false,
    area: false,
    surprise: false });

  const handleClick = ({ target }) => {
    setRedirectTo({ [target.name]: true });
  };

  if (location.pathname === '/explorar/comidas') {
    if (redirectTo.ingredients === true) {
      return <Redirect to="/explorar/comidas/ingredientes" />;
    }
    if (redirectTo.area === true) {
      return <Redirect to="/explorar/comidas/area" />;
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
        <Button
          name="area"
          data-testid="explore-by-area"
          variant="link"
          onClick={ () => handleClick }
        >
          Por Local de Origem
        </Button>
        <Button
          name="surprise"
          data-testid="explore-surprise"
          variant="link"
          onClick={ handleClick }
        >
          Me Surpreenda!
        </Button>
      </>
    );
  }

  if (location.pathname === '/explorar/bebidas') {
    if (redirectTo.ingredients === true) {
      return <Redirect to="/explorar/bebidas/ingredientes" />;
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
        <Button
          name="surprise"
          data-testid="explore-surprise"
          variant="link"
          onClick={ handleClick }
        >
          Me Surpreenda!
        </Button>
      </>
    );
  }
}

export default ExploreDrinks;
