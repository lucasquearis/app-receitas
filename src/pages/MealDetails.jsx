import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import { RecipeDetails } from '../components';
import UseRecomendationRecipes from '../hook/UseRecomendationRecipes';
import { DatailsMain } from '../UI globalStyles';

function MealDetails({ match: { params: { id } } }) {
  const dispatch = useDispatch();
  const [recipe, setRecipe] = useState([]);
  const recomendation = UseRecomendationRecipes('drinks');

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const result = await response.json();
      const details = result.meals || result.drinks;
      setRecipe(details);
    };
    dispatch({ type: 'CLEAR' });
    fetchRecipe();
  }, [id, dispatch]);

  return (
    <DatailsMain>
      { recipe.map((oneRecipe) => (
        <RecipeDetails key="0" recipe={ oneRecipe } type="Meal" />)) }
      <section className="horizontal-slider">
        {recomendation}
      </section>
    </DatailsMain>
  );
}

MealDetails.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }).isRequired,
};

export default MealDetails;
