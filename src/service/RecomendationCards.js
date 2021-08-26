import React from 'react';
import { Link } from 'react-router-dom';

export default function renderRecomendationCard(recipe, type) {
  const SIX = 6;
  const links = [];
  if (recipe.length > 0) {
    for (let index = 0; index < SIX; index += 1) {
      links.push(
        <Link
          to={ `/bebidas/${recipe[index][`id${type}`]}` }
          data-testid={ `${index}-recomendation-card` }
          key={ index }
        >
          <div>
            <img
              src={ recipe[index][`str${type}Thumb`] }
              alt={ recipe[index][`str${type}`] }
            />
            <p>
              {type === 'Drinks' ? recipe[index].strAlcoholic : recipe[index].strCategory}
            </p>
            <p>{recipe[index][`str${type}`]}</p>
          </div>
        </Link>,
      );
    }
  }
  return links;
}
