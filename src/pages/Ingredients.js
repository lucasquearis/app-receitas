import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const maxLength = 12;

  const [pathname] = useState(() => {
    if (window.location.href.includes('bebidas')) return 'bebidas';
    if (window.location.href.includes('comidas')) return 'comidas';
  });

  useEffect(() => {
    if (pathname === 'comidas') {
      fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
        .then((r) => r.json()
          .then((data) => setIngredients(data.meals
            .filter((__, index) => index < maxLength))));
    } else {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
        .then((r) => r.json()
          .then((data) => setIngredients(data.drinks
            .filter((__, index) => index < maxLength))));
    }
  }, [pathname]);

  return (
    <div>
      <Header title="Explorar Ingredientes" showRender={ false } />
      { ingredients.length && ingredients.map((ingredient, index) => (
        <IngredientCard
          ingredient={ ingredient }
          index={ index }
          type={ pathname }
          key={ index }
        />
      )) }
      <Footer />
    </div>
  );
}

export default Ingredients;
