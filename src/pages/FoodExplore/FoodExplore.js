import React from 'react';
import PropTypes from 'prop-types';
import ExploreFood from '../../components/ExploreFood';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header';
import './FoodExplore.css';

function FoodExplore() {
  return (
    <div className="fe-container">
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
