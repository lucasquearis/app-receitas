import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import getRecipes from '../../redux/actions/getRecipes';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import FoodRecipeCards from './FoodRecipeCards';
import { fetchSearchFoodsApi } from '../../services/fetchApi';
import FiltersRecipesFoods from './FiltersRecipesFoods';

function Foods({ setRecipes }) {
  const [isMount, setIsMount] = useState(false);

  function mountRecipes() {
    const fetchApi = async () => {
      if (!isMount) {
        const recipes = await fetchSearchFoodsApi('name', '');
        setRecipes(recipes);
        setIsMount(true);
      }
    };
    fetchApi();
  }

  useEffect(mountRecipes);

  return (
    <>
      <Header title="Comidas" showButton foodPage />
      <FiltersRecipesFoods />
      <FoodRecipeCards />
      <Footer />
    </>
  );
}
Foods.propTypes = {
  setRecipes: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setRecipes: (recipes) => dispatch(getRecipes(recipes)),
});

export default connect(null, mapDispatchToProps)(Foods);
