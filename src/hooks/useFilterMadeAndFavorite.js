import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function useFilterMadeAndFavorite() {
  const [madeRecipes, setMadeRecipes] = useState([]);
  const [filter, setFilter] = useState('all');
  const [recipes, setRecipes] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    const savedRecipes = async () => {
      let saved = [];
      if (pathname === '/receitas-feitas') {
        saved = await JSON.parse(localStorage.getItem('doneRecipes'));
        await setRecipes(saved);
      } else {
        saved = await JSON.parse(localStorage.getItem('favoriteRecipes'));
        await setRecipes(saved);
      }
    };
    savedRecipes();
  }, [pathname]);

  useEffect(() => {
    const filters = async () => {
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
  }, [filter, recipes]);

  return {
    madeRecipes,
    filter,
    setFilter,
    setRecipes,
  };
}

export default useFilterMadeAndFavorite;
