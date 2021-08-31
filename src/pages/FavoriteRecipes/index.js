import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import { saveAssistent, getSavedAssistent } from '../../utils';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import CopyButton from '../../components/CopyButton';

export default function FavoriteRecipes() {
  const gettingFavorites = getSavedAssistent('favoriteRecipes');
  const [favoriteRecipes, setFavoriteRecipes] = useState(gettingFavorites);

  const handleChangeByFilter = (filter) => {
    if (filter) {
      setFavoriteRecipes(gettingFavorites.filter(({ type }) => type === filter));
    } else {
      setFavoriteRecipes(gettingFavorites);
    }
  };

  const handleRemove = (id) => {
    const removing = gettingFavorites.filter(({ id: savedId }) => savedId !== id);
    saveAssistent('favoriteRecipes', removing);

    const filtring = favoriteRecipes.filter(({ id: savedId }) => savedId !== id);
    setFavoriteRecipes(filtring);
  };

  return (
    <section>
      <Header>Receitas Favoritas</Header>
      <section className="buttonfilter-container">
        <button
          className="btn-filter"
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => handleChangeByFilter() }
        >
          All
        </button>
        <button
          className="btn-filter"
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => handleChangeByFilter('comida') }
        >
          Food
        </button>
        <button
          className="btn-filter"
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => handleChangeByFilter('bebida') }
        >
          Drink
        </button>
      </section>
      <section className="favorite-cards">
        { favoriteRecipes.map(({
          id,
          type,
          area,
          category,
          alcoholicOrNot,
          name,
          image,
        }, index) => (
          <div key={ id } className="favorite-card">
            <Link to={ `/${type}s/${id}` }>
              <img
                className="recipe-image"
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt={ name }
              />
              <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
            </Link>
            <div className="favorite-infos">
              {alcoholicOrNot
                ? (
                  <h6 data-testid={ `${index}-horizontal-top-text` }>
                    { alcoholicOrNot }
                  </h6>
                ) : (
                  <h6 data-testid={ `${index}-horizontal-top-text` }>
                    { `${area} - ${category}`}
                  </h6>
                ) }
              <button
                type="button"
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                onClick={ () => handleRemove(id) }
              >
                <img src={ blackHeartIcon } alt="Botão de favorito" />
              </button>
              <CopyButton path={ `/${type}s/${id}` } index={ index } />
            </div>
          </div>
        )) }
      </section>
    </section>
  );
}
