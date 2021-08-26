import React from 'react';
import { useData } from '../../Context/DataContext';
import './cards.css';

export default function Cards() {
  const {
    recommendationsData,
  } = useData();

  return (
    <div className="container">
      {
        recommendationsData.map((recipe, index) => (
          <li
            key={ recipe.idDrink || recipe.idMeal }
            data-testid={ `${index}-recomendation-card` }
            className="card"
          >
            <img src={ recipe.strMealThumb || recipe.strDrinkThumb } alt="Recipe" />
            <h2 data-testid={ `${index}-recomendation-title` }>
              { recipe.strMeal || recipe.strDrink }
            </h2>
            <h3 data-testid="recipe-category">{ recipe.strCategory }</h3>
          </li>
        ))
      }
    </div>
  );
}
