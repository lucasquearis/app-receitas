import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, Typography } from '@material-ui/core';

function DrinksCards(drink, foodOrDrink, id) {
  return (
    <Card
      key={ drink.idDrink }
      data-testid={ `${id}-recipe-card` }
      className="recipe-card"
    >
      <Link to={ `/${foodOrDrink}/${drink.idDrink}` }>
        <CardMedia
          component="img"
          image={ drink.strDrinkThumb }
          height="200"
          alt={ drink.strDrink }
          title={ drink.strDrink }
          data-testid={ `${id}-card-img` }
          className="cardmedia"
        />
      </Link>
      <Typography
        gutterBottom
        variant="h4"
        component="h2"
        data-testid={ `${id}-card-name` }
        className="card-name"
      >
        { drink.strDrink }
      </Typography>
    </Card>
  );
}

export default DrinksCards;
