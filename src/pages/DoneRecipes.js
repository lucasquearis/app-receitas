import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import HeaderNoSearch from '../components/HeaderNoSearch';
import shareIcon from '../images/shareIcon.svg';
import './pageCSS/DoneRecipes.css';

export default function DoneRecipes() {
  const allRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [filteredRecipes, setFilteredRecipes] = useState(allRecipes || []);
  const [linkShare, setLinkShare] = useState(false);

  const setFilterData = async ({ target: { value } }) => {
    if (value === 'comida' || value === 'bebida') {
      const recipesFiltered = allRecipes.filter((recipe) => recipe.type === value);

      setFilteredRecipes(recipesFiltered);
      return true;
    }
    setFilteredRecipes(allRecipes);
  };

  const cardMeals = (recipe, index) => {
    const { id, type, name, image, area, category, doneDate, tags } = recipe;
    return (
      <div key={ id } className="done__card">
        <Link to={ `/${type}s/${id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            className="done__card-img"
            src={ image }
            alt={ name }
          />
        </Link>
        <div className="done__card-infos">
          <div className="done__card-share">
            <span data-testid={ `${index}-horizontal-top-text` }>
              { `${area} - ${category}` }
            </span>
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
          </div>
          <Link
            data-testid={ `${index}-horizontal-name` }
            to={ `/${type}s/${id}` }
          >
            { name }
          </Link>
          <span data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</span>
          <div className="done__card-tags">

            { tags.map((tag) => (
              <div
                data-testid={ `${index}-${tag}-horizontal-tag` }
                key={ tag }
              >
                { tag }
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const cardDrinks = (recipe, index) => {
    const { id, type, name, image, alcoholicOrNot, doneDate } = recipe;

    return (
      <div key={ id } className="done__card">
        <Link to={ `/${type}s/${id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            className="done__card-img"
            src={ image }
            alt={ name }
          />
        </Link>

        <div className="done__card-infos">
          <div className="done__card-share">
            <span data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</span>
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
          </div>
          <Link
            data-testid={ `${index}-horizontal-name` }
            to={ `/${type}s/${id}` }
          >
            { name }
          </Link>
          <span data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</span>
        </div>
      </div>
    );
  };

  const fillCardsMealsAndDrinks = () => {
    if (!filteredRecipes === 0) return <span>Nenhuma Receita feita</span>;
    return filteredRecipes.map((recipe, index) => {
      if (recipe.type === 'comida') {
        return cardMeals(recipe, index);
      }
      return cardDrinks(recipe, index);
    });
  };

  return (
    <div>
      <HeaderNoSearch title="Receitas Feitas" />
      <section className="done__filter-btn-section">
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
