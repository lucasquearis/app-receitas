<<<<<<< HEAD
import React, { useState, useEffect, useContext } from 'react';
=======
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
>>>>>>> 5afb1f9d77102de9c42d7104e85e64f8651ab182
import IngredientsCard from '../components/IngredientsCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';


function IngredientsExploreDrink() {
  const [drinkIngredients, setDrinkIngredients] = useState([]);
<<<<<<< HEAD
  const MAX_INGREDIENTS = 12;
  const { API } = useContext(RecipesContext);
  const { push, location: { pathname } } = useHistory();
  console.log(pathname)
  const [path, setPath] = useState('');

  const handleClick = (item) => {
    push(`/bebidas?search${item}&ingredient=i`);
  }
=======
  const min = 0;
  const max = 12;
>>>>>>> 5afb1f9d77102de9c42d7104e85e64f8651ab182

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
<<<<<<< HEAD
      {drinkIngredients
        .filter((_e, maxIngredient) => maxIngredient < MAX_INGREDIENTS)
        .map((ingredient, index) => (
          <Link ingredient={ ingredient.strIngredient1 } onClick={ () => handleClick(ingredient.strIngredient1) }>
            <IngredientsCard
              index={ index }
              key={ index }
              src={ drinkImage(ingredient.strIngredient1) }
              name={ ingredient.strIngredient1 }
              />
=======
      {drinkIngredients.slice(min, max)
        .map(({ strIngredient1: ingredient }, index) => (
          <Link key={ index } to={ { pathname: '/bebidas', state: { ingredient } } }>
            <IngredientsCard
              index={ index }
              src={ drinkImage(ingredient) }
              name={ ingredient }
            />
>>>>>>> 5afb1f9d77102de9c42d7104e85e64f8651ab182
          </Link>
        ))}
      <Footer />
    </div>
  );
}

export default IngredientsExploreDrink;
