import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodCard from '../components/FoodCard';
import { foodCategoriesFetch, foodListFetch } from '../redux/actions/actionFood';
import FoodCategories from '../components/FoodCategories';

function MainFood() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(foodListFetch());
    dispatch(foodCategoriesFetch());
  }, [dispatch]);

  const foodCardList = useSelector(({ foodReducer }) => foodReducer.foodCardList);

  if (foodCardList === []) {
    return <p>loading...</p>;
  }
  return (
    <>
      <Header title="Comidas" />
      <FoodCategories />
      {foodCardList.map((item, index) => (
        <FoodCard key={ item.idDrink } food={ item } index={ index } />))}
      <Footer />
    </>
  );
}

export default MainFood;
