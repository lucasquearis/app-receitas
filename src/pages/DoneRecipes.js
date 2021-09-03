import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import '../styles/FavoriteRecipes.css';

function DoneRecipes() {
  const [doneList, setDoneList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    setDoneList(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  useEffect(() => {
    if (doneList && doneList.length > 0) {
      setFilteredList([...doneList]);
    }
  }, [doneList]);

  const handleClickFilter = (filter) => {
    if (doneList && (filter === 'comida' || filter === 'bebida') && doneList.length > 0) {
      setFilteredList([...doneList].filter((recipe) => recipe.type === filter));
    }
    if (doneList && filter === 'all' && doneList.length > 0) {
      setFilteredList([...doneList]);
    }
  };

  return (
    <div className="container">
      <Header title="Receitas Feitas" />
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
      { filteredList && filteredList.length > 0
        && filteredList.map((recipe, index) => (
          <div className="favorite-card" key={ index }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
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
                { `${recipe.type === 'comida'
                  ? recipe.area
                  : recipe.alcoholicOrNot} - ${recipe.category}` }
              </h3>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <h2
                  data-testid={ `${index}-horizontal-name` }
                  className="favorite-name"
                >
                  { recipe.name }
                </h2>
              </Link>
              <p
                data-testid={ `${index}-horizontal-done-date` }
                className="favorite-done-date"
              >
                { `Feita em: ${recipe.doneDate}` }
              </p>
              <div className="favorite-buttons">
                <ShareButton
                  index={ index }
                  address={ `/${recipe.type}s/${recipe.id}` }
                />
                <div className="tag-list">
                  {recipe.tags.map(
                    (tag) => (
                      <p
                        className="favorite-tags"
                        key={ tag }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        { tag }
                      </p>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default DoneRecipes;
