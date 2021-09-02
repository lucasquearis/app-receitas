import React, { useEffect, useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import { Button, FavCard } from '../components';
import Header from '../components/Header';
// import './css/DoneRecipes.css';

// const copy = require('clipboard-copy');

const DoneRecipes = () => {
  const [rawFavRecipes, setRawFavRecipes] = useState([]);
  const [favRecipes, setFavRecipes] = useState([]);
  const [filterOption, setFilterOption] = useState('');
  const [applyFilter, setApplyFilter] = useState(false);
  const [shareData, setShareData] = useState([]);
  const [shareAlert, setShareAlert] = useState(false);
  const { favoriteRcps } = useContext(AppContext);

  useEffect(() => {
    // const getDoneRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // if (getDoneRecipes !== null) {
    //   setRawFavRecipes(getDoneRecipes);
    //   setFavRecipes(getDoneRecipes);
    // } else {
    //   setRawFavRecipes([]);
    //   setFavRecipes([]);
    // }
    setRawFavRecipes([...favoriteRcps]);
    setFavRecipes([...favoriteRcps]);
  }, [favoriteRcps]);

  useEffect(() => {
    if (applyFilter && (filterOption !== 'all')) {
      setFavRecipes(rawFavRecipes.filter((recipe) => recipe.type === filterOption));
    }
    if (applyFilter && (filterOption === 'all')) {
      setFavRecipes(rawFavRecipes);
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

  const handleFilterClick = ({ target: { className } }) => {
    setFilterOption(className.split(' ', 2)[1]);
    setApplyFilter(true);
  };

  const handleClickShare = ({ target: { id } }) => {
    const formatId = (id.replace('-', '/')).split(' ', 2);
    const recipeDetailURL = `http://localhost:3000/${formatId[0]}`;
    const parentNodeId = `fav-recipe-info-${formatId[1]}`;
    setShareData([recipeDetailURL, parentNodeId]);
    setShareAlert(true);
  };

  return (
    <div className="fav-recipes-container">
      <Header title="Receitas Favoritas" />
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
      <div className="fav-cards-container">
        { favRecipes.map((favRecipe, index) => (
          <FavCard
            key={ favRecipe.id }
            favRecipe={ favRecipe }
            index={ index }
            handleClickShare={ handleClickShare }
          />
        ))}
      </div>
    </div>
  );
};

export default DoneRecipes;
