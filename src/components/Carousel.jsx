/* eslint-disable no-magic-numbers */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../cssPages/Detalhes.css';

const carouselStep = 1;

function Carousel(data) {
  console.log(data);
  const { recipes: { recommended, recommendedType } } = data;
  const [showIndex, setShowIndex] = useState(0);
  const [redirect, setRedirect] = useState(null);

  const recommendedCard = (recipe, index) => {
    const hideCard = Math.floor(index / 2) !== showIndex ? ' hideCard' : '';
    return (
      <button
        className={ `recommendedCard${hideCard}` }
        data-testid={ `${index}-recomendation-card` }
        key={ index }
        type="button"
        onClick={ () => setRedirect(`/${recommendedType}/${recipe.idMeal || recipe.idDrink}`) }
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
      </button>
    );
  };

  const handleCarouselBtn = (value) => {
    const sum = (showIndex + value);
    let newIndex = sum > 2 ? 0 : sum;
    newIndex = sum < 0 ? 2 : newIndex;
    setShowIndex(newIndex);
  };

  const carouselBtn = (text, value) => (
    <button type="button" onClick={ () => handleCarouselBtn(value) }>
      {text}
    </button>
  );

  if (redirect) return <Redirect to={ redirect } />;

  return (
    <section className="carousel">
      <div className="carouselBtnArea">
        { carouselBtn('<', -carouselStep) }
        { carouselBtn('>', carouselStep) }
      </div>
      <div className="recommendedShow">
        {recommended.map((recipe, index) => recommendedCard(recipe, index))}
      </div>
    </section>
  );
}

export default Carousel;
