import React, { useState } from 'react';
import { Redirect, useLocation, Link } from 'react-router-dom';
import useRandom from '../hooks/useRandom';
import Header from '../Component/Header';
import Footer from '../Component/Footer';

function ExploreDrinksAndFoods() {
  const { pathname } = useLocation();
  const [redirectTo, setRedirectTo] = useState({
    ingredients: false,
    surprise: false });
  const [id] = useRandom();
  let pag = 'Explorar Comidas';

  if (pathname === '/explorar/bebidas') {
    pag = 'Explorar Bebidas';
  }

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
      <div className="page">
        <Header titlePage={ pag } />
        <div className="container-buttons">
          <button
            type="button"
            name="ingredients"
            data-testid="explore-by-ingredient"
            className="button-general"
            onClick={ handleClick }
          >
            Por Ingredientes
          </button>
          <Link to="/explorar/comidas/area">
            <button
              type="button"
              name="area"
              data-testid="explore-by-area"
              className="button-general"
            >
              Por Local de Origem
            </button>
          </Link>
          <button
            type="button"
            name="surprise"
            data-testid="explore-surprise"
            className="button-general"
            onClick={ handleSurpriseClick }
          >
            Me Surpreenda!
          </button>
        </div>
        <Footer />
      </div>
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
      <div className="page">
        <Header titlePage={ pag } />
        <div className="container-buttons">
          <button
            type="button"
            name="ingredients"
            data-testid="explore-by-ingredient"
            className="button-general"
            variant="link"
            onClick={ handleClick }
          >
            Por Ingredientes
          </button>
          <button
            type="button"
            name="surprise"
            data-testid="explore-surprise"
            className="button-general"
            variant="link"
            onClick={ handleSurpriseClick }
          >
            Me Surpreenda!
          </button>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ExploreDrinksAndFoods;
