import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const allRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favoriteRecipes, setFavoriteRecipes] = useState(allRecipes || []);
  const [linkShare, setLinkShare] = useState(false);

  const setFilterData = async ({ target: { value } }) => {
    if (value === 'comida' || value === 'bebida') {
      const recipesFiltered = allRecipes.filter((recipe) => recipe.type === value);
      setFavoriteRecipes(recipesFiltered);
      return true;
    }
    setFavoriteRecipes(allRecipes);
  };

  const removeFavorites = async (id) => {
    let favoritesRecipes = await JSON.parse(localStorage.getItem('favoriteRecipes'));
    favoritesRecipes = favoritesRecipes.filter((recipe) => recipe.id !== id);
    await localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesRecipes));
    setFavoriteRecipes(favoritesRecipes);
  };

  const cardMeals = (recipe, index) => {
    const { id, type, name, image, area, category } = recipe;
    return (
      <div key={ index } className="section-card">
        <Link to={ `/${type}s/${id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            className="card-img"
            src={ image }
            alt={ name }
          />
        </Link>
        <div>
          <span data-testid={ `${index}-horizontal-top-text` }>
            { `${area} - ${category}` }
          </span>
          <Link
            data-testid={ `${index}-horizontal-name` }
            to={ `/${type}s/${id}` }
            className="card-title"
          >
            { name }
          </Link>
          <div className="favorite__card-share">
            <button
              onClick={ () => {
                copy(`http://localhost:3000/${type}s/${id}`);
                setLinkShare(true);
              } }
              type="button"
            >
              <img
                src={ shareIcon }
                alt="imagem de compartilhar"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            { linkShare && 'Link copiado!' }
            <input
              data-testid={ `${index}-horizontal-favorite-btn` }
              className="icon-favorite"
              type="image"
              src={ blackHeartIcon }
              alt="Favorite"
              onClick={ () => removeFavorites(id) }
            />
          </div>
        </div>
      </div>
    );
  };

  const cardDrinks = (recipe, index) => {
    const { id, type, name, image, alcoholicOrNot } = recipe;
    return (
      <div key={ index } className="section-card">
        <Link to={ `/${type}s/${id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            className="card-img"
            src={ image }
            alt={ name }
          />
        </Link>
        <div>
          <Link
            to={ `/${type}s/${id}` }
            data-testid={ `${index}-horizontal-name` }
            className="card-title"
          >
            <span
              data-testid={ `${index}-horizontal-top-text` }
            >
              { alcoholicOrNot }
            </span>
            { name }
          </Link>
          <div className="favorite__card-share">
            <button
              onClick={ () => {
                copy(`http://localhost:3000/${type}s/${id}`);
                setLinkShare(true);
              } }
              type="button"
            >
              <img
                src={ shareIcon }
                alt="imagem de compartilhar"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            { linkShare && 'Link copiado!' }
            <input
              data-testid={ `${index}-horizontal-favorite-btn` }
              className="icon-favorite"
              type="image"
              src={ blackHeartIcon }
              alt="Favorite"
              onClick={ () => removeFavorites(id) }
            />
          </div>
        </div>
      </div>
    );
  };

  const fillCardsMealsAndDrinks = () => {
    if (!favoriteRecipes.length > 0) return <span>Nenhuma Receita favoritada</span>;
    return favoriteRecipes.map((recipe, index) => {
      if (recipe.type === 'comida') {
        return cardMeals(recipe, index);
      }
      return cardDrinks(recipe, index);
    });
  };

  return (
    <div>
      <Header brand="Receitas Favoritas" />
      <section className="favorite__filter-btn-section">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ setFilterData }
          value="all"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ setFilterData }
          value="comida"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ setFilterData }
          value="bebida"
        >
          Drink
        </button>
      </section>
      <section>
        { fillCardsMealsAndDrinks() }
      </section>
    </div>
  );
}
