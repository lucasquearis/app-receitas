import React from 'react';

function Cards({ list }) {
  return (
    list.map(({ strMeal, strMealThumb }, i) => (
      <div key={ i } className="cardFlex">
        <img className="cardTumb" src={ strMealThumb } alt="imagem da comida" />
        <span>{strMeal}</span>
      </div>
    ))
  );
}

export default Cards;
