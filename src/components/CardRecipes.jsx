import React from 'react';

export default function CardRecipes({title, image}) {
  return (
    <div>
      <img src={ image } alt="foodandDrinkImages" />
      <h4>{ title }</h4>
    </div>
  );
}
