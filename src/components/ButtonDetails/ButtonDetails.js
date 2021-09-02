import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import './ButtonDetails.css';

const ButtonDetails = ({ id, type }) => {
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
    if (continueRecipe
      && continueRecipe[type]
      && continueRecipe[type][id]) setNameButton('Continuar Receita');
  }, [id, type]);
  const handleClick = () => {
    setRedirect(true);
  };
  if (redirect) return <Redirect to={ `${id}/in-progress` } />;
  return (
    <div className="button-container">
      <Button
        data-testid="start-recipe-btn"
        className={ stateButton }
        onClick={ handleClick }
        variant="success"
      >
        {nameButton}
      </Button>
    </div>
  );
};

ButtonDetails.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ButtonDetails;
