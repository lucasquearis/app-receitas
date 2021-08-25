import React from 'react';
import HeaderWithoutSearch from '../../components/header/HeaderWithoutSearch';

const ExploreFood = () => (
  <div>
    <HeaderWithoutSearch>Explorar Comidas</HeaderWithoutSearch>
    <button type="button" data-testid="explore-by-ingredient">Por Ingredientes</button>
    <button type="button" data-testid="explore-by-area">Por Local de Origem</button>
    <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
  </div>
);

export default ExploreFood;
