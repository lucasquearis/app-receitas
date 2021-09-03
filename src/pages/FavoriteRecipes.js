import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import '../styles/FavoriteRecipes.css';

function FavoriteRecipes() {
  const favoriteRecipes = useSelector((state) => state.favoriteReducer);
  const [filteredList, setFilteredList] = useState(favoriteRecipes);

  useEffect(() => {
    setFilteredList([...favoriteRecipes]);
  }, [favoriteRecipes]);

  const handleClickFilter = (filter) => {
    if (favoriteRecipes
      && (filter === 'comida' || filter === 'bebida')
      && favoriteRecipes.length > 0) {
      setFilteredList([...favoriteRecipes].filter((recipe) => recipe.type === filter));
    }
    if (favoriteRecipes && filter === 'all') {
      setFilteredList([...favoriteRecipes]);
    }
  };

  const renderCategory = (type, area, category, alcoholic) => {
    if (type === 'comida') {
      return (`${area} - ${category}`);
    }
    return alcoholic;
  };

  return (
    <div className="container">
      <Header title="Receitas Favoritas" />
      <div className="filter-buttons">
        <button
          type="button"
          className="filter-button"
          onClick={ () => handleClickFilter('all') }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          className="filter-button"
          onClick={ () => handleClickFilter('comida') }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          className="filter-button"
          onClick={ () => handleClickFilter('bebida') }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      { (filteredList && filteredList.length > 0)
        ? filteredList.map((recipe, index) => (
          <div className="favorite-card" key={ index }>
            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
            >
              <img
                className="recipe-image"
                src={ recipe.image }
                data-testid={ `${index}-horizontal-image` }
                alt="Foto do Prato"
              />
            </Link>
            <div className="favorite-info">
              <h3
                data-testid={ `${index}-horizontal-top-text` }
                className="favorite-category"
              >
                { renderCategory(recipe.type,
                  recipe.area,
                  recipe.category,
                  recipe.alcoholicOrNot) }
              </h3>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <h2
                  className="favorite-name"
                  data-testid={ `${index}-horizontal-name` }
                >
                  { recipe.name }
                </h2>
              </Link>
              <div className="favorite-buttons">
                <ShareButton
                  index={ index }
                  address={ `/${recipe.type}s/${recipe.id}` }
                />
                <FavoriteButton
                  recipe={ recipe }
                  testId={ `${index}-horizontal-favorite-btn` }
                />
              </div>
            </div>
          </div>
        ))
        : <p>Nenhuma receita favorita</p>}
    </div>
  );
}

export default FavoriteRecipes;
