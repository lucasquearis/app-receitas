import React from 'react';
import { Link } from 'react-router-dom';

export default function renderRecomendationCard(recipe, type, bOuC) {
  const SIX = 6;
  const links = [];
  if (recipe.length > 0) {
    for (let index = 0; index < SIX; index += 1) {
      links.push(
        <Link
          to={ `/${bOuC}/${recipe[index][`id${type}`]}` }
          data-testid={ `${index}-recomendation-card` }
          key={ index }
          className="recomendation-card"
        >
          <div className="d-flex flex-column align-items-center">
            <img
              src={ recipe[index][`str${type}Thumb`] }
              alt={ recipe[index][`str${type}`] }
            />
            <p className="mb-0 text-black-50">
              {type === 'Drinks' ? recipe[index].strAlcoholic : recipe[index].strCategory}
            </p>
            <p
              data-testid={ `${index}-recomendation-title` }
              className="mt-0"
            >
              {recipe[index][`str${type}`]}
            </p>
          </div>
        </Link>,
      );
    }
  }
  return links;
}
