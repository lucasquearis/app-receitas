import React from 'react';
import {
  DrinkList,
  Footer,
  Header,
} from '../components';

const Drinks = () => (
  <div>
    <Header page="Bebidas" search />
    <DrinkList />
    <Footer />
  </div>
);

export default Drinks;
