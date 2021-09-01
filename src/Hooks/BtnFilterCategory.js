import { useState } from 'react';

const BtnFilterCategory = () => {
  const [filter, setFilter] = useState('');

  const filterIngredient = ({ target: { value } }) => {
    setFilter(value);
  };

  return {
    filterIngredient,
    filter,
  };
};

export default BtnFilterCategory;
