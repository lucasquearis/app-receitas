import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrinksRedux,
  fetchDrinksCategoriesRedux, fetchDrinksByCategory } from '../redux/actions/foodActions';
import DrinksCards from '../components/DrinksCard';
import CategoryButton from '../components/CategoryButton';

function Drinks() {
  const dispatch = useDispatch();
  const drinksLimits = 12;
  const buttonLimits = 5;
  const categoriesLimit = 5;
  const [limit, setLimit] = useState(drinksLimits);
  const [current, setCurrent] = useState('');

  const drinks = useSelector((state) => state.foodsAndDrinks.drinks);
  const { categories } = useSelector((state) => state.foodsAndDrinks);

  useEffect(() => {
    dispatch(fetchDrinksRedux);
    dispatch(fetchDrinksCategoriesRedux);
  }, [dispatch]);

  const onClick = (name) => {
    if (current === name) {
      setCurrent('');
      setLimit(drinksLimits);
      dispatch(fetchDrinksRedux);
    } else {
      dispatch(fetchDrinksByCategory(name));
      setLimit(categoriesLimit);
      setCurrent(name);
    }
  };

  if (!drinks) {
    return (
      <h1>Loading</h1>
    );
  }

  return (
    <div>
      { categories.drinks.slice(0, buttonLimits).map(
        (category, id) => CategoryButton(category.strCategory, id, onClick),
      )}

      { drinks.slice(0, limit).map(
        (drink, id) => DrinksCards(
          drink, 'bebidas', id,
        ),
      )}

    </div>
  );
}

export default Drinks;
