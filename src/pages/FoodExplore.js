import React from 'react';
import PropTypes from 'prop-types';
import ExploreFood from '../components/ExploreFood';
import Footer from '../components/Footer';
import Header from '../components/Header';

function FoodExplore() {
  return (
    <div>
      <Header title="Explorar Comidas" />
      <ExploreFood />
      <Footer />
    </div>
  );
}

FoodExplore.propTypes = {
  header: PropTypes.string,
}.isRequired;

export default FoodExplore;
