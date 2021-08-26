import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import shareIcon from '../images/shareIcon.svg';

function ReceitasFeitas() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [filteredRecipes, setFilteredRecipes] = useState(doneRecipes);
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
    <div>
      <div>
        { recipe.category === 'Cocktail' ? recipe.Alcoholic : recipe.category }
        <button
          onClick={ () => {
            // copy(`http://localhost:3000${location.pathname}`);
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
      <Link data-testid={ `${index}-horizontal-name` } to={ path }>
        { recipe.name }
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>
        {`Data feita: ${recipe.doneDate}`}
      </p>
      <div className="tag-container">
        {recipe.tags.map((tag) => (
          <p data-testid={ `${index}-${tag}-horizontal-tag` }>
            { tag }
          </p>
        ))}
      </div>
    </div>
  );

  const renderCards = () => (
    <div>
      { filteredRecipes.map((recipe, index) => {
        const pathToRecipe = recipe.type === 'comida' ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}`;
        return (
        <div
          key={ recipe.name }
          className="card-container"
        >
          <Link to={ pathToRecipe }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />  
          </Link>
          { renderCardDetails(recipe, index, pathToRecipe) }
        </div>
      );})}
    </div>
  );

  console.log(filteredRecipes);

  return (
    <div>
      <Header title="Receitas Feitas" renderSearch={ false } />
      <main>
        <div className="button-container">
          <Button
            text="All"
            onClick={ () => handleClickFilteredRecipes() }
            testId="filter-by-all-btn"
          />
          <Button
            text="Food"
            onClick={ () => handleClickFilteredRecipes('comida') }
            testId="filter-by-food-btn"
          />
          <Button
            text="Drinks"
            onClick={ () => handleClickFilteredRecipes('bebida') }
            testId="filter-by-drink-btn"
          />
        </div>
        { filteredRecipes.length > 0 && renderCards() }
      </main>
    </div>
  );
}

export default ReceitasFeitas;
