import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { func, bool, string } from 'prop-types';
import { fetchSearchRecipes, setIngredient } from '../../redux/actions';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import DrinkRecipeCards from './DrinkRecipeCards';
import FiltersRecipesDrinks from './FiltersRecipesDrinks';

function Drinks({ setRecipes, isFetching, selectIngredient, changeIngredient }) {
  const [isMount, setIsMount] = useState(false);
  const PARAMS_NOT_FILTER = { query: '', consultBy: 'name', foodPage: false };
  const FILTER_BY_INGREDIENT = { query: selectIngredient,
    consultBy: 'ingredient',
    foodPage: false };
  const fetchRecipes = () => {
    if (!isMount) {
      setRecipes(selectIngredient ? FILTER_BY_INGREDIENT : PARAMS_NOT_FILTER);
      changeIngredient('');
      setIsMount(true);
    }
  };
  useEffect(fetchRecipes);
  return (
    <>
      <Header title="Bebidas" showButton />
      <FiltersRecipesDrinks />
      {isFetching
        ? <div>Carregando ...</div>
        : <DrinkRecipeCards />}
      <Footer />
    </>
  );
}
Drinks.propTypes = {
  setRecipes: func.isRequired,
  isFetching: bool.isRequired,
  changeIngredient: func.isRequired,
  selectIngredient: string,
};
Drinks.defaultProps = {
  selectIngredient: '',
};
const mapStateToProps = (state) => ({
  isFetching: state.recipesReducer.isFetching,
  selectIngredient: state.recipesReducer.selectIngredient,
});
const mapDispatchToProps = (dispatch) => ({
  setRecipes: (params) => dispatch(fetchSearchRecipes(params)),
  changeIngredient: (ingredient) => dispatch(setIngredient(ingredient)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
