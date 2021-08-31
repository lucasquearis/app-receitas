import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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
        <Link to={ `/comidas/${item.idMeal}` } key={ item.idMeal }>
          <FoodCard food={ item } index={ index } />
        </Link>))}
      <Footer />
    </>
  );
}

export default MainFood;
