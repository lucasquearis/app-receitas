import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderFood from '../components/HeaderFood';
import FooterMenu from '../components/FooterMenu';
import './recipes.css';
import RecipeCard from '../components/RecipeCard';
import FoodContext from '../context/FoodContext';
import '../components/recipeCard.css';

const Recipes = () => {
  const { foods } = useContext(FoodContext);
  const history = useHistory();
  const RECIPES = 12;

  if (foods === null) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  } else if (foods.length === 1) {
    history.push(`/comidas/${foods[0].idMeal}`);
  }

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
      <FooterMenu />
    </div>
  );
};

export default Recipes;
