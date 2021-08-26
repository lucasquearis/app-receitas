import React from 'react';
import { shape, func } from 'prop-types';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import FoodRecipeCards from './FoodRecipeCards';

export default function Foods({ history }) {
  return (
    <>
      <Header title="Comidas" showButton foodPage />
      <FoodRecipeCards push={ history.push } />
      <Footer />
    </>
  );
}

Foods.propTypes = {
  history: shape({ push: func }).isRequired,
};
