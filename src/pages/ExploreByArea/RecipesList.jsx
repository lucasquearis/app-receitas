import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { fetchRecipesByArea } from '../../services';

export default function RecipesList({ areaSelected }) {
  const [recipes, setRecipes] = useState();
  const recipesLimit = 12;

  useEffect(() => {
    fetchRecipesByArea(areaSelected)
      .then((response) => setRecipes(response.meals));
  }, [areaSelected]);

  if (!recipes && areaSelected !== 'All') {
    return (
      <h3>Loading</h3>
    );
  }

  return (
    <div>
      {recipes && recipes.slice(0, recipesLimit).map((recipe, index) => (
        <Card key={ index } data-testid={ `${index}-recipe-card` }>
          <Link to={ `/comidas/${recipe.idMeal}` }>
            <CardMedia
              component="img"
              alt={ recipe.strMeal }
              height="200"
              image={ recipe.strMealThumb }
              title={ recipe.strMeal }
              data-testid={ `${index}-card-img` }
            />
          </Link>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            data-testid={ `${index}-card-name` }
          >
            { recipe.strMeal }
          </Typography>
        </Card>))}
    </div>
  );
}

RecipesList.propTypes = {
  areaSelected: PropTypes.string,
}.isRequired;
