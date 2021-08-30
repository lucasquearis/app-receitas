import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import '../../styles/doneRecipes.css';
// import shareIcon from '../../images/shareIcon.svg';
import { getStorage } from '../../components/StoreBox';
import CopyButton from '../../components/CopyButton';

function DoneRecipes() {
  // const [getLinkCopied, setLinkCopied] = useState('');

  function recipesDone() {
    const storage = getStorage('doneRecipes');
    return storage || [];
  }
  const [doneRecipes, setDoneRecipes] = useState(recipesDone());

  useEffect(() => {
    setDoneRecipes(recipesDone());
  }, []);

  // function copyUrlToClipboard() {
  //   const { type, id } = doneRecipes[0];
  //   setLinkCopied('Link copiado!');
  //   navigator.clipboard.writeText(window.location.href
  //     .replace('receitas-feitas', `${type}s/${id}`));
  // }

  function mealInfo(index, category, area) {
    return (
      <p
        className="done-category"
        data-testid={ `${index}-horizontal-top-text` }
      >
        {`${area} - ${category}`}
      </p>
    );
  }

  function drinkInfo(index, alcoholicOrNot) {
    return (
      <p
        className="done-category"
        data-testid={ `${index}-horizontal-top-text` }
      >
        {`${alcoholicOrNot}`}
      </p>
    );
  }

  // const { type, id } = doneRecipes[0];

  return (
    <>
      <Header />
      <div className="buttonfilter-container">
        <button
          className="btn-filter"
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setDoneRecipes(recipesDone) }
        >
          All
        </button>
        <button
          className="btn-filter"
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => setDoneRecipes(
            recipesDone().filter((data) => data.type === 'comida'),
          ) }
        >
          Food
        </button>
        <button
          className="btn-filter"
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setDoneRecipes(
            recipesDone().filter((data) => data.type === 'bebida'),
          ) }
        >
          Drink
        </button>
      </div>
      {/* <p className="link">
        {getLinkCopied}
      </p> */}
      <section className="done-recipes-container">
        { doneRecipes.map((
          { category,
            id, type, doneDate, tags, image, area, alcoholicOrNot, name }, index,
        ) => (
          <div
            className="done-recipe-cards"
            data-testid={ `${index}-recipe-card` }
            key={ index }
          >
            <Link to={ `/${type}s/${id}` }>
              <img
                className="recipe-image"
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt={ name }
              />
            </Link>
            <div className="infos">
              {type === 'comida' ? mealInfo(index, category, area)
                : drinkInfo(index, alcoholicOrNot)}
              <Link to={ `/${type}s/${id}` }>
                <p className="name" data-testid={ `${index}-horizontal-name` }>
                  {name}
                </p>
                <p className="date" data-testid={ `${index}-horizontal-done-date` }>
                  Feita em:
                  {doneDate}
                </p>
                <div className="done-tags">
                  {tags.map((tag) => (
                    <p
                      className="tag"
                      key={ tag }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      {tag}
                    </p>
                  ))}
                </div>
              </Link>
            </div>
            {/* <button
              type="button"
              className="share"
              data-testid="share-btn"
              onClick={ () => copyUrlToClipboard() }
            >4
              <img
                src={ shareIcon }
                alt="share-icon"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button> */}
            <CopyButton
              path={ `/${type}s/${id}` }
              index={ index }
            />
          </div>
        ))}
      </section>
    </>
  );
}

export default DoneRecipes;
