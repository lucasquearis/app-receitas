import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';

function ReceitasFeitas() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [filteredRecipes, setFilteredRecipes] = useState(doneRecipes);

  const handleClickFilteredRecipes = (type) => {
    if (type) {
      const recipes = doneRecipes.filter((recipe) => recipe.type === type);
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(doneRecipes);
    }
  };

  const renderCards = () => (
    <div>
      { filteredRecipes.map((recipe, index) => {
        const pathToRecipe = recipe.type === 'comida' ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}`;
        return (
        <Link
          to={ pathToRecipe }
          key={ recipe.name }
          className="card-container"
        >
          <div>
            <img src={ recipe.image } alt={ recipe.name } />  
          </div>
          <div>

          </div>
        </Link>
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
