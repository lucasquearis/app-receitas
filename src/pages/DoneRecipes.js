import React, { useEffect, useState } from 'react';
import { Button, DoneCard, Header } from '../components';
import './css/DoneRecipes.css';

const DoneRecipes = () => {
  const [rawDoneRecipes, setRawDoneRecipes] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filterOption, setFilterOption] = useState('');
  const [applyFilter, setApplyFilter] = useState(false);
  const [shareData, setShareData] = useState([]);
  const [shareAlert, setShareAlert] = useState(false);

  const style = '0.1em solid black';

  useEffect(() => {
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getDoneRecipes !== null) {
      setRawDoneRecipes(getDoneRecipes);
      setDoneRecipes(getDoneRecipes);
    } else {
      setRawDoneRecipes([]);
      setDoneRecipes([]);
    }
    document.querySelector('.all').style.border = style;
  }, []);

  useEffect(() => {
    if (applyFilter && (filterOption !== 'all')) {
      setDoneRecipes(rawDoneRecipes.filter((recipe) => recipe.type === filterOption));
    }
    if (applyFilter && (filterOption === 'all')) {
      setDoneRecipes(rawDoneRecipes);
    }
    setApplyFilter(false);
  }, [applyFilter]);

  useEffect(() => {
    const INTERVAL = 5000;
    if (shareData.length > 1) {
      navigator.clipboard.writeText(shareData[0]);
      const parentNode = document.querySelector(`#${shareData[1]}`);
      const alertElement = document.createElement('span');
      alertElement.className = 'share-alert';
      alertElement.innerHTML = 'Link copiado!';
      parentNode.after(alertElement);
      setInterval(() => alertElement.remove(), INTERVAL);
    }
    setShareAlert(false);
    setShareData([]);
  }, [shareAlert]);

  const resetBorder = () => {
    const categoryButtons = document.querySelectorAll('.recipes-categories');
    categoryButtons.forEach((button) => {
      button.style.border = 'none';
      button.style.cssText = 'button:hover{ border 0.1em solid black }';
    });
  };

  const applyBorder = (className) => {
    resetBorder();
    switch (className) {
    case 'all': document.querySelector(`.${className}`).style.border = style; break;
    case 'comida': document.querySelector(`.${className}`).style.border = style; break;
    case 'bebida': document.querySelector(`.${className}`).style.border = style; break;
    default: break;
    }
  };

  const handleFilterClick = ({ target: { className } }) => {
    applyBorder(className.split(' ', 2)[1]);
    setFilterOption(className.split(' ', 2)[1]);
    setApplyFilter(true);
  };

  const handleClickShare = ({ target: { id } }) => {
    const formatId = (id.replace('-', '/')).split(' ', 2);
    const recipeDetailURL = `http://localhost:3000/${formatId[0]}`;
    const parentNodeId = `done-recipe-date-${formatId[1]}`;
    setShareData([recipeDetailURL, parentNodeId]);
    setShareAlert(true);
  };

  return (
    <div className="done-recipes-container">
      <Header title="Receitas Feitas" />
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
          className="recipes-categories comida"
          buttonText="Food"
          onClick={ handleFilterClick }
          isDisable={ false }
        />
        <Button
          type="button"
          id="filter-by-drink-btn"
          className="recipes-categories bebida"
          buttonText="Drinks"
          onClick={ handleFilterClick }
          isDisable={ false }
        />
      </div>
      <div className="done-cards-container">
        { doneRecipes.map((doneRecipe, index) => (
          <DoneCard
            key={ doneRecipe.id }
            doneRecipe={ doneRecipe }
            index={ index }
            handleClickShare={ handleClickShare }
          />
        ))}
      </div>
    </div>
  );
};

export default DoneRecipes;
