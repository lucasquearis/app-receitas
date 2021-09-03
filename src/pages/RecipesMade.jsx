import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import DoneCard from '../components/DoneCard';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function RecipesMade() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [recipesList, setRecipesList] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    setRecipesList(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  const handleAllClick = () => {
    if (doneRecipes) return setRecipesList(doneRecipes);
  };

  const handleFoodClick = () => {
    if (doneRecipes) {
      setRecipesList(doneRecipes.filter((recipe) => recipe.type === 'comida'));
    }
  };

  const handleDrinkClick = () => {
    if (doneRecipes) {
      setRecipesList(doneRecipes.filter((recipe) => recipe.type === 'bebida'));
    }
  };

  const renderFilterButtons = () => (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => handleAllClick() }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => handleFoodClick() }
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleDrinkClick() }
      >
        Drinks
      </button>
    </div>
  );

  const handleClick = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopied(true);
  };

  const renderDoneCards = () => (
    <div>
      <ul>
        {recipesList.map((recipe, index) => (
          <li key={ recipe.id }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <DoneCard
                title={ recipe.name }
                thumb={ recipe.image }
                index={ index }
                area={ recipe.area }
                alcoholicOrNot={ recipe.alcoholicOrNot }
                category={ recipe.category }
              />
              <span
                data-testid={ `${index}-horizontal-done-date` }
              >
                { `Feito em: ${recipe.doneDate}` }
              </span>
              {recipe.tags.map((tag) => (
                <span
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {`${tag} - ${tag}`}
                </span>
              ))}
            </Link>
            <div>
              <button
                type="button"
                onClick={ () => handleClick(recipe.type, recipe.id) }
                src={ shareIcon }
                data-testid={ `${index}-horizontal-share-btn` }
              >
                <img
                  className="share-image"
                  type="image/svg+xml"
                  src={ shareIcon }
                  data-testid="share-btn"
                  alt="Compartilhar"
                />
              </button>
              {copied && <p>Link copiado!</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <Header brand="Receitas Feitas" />
      {renderFilterButtons()}
      { !recipesList && <span>Nenhuma Receita Feita</span> }
      {recipesList && renderDoneCards()}
    </div>
  );
}

export default RecipesMade;
