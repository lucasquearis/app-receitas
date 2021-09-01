import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';
import './recipes.css';
import RecipeCard from '../components/RecipeCard';
import FoodContext from '../context/FoodContext';
import '../components/recipeCard.css';
import ButtonCategories from '../components/ButtonsCategory';

const Recipes = () => {
  const { foods, categoriesMeal, mealsByCategories } = useContext(FoodContext);
  const history = useHistory();
  const RECIPES = 12;

  if (foods === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  } else if (foods.length === 1 && mealsByCategories === false) {
    history.push(`/comidas/${foods[0].idMeal}`);
  }

  return (
    <div className="container">
      <Header title="Comidas" />

      <ButtonCategories categories={ categoriesMeal } />

      <div className="recipe-container">
        {foods && foods.slice(0, RECIPES)
          .map((recipe, index) => (
            <Link key={ index } to={ `/comidas/${recipe.idMeal}` }>
              <RecipeCard
                key={ index }
                index={ index }
                srtRecipeThumb={ recipe.strMealThumb }
                srtRecipe={ recipe.strMeal }
              />
            </Link>
          ))}
      </div>
      <FooterMenu />
    </div>
  );
};

export default Recipes;
