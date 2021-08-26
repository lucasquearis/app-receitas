import React from 'react';
import { shape, func } from 'prop-types';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import DrinkRecipeCards from './DrinkRecipeCards';

export default function Drinks({ history }) {
  return (
    <>
      <Header title="Bebidas" showButton />
      <DrinkRecipeCards push={ history.push } />
      <Footer />
    </>
  );
}

Drinks.propTypes = {
  history: shape({ push: func }).isRequired,
};
