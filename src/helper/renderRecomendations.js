import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

export const createRecomendationsDrink = (item, index) => {
  const { idDrink, strDrink, strAlcoholic, strDrinkThumb } = item;
  return (
    <div key={ idDrink }>
      <Carousel.Item interval={ 1000 }>
        <Carousel.Caption>
          <img
            src={ strDrinkThumb }
            data-testid={ `${index}-card-img` }
            alt={ strDrink }
          />
          <div>
            <span data-testid={ `${index}-card-name` }>
              { strDrink }
            </span>
            <br />
            <span>
              { strAlcoholic }
            </span>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </div>
  );
};

export const createRecomendationsFood = (item, index) => {
  const { idMeal, strMeal, strCategory, strMealThumb } = item;
  return (
    <div key={ idMeal }>
      <Carousel.Item interval={ 1000 }>
        <Carousel.Caption>
          <img
            src={ strMealThumb }
            data-testid={ `${index}-card-img` }
            alt={ strMeal }
          />
          <div>
            <span data-testid={ `${index}-card-name` }>
              { strMeal }
            </span>
            <br />
            <span>
              { strCategory }
            </span>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </div>
  );
};
