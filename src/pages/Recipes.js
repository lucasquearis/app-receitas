import React, { useContext } from 'react';
import HeaderFood from '../components/HeaderFood';
import './recipes.css';
import RecipeCard from '../components/RecipeCard';
import FoodContext from '../context/FoodContext';
import '../components/recipeCard.css';

const Recipes = () => {
  const { foods } = useContext(FoodContext);
  const RECIPES = 12;

  return (
    <div className="container">
      <HeaderFood />
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
    </div>
  );
};

export default Recipes;
