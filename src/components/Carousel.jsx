/* eslint-disable no-magic-numbers */
import React, { useState } from 'react';
import '../cssPages/Detalhes.css';

function Carousel(recipes) {
  const { recommended } = recipes;
  const [showIndex, setShowIndex] = useState(0);

  const recommendedCard = (recipe, index) => {
    const hideCard = Math.floor(index / 2) !== showIndex ? ' hideCard' : '';
    return (
      <div
        className={ `recommendedCard${hideCard}` }
        data-testid={ `${index}-recomendation-card` }
        key={ index }
      >
        <img
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt={ recipe.strMeal || recipe.strDrink }
        />
        <p>
          {recipe.strCategory}
        </p>
        <h3 data-testid={ `${index}-recomendation-title` }>
          {recipe.strMeal || recipe.strDrink}
        </h3>
      </div>
    );
  };

  const handleCarouselBtn = (value) => {
    const sum = (showIndex + value);
    let newIndex = sum > 2 ? 0 : sum;
    newIndex = sum < 0 ? 2 : sum;
    setShowIndex(newIndex);
    console.log(newIndex);
  };

  const carouselBtn = (text, value) => (
    <button type="button" onClick={ () => handleCarouselBtn(value) }>
      {text}
    </button>
  );

  return (
    <>
      { carouselBtn('<', -1) }
      { carouselBtn('>', 1) }
      <div className="recommendedShow">
        {recommended.map((recipe, index) => recommendedCard(recipe, index))}
      </div>
    </>
  );
}

export default Carousel;
