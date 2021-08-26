import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import RecipeContainer from '../../components/RecipeContainer';

const Bebidas = ({ match: { params: { param1, param2 } } }) => (
  <>
    <Header title="Bebidas" routeParams={ [param1, param2] } />
    {
      param1 ? <h1>Detalhes</h1> : <RecipeContainer />
    }
  </>
);

Bebidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(String),
  }),
};

Bebidas.defaultProps = {
  match: undefined,
};
export default Bebidas;
