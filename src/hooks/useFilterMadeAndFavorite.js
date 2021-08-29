import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function useFilterMadeAndFavorite() {
  const [madeRecipes, setMadeRecipes] = useState([]);
  const [filter, setFilter] = useState('all');
  const { pathname } = useLocation();

  useEffect(() => {
    const filters = async () => {
      let recipes = [];
      if (pathname === '/receitas-feitas') {
        recipes = await JSON.parse(localStorage.getItem('doneRecipes'));
      } else {
        recipes = await JSON.parse(localStorage.getItem('favoriteRecipes'));
      }

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
  }, [filter, pathname]);

  return {
    madeRecipes,
    filter,
    setFilter,
  };
}

export default useFilterMadeAndFavorite;
