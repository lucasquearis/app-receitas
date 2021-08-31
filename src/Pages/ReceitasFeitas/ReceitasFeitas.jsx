import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import shareIcon from '../../images/shareIcon.svg';
import Btn from '../../Components/Btn';

function ReceitasFeitas() {
  const recipeStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [doneRecipes, setDoneRecipes] = useState(recipeStorage);
  const [copied, setCopied] = useState(false);

  const allButtonProps = {
    name: 'All',
    'data-testid': 'filter-by-all-btn',
    type: 'button',
    variant: 'contained',
    onClick: () => setDoneRecipes(recipeStorage),
  };

  const foodButtonProps = {
    name: 'Food',
    'data-testid': 'filter-by-food-btn',
    type: 'button',
    variant: 'contained',
    onClick: () => setDoneRecipes(recipeStorage
      .filter((recipes) => recipes.type === 'comida')),
  };

  const drinksButtonProps = {
    name: 'Drinks',
    'data-testid': 'filter-by-drink-btn',
    type: 'button',
    variant: 'contained',
    onClick: () => setDoneRecipes(recipeStorage
      .filter((recipes) => recipes.type === 'bebida')),
  };

  return (
    <div>
      <Header
        title="Receitas Feitas"
        searchButton={ false }
      />
      <div>
        <Btn { ...allButtonProps } />
      </div>
      <div>
        <Btn { ...foodButtonProps } />
      </div>
      <div>
        <Btn { ...drinksButtonProps } />
      </div>
      <div>
        {
          doneRecipes.map((recipe, index) => (
            <div key={ index }>
              {recipe.type === 'bebida' ? (
                <div>
                  <Link
                    to={ `/bebidas/${recipe.id}` }
                  >
                    <img
                      width="250px"
                      data-testid={ `${index}-horizontal-image` }
                      alt={ recipe.name }
                      src={ recipe.image }
                    />
                  </Link>
                  <Link to={ `/bebidas/${recipe.id}` }>
                    <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
                  </Link>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { recipe.alcoholicOrNot }
                  </p>
                  <p data-testid={ `${index}-horizontal-done-date` }>
                    Feito em:
                    { recipe.doneDate }
                  </p>
                  <button
                    type="button"
                    onClick={ () => {
                      clipboardCopy(`http://localhost:3000/bebidas/${recipe.id}`);
                      setCopied(true);
                    } }
                  >
                    { copied ? <span>Link copiado!</span> : <img
                      src={ shareIcon }
                      alt="compartilhar"
                      data-testid={ `${index}-horizontal-share-btn` }
                    /> }
                  </button>
                </div>
              ) : (
                <div key={ index }>
                  <Link
                    to={ `/comidas/${recipe.id}` }
                  >
                    <img
                      width="250px"
                      data-testid={ `${index}-horizontal-image` }
                      alt={ recipe.name }
                      src={ recipe.image }
                    />
                  </Link>
                  <Link to={ `/comidas/${recipe.id}` }>
                    <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
                  </Link>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { `${recipe.area} - ${recipe.category}` }
                  </p>
                  <p data-testid={ `${index}-horizontal-done-date` }>
                    Feito em:
                    { recipe.doneDate }
                  </p>
                  <button
                    type="button"
                    onClick={ () => {
                      clipboardCopy(`http://localhost:3000/comidas/${recipe.id}`);
                      setCopied(true);
                    } }
                  >
                    { copied ? <span>Link copiado!</span> : <img
                      src={ shareIcon }
                      alt="compartilhar"
                      data-testid={ `${index}-horizontal-share-btn` }
                    /> }
                  </button>
                  {
                    recipe.tags.map((tag, idx) => (
                      <p
                        key={ idx }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        { tag }
                      </p>
                    ))
                  }
                </div>
              ) }
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default ReceitasFeitas;
