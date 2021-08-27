import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer';
import Context from '../../context';
import Header from '../../components/Header';

function ExploreFoods({ endpoint }) {
  const [redirect, setRedirect] = useState(false);
  const { apiData, requestRandomRecipe } = useContext(Context);

  async function handleClick() {
    await requestRandomRecipe(endpoint);
    setRedirect(true);
  }

  if (redirect) {
    const foodId = apiData[0].meals[0].idMeal;
    return <Redirect to={ `/comidas/${foodId}` } />;
  }

  return (
    <>
      <Header title="Explorar Comidas" renderSearchIcon={ false } />
      <main>
        <Link to="/explorar/comidas/ingredientes">
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            data-testid="explore-by-area"
            type="button"
          >
            Por Local de Origem
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

ExploreFoods.propTypes = {
  endpoint: PropTypes.string.isRequired,
};

export default ExploreFoods;
