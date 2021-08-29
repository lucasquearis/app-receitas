import { useEffect, useState } from 'react';

function useFilterMade() {
  const [madeRecipes, setMadeRecipes] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const filters = async () => {
      const recipes = await JSON.parse(localStorage.getItem('doneRecipes'));
      if (recipes !== null) {
        let cardsFiltered = [...recipes];
        if (filter !== 'all') {
          cardsFiltered = cardsFiltered.filter(({ type }) => type === filter);
        }
        setMadeRecipes(cardsFiltered);
      } else {
        setMadeRecipes([]);
      }
    };

    filters();
  }, [filter]);

  return {
    madeRecipes,
    filter,
    setFilter,
  };
}

export default useFilterMade;
