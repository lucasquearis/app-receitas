import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Header, FooterMenu } from '../components';
import AppContext from '../context/AppContext';
import * as API from '../services';
import '../styles/recipeCard.css';

export default function ExplorarIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [shouldRedirect, setRedirect] = useState(false);
  const { setRecipeList, setFrom } = useContext(AppContext);
  const TWELVE = 12;
  const { location: { pathname } } = useHistory();
  const typeOfRecipe = pathname.match(/comidas|bebidas/)[0];
  const urlImg = (type, item) => (
    `https://www.${type === 'comidas' ? 'themealdb' : 'thecocktaildb'}.com/images/ingredients/${item}-Small.png`
  );

  useEffect(() => {
    const getIngredients = async () => {
      const ing = await API.fetchIngredients(typeOfRecipe);
      const ingredientes = ing.meals || ing.drinks;
      const ingrs = [];
      ingredientes.forEach((item) => {
        Object.keys(item).forEach((key) => {
          if (/strIngredient|strIngredient1/.test(key)
          && item[key] !== null) {
            ingrs.push(item[key]);
          }
        });
      });
      await setIngredients(ingrs);
    };
    getIngredients();
  }, [typeOfRecipe]);

  const title = () => typeOfRecipe.charAt(0).toUpperCase() + typeOfRecipe.slice(1);

  const getFiltererdReceipes = async ({ target }) => {
    const name = target.name || target.parentNode.name;
    const type = title();
    const results = await API.fetchAPIFilter(type, 'ingredient', name);
    setRecipeList(results);
    setFrom(true);
    setRedirect(true);
  };

  if (shouldRedirect) return <Redirect to={ `/${typeOfRecipe}` } />;

  return (
    <div>
      <Header title="Explorar Ingredientes" showSearchIcon={ false } />
      {ingredients && ingredients.slice(0, TWELVE).map((item, i) => (
        <button
          name={ item }
          type="button"
          key={ i }
          onClick={ getFiltererdReceipes }
          data-testid={ `${i}-ingredient-card` }
          className="recipe-card"
        >
          <img
            data-testid={ `${i}-card-img` }
            src={ urlImg(typeOfRecipe, item) }
            name={ item }
            alt="no pic"
          />
          <p name={ item } data-testid={ `${i}-card-name` }>{item}</p>
        </button>
      ))}
      <FooterMenu />
    </div>
  );
}
