import React, { useState, useEffect } from 'react';
import DoneRecipesCard from '../Components/DoneRecipeCard';
import shareIcon from '../images/shareIcon.svg';

// const doneRecipesMock = [
//   {
//     id: '52771',
//     type: 'comida',
//     area: 'Italian',
//     category: 'Vegetarian',
//     alcoholicOrNot: '',
//     name: 'Spicy Arrabiata Penne',
//     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//     doneDate: '23/06/2020',
//     tags: ['Pasta', 'Curry'],
//   },
//   {
//     id: '178319',
//     type: 'bebida',
//     area: '',
//     category: 'Cocktail',
//     alcoholicOrNot: 'Alcoholic',
//     name: 'Aquamarine',
//     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
//     doneDate: '23/06/2020',
//     tags: [],
//   },
// ];

// localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));

function DoneRecipes() {
  const [recipes, setRecipe] = useState([]);
  const [filterFood, setFilterFood] = useState([]);

  function getDoneRecipe() {
    if (localStorage.getItem('doneRecipes')) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      setRecipe(doneRecipes);
      setFilterFood(doneRecipes);
    }
  }

  useEffect(() => {
    getDoneRecipe();
  }, []);

  const foodFilterBtn = (filtro) => {
    setFilterFood(recipes.filter(({ type }) => type === filtro));
  };

  const titleTopText = (recipe) => {
    if (recipe.type === 'comida') {
      return `${recipe.area} - ${recipe.category}`;
    } return `${recipe.alcoholicOrNot}`;
  };

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilterFood(recipes) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => foodFilterBtn('comida') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => foodFilterBtn('bebida') }

      >
        Drinks
      </button>
      {
        filterFood.map((recipe, index) => (
          <DoneRecipesCard
            index={ index }
            key={ recipe.id }
            id={ recipe.id }
            IDimg={ `${index}-horizontal-image` }
            IDtopText={ `${index}-horizontal-top-text` }
            IDnameRecipe={ `${index}-horizontal-name` }
            IDdoneDate={ `${index}-horizontal-done-date` }
            IDshareBtn={ `${index}-horizontal-share-btn` }
            IDtag={ recipe.tags }
            thumbnail={ recipe.image }
            titleImg={ recipe.name }
            thumbnailIcon={ shareIcon }
            titleTopText={ titleTopText(recipe) }
            titleNameRecipe={ recipe.name }
            titleDoneDate={ recipe.doneDate }
            titleTag={ recipe.tags }
          />
        ))
      }
    </div>
  );
}

export default DoneRecipes;
