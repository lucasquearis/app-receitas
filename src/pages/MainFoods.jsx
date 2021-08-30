import React, { useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import FoodList from '../components/FoodList';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import AppContext from '../context/AppContext';

function MainFoods() {
  const { foods } = useContext(AppContext);
  return (
    <div>
      { foods.length === 1
        && <Redirect to={ `/comidas/${foods[0].idMeal}` } /> }
      <Header name="Comidas" />
      <div>
        { foods !== [] ? foods.map((recipe, index) => (
          <div key={ recipe.idMeal }>
            <Link to={ `/comidas/${recipe.idMeal}` }>
              <RecipeCard recipe={ recipe } index={ index } />
            </Link>
          </div>
        )) : <FoodList /> }
      </div>
      <Footer />
    </div>
  );
}

export default MainFoods;
