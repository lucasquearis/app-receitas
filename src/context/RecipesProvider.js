// vitals
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// context
import myContext from './myContext';
// API
import getFoodByIngredient from '../services/foodAPI';

function RecipesProvider({ children }) {
  const [searchValues, setSearchValues] = useState({
    textValue: '', radioValue: 'ingredient', pathName: '/comidas' });
  const [filteredMealsOrDrinks, setFilteredMealsOrDrinks] = useState(false);
  const [infoUser, setInfoUser] = useState({ email: '', password: '' });
  const [favorite, setFavorite] = useState({});
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(false);
  const [keyType, setKeysType] = useState('');
  const [url, setUrl] = useState();
  const [lists, setLists] = useState({
    ingredients: [],
    measure: [],
  });

  const globalState = {
    url,
    lists,
    keyType,
    setKeysType,
    recipe,
    setRecipe,
    loading,
    setLoading,
    favorite,
    setFavorite,
    infoUser,
    setInfoUser,
    setSearchValues,
    filteredMealsOrDrinks,
  };
  useEffect(() => {
    const favoriteClick = () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify([{
        id: '',
        type: '',
        area: '',
        category: '',
        alcoholicOrNot: '',
        name: '',
        image: '',
        doneDate: '',
        tags: '',
      }]));
    };

    favoriteClick();
  }, []);

  useEffect(() => {
    const filterIngredients = () => {
      const keys = Object.keys(recipe).filter((key) => key.includes('Ingredient'));
      const list = keys.map((key) => recipe[key]);
      const measureQnt = Object.keys(recipe).filter((key) => key.includes('Measure'));
      const measureList = measureQnt.map((key) => recipe[key]);
      setLists({
        ...lists,
        ingredients: list.filter((item) => item),
        measure: measureList.filter((item) => item),
      });
    };
    const correctUrl = () => {
      const ytUrl = recipe.strYoutube;
      if (ytUrl) setUrl(ytUrl.replace('watch?v=', 'embed/'));
    };

    correctUrl();
    filterIngredients();
  }, [recipe]);

  useEffect(() => {
    const resultFilter = async () => {
      const result = await getFoodByIngredient(searchValues);
      setFilteredMealsOrDrinks(result);
    };
    resultFilter();
  },
  [searchValues]);

  useEffect(() => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: infoUser.email }));
  }, [infoUser]);

  return (
    <myContext.Provider value={ globalState }>
      {children}
    </myContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RecipesProvider;
