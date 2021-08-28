import React, { useContext, useEffect, useState } from 'react';
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
  type,
}) {
  const { selectedCategory,
    setSelectedCategory,
    setShowBar,
    recipes,
    setRecipes } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getApiData = async () => {
      try {
        const recipesList = await fetchApi(listEndPoint);
        setRecipes(recipesList[type]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    const getCategories = async () => {
      try {
        const categoriesList = await fetchApi(categoriesEndPoint);
        setCategories(categoriesList[type]);
      } catch (error) {
        console.log(error);
      }
    };

    setIsLoading(true);

    getApiData();
    getCategories();

    return () => {
      setSelectedCategory('');
      setShowBar(false);
    };
  }, [
    categoriesEndPoint,
    getByCategoryEndPoint,
    listEndPoint,
    setSelectedCategory,
    setShowBar,
    type,
    setRecipes,
  ]);

  useEffect(() => {
    const getApiData = async () => {
      try {
        let endPoint = listEndPoint;
        if (selectedCategory) endPoint = `${getByCategoryEndPoint}${selectedCategory}`;
        const recipesList = await fetchApi(endPoint);
        setRecipes((recipesList[type]) ? recipesList[type] : []);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    setIsLoading(true);

    getApiData();
  }, [getByCategoryEndPoint, listEndPoint, selectedCategory, type, setRecipes]);

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
  type: PropTypes.string.isRequired,
};

export default Principal;
