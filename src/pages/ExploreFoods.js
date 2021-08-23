import React from 'react';
import {
  Footer,
  Header,
} from '../components';

const ExploreFoods = () => {
  const pageName = 'Explorar Comidas';
  return (
    <div>
      <Header page={ pageName } />
      Explorar Comidas
      <Footer />
    </div>
  );
};

export default ExploreFoods;
