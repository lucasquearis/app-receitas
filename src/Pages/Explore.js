import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../Component/Header';
import Footer from '../Component/Footer';

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
      <Header titlePage=" Explorar " />
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
      <Footer />
    </>
  );
}

export default Explore;
