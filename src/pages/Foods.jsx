import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoodRedux,
  fetchFoodsCategoriesRedux, fetchFoodByCategory } from '../redux/actions/foodActions';
import FoodsCards from '../components/FoodsCard';
import CategoryButton from '../components/CategoryButton';

function Foods() {
  const dispatch = useDispatch();
  const foodsLimits = 12;
  const buttonLimits = 5;
  const categoriesLimit = 5;
  const [limit, setLimit] = useState(foodsLimits);
  const [current, setCurrent] = useState('');

  const foods = useSelector((state) => state.foodsAndDrinks.meals);
  const { categories } = useSelector((state) => state.foodsAndDrinks);

  useEffect(() => {
    dispatch(fetchFoodRedux);
    dispatch(fetchFoodsCategoriesRedux);
  }, [dispatch]);

  const onClick = (name) => {
    if (current === name) {
      setCurrent('');
      setLimit(foodsLimits);

      dispatch(fetchFoodRedux);
    } else {
      dispatch(fetchFoodByCategory(name));
      setLimit(categoriesLimit);
      setCurrent(name);
    }
  };

  if (!foods) {
    return (
      <h1>Loading</h1>
    );
  }

  return (
    <div>
      { categories.meals.slice(0, buttonLimits).map(
        (category, id) => CategoryButton(category.strCategory, id, onClick),
      )}

      {foods.slice(0, limit).map(
        (food, id) => FoodsCards(
          food, 'comidas', id,
        ),
      )}

    </div>
  );
}

export default Foods;
