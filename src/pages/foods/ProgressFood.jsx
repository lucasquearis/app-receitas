import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import { fetchFoodById } from '../../services/fetchApi';
import ProgressFoodCard from './ProgressFoodCard';
import Loading from '../../components/Loading';

const ProgressFood = ({ match: { params: { id } } }) => {
  const [recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getRecipe = () => {
    const fetchApi = async () => {
      const foods = await fetchFoodById(id);
      setRecipe(foods);
      setIsLoading(false);
    };
    fetchApi();
  };

  useEffect(getRecipe, [id]);

  if (isLoading) return <Loading />;

  return <ProgressFoodCard recipe={ recipe } id={ id } />;
};

ProgressFood.propTypes = {
  match: shape({
    params: shape({ id: string }) }).isRequired,
};

export default ProgressFood;
