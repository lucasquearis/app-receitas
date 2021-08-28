import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodCard from '../components/FoodCard';
import { foodFetch } from '../redux/actions/actionFood';

function MainFood() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(foodFetch());
  }, [dispatch]);

  const foodCardList = useSelector(({ foodReducer }) => foodReducer.foodCardList);

  if (foodCardList === []) {
    return <p>loading...</p>;
  }
  return (
    <>
      <Header title="Bebidas" />
      {foodCardList.map((item, index) => (
        <FoodCard key={ item.idDrink } item={ item } index={ index } />))}
      <Footer />
    </>
  );
}

export default MainFood;
