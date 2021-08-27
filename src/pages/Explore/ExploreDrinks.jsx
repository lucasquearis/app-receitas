import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer';
import Context from '../../context';
import Header from '../../components/Header';

function ExploreDrinks({ endpoint }) {
  const [redirect, setRedirect] = useState(false);
  const { apiData, requestRandomRecipe } = useContext(Context);

  async function handleClick() {
    await requestRandomRecipe(endpoint);
    setRedirect(true);
  }

  if (redirect) {
    const drinkId = apiData[0].drinks[0].idDrink;
    return <Redirect to={ `/bebidas/${drinkId}` } />;
  }

  return (
    <>
      <Header title="Explorar Bebidas" renderSearchIcon={ false } />
      <main>
        <Link to="/explorar/bebidas/ingredientes">
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </button>
        </Link>
        <button
          data-testid="explore-surprise"
          onClick={ handleClick }
          type="button"
        >
          Me Surpreenda!
        </button>
      </main>
      <Footer />
    </>
  );
}

ExploreDrinks.propTypes = {
  endpoint: PropTypes.string.isRequired,
};

export default ExploreDrinks;
