import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function FoodAreaExp() {
  const doneRecipesLocalStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  const copyReipes = () => {
    alert('Link copiado!');
  };

  return (
    <>
      <Header title="Receitas Feitas" search={ false } />
      <h2>Receitas Feitas</h2>
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button" /*  onClick={ rotaBtn } */
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          /* onClick={ rotaBtn } */
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          /*      onClick={ rotaBtn } */
        >
          Drinks
        </button>
      </div>

      <div>
        {doneRecipesLocalStorage.map((item, index) => (
          <article className="article-cards" key={ item.id }>
            <div className="div-img">
              <img
                src={ item.image }
                data-testid={ `${index}-horizontal-image` }
                width="150px"
                alt={ item.name }
              />
            </div>

            <div className="container-info">
              <h4 data-testid={ `${index}-horizontal-name` }>{item.name}</h4>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${item.area} - ${item.category}-${item.alcoholicOrNot}`}
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>
                {item.doneDate}
              </p>

              {item.tags.map((tag) => (
                <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {tag}
                </span>
              ))}

              <button
                className="img-compartilhar"
                type="button"
                onClick={ copyReipes }
              >
                <img
                  src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="compartilhar"
                />
              </button>

            </div>
          </article>
        ))}
      </div>

    </>
  );
}

export default FoodAreaExp;
