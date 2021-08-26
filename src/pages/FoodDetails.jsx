import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function FoodDetails() {
  const id = 52771;
  const index = 0;
  const getHistory = useHistory();
  const { location: { pathname } } = getHistory;
  const [getRecipe, setGetRecipe] = useState({});

  useEffect(() => {
    try {
      const urlFoods = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
      const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
      const fetchDetailsRecipe = async () => {
        const goURL = (pathname.includes('comidas') ? urlFoods : urlDrinks);
        const request = await fetch(`${goURL}${id}`);
        const response = await request.json();
        const resolve = await response.meals[0];
        console.log(resolve);
        setGetRecipe(resolve);
      };
      fetchDetailsRecipe();
    } catch (error) {
      console.log(error);
    }
  }, [id, getHistory, pathname, setGetRecipe]);

  return (
    <div>
      <div>
        <img
          alt="foto da comida"
          data-testid="recipe-photo"
          src={ getRecipe.strMealThumb }
          style={ { width: '10rem' } }
        />
      </div>
      <div>
        <h2 data-testid="recipe-title">{ getRecipe.strMeal }</h2>
        <button type="button" data-testid="share-btn">compartilhar</button>
        <button type="button" data-testid="favorite-btn">favorito</button>
        <p data-testid="recipe-category">{ getRecipe.strCategory }</p>
      </div>
      <section>
        <h3>ingredientes</h3>
        <ul data-testid={ `${index}-ingredient-name-and-measure` }>
          <li>item</li>
        </ul>
      </section>
      <section>
        <p data-testid="instructions">Instruçoes</p>
      </section>
      <div>
        <p data-testid="video">video</p>
      </div>
      <div>
        <p data-testid={ `${index}-recomendation-card` }>cards</p>
      </div>
      <div>
        <button type="button" data-testid="start-recipe-btn">iniciar receita</button>
      </div>
    </div>
  );
}
// requisito 33

export default FoodDetails;
