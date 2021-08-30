import React from 'react';
import PropTypes from 'prop-types';

function GenericBtn({ dataId, disabled, value, onClick }) {
  return (
    <button
      type="button"
      data-testid={ dataId }
      disabled={ disabled }
      onClick={ onClick }
    >
      {value}
    </button>
  );
}

GenericBtn.propTypes = {
  dataId: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
}.isRequired;

export default GenericBtn;
