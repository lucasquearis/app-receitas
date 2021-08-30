import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { func, bool } from 'prop-types';
import { fetchSearchRecipes } from '../../redux/actions';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import FoodRecipeCards from './FoodRecipeCards';
import FiltersRecipesFoods from './FiltersRecipesFoods';

const PARAMS_NOT_FILTER = { query: '', consultBy: 'name', foodPage: true };

function Foods({ setRecipes, isFetching }) {
  const [isMount, setIsMount] = useState(false);

  const fetchRecipes = () => {
    if (!isMount) {
      setRecipes();
      setIsMount(true);
    }
  };

  useEffect(fetchRecipes);

  return (
    <>
      <Header title="Comidas" showButton foodPage />
      <FiltersRecipesFoods />
      {isFetching
        ? <div>Carregando ...</div>
        : <FoodRecipeCards />}
      <Footer />
    </>
  );
}

Foods.propTypes = {
  setRecipes: func.isRequired,
  isFetching: bool.isRequired,
};

const mapStateToProps = (state) => ({
  isFetching: state.recipesReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  setRecipes: () => dispatch(fetchSearchRecipes(PARAMS_NOT_FILTER)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
