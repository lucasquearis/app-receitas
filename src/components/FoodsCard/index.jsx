import { Card, CardMedia, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

function FoodsCards(food, foodOrDrink, id) {
  return (
    <Card key={ food.idMeal } data-testid={ `${id}-recipe-card` } className="recipe-card">
      <Link to={ `/${foodOrDrink}/${food.idMeal}` }>
        <CardMedia
          component="img"
          alt={ food.strMeal }
          height="200"
          image={ food.strMealThumb }
          title={ food.strMeal }
          data-testid={ `${id}-card-img` }
          className="cardmedia"
        />
      </Link>
      <Typography
        gutterBottom
        variant="h5"
        component="h2"
        data-testid={ `${id}-card-name` }
        className="card-name"
      >
        { food.strMeal }
      </Typography>
    </Card>
  );
}

export default FoodsCards;
