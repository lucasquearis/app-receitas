import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import ProgressFoodCard from './ProgressFoodCard';
import { fetchFoodById } from '../../services/fetchApi';

const ProgressFood = ({ match: { params: { id } } }) => {
  const [recipe, setRecipe] = useState({});

  const getRecipe = () => {
    const fetchApi = async () => {
      const foods = await fetchFoodById(id);
      setRecipe(foods);
    };
    fetchApi();
  };

  useEffect(getRecipe, [id]);

  return (
    <div>
      <ProgressFoodCard recipe={ recipe } id={ id } />
    </div>
  );
};

ProgressFood.propTypes = {
  match: shape({
    params: shape({ id: string }) }).isRequired,
};

export default ProgressFood;
