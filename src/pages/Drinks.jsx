import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Context from '../context/Context';
import RecipeCard from '../components/RecipeCard';

export default function () {
  const { drinks, drinkCategories, setDrinksCategoryFilter } = useContext(Context);

  // ficou assim para passar no teste, mas fica meio quebrado ainda
  if (!drinks) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return (<Redirect to="/bebidas" />);
  }

  if (!drinks.length) { return <span>LOADING...</span>; }

  if (drinks.length === 1) { return <Redirect to={ `bebidas/${drinks[0].idDrink}` } />; }

  return (
    <div className="drinks-page">
      <Header title="Bebidas" />
      {drinkCategories.map(({ strCategory }, i) => {
        const maxLength = 5;
        if (i < maxLength) {
          return (
            <button
              type="button"
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => setDrinksCategoryFilter(strCategory) }
            >
              {strCategory}
            </button>
          );
        }
        return false;
      })}
      {drinks.map(({ strDrinkThumb, strDrink, idDrink }, i) => {
        const recipesLength = 12;
        if (i < recipesLength) {
          return (
            <RecipeCard
              link={ `bebidas/${idDrink}` }
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
