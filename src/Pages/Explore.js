import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Explore() {
  const [redirectTo, setRedirectTo] = useState({ foods: false, drinks: false });

  const handleClick = ({ target }) => {
    setRedirectTo({ [target.name]: true });
  };

  if (redirectTo.foods === true) {
    return <Redirect to="/explorar/comidas" />;
  } if (redirectTo.drinks === true) {
    return <Redirect to="/explorar/bebidas" />;
  }
  return (
    <>
      <Button
        name="foods"
        variant="link"
        data-testid="explore-food"
        onClick={ handleClick }
      >
        Explorar Comidas
      </Button>
      <Button
        name="drinks"
        variant="link"
        data-testid="explore-drinks"
        onClick={ handleClick }
      >
        Explorar Bebidas
      </Button>
    </>
  );
}

export default Explore;
