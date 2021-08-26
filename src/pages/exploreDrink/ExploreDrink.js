import React from 'react';
import { Link } from 'react-router-dom';
import HeaderWithoutSearch from '../../components/header/HeaderWithoutSearch';

const ExploreDrink = () => (
  <div>
    <HeaderWithoutSearch>Explorar Bebidas</HeaderWithoutSearch>
    <Link to="/explorar/bebidas/ingredientes">
      <button type="button" data-testid="explore-by-ingredient">Por Ingredientes</button>
    </Link>
    <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
  </div>
);

export default ExploreDrink;
