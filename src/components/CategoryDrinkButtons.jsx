import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDrinksCategories, clearSearch } from '../redux/actions/mainActions';
import ItemCard from './ItemCard';

function CategoryDrinkButtons() {
  const doze = 12;
  const cinco = 5;
  const categories = useSelector(
    (state) => state.reducerCategories.drinksCategories.drinks,
  );
  const dispatch = useDispatch();
  const [categoryClick, setCategoryClick] = useState([]);

  const filterDrinkCategory = async (category) => {
    try {
      const res = await
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await res.json();
      setCategoryClick(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchDrinksCategories());
    filterDrinkCategory();
  }, [dispatch]);

  const handleClick = (categoryStr) => {
    filterDrinkCategory(categoryStr);
    dispatch(clearSearch());
  };

  return (
    <div>
      {
        categories && categories.map((category, index) => index < cinco && (
          <button
            type="button"
            key={ `${category.strCategory}-category-filter` }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => handleClick(category.strCategory) }
          >
            {category.strCategory}
          </button>
        ))
      }
      {
        categoryClick.drinks
          && categoryClick.drinks.map((dish, index) => index < doze && (
            <ItemCard
              title={ dish.strDrink }
              data-testid={ `${index}-recipe-card` }
              thumb={ dish.strDrinkThumb }
              id={ dish.idDrink }
              index={ index }
              key={ index }
            />
          ))
      }
    </div>
  );
}

export default CategoryDrinkButtons;
