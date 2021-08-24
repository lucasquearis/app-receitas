import React from 'react';

function RecomendationCard() {
  const recipes = ['1', '2', '3', '4', '5', '6'];
  return (
    <section>
      {recipes.map((recipe, index) => (
        <div data-testid={ `${index}-recomendation-card` } key={ index }>
          {recipe}
        </div>
      ))}
    </section>
  );
}

export default RecomendationCard;
