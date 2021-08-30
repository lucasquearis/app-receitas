import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/blackHeartIcon.svg';

const FavoriteRecipe = () => {
  const [copied, setCopied] = useState('');
  const [recipes, setRecipes] = useState('');

  useEffect(() => {
    const getFavoriteRecipes = () => {
      const savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setRecipes(savedRecipes);
    };
    getFavoriteRecipes();
  }, []);

  const copyLink = ({ target }) => {
    const labelButton = target.parentNode;
    const sectionButtons = labelButton.parentNode;
    const divRecipe = sectionButtons.parentNode;
    const pNameRecipe = divRecipe.children[2];
    const nameRecipe = pNameRecipe.innerText;

    const newSavedRecipes = recipes.filter((recipe) => recipe.name === nameRecipe);
    const { type, id } = newSavedRecipes[0];
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopied('Link copiado!');
  };

  const unfavoriteRecipe = ({ target }) => {
    const sectionButtons = target.parentNode;
    const divRecipe = sectionButtons.parentNode;
    const pNameRecipe = divRecipe.children[2];
    const nameRecipe = pNameRecipe.innerText;

    const newSavedRecipes = recipes.filter((recipe) => recipe.name !== nameRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newSavedRecipes));
    setRecipes(newSavedRecipes);
  };

  if (recipes) {
    return (
      <div>
        { recipes.map(({ type, name, image, category, area, alcoholicOrNot }, index) => {
          if (type === 'comida') {
            return (
              <div key={ index }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ image }
                  alt={ name }
                />
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { `${area} - ${category}` }
                </p>
                <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
                <section className="buttons-container">
                  <label htmlFor="share">
                    <input
                      id="share"
                      type="image"
                      alt="Botão compartilhar"
                      src={ shareIcon }
                      data-testid={ `${index}-horizontal-share-btn` }
                      onClick={ copyLink }
                    />
                    {copied}
                  </label>
                  <input
                    type="image"
                    src={ favoriteIcon }
                    alt="Botão de favoritar"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    onClick={ unfavoriteRecipe }
                  />
                </section>
              </div>
            );
          }
          return (
            <div key={ index }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt={ name }
              />
              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${alcoholicOrNot}` }
              </p>
              <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
              <section className="buttons-container">
                <label htmlFor="share">
                  <input
                    id="share"
                    type="image"
                    alt="Botão compartilhar"
                    src={ shareIcon }
                    data-testid={ `${index}-horizontal-share-btn` }
                    onClick={ copyLink }
                  />
                  {copied}
                </label>
                <input
                  type="image"
                  src={ favoriteIcon }
                  alt="Botão de favoritar"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  onClick={ unfavoriteRecipe }
                />
              </section>
            </div>
          );
        }) }
      </div>
    );
  }
  return null;
};

export default FavoriteRecipe;
