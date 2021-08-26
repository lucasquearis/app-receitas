import React from 'react';
import { useSelector } from 'react-redux';
import CardsList from '../../components/CardsList/CardsList';
import Header from '../../components/header/Header';

const Food = () => {
  const { items } = useSelector((state) => state.itemsReducer);
  if (items.length > 0) {
    return (
      <div>
        <Header>Comidas</Header>
        <CardsList array={ items } />
      </div>
    );
  }
  return (
    <div>
      <Header>Comidas</Header>
    </div>
  );
};

export default Food;
