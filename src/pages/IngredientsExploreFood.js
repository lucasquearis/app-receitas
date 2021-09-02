import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import IngredientsCard from '../components/IngredientsCard';

import Footer from '../components/Footer';

function IngredientsExploreFood() {
  const [foodIngredients, setFoodIngredients] = useState([]);
  const min = 0;
  const max = 12;

  useEffect(() => {
    const listIngredients = async () => {
      try {
        const apiIngredientes = await fetch(
          'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
        );
        const { meals } = await apiIngredientes.json();
        setFoodIngredients(meals);
      } catch (error) {
        console.log(error);
      }
    };
    listIngredients();
  }, []);

  const foodImage = (name) => `https://www.themealdb.com/images/ingredients/${name}-Small.png`;

  return (
    <div>
      <Header title="Explorar Ingredientes das Comidas" />
      <div className="image-div">
        {foodIngredients.slice(min, max)
          .map(({ strIngredient: ingredient }, index) => (
            <Link key={ index } to={ { pathname: '/comidas', state: { ingredient } } }>
              <IngredientsCard
                index={ index }
                src={ foodImage(ingredient) }
                name={ ingredient }
              />
            </Link>
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default IngredientsExploreFood;
