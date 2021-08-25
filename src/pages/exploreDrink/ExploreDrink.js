import React from 'react';
import HeaderWithoutSearch from '../../components/header/HeaderWithoutSearch';

const ExploreDrink = () => (
  <div>
    <HeaderWithoutSearch>Explorar Bebidas</HeaderWithoutSearch>
    <button type="button" data-testid="explore-by-ingredient">Por Ingredientes</button>
    <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
  </div>
);

export default ExploreDrink;
