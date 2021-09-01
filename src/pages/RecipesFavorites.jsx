import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/RecipesFavorites.css';

const clipboardCopy = require('clipboard-copy');

export default function RecipesFavorites() {
  const [copy, setCopy] = useState({ id: '', copied: false });
  const [filter, setFilter] = useState('all');
  const [favorites, setFavorites] = useState([]);

  function getFavorites() {
    const storedFavorites = JSON
      .parse(localStorage.getItem('favoriteRecipes'));
    return storedFavorites;
  }

  function handleClick(id) {
    const editedFavorites = getFavorites().filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(editedFavorites));
    const specificCard = `${id}-favorite-card`;
    const favoriteCard = document.getElementById(specificCard);
    favoriteCard.remove();
  }

  function renderAreaAndCategory(item, index) {
    return (
      <p key={ item.category } data-testid={ `${index}-horizontal-top-text` }>
        { `${item.area} - ${item.category}` }
      </p>
    );
  }

  function renderAlcoholic(item, index) {
    return (
      <p key={ item.category } data-testid={ `${index}-horizontal-top-text` }>
        { `${item.alcoholicOrNot}` }
      </p>
    );
  }

  function copyToClipboard(id, type) {
    const url = window.location.href;
    console.log(url);
    const urlArr = url.split('/');
    const link = urlArr[2];
    clipboardCopy(`http://${link}/${type}s/${id}`);
    setCopy({ id, copied: true });
  }

  function renderFavorites() {
    if (localStorage.favoriteRecipes) {
      return favorites.map((item, index) => (
        <div key={ item.id } id={ `${item.id}-favorite-card` }>
          <Link to={ `/${item.type}s/${item.id}` }>
            <img
              className="recipe-pic"
              key={ item.image }
              src={ item.image }
              alt="favorite recipe"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          { item.type === 'comida' && renderAreaAndCategory(item, index) }
          { item.type === 'bebida' && renderAlcoholic(item, index) }
          <Link to={ `/${item.type}s/${item.id}` }>
            <h3 key={ item.name } data-testid={ `${index}-horizontal-name` }>
              { item.name }
            </h3>
          </Link>
          <button
            className="share-btn"
            type="button"
            onClick={ () => copyToClipboard(item.id, item.type) }
          >
            <img
              src={ shareIcon }
              alt="share icon"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          { copy.copied && copy.id === item.id
            ? <div className="copy-div">Link copiado!</div> : <div /> }
          <button
            className="unfavorite-btn"
            type="button"
            onClick={ () => handleClick(item.id) }
          >
            <img
              src={ blackHeartIcon }
              alt="favorited icon"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
        </div>
      ));
    }
  }

  useEffect(() => {
    if (localStorage.favoriteRecipes) {
      if (filter === 'all') {
        setFavorites(getFavorites());
      } else {
        const array = getFavorites().filter((item) => item.type === filter);
        setFavorites(array);
      }
    }
  }, [filter]);

  return (
    <main className="favorite-recipes-main">
      <Header title="Receitas Favoritas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('all') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('comida') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('bebida') }
      >
        Drinks
      </button>
      { localStorage.favoriteRecipes && renderFavorites() }
    </main>
  );
}
