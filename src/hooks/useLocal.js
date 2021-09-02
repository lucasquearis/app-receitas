import { useEffect, useState } from 'react';

const menosUm = -1;
const useLocal = (type) => {
  const [fav, setFav] = useState([]);
  const [filteredFav, setFiltered] = useState([]);

  const filterFav = (param) => {
    if (param === null) {
      setFiltered([...fav]);
      return;
    }
    setFiltered([...fav.filter((e) => e.type === param)]);
  };

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return local !== null ? setFav(local) : setFav([]);
  }, []);

  useEffect(() => {
    setFiltered([...fav]);
  }, [fav]);

  const addToFav = (data) => {
    if (fav.length > 0) {
      const helper = data[`id${data.prefix}`] || data.id;
      if (fav.some((e) => e.id.includes(helper))) {
        const newFav = fav.filter((e) => e.id !== helper);
        setFav([...newFav]);
        localStorage.setItem('favoriteRecipes', JSON.stringify([...newFav]));
      }
    } else {
      const aux = {
        id: data[`id${data.prefix}`],
        type: type.slice(0, menosUm),
        area: data.strArea ? data.strArea : '',
        category: data.strCategory,
        name: data[`str${data.prefix}`],
        alcoholicOrNot: data.strAlcoholic ? data.strAlcoholic : '',
        image: data[`str${data.prefix}Thumb`],
      };
      localStorage.setItem('favoriteRecipes', JSON.stringify([...fav, aux]));
      setFav([...fav, aux]);
    }
  };

  return {
    filterFav,
    filteredFav,
    addToFav,
  };
};

export default useLocal;
