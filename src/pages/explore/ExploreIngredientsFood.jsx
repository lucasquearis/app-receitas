import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { Redirect } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import IngredientsCard from '../../components/IngredientsCard';
import { fetchIngredientsFoodsApi } from '../../services/fetchApi';
import { setIngredient } from '../../redux/actions';
import './exploreIngredientsFood.css';
import Loading from '../../components/Loading';

function ExploreIngredientsFood({ changeIngredient }) {
  const [isMount, setIsMount] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [arrIngredients, setArrIngredients] = useState([]);
  const MAX_INDEX = 12;

  const fetchIngredients = async () => {
    const ingredients = await fetchIngredientsFoodsApi();
    setIsMount(true);
    setIsLoading(false);
    setArrIngredients(ingredients);
  };

  const filterForIngredient = (ingredient) => {
    changeIngredient(ingredient);
    setRedirect(true);
  };

  useEffect(() => {
    if (!isMount) {
      fetchIngredients();
    }
  });
  if (redirect) return <Redirect to="/comidas" />;
  if (isLoading) return <Loading />;

  return (
    <>
      <Header title="Explorar Ingredientes" />
      <div className="container-explore-ingredients">
        {arrIngredients.slice(0, MAX_INDEX).map(({ strIngredient }, index) => (
          <IngredientsCard
            key={ strIngredient }
            index={ index }
            name={ strIngredient }
            isFood
            onClick={ () => filterForIngredient(strIngredient) }
          />))}
      </div>
      <Footer />
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  changeIngredient: (ingredient) => dispatch(setIngredient(ingredient)),
});

ExploreIngredientsFood.propTypes = {
  changeIngredient: func.isRequired,
};

export default connect(null, mapDispatchToProps)(ExploreIngredientsFood);
