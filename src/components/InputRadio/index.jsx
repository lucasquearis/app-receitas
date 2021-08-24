import React from 'react';
import PropTypes from 'prop-types';

import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function InputRadio({ value, label, ...rest }) {
  return (
    <FormControlLabel value={ value } control={ <Radio { ...rest } /> } label={ label } />
  );
}

InputRadio.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default InputRadio;
