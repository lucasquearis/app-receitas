import React from 'react';
import PropTypes from 'prop-types';

export default function RecomendedCard(props) {
  const { recomended, index } = props;
  console.log(recomended);
  return (
    <div
      data-testid={ `${index}-recomendation-card` }
      className="recomended-drink-info"
      key={ recomended.idDrink }
    >
      <img src={ recomended.strDrinkThumb } alt="foto da bebida" />
      <p>{ recomended.strCategory }</p>
      <h5 data-testid={ `${index}-recomendation-title` }>{ recomended.strDrink }</h5>
    </div>
  );
}

RecomendedCard.defaultProps = {
  recomended: {
    idDrink: '',
    strDrinkThumb: '',
    strCategory: '',
    strDrink: '',
  },
};

RecomendedCard.propTypes = {
  recomended: PropTypes.shape({
    idDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
  }),
  index: PropTypes.number.isRequired,
};
