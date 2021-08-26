import React, { useEffect, useState } from 'react';
// import Context from '../../context/Context';

function FoodDetails() {
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
          <img
            data-testid="recipe-photo"
            src={ item.strMealThumb }
            alt="receita pronta"
          />
          <h2 data-testid="recipe-title">{ item.strMeal }</h2>
          <button data-testid="share-btn" type="button">Compartilhar</button>
          <button data-testid="favorite-btn" type="button">Add aos favoritos</button>
          <p data-testid="recipe-category">{ item.strCategory }</p>
          <div>
            <h3>Ingredientes</h3>
            <ul>
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${item.strMeasure1} ${item.strIngredient1}` }
              </li>
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${item.strMeasure2} ${item.strIngredient2}` }

              </li>
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${item.strMeasure3} ${item.strIngredient3}` }

              </li>
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${item.strMeasure4} ${item.strIngredient4}` }

              </li>
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${item.strMeasure5} ${item.strIngredient5}` }

              </li>
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${item.strMeasure6} ${item.strIngredient6}` }

              </li>
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${item.strMeasure7} ${item.strIngredient7}` }

              </li>
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${item.strMeasure8} ${item.strIngredient8}` }

              </li>
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
