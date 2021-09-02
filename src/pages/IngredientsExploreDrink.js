import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IngredientsCard from '../components/IngredientsCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

function IngredientsExploreDrink() {
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const min = 0;
  const max = 12;

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
      <div className="image-div">
        {drinkIngredients.slice(min, max)
          .map(({ strIngredient1: ingredient }, index) => (
            <Link key={ index } to={ { pathname: '/bebidas', state: { ingredient } } }>
              <IngredientsCard
                index={ index }
                src={ drinkImage(ingredient) }
                name={ ingredient }
              />
            </Link>
          ))}
        </div>
      <Footer />
    </div>
  );
}

export default IngredientsExploreDrink;
