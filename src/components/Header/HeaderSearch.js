import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useData } from '../../Context/DataContext';
import Input from '../Input';
import Button from '../Button';

function HeaderSearch() {
  const { setRecipesData } = useData();
  const [keyword, setKeyword] = useState('');
  const [searchMode, setSearchMode] = useState('name');
  const [URL, setURL] = useState('');
  const [database, setDatabase] = useState('themealdb');
  const [databaseKey, setDatabaseKey] = useState('meals');
  const [recipeKey, setRecipeKey] = useState('');
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    switch (location.pathname) {
    case '/comidas':
      setDatabase('themealdb');
      setDatabaseKey('meals');
      setRecipeKey('Meal');
      break;
    case '/bebidas':
      setDatabase('thecocktaildb');
      setDatabaseKey('drinks');
      setRecipeKey('Drink');
      break;
    default:
      console.log('Failed to set database!');
    }
    switch (searchMode) {
    case 'ingredient':
      setURL(`https://www.${database}.com/api/json/v1/1/filter.php?i=${keyword}`);
      break;
    case 'name':
      setURL(`https://www.${database}.com/api/json/v1/1/search.php?s=${keyword}`);
      break;
    case 'letter':
      setURL(`https://www.${database}.com/api/json/v1/1/search.php?f=${keyword}`);
      break;
    default:
    }
  }, [searchMode, keyword, database, location.pathname, location]);

  const getRecipes = async () => {
    if (keyword.length > 1 && searchMode === 'letter') {
      const alertMsg = 'Sua busca deve conter somente 1 (um) caracter';
      global.alert(alertMsg);
      return null;
    }
    const max = 12;
    const results = await fetch(URL).then((stuff) => stuff.json());
    if (results[databaseKey] === null) {
      console.log('entrou no null');
      const alertMsg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
      global.alert(alertMsg);
      return null;
    }
    if (results[databaseKey].length === 1) {
      const id = results[databaseKey][0][`id${recipeKey}`];
      let path = '';
      if (recipeKey === 'Meal') path = 'comidas';
      if (recipeKey === 'Drink') path = 'bebidas';
      history.push(`/${path}/${id}`);
    }
    if (results[databaseKey].length > max) results[databaseKey].length = max;
    setRecipesData(results[databaseKey]);
  };

  return (
    <form className="header-search">
      <div>
        <Input
          type="text"
          value={ keyword }
          onChange={ setKeyword }
          testId="search-input"
        />
      </div>
      <div>
        <Input
          type="radio"
          value="ingredient"
          onChange={ setSearchMode }
          name="ingredient"
          checked={ searchMode === 'ingredient' }
          label="Ingrediente"
          testId="ingredient-search-radio"
        />
        <Input
          type="radio"
          value="name"
          onChange={ setSearchMode }
          checked={ searchMode === 'name' }
          name="name"
          label="Nome"
          testId="name-search-radio"
        />
        <Input
          type="radio"
          value="letter"
          onChange={ setSearchMode }
          checked={ searchMode === 'letter' }
          name="letter"
          label="Primeira letra"
          testId="first-letter-search-radio"
        />
      </div>
      <div>
        <Button
          type="button"
          testId="exec-search-btn"
          onClick={ getRecipes }
          disabled={ false }
          name="Buscar"
        />
      </div>
    </form>
  );
}

export default HeaderSearch;
