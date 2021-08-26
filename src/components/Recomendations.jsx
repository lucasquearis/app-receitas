import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { getRecomendations } from '../services/api';

export default function DrinksRecomendations() {
  const [recomendations, setRecomendations] = useState([]);
  const location = useLocation();
  const currentPage = location.pathname;

  const maxLength = 6;
  /* https://www.codegrepper.com/code-examples/
  javascript / javascript + array + map + randomize */
  function randomArrayShuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  useEffect(() => {
    const getDataRecomendation = async () => {
      await getRecomendations().then((response) => setRecomendations(response));
    };
    getDataRecomendation();
  }, []);

  return (
    <Carousel>
      {currentPage.includes('comidas') ? (
        randomArrayShuffle(recomendations).map(({
          idDrink,
          strDrinkThumb,
          strAlcoholic,
          strDrink,
        }, index) => {
          if (index < maxLength) {
            return (
              <Carousel.Item
                key={ idDrink }
                data-testid={ `${index}-recomendation-card` }
              >
                <img
                  style={ { width: '200px' } }
                  src={ strDrinkThumb }
                  alt="Foto do drink"
                />
                <p>{strAlcoholic}</p>
                <p data-testid={ `${index}-recomendation-title` }>
                  {strDrink}
                </p>
              </Carousel.Item>
            );
          }
          return null;
        })
      ) : (
        randomArrayShuffle(recomendations).map(({
          idMeal,
          strMealThumb,
          strMeal,
          strCategory,
        }, index) => {
          if (index < maxLength) {
            return (
              <Carousel.Item
                key={ idMeal }
                data-testid={ `${index}-recomendation-card` }
              >
                <img
                  style={ { width: '200px' } }
                  src={ strMealThumb }
                  alt="Foto do Meal"
                />
                <p>{strCategory}</p>
                <p data-testid={ `${index}-recomendation-title` }>
                  {strMeal}
                </p>
              </Carousel.Item>
            );
          }
          return null;
        })
      )}
    </Carousel>
  );
}
