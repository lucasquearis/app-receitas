import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CategoryButton from '../components/CategoryButton';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import MyContext from '../context/MyContext';

function Comidas(props) {
  const { history: { location: { pathname } } } = props;
  const [foodRecipes, setFoodRecipes] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const MAX_RECIPES = 12;
  const MAX_CATEGORIES = 5;
  const foodEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const foodCategoriesEndpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

  const newFoodRecipes = (data) => {
    setFoodRecipes(data);
  };

  const getAllFoods = () => {
    fetch(foodEndpoint)
      .then((res) => res.json())
      .then(({ meals }) => setFoodRecipes(meals));
  };

  useEffect(() => {
    getAllFoods();

    fetch(foodCategoriesEndpoint)
      .then((res) => res.json())
      .then(({ meals }) => setFoodCategories(meals));
  }, []);

  const handleClick = ({ target }) => {
    if (target.className !== 'clicked') {
      const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.innerText}`;
      const allFilters = document.getElementsByName('category-filter');

      fetch(URL)
        .then((res) => res.json())
        .then(({ meals }) => setFoodRecipes(meals));

      allFilters.forEach((filter) => { filter.className = ''; });

      target.className = 'clicked';
    } else {
      getAllFoods();
      target.className = '';
    }
  };

  return (
    <div>
      <MyContext.Provider value={ newFoodRecipes }>
        <Header titulo="Comidas" showProfileIcon="sim" pathname={ pathname } />
      </MyContext.Provider>
      { foodCategories.map(({ strCategory }, index) => {
        if (index < MAX_CATEGORIES) {
          return (
            <CategoryButton
              key={ strCategory }
              strCategory={ strCategory }
              handleClick={ handleClick }
            />
          );
        }
        return null;
      }) }
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ getAllFoods }
      >
        All
      </button>
      { foodRecipes.map(({ strMealThumb, strMeal, idMeal }, index) => {
        if (index < MAX_RECIPES) {
          return (
            <Link key={ strMeal } to={ `/comidas/${idMeal}` }>
              <RecipeCard
                thumb={ strMealThumb }
                name={ strMeal }
                index={ index }
              />
            </Link>
          );
        }
        return null;
      }) }
      <Footer />
    </div>
  );
}

Comidas.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}.isRequired;

export default Comidas;
