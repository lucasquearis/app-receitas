import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { RecipeInProgress } from '../components';

function InProgressMeals({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const result = await response.json();
      const details = result.meals || result.drinks;
      setRecipe(details);
    };
    fetchRecipe();
  }, [id]);

  return (
    <article>
      { recipe.map((oneRecipe) => (
        <RecipeInProgress key="0" recipe={ oneRecipe } type="Meal" />)) }
    </article>
  );
}

InProgressMeals.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }).isRequired,
};

export default InProgressMeals;
