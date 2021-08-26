import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFoodRedux, fetchFoodsCategoriesRedux, fetchFoodByCategory,
} from '../redux/actions/foodActions';
import FoodsCards from '../components/FoodsCard';
import CategoryButton from '../components/CategoryButton';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Foods() {
  const dispatch = useDispatch();
  const foodsLimits = 12;
  const buttonLimits = 5;
  const [current, setCurrent] = useState('');

  const foods = useSelector((state) => state.foodsAndDrinks.meals);
  const { categories } = useSelector((state) => state.foodsAndDrinks);

  useEffect(() => {
    dispatch(fetchFoodRedux);
    dispatch(fetchFoodsCategoriesRedux);
  }, [dispatch]);

  const onClick = (name) => {
    if (current === name || name === 'All') {
      setCurrent('');

      dispatch(fetchFoodRedux);
    } else {
      dispatch(fetchFoodByCategory(name));
      setCurrent(name);
    }
  };

  if (!foods) {
    return (
      <h1>Loading</h1>
    );
  }

  const headerProps = {
    title: 'Comidas',
    renderSearchBar: true,
  };

  return (
    <>
      <Header { ...headerProps } />
      <div>
        <button
          type="button"
          onClick={ () => onClick('All') }
        >
          All
        </button>
        { categories.meals.slice(0, buttonLimits).map(
          (category, id) => CategoryButton(category.strCategory, id, onClick),
        )}

        {foods.slice(0, foodsLimits).map(
          (food, id) => FoodsCards(
            food, 'comidas', id,
          ),
        )}
      </div>
      <Footer />
    </>
  );
}

export default Foods;
