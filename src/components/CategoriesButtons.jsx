import React, { useContext } from 'react';
import DrinkContext from '../context/DrinkContext';
import FoodContext from '../context/FoodContext';
import { fetchDrinkByCategorie } from '../services/cocktailAPI';
import { fetchFoodByCategorie } from '../services/mealAPI';

function CategoriesButtons({ categories, type }) {
  const { setDrinks } = useContext(DrinkContext);
  const { setFoods } = useContext(FoodContext);
  const categoriesLimit = 5;

  const onClick = async (categorie) => {
    if (type === 'bebidas') {
      const { drinks } = await fetchDrinkByCategorie(categorie);
      setDrinks(drinks);
    } else {
      const { meals } = await fetchFoodByCategorie(categorie);
      setFoods(meals);
    }
  };

  return (
    categories.map((name, index) => (
      index < categoriesLimit ? (
        <label htmlFor={ `${name.strCategory}` } key={ index }>
          <input
            type="checkbox"
            id={ `${name.strCategory}` }
            key={ index }
            name={ `${name.strCategory} category` }
            data-testid={ `${name.strCategory}-category-filter` }
            value={ name.strCategory }
            onClick={ () => onClick(name.strCategory) }
          />
          { name.strCategory }
        </label>) : null
    ))
  );
}

export default CategoriesButtons;
