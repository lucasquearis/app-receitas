import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import { RecipeDetails } from '../components';

function MealDetails({ match: { params: { id } } }) {
  const dispatch = useDispatch();
  const [recipe, setRecipe] = useState(undefined);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const result = await response.json();
      setRecipe(result);
    };
    fetchRecipe();
  }, [id]);

  useEffect(() => {
    dispatch({ type: 'CLEAR' });
  }, [dispatch]);

  return (
    <div>
      { recipe && <RecipeDetails recipe={ recipe } type="Meal" />}
    </div>
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
