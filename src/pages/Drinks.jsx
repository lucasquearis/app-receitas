import React, { useContext } from 'react';
import Header from '../components/Header';
import Context from '../context/Context';
import RecipeCard from '../components/RecipeCard';

export default function () {
  const { drinks } = useContext(Context);
  if (!drinks.length) { return <span>LOADING...</span>; }

  return (
    <div className="drinks-page">
      <Header title="Bebidas" />
      {drinks.map(({ strDrinkThumb, strDrink }, i) => {
        const recipesLength = 12;
        if (i < recipesLength) {
          return (
            <RecipeCard
              key={ i }
              id={ i }
              thumb={ strDrinkThumb }
              name={ strDrink }
            />);
        }
        return false;
      })}
    </div>
  );
}
