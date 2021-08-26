import React, { useState, useEffect } from 'react';
// import Context from '../../context/Context';

function DrinksDetails() {
  const [recipesDrink, setRecipesDrink] = useState([]);

  useEffect(() => {
    const getRecipesDrink = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'; // alterar id
      const { drinks } = await fetch(endpoint).then((data) => data.json());
      setRecipesDrink(drinks);
    };
    getRecipesDrink();
  }, []);

  const dataRecipesDrink = [...recipesDrink];

  return (
    <>
      { dataRecipesDrink.map((item, index) => (
        <div key={ index }>
          <img
            data-testid="recipe-photo"
            src={ item.strDrinkThumb }
            alt="receita pronta"
          />
          <h2 data-testid="recipe-title">{ item.strDrink }</h2>
          <button data-testid="share-btn" type="button">Compartilhar</button>
          <button data-testid="favorite-btn" type="button">Add aos favoritos</button>
          <p data-testid="recipe-category">{ item.strCategory }</p>
          <div>
            <h3>Ingredientes</h3>
            <ul data-testid={ `${index}-ingredient-name-and-measure` }>
              <li>{ `${item.strMeasure1} ${item.strIngredient1}` }</li>
              <li>{ `${item.strMeasure2} ${item.strIngredient2}` }</li>
              <li>{ `${item.strMeasure3} ${item.strIngredient3}` }</li>
              <li>{ `${item.strMeasure4} ${item.strIngredient4}` }</li>
              <li>{ `${item.strMeasure5} ${item.strIngredient5}` }</li>
              <li>{ `${item.strMeasure6} ${item.strIngredient6}` }</li>
              <li>{ `${item.strMeasure7} ${item.strIngredient7}` }</li>
            </ul>
          </div>
          <p data-testid="instructions">{ item.strInstructions }</p>
          <div data-testid={ `${index}-recomendation-card` }>Receitas recomendadas</div>
          <button data-testid="start-recipe-btn" type="button">Iniciar Receita</button>
        </div>
      )) }
    </>
  );
}

export default DrinksDetails;
