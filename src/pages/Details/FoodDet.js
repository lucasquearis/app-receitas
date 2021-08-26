import React, { useEffect, useContext, useState } from 'react';
import Context from '../../context/Context';

function FoodDetails() {
  const value = useContext(Context);
  console.log(value);
  const [recipesFood, setRecipesFood] = useState([]);
  useEffect(() => {
    const getRecipesFood = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771'; // alterar Id
      const { meals } = await fetch(endpoint).then((data) => data.json());
      setRecipesFood(meals);
    };
    getRecipesFood();
  }, []);

  const dataRecipesFood = [...recipesFood];

  return (
    <>
      { dataRecipesFood.map((item, index) => (
        <div key={ index }>
          <img data-testid="recipe-photo" src={ item.strMealThumb } alt="" />
          <h2 data-testid="recipe-title">{ item.strMeal }</h2>
          <button data-testid="share-btn" type="button">Compartilhar</button>
          <button data-testid="favorite-btn" type="button">Add aos favoritos</button>
          <p data-testid="recipe-category">{ item.strCategory }</p>
          <div>
            <h3>Ingredientes</h3>
            <ul data-testid={ `${index}-ingredient-name-and-measure` }>
              <li>{ item.strIngredient1 }</li>
              <li>{ item.strIngredient2 }</li>
              <li>{ item.strIngredient3 }</li>
              <li>{ item.strIngredient4 }</li>
              <li>{ item.strIngredient5 }</li>
              <li>{ item.strIngredient6 }</li>
              <li>{ item.strIngredient7 }</li>
              <li>{ item.strIngredient8 }</li>
            </ul>
          </div>
          <p data-testid="instructions">{ item.strInstructions }</p>
          <iframe
            title="food-video"
            data-testid="video"
            width="10"
            height="10"
            src={ item.strYoutube }
          />
          <div data-testid={ `${index}-recomendation-card` }>Receitas recomendadas</div>
          <button data-testid="start-recipe-btn" type="button">Iniciar Receita</button>
        </div>
      )) }
    </>
  );
}

export default FoodDetails;
