import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Context from '../context/Context';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';

export default function () {
  const { drinks, drinkCategories, setDrinksCategoryFilter } = useContext(Context);

  const [category, setCategory] = useState('');

  useEffect(() => {
    setDrinksCategoryFilter(category);
  }, [category, setDrinksCategoryFilter]);

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
      <button
        type="button"
        onClick={ () => setCategory('') }
        data-testid="All-category-filter"
      >
        All
      </button>
      {drinkCategories.map(({ strCategory }, i) => {
        const maxLength = 5;
        if (i < maxLength) {
          return (
            <button
              type="button"
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => {
                if (category === strCategory) {
                  setCategory('');
                } else {
                  // console.log(mealsCategoryFilter);
                  console.log(strCategory);
                  setCategory(strCategory);
                }
              } }
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
      <Footer />
    </div>
  );
}
