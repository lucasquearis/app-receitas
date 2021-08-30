import React from 'react';
import { useSelector } from 'react-redux';
import Card from './CardItems';
import useIngredients from '../hooks/useIngredients';

export default function Ingredients() {
  const { pageObjName, setIngredient } = useIngredients();
  const ingredients = useSelector((state) => state.recipes.ingredients);

  const generateThumb = (ingredient) => {
    if (pageObjName === 'meals') {
      return `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`;
    }
    return `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png`;
  };

  const generateTitle = (ingredient) => {
    if (pageObjName === 'meals') {
      return ingredient.strIngredient;
    }
    return ingredient.strIngredient1;
  };

  const handleClickCard = (ingredient) => {
    setIngredient(generateTitle(ingredient));
  };

  return (
    <div>
      {
        ingredients.map((ingredient, index) => (
          <Card
            key={ index }
            title={ generateTitle(ingredient) }
            thumb={ generateThumb(ingredient) }
            type="ingredient"
            onClick={ () => handleClickCard(ingredient) }
            index={ index }
          />
        ))
      }
    </div>
  );
}
