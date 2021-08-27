import { useEffect, useState } from 'react';

function useFilterMade() {
  const [madeRecipes, setMadeRecipes] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const getMadeRecipes = () => {
      const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
      setMadeRecipes(recipes);
    };
    getMadeRecipes();
  }, []);

  useEffect(() => {
    const filters = () => {
      let cardsFiltered = [...madeRecipes];
      if (filter !== 'all') {
        cardsFiltered = madeRecipes.filter(({ type }) => type === filter);
      }
      setMadeRecipes(cardsFiltered);
    };

    filters();
  }, [filter, madeRecipes]);

  return {
    madeRecipes,
    setFilter,
  };
}

export default useFilterMade;
