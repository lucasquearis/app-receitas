import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ExploreArea from '../components/ExploreArea';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import * as fetchAPI from '../service/fetchAPI';

const MAX_RECIPES = 12;

function ExplorarOrigem() {
  const [areaList, setAreaList] = useState([]);
  const [area, setArea] = useState('');
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    fetchAPI.fetchRecipeSuggestions().then(({ meals }) => setRecipe(meals));
    fetchAPI.fetchAreaList().then(({ meals }) => setAreaList(meals));
  }, []);

  useEffect(() => {
    if (area !== '') {
      fetchAPI.fetchByArea(area).then(({ meals }) => setRecipe(meals));
    } else {
      fetchAPI.fetchRecipeSuggestions().then(({ meals }) => setRecipe(meals));
    }
  }, [area]);

  const handleChange = ({ target }) => {
    const { value } = target;
    setArea(value);
  };

  return (
    <div>
      <div className="card-container">
        { recipe.map(({ strMealThumb, strMeal, idMeal }, index) => {
          if (index < MAX_RECIPES) {
            return (
              <Link key={ strMeal } to={ `/comidas/${idMeal}` } className="card">
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
      </div>
      <Header titulo="Explorar Origem" showProfileIcon="sim" />
      <ExploreArea data={ areaList } onChange={ handleChange } />
      <Footer />
    </div>
  );
}

export default ExplorarOrigem;
