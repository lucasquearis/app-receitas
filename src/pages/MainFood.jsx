import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodCard from '../components/FoodCard';
import { foodCategoriesFetch, foodListFetch } from '../redux/actions/actionFood';
import FoodCategories from '../components/FoodCategories';
import './FoodCards.css';

function MainFood() {
  const dispatch = useDispatch();
  const isClicked = useSelector(({ foodReducer }) => foodReducer.foodIsClicked);
  useEffect(() => {
    if (!isClicked) {
      dispatch(foodListFetch());
    }
    dispatch(foodCategoriesFetch());
  }, [dispatch, isClicked]);

  const foodCardList = useSelector(({ foodReducer }) => foodReducer.foodCardList);

  if (foodCardList === []) {
    return <p>loading...</p>;
  }
  return (
    <>
      <Header title="Comidas" />
      <FoodCategories />
      <div className="map-cards">
        {foodCardList.map((item, index) => (
          <Link to={ `/comidas/${item.idMeal}` } key={ item.idMeal }>
            <FoodCard food={ item } index={ index } />
          </Link>))}
      </div>
      <Footer />
    </>
  );
}

export default MainFood;
