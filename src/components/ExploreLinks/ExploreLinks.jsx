import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RandomLink from './RandomLink/RandomLink';

const COMIDAS_PATH = '/explorar/comidas';

function ExploreLinks({ path }) {
  if (path === COMIDAS_PATH) {
    return (
      <div>
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/comidas/ingredientes"
        >
          Por Ingredientes
        </Link>
        <Link
          data-testid="explore-by-area"
          to="/explorar/comidas/area"
        >
          Por Local de Origem
        </Link>
        <RandomLink path={ path } />
      </div>
    );
  }
  return (
    <div>
      <Link
        data-testid="explore-by-ingredient"
        to="/explorar/bebidas/ingredientes"
      >
        Por Ingredientes
      </Link>
      <RandomLink path={ path } />
    </div>
  );
}

ExploreLinks.propTypes = {
  path: PropTypes.string.isRequired,
};

export default ExploreLinks;
