import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MainContext from '../context/MainContext';
import CardDrink from './CardDrink';
import CardFood from './CardFood';
import genericFetchAPI from '../services/genericFetchAPI';

function IngredientRecipes() {
  const history = useHistory();
  const URL = history.location.pathname;

  const { ingredient } = useContext(MainContext);
  const [ingredientFoodList, setIngredientFoodList] = useState([]);
  const [ingredientDrinkList, setIngredientDrinkList] = useState([]);
  const [data, setData] = useState({});
  const maxList = 12;

  useEffect(() => {
    const resolveFood = () => {
      setIngredientFoodList(data.response.meals);
    };
    const resolveDrink = () => {
      setIngredientDrinkList(data.response.drinks);
    };

    const verifyPathname = () => {
      if (URL === '/comidas' && ingredient.length) {
        resolveFood();
      } else if (URL === '/bebidas' && ingredient.length) {
        resolveDrink();
      }
    };
    if (data.response) return verifyPathname();
  }, [URL, ingredient, data]);

  useEffect(() => {
    const resolveIngredientFood = async () => {
      const response = await genericFetchAPI('meal', 'filter', 'i', ingredient);
      setData({ response });
    };

    const resolveIngredientDrink = async () => {
      const response = await genericFetchAPI('cocktail', 'filter', 'i', ingredient);
      setData({ response });
    };

    if (URL === '/comidas' && ingredient.length) {
      resolveIngredientFood();
    } else if (URL === '/bebidas' && ingredient) {
      resolveIngredientDrink();
    }
  }, [URL, ingredient]);

  return (
    <div>
      {
        ingredientFoodList.map((food, index) => {
          if (index < maxList) {
            return (<CardFood
              key={ index }
              meal={ food }
              i={ index }
            />);
          } return null;
        })
      }
      {
        ingredientDrinkList.map((drink, index) => {
          if (index < maxList) {
            return (<CardDrink
              data-testid="0-recipe-card"
              key={ index }
              drink={ drink }
              i={ index }
            />);
          } return null;
        })
      }
    </div>
  );
}

export default IngredientRecipes;
