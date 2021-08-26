import React from 'react';
import Header from '../../components/header';

const ReceitasFav = () => (
  <Header
    title="Receitas Favoritas"
    hideSearch
    routeParams={ [undefined, undefined] }
  />
);

export default ReceitasFav;
