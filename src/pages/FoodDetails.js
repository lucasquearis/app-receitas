import React, { useState, useContext, useEffect } from 'react';
import FoodContext from '../context/FoodContext';
import fetchMealDetailsApi from '../services/fetchMealDetailsApi';

const FoodDetails = () => {
  const { foodDetailsId } = useContext(FoodContext);
  const [foodDetails, setFoodDetails] = useState(FoodContext);

  useEffect(() => {
    fetchMealDetailsApi(foodDetailsId).then((data) => setFoodDetails(data));
  }, [foodDetailsId]);

  return (
    <div>
      Detalhes da comida
      {/* <div>
        <img data-testid="recipe-photo" />
        <h3 data-testid="recipe-title" />
        <button data-testid="share-btn" />
        <button data-testid="favorite-btn" />
        <p data-testid="recipe-category" />
      </div> */}
    </div>
  );
};

export default FoodDetails;
