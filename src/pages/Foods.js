import React from 'react';
import HeaderSearch from '../components/HeaderSearch';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Cards from '../components/Cards';

function Foods() {
  return (
    <div>
      <HeaderSearch title="Comidas" />
      <Categories />
      <Cards />
      <Footer />
    </div>
  );
}

export default Foods;
