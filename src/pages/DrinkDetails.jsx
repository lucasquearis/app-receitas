import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import { RecipeDetails } from '../components';
import UseRecomendationRecipes from '../hook/UseRecomendationRecipes';

function DrinkDetails({ match: { params: { id } } }) {
  const dispatch = useDispatch();
  const [recipe, setRecipe] = useState([]);
  const recomendation = UseRecomendationRecipes('meals');

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const result = await response.json();
      const details = result.meals || result.drinks;
      setRecipe(details);
    };
    fetchRecipe();
  }, [id]);

  useEffect(() => {
    dispatch({ type: 'CLEAR' });
  }, [dispatch]);

  return (
    <article>
      { recipe.map((oneRecipe) => (
        <RecipeDetails key="0" recipe={ oneRecipe } type="Drink" />)) }
      <section className="horizontal-slider">
        {recomendation}
      </section>
    </article>
  );
}

DrinkDetails.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DrinkDetails;
