import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
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
      <div className="container-buttons">
        <button
          type="button"
          name="foods"
          data-testid="explore-food"
          className="button-general"
          onClick={ handleClick }
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          name="drinks"
          data-testid="explore-drinks"
          className="button-general"
          onClick={ handleClick }
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Explore;
