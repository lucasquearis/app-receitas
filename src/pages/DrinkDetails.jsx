import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Details.css';
import RecomendationsFoods from '../components/RecomendationsFoods';
import ButtonDrinks from '../components/ButtonDrinks';
import ShareButton from '../components/ShareButton';
import FavoriteButtonDrinks from '../components/FavoriteButtonDrinks';

const listIgredientsAndMeasure = (getRecipe, setIngredient, setMeasure) => {
  const lenghtIndredients = 20;
  const itens = [];
  const itensMeasure = [];
  if (getRecipe) {
    for (let i = 1; i < lenghtIndredients; i += 1) {
      itens.push(getRecipe[`strIngredient${i}`]);
      itensMeasure.push(getRecipe[`strMeasure${i}`]);
    }
  }
  setIngredient(itens.filter((it) => it !== null && it !== undefined && it.length >= 1));
  setMeasure(itensMeasure);
};

function DrinkDetails() {
  const { pathname } = useLocation();
  const id = pathname.replace(/([^\d])+/gim, '');
  const [getRecipe, setGetRecipe] = useState({});
  const [ingredient, setIngredient] = useState([]);
  const [measure, setMeasure] = useState([]);

  useEffect(() => {
    try {
      const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
      const fetchDetailsRecipe = async () => {
        const request = await fetch(`${urlDrinks}${id}`);
        const response = await request.json();
        const resolve = await response.drinks[0];
        setGetRecipe(resolve);
      };
      fetchDetailsRecipe();
    } catch (error) {
      console.log(error);
    }
  }, [id, setGetRecipe]);

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
        <div className="icons">
          <ShareButton />
          <FavoriteButtonDrinks />
          {/* <button type="button" onClick={ favorited }>
            <img
              src={ favorite ? blackHeartIcon : whiteHeartIcon }
              data-testid="favorite-btn"
              alt="botão de favorito"
            />
          </button> */}
        </div>
        <p data-testid="recipe-category">
          { getRecipe.strCategory === 'Cocktail'
            ? getRecipe.strAlcoholic : getRecipe.strCategory }
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
      <div className="recomendations">
        <RecomendationsFoods />
      </div>
      <div>
        <ButtonDrinks />
      </div>
    </div>
  );
}

export default DrinkDetails;
