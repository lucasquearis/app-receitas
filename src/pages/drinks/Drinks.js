import React from 'react';
import { useSelector } from 'react-redux';
import CardsList from '../../components/CardsList/CardsList';
import Header from '../../components/header/Header';

const Drinks = () => {
  const { items } = useSelector((state) => state.itemsReducer);
  if (items.length > 0) {
    return (
      <div>
        <Header>Bebidas</Header>
        <CardsList array={ items } />
      </div>
    );
  }
  return (
    <div>
      <Header>Bebidas</Header>
    </div>
  );
};

export default Drinks;
