import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './myContext';

function RecipesProvider({ children }) {
  const [favorite, setFavorite] = useState({});
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(false);
  const [keyType, setKeysType] = useState('');
  const [url, setUrl] = useState();
  const [categoryClick, setCategoryClick] = useState([]);
  const [lists, setLists] = useState({
    ingredients: [],
    measure: [],
  });

  const providerState = {
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
    categoryClick,
  };

  useEffect(() => {
    const renderCategoryFilter = async (category) => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();
        setCategoryClick(data);
      } catch (error) {
        console.log(error);
      }
    };
    renderCategoryFilter();
  });

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
      const ingFilter = Object.keys(recipe).filter(
        (recipes) => recipes.includes('Ingredient'),
      );
      const ingList = ingFilter.map((key) => recipe[key]);
      const measureFilter = Object.keys(recipe).filter(
        (recipes) => recipes.includes('Measure'),
      );
      const measureList = measureFilter.map((key) => recipe[key]);
      setLists({
        ...lists,
        ingredients: ingList.filter((item) => item),
        measure: measureList.filter((item) => item),
      });
    };
    const correctUrl = () => {
      const youtubeURL = recipe.strYoutube;
      if (youtubeURL) setUrl(youtubeURL.replace('watch?v=', 'embed/'));
    };

    correctUrl();
    filterIngredients();
  }, [recipe]);

  return (
    <myContext.Provider value={ providerState }>
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
