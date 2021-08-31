import React from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import { Form } from 'react-bootstrap';

function RadiosButton(props) {
  const { handleChange, radios, value, name } = props;

  return (
    <>
      {
        radios.map((radio) => {
          const { textId = '', valueRadio } = radio;

          return (
            <Form.Check
              key={ v4() }
              data-testid={ textId }
              type="radio"
              id={ textId }
              label={ valueRadio }
              checked={ value === valueRadio }
              onChange={ handleChange }
              value={ valueRadio }
              name={ name }
            />
          );
        })
      }
    </>
  );
}

const { func, string, arrayOf, objectOf } = PropTypes;
RadiosButton.propTypes = {
  handleChange: func.isRequired,
  name: string.isRequired,
  radios: arrayOf(objectOf(string)).isRequired,
  value: string.isRequired,
};

export default RadiosButton;
