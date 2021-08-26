import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './Button';

function ExploreButtons({ type }) {
  const history = useHistory();
  const typeFood = () => type === 'foods';
  const redirectButtonArea = () => {
    if (typeFood()) {
      history.push('comidas/area');
    }
  };

  const redirectButtonIngredient = () => {
    if (typeFood()) {
      return history.push('comidas/ingredientes');
    }
    history.push('bebidas/ingredientes');
  };

  const showAreaButton = () => {
    if (typeFood()) {
      return (
        <Button
          datatestid="explore-by-area"
          name="Por Local de Origem"
          onClick={ () => redirectButtonArea() }
        />);
    }
  };

  return (
    <div>
      <Button
        datatestid="explore-by-ingredient"
        name="Por Ingredientes"
        onClick={ () => redirectButtonIngredient() }
      />
      <Button
        datatestid="explore-surprise"
        name="Me Surpreenda!"
      />
      {showAreaButton()}
    </div>
  );
}

ExploreButtons.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ExploreButtons;
