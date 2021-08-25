import React, { useEffect, useState } from 'react';
import { Button, DoneCard } from '../components';

import recipes from '../tests/mocks/recipes';

const copy = require('clipboard-copy');

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
          <DoneCard
            key={ index }
            type={ type }
            doneRecipe={ doneRecipe }
            index={ index }
            handleClickShare={ handleClickShare }
          />
        );
      })}
    </div>
  );
};

export default DoneRecipes;
