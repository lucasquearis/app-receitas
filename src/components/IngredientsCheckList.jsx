import React from 'react';
import PropTypes from 'prop-types';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function IngredientsCheckList({ steps, handleCheck }) {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Ingredients</FormLabel>
      <FormGroup>
        {steps.map((step, index) => (
          <FormControlLabel
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            control={
              <Checkbox
                checked={ step.checked }
                name={ step.ingredient }
                onClick={ () => handleCheck(index) }
              />
            }
            label={ `${step.ingredient} - ${step.measure}` }
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

IngredientsCheckList.propTypes = {
  handleCheck: PropTypes.func.isRequired,
  steps: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default IngredientsCheckList;
