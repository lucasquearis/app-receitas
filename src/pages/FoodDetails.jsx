import React, { useEffect, useState } from 'react';
// import FoodByDetails from './FoodDetails';
import { useHistory } from 'react-router-dom';

function FoodDetails() {
  const id = 52772;
  const index = 0;
  const getHistory = useHistory();
  const { location: { pathname } } = getHistory;
  const [getRecipe, setGetRecipe] = useState({});

  useEffect(() => {
    const urlFoods = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
    const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
    const fetchDetailsRecipe = async () => {
      const goURL = pathname === 'food' ? urlFoods : urlDrinks;
      const request = await fetch(`${goURL}${id}`);
      const response = await request.json();
      return setGetRecipe(response);
    };
    fetchDetailsRecipe();
  }, [index, getRecipe, pathname]);

  return (
    <div>
      <div>
        <img alt="foto da comida" data-testid="recipe-photo" />
      </div>
      <div>
        <h2 data-testid="recipe-title">titulo</h2>
        <button type="button" data-testid="share-btn">compartilhar</button>
        <button type="button" data-testid="favorite-btn">favorito</button>
        <p data-testid="recipe-category"> categoria</p>
      </div>
      <section>
        <h3>ingredientes</h3>
        <ul>
          <li data-testid={ `${index}-ingredient-name-and-measure` }>items</li>
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
