import React, { useContext, useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import EstruturaPrincipal from '../../components/EstruturaPrincipal';
import AppContext from '../../context/AppContext';
import {
  fetchApi,
} from '../../services';

function Principal({
  listEndPoint,
  categoriesEndPoint,
  getByCategoryEndPoint,
  getByIngredientsEndPoint,
  type,
}) {
  const { selectedCategory,
    selectedIngredient,
    setShowBar,
    setSelectedCategory,
    setSelectedIngredient,
    recipes,
    setRecipes } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesList = await fetchApi(categoriesEndPoint);
        setCategories(categoriesList[type]);
      } catch (error) {
        console.log(error);
      }
    };

    setIsLoading(true);

    getCategories();

    return () => {
      setSelectedCategory('');
      setSelectedIngredient('');
      setShowBar(false);
    };
  }, [
    categoriesEndPoint,
    getByCategoryEndPoint,
    listEndPoint,
    setSelectedCategory,
    setSelectedIngredient,
    setShowBar,
    type,
    setRecipes,
  ]);

  useEffect(() => {
    const getApiData = async () => {
      try {
        let endPoint = listEndPoint;
        if (selectedCategory) {
          endPoint = `${getByCategoryEndPoint}${selectedCategory}`;
        } else if (selectedIngredient) {
          endPoint = `${getByIngredientsEndPoint}${selectedIngredient}`;
        }
        const recipesList = await fetchApi(endPoint);
        setRecipes((recipesList[type]) ? recipesList[type] : []);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    setIsLoading(true);

    getApiData();
  }, [
    getByCategoryEndPoint,
    getByIngredientsEndPoint,
    listEndPoint,
    selectedCategory,
    selectedIngredient,
    setRecipes,
    type,
  ]);

  return (
    <EstruturaPrincipal
      isLoading={ isLoading }
      categoriesList={ categories }
      recipes={ recipes }
      selectedCategory={ selectedCategory }
      setSelectedCategory={ setSelectedCategory }
    />
  );
}

Principal.propTypes = {
  listEndPoint: PropTypes.string.isRequired,
  categoriesEndPoint: PropTypes.string.isRequired,
  getByCategoryEndPoint: PropTypes.string.isRequired,
  getByIngredientsEndPoint: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Principal;
