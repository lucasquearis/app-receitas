import React from 'react';
import PropTypes from 'prop-types';
import ExploreFood from '../components/ExploreFood';
import Footer from '../components/Footer';

function FoodExplore() {
  return (
    <div>
      <ExploreFood />
      <Footer />
    </div>
  );
}

FoodExplore.propTypes = {
  header: PropTypes.string,
}.isRequired;

export default FoodExplore;
