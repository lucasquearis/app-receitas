import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import RecipeContainer from '../../components/RecipeContainer';
import Footer from '../../components/Footer';
import { RecipesContext } from '../../context/RecipesContext';
import Details from '../../components/Details';

const Bebidas = ({ match: { params: { param1, param2 } } }) => {
  const { getRecipes } = useContext(RecipesContext);

  useEffect(() => {
    getRecipes('name', '', 'bebidas');
  }, [getRecipes]);

  return (
    <>
      <Header title="Bebidas" routeParams={ [param1, param2] } />
      {
        param1 ? <Details type="bebidas" routeParams={ [param1, param2] } /> : (
          <>
            <RecipeContainer page="bebidas" />
            <Footer />
          </>
        )
      }
    </>
  );
};

Bebidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(String),
  }),
};

Bebidas.defaultProps = {
  match: undefined,
};
export default Bebidas;
