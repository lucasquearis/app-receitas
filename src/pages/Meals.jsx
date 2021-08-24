import React, { useContext } from 'react';
import Header from '../components/Header';
import Context from '../context/Context';
import RecipeCard from '../components/RecipeCard';

export default function () {
  const { meals } = useContext(Context);
  if (!meals.length) { return <span>LOADING...</span>; }

  return (
    <div className="foods-page">
      <Header title="Comidas" />
      {meals.map(({ strMealThumb, strMeal }, i) => {
        const mealLength = 12;
        if (i < mealLength) {
          return (
            <RecipeCard
              key={ i }
              id={ i }
              thumb={ strMealThumb }
              name={ strMeal }
            />);
        }
        return false;
      })}
    </div>
  );
}
