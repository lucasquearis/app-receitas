import React, { useContext } from 'react';
import HeaderFood from '../components/HeaderFood';
import FooterMenu from '../components/FooterMenu';
import './recipes.css';
import RecipeCard from '../components/RecipeCard';
import FoodContext from '../context/FoodContext';
import '../components/recipeCard.css';
import ButtonCategories from '../components/ButtonsCategory';

const Recipes = () => {
  const { foods, categoriesMeal } = useContext(FoodContext);
  const RECIPES = 12;

  return (
    <div className="container">
      <HeaderFood />

      <ButtonCategories categories={ categoriesMeal } />

      <div className="recipe-container">
        {foods && foods.slice(0, RECIPES)
          .map((recipe, index) => (
            <RecipeCard
              key={ index }
              index={ index }
              recipe={ recipe }
            />
          ))}
      </div>
      <FooterMenu />
    </div>
  );
};

export default Recipes;
