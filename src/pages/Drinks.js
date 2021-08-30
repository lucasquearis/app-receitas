import React from 'react';
import HeaderSearch from '../components/HeaderSearch';
import Categories from '../components/Categories';
import Footer from '../components/Footer';

import Cards from '../components/Cards';

function Drinks() {
  return (
    <div>
      <HeaderSearch title="Bebidas" />
      <Categories />
      <Cards />
      <Footer />
    </div>
  );
}

export default Drinks;
