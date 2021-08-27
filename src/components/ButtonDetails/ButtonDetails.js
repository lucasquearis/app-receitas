import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

const ButtonDetails = ({ id, type, rota }) => {
  const [stateButton, setStateButton] = useState('start-button');
  const [nameButton, setNameButton] = useState('Começar Receita');
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipe) {
      const findRecipe = doneRecipe.find((done) => done.id === id);
      if (findRecipe) setStateButton('start-button-none');
    }
    const continueRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(continueRecipe);
    console.log(id);
    console.log(type);
    if (continueRecipe
      && continueRecipe[type]
      && continueRecipe[type][id]) setNameButton('Continuar Receita');
  }, [id, type]);
  const handleClick = () => {
    setRedirect(true);
  };
  if (redirect) return <Redirect to={ `${rota}/${id}/in-progress ` } />;
  return (
    <Button
      data-testid="start-recipe-btn"
      className={ stateButton }
      onClick={ handleClick }
    >
      {nameButton}
    </Button>
  );
};

ButtonDetails.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  rota: PropTypes.string.isRequired,
};

export default ButtonDetails;
