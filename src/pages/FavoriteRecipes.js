import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import '../styles/RecipeDetails.css';

function FavoriteRecipes() {
  const [favoriteList, setFavoriteList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [removedFavorites, setRemovedFavorites] = useState(0);

  useEffect(() => {
    setFavoriteList(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  useEffect(() => {
    if (favoriteList && favoriteList.length > 0) {
      setFilteredList(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  }, [favoriteList]);

  const handleClickFilter = (filter) => {
    if (favoriteList
      && (filter === 'comida' || filter === 'bebida')
      && favoriteList.length > 0) {
      setFilteredList([...favoriteList].filter((recipe) => recipe.type === filter));
    }
    if (favoriteList && filter === 'all' && favoriteList.length > 0) {
      setFilteredList([...favoriteList]);
    }
  };

  const renderCategory = (type, area, category, alcoholic) => {
    if (type === 'comida') {
      return (`${area} - ${category}`);
    }
    return alcoholic;
  };

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <button
        type="button"
        onClick={ () => handleClickFilter('all') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        onClick={ () => handleClickFilter('comida') }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        onClick={ () => handleClickFilter('bebida') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      { (filteredList && filteredList.length > 0)
        ? filteredList.map((recipe, index) => (
          <div key={ index }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                className="recipe-image"
                src={ recipe.image }
                data-testid={ `${index}-horizontal-image` }
                alt="Foto do Prato"
              />
            </Link>
            <h3
              data-testid={ `${index}-horizontal-top-text` }
            >
              { renderCategory(recipe.type,
                recipe.area,
                recipe.category,
                recipe.alcoholicOrNot) }
            </h3>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
            </Link>
            <ShareButton index={ index } address={ `/${recipe.type}s/${recipe.id}` } />
            <FavoriteButton
              recipe={ recipe }
              testId={ `${index}-horizontal-favorite-btn` }
              removedFavorites={ removedFavorites }
              setRemovedFavorites={ setRemovedFavorites }
            />
          </div>
        ))
        : <p>Nenhuma receita favorita</p>}
    </div>
  );
}

export default FavoriteRecipes;
