import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoodRedux, fetchFoodsCategoriesRedux } from '../redux/actions/foodActions';
import RecipeCard from '../components/RecipeCard';
import CategoryButton from '../components/CategoryButton';

function Foods() {
  const dispatch = useDispatch();
  const foodsLimits = 12;
  const buttonLimits = 5;

  const foods = useSelector((state) => state.foodsAndDrinks.meals);
  const { categories } = useSelector((state) => state.foodsAndDrinks);

  useEffect(() => {
    dispatch(fetchFoodRedux);
    dispatch(fetchFoodsCategoriesRedux);
  }, [dispatch]);

  if (!foods) {
    return (
      <h1>Loading</h1>
    );
  }
  return (
    <div>
      { categories.meals.slice(0, buttonLimits).map(
        (category, id) => CategoryButton(category.strCategory, id),
      )}

      {foods.slice(0, foodsLimits).map(
        (food) => RecipeCard(food.idMeal, food.strMealThumb, food.strMeal),
      )}

    </div>
  );
}

export default Foods;
