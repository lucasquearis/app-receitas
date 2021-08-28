import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinkCard from '../components/DrinkCard';
import { drinkFetch } from '../redux/actions/actionDrink';

function MainDrink() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(drinkFetch());
  }, [dispatch]);

  const drinkCardList = useSelector(({ drinkReducer }) => drinkReducer.drinkCardList);

  if (drinkCardList === []) {
    return <p>loading...</p>;
  }
  return (
    <>
      <Header title="Bebidas" />
      {drinkCardList.map((item, index) => (
        <DrinkCard key={ item.idDrink } item={ item } index={ index } />))}
      <Footer />
    </>
  );
}

export default MainDrink;
