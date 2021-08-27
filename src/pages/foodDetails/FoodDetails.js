import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import HeaderDetails from '../../components/HeaderDetails/HeaderDetails';
import IngredientsDetails from '../../components/IngredientsDetails/IngredientsDetails';
import Instructions from '../../components/InstructionsDetails/InstructionsDetails';
import VideoDetails from '../../components/VideoDetails/VideoDetails';
import Recomendation from '../../components/Recomentation/Recomendation';
import './FoodDetails.css';
import ButtonDetails from '../../components/ButtonDetails/ButtonDetails';

const FoodDetails = ({ match: { params: id } }) => {
  const [meal, setMeal] = useState(0);
  const [recomendation, setRecomendation] = useState(0);
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
  }, [id.id]);
  if (!meal) return <Spinner animation="border" />;
  const { strMeal, strMealThumb, strCategory, strInstructions, strYoutube } = meal;
  return (
    <div>
      <HeaderDetails title={ strMeal } image={ strMealThumb } category={ strCategory } />
      <IngredientsDetails recipe={ meal } />
      <Instructions instruction={ strInstructions } />
      <VideoDetails linkVideo={ strYoutube } />
      <Recomendation list={ recomendation } type="Drink" />
      <ButtonDetails id={ id.id } type="meals" />
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
