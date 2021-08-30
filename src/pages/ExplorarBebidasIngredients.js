import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Header, FooterMenu } from '../components';
import AppContext from '../context/AppContext';
import * as API from '../services';
import '../styles/recipeCard.css';

export default function ExplorarBebidasIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [shouldRedirect, setRedirect] = useState(false);
  const { setRecipeList } = useContext(AppContext);
  const TWELVE = 12;

  useEffect(() => {
    const getIngredients = async () => {
      const ing = await API.fetchIngredients('bebidas');
      const ingredientes = ing.drinks;
      const ingrs = [];
      ingredientes.forEach((item) => {
        Object.keys(item).forEach((key) => {
          ingrs.push(item[key]);
        });
      });
      await setIngredients(ingrs);
    };
    getIngredients();
  }, []);

  const getFiltererdReceipes = async ({ target }) => {
    const results = await API.fetchAPIFilter('Bebidas', 'ingredient', target.name);
    setRecipeList(results);
    setRedirect(true);
  };

  if (shouldRedirect) return <Redirect to="/bebidas" />;
  return (
    <div>
      <Header title="Explorar Ingredientes" showSearchIcon={ false } />
      {ingredients && ingredients.slice(0, TWELVE).map((item, i) => (
        <button name={ item } type="button" key={ i } onClick={ getFiltererdReceipes }>
          <div
            name={ item }
            data-testid={ `${i}-ingredient-card` }
            className="recipe-card"
          >
            <img
              data-testid={ `${i}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${item}-Small.png` }
              name={ item }
              alt="no pic"
            />
            <p name={ item } data-testid={ `${i}-card-name` }>{item}</p>
          </div>
        </button>
      ))}
      <FooterMenu />
    </div>
  );
}
