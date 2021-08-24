import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Context from '../context/Context';
import RecipeCard from '../components/RecipeCard';

export default function () {
  const { meals } = useContext(Context);

  // ficou assim para passar no teste, mas fica meio quebrado ainda
  if (!meals) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return (<Redirect to="/comidas" />);
  }
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
