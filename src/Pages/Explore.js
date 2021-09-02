import React, { useState } from 'react';
<<<<<<< HEAD
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
=======
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
>>>>>>> 41611d46afc8e4d4fe06279493fddd384485bc2a

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
<<<<<<< HEAD
=======
      <Header titlePage=" Explorar " />
>>>>>>> 41611d46afc8e4d4fe06279493fddd384485bc2a
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
<<<<<<< HEAD
=======
      <Footer />
>>>>>>> 41611d46afc8e4d4fe06279493fddd384485bc2a
    </>
  );
}

export default Explore;
