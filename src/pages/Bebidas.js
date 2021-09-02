import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CategoryButton from '../components/CategoryButton';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import MyContext from '../context/MyContext';
import * as fetchAPI from '../service/fetchAPI';
import './comidas.css';

function Bebidas(props) {
  const { history: { location: { pathname, state } } } = props;
  const [drinkRecipes, setDrinkRecipes] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const MAX_RECIPES = 12;
  const MAX_CATEGORIES = 5;
  const drinkEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const drinkCategoriesEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const newDrinkRecipes = (data) => {
    setDrinkRecipes(data);
  };

  const getAllDrinks = () => {
    if (!state) {
      fetch(drinkEndpoint)
        .then((res) => res.json())
        .then(({ drinks }) => setDrinkRecipes(drinks));
    } else {
      fetchAPI.filteredDrinks('ingredient', state.ingredient)
        .then((drinks) => setDrinkRecipes(drinks));
    }
  };

  useEffect(() => {
    getAllDrinks();

    fetch(drinkCategoriesEndpoint)
      .then((res) => res.json())
      .then(({ drinks }) => setDrinkCategories(drinks))
      .then(setIsLoading(true));
  }, []);

  const handleClick = ({ target }) => {
    if (target.className !== 'clicked') {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.innerText}`;
      const allFilters = document.getElementsByName('category-filter');

      fetch(URL)
        .then((res) => res.json())
        .then(({ drinks }) => setDrinkRecipes(drinks));

      allFilters.forEach((filter) => { filter.className = ''; });

      target.className = 'clicked';
    } else {
      getAllDrinks();
      target.className = '';
    }
  };

  if (isLoading) {
    return (
      <div className="main-container">
        <div className="card-container">
          { drinkRecipes.map(({ strDrinkThumb, strDrink, idDrink }, index) => {
            if (index < MAX_RECIPES) {
              return (
                <Link key={ strDrink } to={ `/bebidas/${idDrink}` } className="card">
                  <RecipeCard
                    key={ strDrink }
                    thumb={ strDrinkThumb }
                    name={ strDrink }
                    index={ index }
                  />
                </Link>
              );
            }
            return null;
          }) }
        </div>
        <Row className="category-btn">
          { drinkCategories.map(({ strCategory }, index) => {
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
            onClick={ getAllDrinks }
          >
            All
          </button>
        </Row>
        <MyContext.Provider value={ newDrinkRecipes }>
          <Header titulo="Bebidas" showProfileIcon="sim" pathname={ pathname } />
        </MyContext.Provider>
        <Footer />
      </div>
    );
  }

  return <div className="main-container"><div className="c-loader" /></div>;
}

Bebidas.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}.isRequired;

export default Bebidas;
