import React, { useState, useEffect } from 'react';
import IngredientsCard from '../components/IngredientsCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

function IngredientsExploreDrink() {
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const MAX_INGREDIENTS = 12;
  // const { pathname } = useLocation();
  // console.log('CAMINHO',pathname);

  useEffect(() => {
    const listIngredients = async () => {
      try {
        const apiIngredientes = await fetch(
          'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
        );
        const { drinks } = await apiIngredientes.json();
        setDrinkIngredients(drinks);
      } catch (error) {
        console.log(error);
      }
    };
    listIngredients();
  }, []);

  const drinkImage = (name) => `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`;

  return (
    <div>
      <Header title="Explorar Ingredientes das Bebidas" />
      {drinkIngredients
        .filter((_e, maxIngredient) => maxIngredient < MAX_INGREDIENTS)
        .map((ingredient, index) => (
          <IngredientsCard
            index={ index }
            key={ index }
            src={ drinkImage(ingredient.strIngredient1) }
            name={ ingredient.strIngredient1 }
          />
        ))}
      <Footer />
    </div>
  );
}

export default IngredientsExploreDrink;
