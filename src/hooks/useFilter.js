import { useState } from 'react';

function useFilter(array) {
  const [filter, setFilter] = useState('All');
  let filteredArray = array;
  switch (filter) {
  case 'Food':
    filteredArray = array.filter((item) => item.type === 'comida');
    break;
  case 'Drink':
    filteredArray = array.filter((item) => item.type === 'bebida');
    break;
  default:
    filteredArray = array;
  }
  return { filteredArray, setFilter };
}

export default useFilter;
