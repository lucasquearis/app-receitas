import React from 'react';
import { Link } from 'react-router-dom';
import HeaderWithoutSearch from '../../components/header/HeaderWithoutSearch';

const ExploreFood = () => (
  <div>
    <HeaderWithoutSearch>Explorar Comidas</HeaderWithoutSearch>
    <Link to="/explorar/comidas/ingredientes">
      <button type="button" data-testid="explore-by-ingredient">Por Ingredientes</button>
    </Link>
    <button type="button" data-testid="explore-by-area">Por Local de Origem</button>
    <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
  </div>
);

export default ExploreFood;
