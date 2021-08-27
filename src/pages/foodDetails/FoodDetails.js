import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Spinner } from 'react-bootstrap';
import HeaderDetails from '../../components/HeaderDetails/HeaderDetails';
import IngredientsDetails from '../../components/IngredientsDetails/IngredientsDetails';
import Instructions from '../../components/InstructionsDetails/InstructionsDetails';
import VideoDetails from '../../components/VideoDetails/VideoDetails';
import Recomendation from '../../components/Recomentation/Recomendation';
import './FoodDetails.css';

const FoodDetails = ({ match: { params: id } }) => {
  const [meal, setMeal] = useState(0);
  const [recomendation, setRecomendation] = useState(0);
  const [stateButton, setStateButton] = useState('start-button');
  useEffect(() => {
    const fetchRemomendation = () => {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((resolve) => resolve.json())
        .then((resolve) => setRecomendation(resolve.drinks));
    };
    fetchRemomendation();
  }, []);
  useEffect(() => {
    const fecthDetails = () => {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id.id}`)
        .then((response) => response.json())
        .then((response) => setMeal(response.meals[0]));
    };
    fecthDetails();
    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipe) {
      const findRecipe = doneRecipe.find((done) => done.id === id.id);
      if (findRecipe) setStateButton('start-button-none');
    }
  }, [id.id]);
  if (!meal) return <Spinner animation="border" />;
  const { strMeal, strMealThumb, strCategory, strInstructions, strYoutube } = meal;
  console.log(stateButton);
  return (
    <div>
      <HeaderDetails title={ strMeal } image={ strMealThumb } category={ strCategory } />
      <IngredientsDetails recipe={ meal } />
      <Instructions instruction={ strInstructions } />
      <VideoDetails linkVideo={ strYoutube } />
      <Recomendation list={ recomendation } type="Drink" />
      <Button
        data-testid="start-recipe-btn"
        className={ stateButton }
      >
        Começar Receita
      </Button>
    </div>
  );
};

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FoodDetails;
