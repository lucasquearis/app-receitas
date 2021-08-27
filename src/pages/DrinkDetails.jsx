import React, { useEffect, useState } from 'react';
import '../styles/Details.css';
import { useHistory } from 'react-router-dom';

// função para puxar os ingredientes e sua medidas
const listIgredientsAndMeasure = (getRecipe, setIngredient, setMeasure) => {
  const lenghtIndredients = 20; // quantidade máxima de ingredientes da receita
  const itens = [];
  const itensMeasure = [];
  if (getRecipe) {
    for (let i = 1; i < lenghtIndredients; i += 1) {
      itens.push(getRecipe[`strIngredient${i}`]);
      itensMeasure.push(getRecipe[`strMeasure${i}`]);
    }
  }
  setIngredient(itens);
  setMeasure(itensMeasure);
};

function DrinkDetails() {
  const id = 178319;
  const indexo = 0;
  const getHistory = useHistory();
  const { location: { pathname } } = getHistory;
  const [getRecipe, setGetRecipe] = useState({});
  const [ingredient, setIngredient] = useState([]);
  const [measure, setMeasure] = useState([]);

  useEffect(() => {
    try {
      const urlFoods = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
      const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
      const fetchDetailsRecipe = async () => {
        console.log(getHistory);
        const goURL = (pathname.includes('comidas') ? urlFoods : urlDrinks);
        console.log(pathname);
        const request = await fetch(`${goURL}${id}`);
        const response = await request.json();
        const resolve = await response.drinks[0];
        console.log(resolve);
        setGetRecipe(resolve);
      };
      fetchDetailsRecipe();
    } catch (error) {
      console.log(error);
    }
  }, [id, getHistory, pathname, setGetRecipe]);

  useEffect(() => {
    listIgredientsAndMeasure(getRecipe, setIngredient, setMeasure);
  }, [getRecipe]);

  return (
    <div>
      <div>
        <img
          alt="foto da bebida"
          data-testid="recipe-photo"
          src={ getRecipe.strDrinkThumb }
          style={ { width: '10rem' } }
        />
      </div>
      <div>
        <h2 data-testid="recipe-title">{ getRecipe.strDrink }</h2>
        <button type="button" data-testid="share-btn">compartilhar</button>
        <button type="button" data-testid="favorite-btn">favorito</button>
        <p data-testid="recipe-category">
          { getRecipe
            .strCategory === 'Cocktail' ? getRecipe.strAlcoholic : getRecipe.strCategory }
        </p>
      </div>
      <section>
        <h4>Ingredients</h4>
        <ul>
          { ingredient.map((item, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${measure[index]} - ${item}` }
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h5>Preparation</h5>
        <p data-testid="instructions">{ getRecipe.strInstructions }</p>
      </section>
      <div>
        <span data-testid={ `${indexo}-recomendation-card` }>cards</span>
      </div>
      <div>
        <button
          className="button-details"
          type="button"
          data-testid="start-recipe-btn"
        >
          iniciar receita
        </button>
      </div>
    </div>
  );
}

export default DrinkDetails;
