import { Button } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

function Btn(props) {
  const { name } = props;
  return (
    <Button { ...props }>{name}</Button>
  );
}

Btn.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Btn;
