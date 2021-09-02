import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { capitalizeFirstLetter, endpoints, categoryEndpoints } from '../services';

const um = -1;

const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [tag, setTag] = useState('');
  const [lastCat, setCat] = useState('');
  const history = useHistory();

  const getRecipes = useCallback(
    async (option, search, type) => {
      if (!option) {
        let request = await endpoints[type].name('');
        request = await request.json();
        console.log(request);
        setRecipes(request[`${request.meals ? 'meals' : 'drinks'}`]);
      } else if (option === 'firstLetter' && search.length > 1) {
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
    }, [history],
  );

  const getByCategory = async (category, prefix) => {
    if (category === lastCat) {
      setCat('');
      getRecipes(null, '', prefix);
    } else {
      setCat(category);
      let request = await categoryEndpoints[prefix](category);
      request = await request.json();
      setRecipes(request[`${request.meals ? 'meals' : 'drinks'}`]);
    }
  };
  return {
    tag,
    history,
    recipes,
    getRecipes,
    getByCategory,
  };
};

export default useRecipes;
