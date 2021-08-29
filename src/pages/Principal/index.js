import React, { useContext, useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import {
  fetchApi,
} from '../../services';

import Header from '../../components/Header';
import RecipesList from '../../components/RecipesList';
import MenuInferior from '../../components/MenuInferior';
import BarraDeBusca from '../../components/BarraDeBusca';
import BarraCategorias from '../../components/BarraCategorias';

function Principal({
  listEndPoint,
  categoriesEndPoint,
  getByCategoryEndPoint,
  getByIngredientsEndPoint,
  type,
}) {
  const { pathname } = useHistory();
  const {
    selectedCategory,
    selectedIngredient,
    setIsLoading,
    setRecipes,
    setSelectedCategory,
    setSelectedIngredient,
    setShowBar,
    showBar,
  } = useContext(AppContext);

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
    setIsLoading,
    setRecipes,
    setSelectedCategory,
    setSelectedIngredient,
    setShowBar,
    type,
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
    setIsLoading,
    selectedCategory,
    selectedIngredient,
    setRecipes,
    type,
  ]);

  const renderBars = () => {
    if (showBar) return <BarraDeBusca />;
    return (<BarraCategorias
      categoriesList={ categories }
      whatIsTheType={ pathname }
    />);
  };

  return (
    <>
      <Header
        showSearchBtn
      />
      { renderBars() }
      <RecipesList />
      <MenuInferior />
    </>
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
