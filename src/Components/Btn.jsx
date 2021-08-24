import { Button } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

function Btn({ testid, name, disabled, handleClick }) {
  const props = {
    name,
    'data-testid': testid,
    type: 'button',
    variant: 'contained',
    disabled,
    onClick: handleClick,
  };
  return (
    <Button { ...props }>{name}</Button>
  );
}

Btn.propTypes = {
  testid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Btn;
