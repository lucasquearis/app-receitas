import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import DrinkContext from '../context/DrinkContext';
import FoodContext from '../context/FoodContext';
import { fetchDrinkByCategorie, fetchInicialDrinks } from '../services/cocktailAPI';
import { fetchFoodByCategorie, fetchInicialFoods } from '../services/mealAPI';

function CategoriesButtons({ categories, type }) {
  const { setDrinks } = useContext(DrinkContext);
  const { setFoods } = useContext(FoodContext);
  const categoriesLimit = 5;

  async function onClick(categorie) {
    if (type === 'bebidas') {
      const { drinks } = await fetchDrinkByCategorie(categorie);
      setDrinks(drinks);
    } else {
      const { meals } = await fetchFoodByCategorie(categorie);
      setFoods(meals);
    }
  }

  async function onClickAll() {
    if (type === 'bebidas') {
      const { drinks } = await fetchInicialDrinks();
      setDrinks(drinks);
    } else {
      const { meals } = await fetchInicialFoods();
      setFoods(meals);
    }
  }
  return (
    <div>
      <label htmlFor="All">
        <input
          type="radio"
          id="All"
          name="radio-category"
          data-testid="All-category-filter"
          value="All"
          onClick={ () => onClickAll() }
        />
        All
      </label>
      { categories.map((name, index) => (
        index < categoriesLimit ? (
          <label htmlFor={ `${name.strCategory}` } key={ index }>
            <input
              type="radio"
              id={ `${name.strCategory}` }
              key={ index }
              name="radio-category"
              data-testid={ `${name.strCategory}-category-filter` }
              value={ name.strCategory }
              onClick={ () => onClick(name.strCategory) }
            />
            { name.strCategory }
          </label>
        ) : null)) }
    </div>
  );
}

CategoriesButtons.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  type: PropTypes.string,
};

CategoriesButtons.defaultProps = {
  type: PropTypes.string,
};

export default CategoriesButtons;
