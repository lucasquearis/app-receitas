import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Header from '../../components/Header';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const FavoriteRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipe] = useState([]);
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  useEffect(() => {
    const storage = localStorage.getItem('favoriteRecipes');

    if (storage) {
      setRecipes(JSON.parse(storage));
      setFilteredRecipe(JSON.parse(storage));
    }
  }, []);

  function handleClickFilters({ target: { value } }) {
    if (value === 'comida') {
      setFilteredRecipe(recipes.filter((recipe) => recipe.type === 'comida'));
    } else if (value === 'bebida') {
      setFilteredRecipe(recipes.filter((recipe) => recipe.type === 'bebida'));
    } else setFilteredRecipe(recipes);
  }

  const shareClick = async (index, type, id) => {
    try {
      await clipboardCopy(`http://localhost:3000${`/${type}s/${id}`}`);
      setShowCopyMessage(true);
      const messageRemoveTime = 3000;
      setTimeout(() => setShowCopyMessage(false), messageRemoveTime);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      { console.log('test') }
      <Header />
      <button
        type="button"
        value="all"
        data-testid="filter-by-all-btn"
        onClick={ handleClickFilters }
      >
        All
      </button>
      <button
        type="button"
        value="comida"
        data-testid="filter-by-food-btn"
        onClick={ handleClickFilters }
      >
        Food
      </button>
      <button
        type="button"
        value="bebida"
        data-testid="filter-by-drink-btn"
        onClick={ handleClickFilters }
      >
        Drinks
      </button>
      <div>
        {filteredRecipes.map((recipe, index) => {
          const {
            image,
            type,
            id,
            category,
            name,
            area,
            alcoholicOrNot,
          } = recipe;

          return (
            <div key={ id }>
              <Link to={ `/${type}s/${id}` }>
                <img
                  src={ image }
                  alt=""
                  data-testid={ `${index}-horizontal-image` }
                  width="120px"
                />
                <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
              </Link>
              {area ? (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { `${area} - ${category}` }
                </p>
              ) : (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { alcoholicOrNot }
                </p>
              )}
              <button type="button" onClick={ () => shareClick(index, type, id) }>
                {showCopyMessage && <h5>Link copiado!</h5>}
                <img
                  src={ shareIcon }
                  alt=""
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
              <button
                type="button"
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="Icon to favorite foods"
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoriteRecipes;
