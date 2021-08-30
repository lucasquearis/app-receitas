import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import genericFetchAPI from '../services/genericFetchAPI';

function RecomendationCard({ type }) {
  const [recomendations, setRecomendations] = useState([]);
  const MAX_CARD_RECOMENDATIONS = 6;

  useEffect(() => {
    const getRecomendations = async () => {
      if (type === 'meals') {
        setRecomendations(await genericFetchAPI('meal', 'search', 's', ''));
      } else setRecomendations(await genericFetchAPI('cocktail', 'search', 's', ''));
    };
    getRecomendations();
  }, [type]);

  useEffect(() => console.log(recomendations), [recomendations]);

  return recomendations.length ? (
    <section>
      {recomendations.map((recipe, index) => (index < MAX_CARD_RECOMENDATIONS ? (
        <div data-testid={ `${index}-recomendation-card` } key={ index }>
          {`${recipe.strCategory || recipe.strAlchoolic}-teste`}
        </div>
      ) : null))}
    </section>
  ) : <p>Loading</p>;
}

RecomendationCard.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecomendationCard;
