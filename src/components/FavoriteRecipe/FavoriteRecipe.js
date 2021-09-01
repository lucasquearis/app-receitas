import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import RenderRecipes from './RenderRecipes';

const FavoriteRecipe = () => {
  const [copied, setCopied] = useState('');
  const [recipes, setRecipes] = useState('');
  const [filter, setFilter] = useState();

  useEffect(() => {
    const getFavoriteRecipes = () => {
      const savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setRecipes(savedRecipes);
    };
    getFavoriteRecipes();
  }, []);

  const copyLink = ({ target }) => {
    const labelButton = target.parentNode;
    const sectionButtons = labelButton.parentNode;
    const divRecipe = sectionButtons.parentNode;
    const pNameRecipe = divRecipe.children[2];
    const nameRecipe = pNameRecipe.innerText;

    const newSavedRecipes = recipes.filter((recipe) => recipe.name === nameRecipe);
    const { type, id } = newSavedRecipes[0];
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopied('Link copiado!');
  };

  const unfavoriteRecipe = ({ target }) => {
    const sectionButtons = target.parentNode;
    const divRecipe = sectionButtons.parentNode;
    const pNameRecipe = divRecipe.children[2];
    const nameRecipe = pNameRecipe.innerText;

    const newSavedRecipes = recipes.filter((recipe) => recipe.name !== nameRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newSavedRecipes));
    setRecipes(newSavedRecipes);
  };

  const filterByFood = () => {
    const foodFilter = recipes.filter(({ type }) => type === 'comida');
    setFilter(foodFilter);
  };

  const filterByDrink = () => {
    const drinkFilter = recipes.filter(({ type }) => type === 'bebida');
    setFilter(drinkFilter);
  };

  const noFilter = () => {
    setFilter(undefined);
  };

  if (filter) {
    return (
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ noFilter }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ filterByFood }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ filterByDrink }
        >
          Drinks
        </button>
        <RenderRecipes
          array={ filter }
          copied={ copied }
          copyLink={ copyLink }
          unfavoriteRecipe={ unfavoriteRecipe }
        />
      </div>
    );
  }

  if (recipes) {
    return (
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ noFilter }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ filterByFood }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ filterByDrink }
        >
          Drinks
        </button>
        <RenderRecipes
          array={ recipes }
          copied={ copied }
          copyLink={ copyLink }
          unfavoriteRecipe={ unfavoriteRecipe }
        />
      </div>
    );
  }
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ noFilter }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ filterByFood }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterByDrink }
      >
        Drinks
      </button>
    </div>
  );
};

export default FavoriteRecipe;
