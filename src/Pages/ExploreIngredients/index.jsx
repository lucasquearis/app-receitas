import React, { useContext, useEffect, useState } from 'react';
import './style.css';

import { useHistory } from 'react-router-dom';
import Header from '../../Components/Header';
import IngredientCard from '../../Components/IngredientCard';
import BottomMenu from '../../Components/Footer/BottomMenu';
import { ContextApp } from '../../Context/ContextApp';
import fetchApi from '../../Helpers/fetchApi';

function ExploreIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();
  const { location: { pathname } } = history;
  const currentRout = pathname.includes('comidas');
  const url = currentRout === true ? 'https://www.themealdb.com/api/json/v1/1/' : 'https://www.thecocktaildb.com/api/json/v1/1/';

  const { searchRecipes } = useContext(ContextApp);

  useEffect(() => {
    const maxIngredients = 12;
    const getIngredients = async (route) => {
      if (route.includes('comidas')) {
        const response = await fetchApi('https://www.themealdb.com/api/json/v1/1/', 'list.php?i=list');
        const allIngredients = [];
        response.meals.splice(0, maxIngredients).map(async (current) => {
          const ingredient = {
            name: current.strIngredient,
            image: `https://www.themealdb.com/images/ingredients/${current.strIngredient}-Small.png`,
          };
          return allIngredients.push(ingredient);
        });
        return setIngredients(allIngredients);
      }
      const response = await fetchApi('https://www.thecocktaildb.com/api/json/v1/1/', 'list.php?i=list');
      const allIngredients = [];
      response.drinks.splice(0, maxIngredients).map(async (current) => {
        const ingredient = {
          name: current.strIngredient1,
          image: `https://www.thecocktaildb.com/images/ingredients/${current.strIngredient1}-Small.png`,
        };
        return allIngredients.push(ingredient);
      });
      return setIngredients(allIngredients);
    };
    getIngredients(pathname);
  }, [pathname]);

  return (
    <div>
      <Header
        title="Explorar Ingredientes"
        searchButton={ false }
      />
      <div className="ingredients-container">
        {ingredients.map((current, index) => (
          <IngredientCard
            key={ index }
            image={ current.image }
            name={ current.name }
            index={ index }
            handleClick={ () => {
              const previousSearch = {
                type: 'ingredient',
                input: current.name,
              };
              searchRecipes(previousSearch, currentRout, url, history);
              history.push(currentRout === true ? '/comidas' : '/bebidas');
            } }
          />
        ))}
      </div>
      <BottomMenu />
    </div>
  );
}

export default ExploreIngredients;
