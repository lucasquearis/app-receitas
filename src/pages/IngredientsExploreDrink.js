import React, { useState, useEffect, useContext } from 'react';
import IngredientsCard from '../components/IngredientsCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';


function IngredientsExploreDrink() {
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const MAX_INGREDIENTS = 12;
  const { API } = useContext(RecipesContext);
  const { push, location: { pathname } } = useHistory();
  console.log(pathname)
  const [path, setPath] = useState('');

  const handleClick = () => {
    setPath('')
    // push(`/bebidas`);
  }
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
          <Link ingredient={ ingredient.strIngredient1 } onClick={ handleClick }>
            <IngredientsCard
              index={ index }
              key={ index }
              src={ drinkImage(ingredient.strIngredient1) }
              name={ ingredient.strIngredient1 }
              />
          </Link>
        ))}
      <Footer />
    </div>
  );
}

export default IngredientsExploreDrink;
