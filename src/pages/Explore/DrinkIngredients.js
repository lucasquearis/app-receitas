import React, { useContext, useEffect } from 'react';
import MenuInferior from '../../components/MenuInferior';
import Header from '../../components/Header';
import Context from '../../context/Context';
import IngredientCard from '../../components/IngredientCard';

export default function DrinkIngredients() {
  const {
    drinkIngredients: { list, loading },
    requestDrinkIngredients,
  } = useContext(Context);
  useEffect(() => {
    if (loading) {
      requestDrinkIngredients();
    }
  });

  const ingredients = [];
  const maxIngredients = 12;
  for (let index = 0; index < maxIngredients; index += 1) {
    if (!loading) {
      ingredients.push(list.drinks[index]);
    }
  }

  const showIngredients = () => (
    <div>
      { ingredients.map((ingredient, index) => (
        <IngredientCard
          ingredient={ ingredient }
          key={ index }
          index={ index }
          type="cocktail"
        />
      ))}
    </div>
  );
  return (
    <div>
      <Header
        name="Explorar Ingredientes"
        title="Explorar Ingredientes"
        search={ false }
      />
      { showIngredients() }
      <MenuInferior />
    </div>
  );
}
