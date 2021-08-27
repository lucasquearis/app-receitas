import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import Footer from '../../components/Footer';
import getRecipes from '../../redux/actions/getRecipes';
import Header from '../../components/Header';
import DrinkRecipeCards from './DrinkRecipeCards';
import { fetchSearchDrinksApi } from '../../services/fetchApi';
import FiltersRecipesDrinks from './FiltersRecipesDrinks';

function Drinks({ setRecipes }) {
  const [isMount, setIsMount] = useState(false);

  function mountRecipes() {
    const fetchApi = async () => {
      if (!isMount) {
        const recipes = await fetchSearchDrinksApi('name', '');
        setRecipes(recipes);
        setIsMount(true);
      }
    };
    fetchApi();
  }

  useEffect(mountRecipes);
  return (
    <>
      <Header title="Bebidas" showButton />
      <FiltersRecipesDrinks />
      <DrinkRecipeCards />
      <Footer />
    </>
  );
}

Drinks.propTypes = {
  setRecipes: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setRecipes: (recipes) => dispatch(getRecipes(recipes)),
});

export default connect(null, mapDispatchToProps)(Drinks);
