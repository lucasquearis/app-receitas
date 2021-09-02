import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default function SubmitButton(props) {
  const { className, disabled, id, name, onClick, testId, text } = props;
  return (
    <Button
      className={ className }
      data-testid={ testId }
      disabled={ disabled }
      id={ id }
      name={ name }
      onClick={ onClick }
      type="submit"
    >
      { text }
    </Button>
  );
}

SubmitButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  testId: PropTypes.string,
  text: PropTypes.string.isRequired,
};

SubmitButton.defaultProps = {
  className: '',
  disabled: false,
  testId: '',
};
