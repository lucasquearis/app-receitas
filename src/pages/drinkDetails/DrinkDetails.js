import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import HeaderDetails from '../../components/HeaderDetails/HeaderDetails';
import IngredientsDetails from '../../components/IngredientsDetails/IngredientsDetails';
import Instructions from '../../components/InstructionsDetails/InstructionsDetails';
import Recomendation from '../../components/Recomentation/Recomendation';
import ButtonDetails from '../../components/ButtonDetails/ButtonDetails';

const DrinkDetails = ({ match: { params: id } }) => {
  const [drink, setDrink] = useState(0);
  const [recomendation, setRecomendation] = useState(0);
  useEffect(() => {
    const fetchRemomendation = () => {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((resolve) => resolve.json())
        .then((resolve) => setRecomendation(resolve.meals));
    };
    fetchRemomendation();
  }, []);
  useEffect(() => {
    const fetchDrink = () => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id.id}`)
        .then((resolve) => resolve.json())
        .then((resolve) => setDrink(resolve.drinks[0]));
    };
    fetchDrink();
  }, [id.id]);
  if (!drink) return <Spinner animation="border" />;
  const { strDrink, strDrinkThumb, strAlcoholic, strInstructions } = drink;
  return (
    <div>
      <HeaderDetails
        title={ strDrink }
        image={ strDrinkThumb }
        category={ strAlcoholic }
      />
      <IngredientsDetails recipe={ drink } />
      <Instructions instruction={ strInstructions } />
      <Recomendation list={ recomendation } type="Meal" />
      <ButtonDetails id={ id.id } type="cocktails" rota="bebidas" />
    </div>
  );
};

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DrinkDetails;
