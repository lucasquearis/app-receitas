import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components';
import shareIconPath from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

const DoneRecipes = () => {
  const [rawDoneRecipes, setRawDoneRecipes] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filterOption, setFilterOption] = useState('');
  const [applyFilter, setApplyFilter] = useState(false);
  const [shareRecipe, setShareRecipe] = useState('');

  useEffect(() => {
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setRawDoneRecipes(getDoneRecipes);
    setDoneRecipes(getDoneRecipes);
  }, []);

  useEffect(() => {
    if (applyFilter) {
      setDoneRecipes(rawDoneRecipes.filter((recipe) => Object.keys(recipe)
        .some((key) => key === filterOption)));
    }
    setApplyFilter(false);
  }, applyFilter);

  useEffect(() => {
    copy(shareRecipe);
    // eslint-disable-next-line no-alert
    alert('Link copiado!');
  }, shareRecipe);

  const handleFilterClick = ({ target: { name } }) => {
    setFilterOption(name);
    setApplyFilter(true);
  };

  const handleClickShare = ({ target: { name } }) => {
    const recipeDetailURL = `http://localhost:3000/${name.replace('-', '/')}`;
    setShareRecipe(recipeDetailURL);
  };

  return (
    <div className="done-recipes-container">
      <div className="filter-recipes-container">
        <Button
          type="button"
          id="filter-by-all-btn"
          className="recipes-categories"
          buttonText="All"
          onClick={ handleFilterClick }
          isDisable={ false }
        />
        <Button
          type="button"
          id="filter-by-food-btn"
          className="recipes-categories"
          name="idMeal"
          buttonText="Food"
          onClick={ handleFilterClick }
          isDisable={ false }
        />
        <Button
          type="button"
          id="filter-by-drink-btn"
          className="recipes-categories"
          name="idDrink"
          buttonText="Drinks"
          onClick={ handleFilterClick }
          isDisable={ false }
        />
      </div>
      { doneRecipes.map((doneRecipe, index) => {
        let type = '';
        if (Object.keys(doneRecipe).some((key) => key === 'idMeal')) {
          type = 'meal';
        } else type = 'drikn';
        return (
          <div className="done-recipe-container" key={ index }>
            <Link
              to={ type === 'meal' ? (
                `comidas/${doneRecipe.idMeal}`
              ) : (
                `bebidas/${doneRecipe.idDrink}`
              ) }
            >
              <img
                src={ type === 'meal' ? (
                  doneRecipe.strMealThumb
                ) : (
                  doneRecipe.strDrinkThumb
                ) }
                alt="Imagem da Receita"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <div className="done-recipe-detais">
              <span
                className="done-recipe-category"
                data-testid={ `${index}-horizontal-top-text` }
              >
                { type === 'meal' ? (
                  `${doneRecipe.strArea} - ${doneRecipe.strCategory}`
                ) : (
                  `${doneRecipe.strAlcoholic}`
                ) }
              </span>
              <Link
                to={ type === 'meal' ? (
                  `comidas/${doneRecipe.idMeal}`
                ) : (
                  `bebidas/${doneRecipe.idDrink}`
                ) }
              >
                <span
                  className="done-recipe-name"
                  data-testid={ `${index}-horizontal-name` }
                >
                  { type === 'meal' ? doneRecipe.strMeal : doneRecipe.strDrink }
                </span>
              </Link>
              <span
                className="done-recipe-date"
                data-testid={ `${index}-horizontal-done-date` }
              >
                { doneRecipe.date }
              </span>
              <input
                type="image"
                id={ type === 'meal' ? (
                  `comidas-${doneRecipe.idMeal}`
                ) : (
                  `bebidas-${doneRecipe.idDrink}`
                ) }
                className="done-recipe-share-icon"
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIconPath }
                alt="Share"
                onClick={ handleClickShare }
              />
              { (type === 'meal') && (doneRecipe.strTags !== null) ? (
                doneRecipe.strTags.split(',', 2).map((tag) => (
                  <span
                    key={ index }
                    className="done-recipe-tag"
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    { tag }
                  </span>
                ))
              ) : (
                <> </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DoneRecipes;
