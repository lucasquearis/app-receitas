import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientMeals from '../components/IngredientMeals';
import IngredientDrinks from '../components/IngredientDrinks';

export default function ExploreIngredients({ match: { url } }) {
  console.log(url);
  return (
    <div>
      <Header title="Explorar Ingredientes" search={ false } />
      {
        url === '/explorar/bebidas/ingredientes' ? (
          <IngredientDrinks />) : (<IngredientMeals />)
      }
      <Footer />
    </div>
  );
}

ExploreIngredients.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
