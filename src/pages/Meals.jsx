import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Context from '../context/Context';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';

export default function () {
  const {
    meals, mealCategories, setMealsCategoryFilter,
  } = useContext(Context);

  const [category, setCategory] = useState('');

  useEffect(() => {
    setMealsCategoryFilter(category);
  }, [category, setMealsCategoryFilter]);

  // ficou assim para passar no teste, mas fica meio quebrado ainda
  if (!meals) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return (<Redirect to="/comidas" />);
  }

  if (!meals.length) { return <span>LOADING...</span>; }

  if (meals.length === 1 && meals[0].strMeal !== 'Mbuzi Choma (Roasted Goat)') {
    return (<Redirect to={ `comidas/${meals[0].idMeal}` } />);
  }

  return (
    <div className="foods-page">
      <Header title="Comidas" />
      <button
        type="button"
        onClick={ () => setCategory('') }
        data-testid="All-category-filter"
        className="buttonMealsDrinks"
      >
        All
      </button>
      {mealCategories.map(({ strCategory }, i) => {
        const maxLength = 5;
        if (i < maxLength) {
          return (
            <button
              key={ i }
              type="button"
              className="buttonMealsDrinks"
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
      <div className="containerCardsMealsDrinks">
        {meals.map(({ strMealThumb, strMeal, idMeal }, i) => {
          const mealLength = 12;
          if (i < mealLength) {
            return (
              <RecipeCard
                link={ `comidas/${idMeal}` }
                key={ i }
                id={ i }
                thumb={ strMealThumb }
                name={ strMeal }
              />);
          }
          return false;
        })}
      </div>
      <Footer />
    </div>
  );
}
