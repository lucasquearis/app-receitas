import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import Button from '../components/Button';
import shareIcon from '../images/shareIcon.svg';
import '../styles/ReceitasFeitas.css';

function ReceitasFeitas() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [filteredRecipes, setFilteredRecipes] = useState(doneRecipes || []);
  const [linkShare, setLinkShare] = useState(false);

  const handleClickFilteredRecipes = (type) => {
    if (type) {
      const recipes = doneRecipes.filter((recipe) => recipe.type === type);
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(doneRecipes);
    }
  };

  const renderCardDetails = (recipe, index, path) => (
    <div className="d-flex flex-column ml-1">
      <div
        data-testid={ `${index}-horizontal-top-text` }
        className="copy-link-container mb-1"
      >
        { recipe.category === 'Cocktail'
          ? recipe.alcoholicOrNot : `${recipe.area} - ${recipe.category}` }
        <button
          onClick={ () => {
            copy(`http://localhost:3000${path}`);
            setLinkShare(true);
          } }
          type="button"
        >
          <img
            src={ shareIcon }
            alt="imagem de compartilhar"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        { linkShare && 'Link copiado!' }
      </div>
      <Link
        data-testid={ `${index}-horizontal-name` }
        to={ path }
        className="recipe-done-name"
      >
        { recipe.name }
      </Link>
      <p
        data-testid={ `${index}-horizontal-done-date` }
        className="date-recipes-done"
      >
        {`Data feita: ${recipe.doneDate}`}
      </p>
      <div
        className="tag-container d-flex flex-row justify-content-around"
      >
        {recipe.tags.map((tag) => (
          <p
            key={ tag }
            data-testid={ `${index}-${tag}-horizontal-tag` }
            className="mt-0 mb-1 tag-recipe-done"
          >
            { tag }
          </p>
        ))}
      </div>
    </div>
  );

  const renderCards = () => (
    <div className="d-flex flex-column align-itens-center">
      { filteredRecipes.map((recipe, index) => {
        const pathToRecipe = recipe.type === 'comida'
          ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}`;
        return (
          <div
            key={ recipe.name }
            className="card-container mb-3"
          >
            <Link className="w-50" to={ pathToRecipe }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
            </Link>
            { renderCardDetails(recipe, index, pathToRecipe) }
          </div>
        );
      }) }
    </div>
  );

  return (
    <>
      <Header title="Receitas Feitas" renderSearch={ false } />
      <main>
        <div className="d-flex justify-content-around w-100 my-3">
          <Button
            text="All"
            onClick={ () => handleClickFilteredRecipes() }
            testId="filter-by-all-btn"
            className="btn btn-info px-4"
          />
          <Button
            text="Food"
            onClick={ () => handleClickFilteredRecipes('comida') }
            testId="filter-by-food-btn"
            className="btn btn-info px-3"
          />
          <Button
            text="Drinks"
            onClick={ () => handleClickFilteredRecipes('bebida') }
            testId="filter-by-drink-btn"
            className="btn btn-info"
          />
        </div>
        { filteredRecipes.length > 0 && renderCards() }
      </main>
    </>
  );
}

export default ReceitasFeitas;
