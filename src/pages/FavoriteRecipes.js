import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import HeaderNoSearch from '../components/HeaderNoSearch';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const allRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
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
      <div className="done__article">
        <div key={ index } className="done__card">
          <div className="done__card-thumb">
            <Link to={ `/${type}s/${id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                className="done__card-img"
                src={ image }
                alt={ name }
              />
            </Link>
          </div>
        </div>
        <div className="done__text-section">
          <div className="done__card-infos">
            <span data-testid={ `${index}-horizontal-top-text` }>
              { `${area} - ${category}` }
            </span>
            <Link
              data-testid={ `${index}-horizontal-name` }
              to={ `/${type}s/${id}` }
            >
              { name }
            </Link>
          </div>
          <div className="done__card-share">
            <input
              data-testid={ `${index}-horizontal-favorite-btn` }
              className="details__icon-favorite"
              type="image"
              src={ blackHeartIcon }
              alt="Favorite"
              onClick={ () => removeFavorites(id) }
            />
            <button
              onClick={ () => {
                copy(`https://lucasquearis.github.io/app-receitas/${type}s/${id}`);
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
            { linkShare && <span className="favorite__copy-span">Link copiado!</span>}
          </div>
        </div>
      </div>
    );
  };

  const cardDrinks = (recipe, index) => {
    const { id, type, name, image, alcoholicOrNot } = recipe;

    return (
      <div key={ index } className="done__card">
        <Link to={ `/${type}s/${id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            className="done__card-img"
            src={ image }
            alt={ name }
          />
        </Link>
        <div className="done__card-infos">
          <span data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</span>
          <Link
            data-testid={ `${index}-horizontal-name` }
            to={ `/${type}s/${id}` }
          >
            { name }
          </Link>
          <div className="favorite__card-share">
            <input
              data-testid={ `${index}-horizontal-favorite-btn` }
              className="details__icon-favorite"
              type="image"
              src={ blackHeartIcon }
              alt="Favorite"
              onClick={ () => removeFavorites(id) }
            />
            <button
              onClick={ () => {
                copy(`https://lucasquearis.github.io/app-receitas/${type}s/${id}`);
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
            { linkShare && <span className="favorite__copy-span">Link copiado!</span>}
          </div>
        </div>
      </div>
    );
  };

  const fillCardsMealsAndDrinks = () => {
    if (!favoriteRecipes === 0) return <span>Nenhuma Receita feita</span>;
    return favoriteRecipes.map((recipe, index) => {
      if (recipe.type === 'comida') {
        return cardMeals(recipe, index);
      }
      return cardDrinks(recipe, index);
    });
  };

  return (
    <div>
      <HeaderNoSearch title="Favoritos" />
      <section className="favorite__category-container ">
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
      <section className="favorite__cards-div">
        { fillCardsMealsAndDrinks() }
      </section>
    </div>
  );
}
