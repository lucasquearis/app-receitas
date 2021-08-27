import React from 'react';
import PropTypes from 'prop-types';
import ExploreDrink from '../components/ExploreDrink';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DrinkExplore() {
  return (
    <div>
      <Header title="Explorar Bebidas" />
      <ExploreDrink />
      <Footer />
    </div>
  );
}

DrinkExplore.propTypes = {
  header: PropTypes.string,
}.isRequired;

export default DrinkExplore;
