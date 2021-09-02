import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import RecipeContainer from '../../components/RecipeContainer';
import Footer from '../../components/Footer';
import { RecipesContext } from '../../context/RecipesContext';
import Details from '../../components/Details';

const Comidas = ({ match: { params: { param1, param2 } } }) => {
  const { getRecipes } = useContext(RecipesContext);

  useEffect(() => {
    getRecipes('name', '', 'comidas');
  }, [getRecipes]);

  return (
    <>
      <Header title="Comidas" routeParams={ [param1, param2] } />
      {
        param1 ? <Details type="comidas" routeParams={ [param1, param2] } /> : (
          <>
            <RecipeContainer page="comidas" />
            <Footer />
          </>
        )
      }
    </>
  );
};
Comidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(String),
  }),
};

Comidas.defaultProps = {
  match: undefined,
};
export default Comidas;
