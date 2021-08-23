import React from 'react';
import {
  FoodList,
  Footer,
  Header,
} from '../components';

const Foods = () => (
  <div>
    <Header page="Comidas" search />
    <FoodList />
    <Footer />
  </div>
);

export default Foods;
