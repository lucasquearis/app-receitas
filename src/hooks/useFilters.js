import { useEffect, useState } from 'react';

const endpoints = {
  bebidas: () => fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'),
  comidas: () => fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list'),
};

const useFilters = () => {
  const [filters, setFilters] = useState({ comidas: [], bebidas: [] });

  const handleFilters = async () => {
    let comidas = await endpoints.comidas();
    comidas = await comidas.json();
    let bebidas = await endpoints.bebidas();
    bebidas = await bebidas.json();
    setFilters({
      comidas: comidas.meals,
      bebidas: bebidas.drinks,
    });
  };

  useEffect(() => {
    handleFilters();
  }, []);

  return {
    filters,
  };
};

export default useFilters;
