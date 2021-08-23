import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoodRedux, fetchDrinksRedux } from '../redux/actions/foodActions';
import RecipeCard from '../components/RecipeCard';

function Foods() {
  const dispatch = useDispatch();
  const foodsLimits = 12;

  const foods = useSelector((state) => state.foodsAndDrinks.meals);

  useEffect(() => {
    dispatch(fetchFoodRedux);
    dispatch(fetchDrinksRedux);
  }, [dispatch]);

  if (!foods) {
    return (
      <h1>Loading</h1>
    );
  }
  return (
    foods.slice(0, foodsLimits).map(
      (food) => RecipeCard(food.idMeal, food.strMealThumb, food.strMeal),
    )
  );
}

export default Foods;
