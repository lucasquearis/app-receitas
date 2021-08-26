import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { capitalizeFirstLetter } from '../services';

const um = -1;
const endpoints = {
  comidas: {
    ingrediente: (search) => fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`),
    firstLetter: (search) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`),
    name: (search) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`),
  },
  bebidas: {
    ingrediente: (search) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`),
    firstLetter: (search) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`),
    name: (search) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`),
  },
};

const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [tag, setTag] = useState('');
  const history = useHistory();

  const getRecipes = async (option, search, type) => {
    if (option === 'firstLetter' && search.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      let request = await endpoints[type][option](search);
      request = await request.json();
      const prefix = request.meals ? 'meals' : 'drinks';
      setRecipes(request[prefix]);
      setTag(capitalizeFirstLetter(prefix).slice(0, um));
      const category = request[prefix][0].idDrink ? 'idDrink' : 'idMeal';
      if (request[prefix].length === 1) {
        history.push(`/${type}/${request[prefix][0][category]}`);
      }
    }
  };
  return {
    tag,
    history,
    recipes,
    getRecipes,
  };
};

export default useRecipes;
