import React, { useEffect, useContext, useState } from 'react';
import '../styles/RecipesDone.css';
import Header from '../components/Header';
import Context from '../context/Context';
import NoRecipesDone from '../components/NoRecipesDone';
import RenderFood from '../components/RenderFood';
import RenderDrink from '../components/RenderDrink';

export default function RecipesDone() {
  const { recipesDone, setRecipesDone } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const doneRecipes = 'doneRecipes';
    const recipeArray = [
      {
        id: '52771',
        type: 'comida',
        area: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'bebida',
        area: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '23/06/2020',
        tags: [],
      },
    ];
    localStorage.setItem(doneRecipes, JSON.stringify(recipeArray));
    const storage = JSON.parse(localStorage.getItem(doneRecipes));
    if (!storage) localStorage.setItem('doneRecipes', JSON.stringify(recipesDone));
    else setRecipesDone(storage);
    setIsLoading(false);
  }, []);

  function recipesChecker() {
    if (!recipesDone.length) return <NoRecipesDone />;
    return recipesDone.map(
      (recipe, index) => (recipe.type === 'comida'
        ? <RenderFood key={ index } index={ index } recipe={ recipe } />
        : <RenderDrink key={ index } index={ index } recipe={ recipe } />),
    );
  }

  return (
    <main>
      <header>
        <Header title="Receitas Feitas" />
      </header>
      <div className="button-wrapper">
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      {
        isLoading ? <p>carregando</p> : recipesChecker()
      }
    </main>
  );
}
