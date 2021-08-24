import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

function Inp({ testid, name, handleInput }) {
  const props = {
    name,
    inputProps: {
      'data-testid': testid,
    },
    label: name,
    variant: 'outlined',
    type: name,
    onChange: handleInput,
  };
  return (
    <TextField { ...props } />
  );
}

Inp.propTypes = {
  testid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
};

export default Inp;
