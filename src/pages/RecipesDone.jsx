import React, { useEffect, useContext } from 'react';
import '../styles/RecipesDone.css';
import Header from '../components/Header';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import NoRecipesDone from '../components/NoRecipesDone';

export default function RecipesDone() {
  const { recipesDone, setRecipesDone } = useContext(Context);
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('doneRecips'));
    if (!storage) localStorage.setItem('doneRecipes', JSON.stringify(recipesDone));
    else setRecipesDone(storage);
  }, [recipesDone, setRecipesDone]);
  return (
    <main>
      <header>
        <Header title="Receitas Feitas" />
      </header>
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      {
        !recipesDone.length ? <NoRecipesDone />
          : recipesDone.map((recipe) => (
            <section key={ recipe.name }>
              <img
                alt="imagem da receita"
                data-testid={ `${0}-horizontal-image` }
                src={ recipe.image }
              />
              <p data-testid={ `${0}-horizontal-top-text` }>{ recipe.category }</p>
              <h1 data-testid={ `${0}-horizontal-name` }>{ recipe.name }</h1>
              <p data-testid={ `${0}-horizontal-done-date` }>{ recipe.doneDate }</p>
              <button
                type="button"
                data-testid={ `${0}-horizontal-share-btn` }
              >
                <img
                  alt="ícone de compartilhar"
                  src={ shareIcon }
                />
              </button>
              {
                recipe.tags.map((tag) => (
                  <p key={ tag } data-testid={ `${0}-${1}-horizontal-tag` }>{ tag }</p>
                ))
              }
            </section>
          ))
      }
    </main>
  );
}
