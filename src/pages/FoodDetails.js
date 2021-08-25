import React, { useContext } from 'react';
import FoodContext from '../context/FoodContext';

const FoodDetails = () => {
  const { foodDetails } = useContext(FoodContext);
  return (
    <div>
      Detalhes da comida
      <div>
        <img data-testid="recipe-photo" />
        <h3 data-testid="recipe-title" />
        <button data-testid="share-btn" />
      </div>
    </div>
  );
};

export default FoodDetails;
