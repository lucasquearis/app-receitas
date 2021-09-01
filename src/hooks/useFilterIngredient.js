import { useEffect, useContext, useState } from 'react';
import AppContext from '../Context/AppContext';

const useFilterIngredient = () => {
  const [itemsByIngredient, setItemsByIngredient] = useState([]);
  const { globalState } = useContext(AppContext);
  const { foodOrDrink, ingredientFilter } = globalState;

  useEffect(() => {
    const numCards = 12;
    let itemsFiltered = [];
    if (ingredientFilter !== '') {
      if (foodOrDrink === 'food') {
        const api = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
        const result = async () => {
          const data = await fetch(`${api}${ingredientFilter}`)
            .then((response) => response.json());
          itemsFiltered = data.meals;
          itemsFiltered = itemsFiltered.slice(0, numCards);
          setItemsByIngredient(itemsFiltered);
        };
        result();
      }
      if (foodOrDrink === 'drink') {
        const api = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
        const result = async () => {
          const data = await fetch(`${api}${ingredientFilter}`)
            .then((response) => response.json());
          itemsFiltered = data.drinks;
          itemsFiltered = itemsFiltered.slice(0, numCards);
          setItemsByIngredient(itemsFiltered);
        };
        result();
      }
    }
  }, [ingredientFilter, foodOrDrink]);
  return { itemsByIngredient, setItemsByIngredient };
};

export default useFilterIngredient;
