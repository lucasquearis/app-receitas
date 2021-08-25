import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components';
import shareIconPath from '../images/shareIcon.svg';

import recipes from '../tests/mocks/recipes';

const copy = require('clipboard-copy');

// eslint-disable-next-line sonarjs/cognitive-complexity
const DoneRecipes = () => {
  const [rawDoneRecipes, setRawDoneRecipes] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filterOption, setFilterOption] = useState('');
  const [applyFilter, setApplyFilter] = useState(false);
  const [shareRecipe, setShareRecipe] = useState('');
  const [shareAlert, setShareAlert] = useState(false);

  useEffect(() => {
    // const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const getDoneRecipes = recipes;
    setRawDoneRecipes(getDoneRecipes);
    setDoneRecipes(getDoneRecipes);
  }, []);

  useEffect(() => {
    if (applyFilter && (filterOption !== 'all')) {
      setDoneRecipes(rawDoneRecipes.filter((recipe) => Object.keys(recipe)
        .some((key) => key === filterOption)));
    }
    if (applyFilter && (filterOption === 'all')) {
      setDoneRecipes(rawDoneRecipes);
    }
    setApplyFilter(false);
  }, [applyFilter]);

  useEffect(() => {
    const INTERVAL = 5000;
    if (shareRecipe.length > 0) {
      copy(shareRecipe);
      setInterval(() => setShareAlert(false), INTERVAL);
    }
    setShareRecipe('');
  }, [shareRecipe]);

  const handleFilterClick = ({ target: { className } }) => {
    setFilterOption(className.split(' ', 2)[1]);
    setApplyFilter(true);
  };

  const handleClickShare = ({ target: { id } }) => {
    const recipeDetailURL = `http://localhost:3000/${id.replace('-', '/')}`;
    setShareAlert(true);
    setShareRecipe(recipeDetailURL);
  };

  return (
    <div className="done-recipes-container">
      <div className="filter-recipes-container">
        <Button
          type="button"
          id="filter-by-all-btn"
          className="recipes-categories all"
          buttonText="All"
          onClick={ handleFilterClick }
          isDisable={ false }
        />
        <Button
          type="button"
          id="filter-by-food-btn"
          className="recipes-categories idMeal"
          buttonText="Food"
          onClick={ handleFilterClick }
          isDisable={ false }
        />
        <Button
          type="button"
          id="filter-by-drink-btn"
          className="recipes-categories idDrink"
          buttonText="Drinks"
          onClick={ handleFilterClick }
          isDisable={ false }
        />
      </div>
      { shareAlert ? (
        <span className="share-alert">Link copiado!</span>
      ) : (
        <> </>
      ) }
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
