import PropTypes from 'prop-types';
import React from 'react';

import HeaderSearch from '../components/HeaderSearch';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Cards from '../components/Cards';

function FoodsOrDrinks(props) {
  const { title } = props;
  return (
    <div>
      <HeaderSearch title={ title } />
      <Categories />
      <Cards />
      <Footer />
    </div>
  );
}

FoodsOrDrinks.propTypes = {
  title: PropTypes.string.isRequired,
};

export default FoodsOrDrinks;
