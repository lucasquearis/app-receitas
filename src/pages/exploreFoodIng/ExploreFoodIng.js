import React from 'react';
import CardsList from '../../components/CardsList/CardsList';
import FooterMenu from '../../components/FooterMenu/FooterMenu';
import HeaderWithoutSearch from '../../components/header/HeaderWithoutSearch';

const ExploreFoodIng = () => (
  <div>
    <HeaderWithoutSearch>Explorar Ingredientes</HeaderWithoutSearch>
    <CardsList />
    <FooterMenu />
  </div>
);

export default ExploreFoodIng;
