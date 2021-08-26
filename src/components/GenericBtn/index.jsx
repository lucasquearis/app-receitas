import React from 'react';
import PropTypes from 'prop-types';

class GenericBtn extends React.Component {
  render() {
    const { value, disabled, onClick } = this.props;

    return (
      <button
        type="button"
        disabled={ disabled }
        onClick={ onClick }
      >
        {value}
      </button>
    );
  }
}

GenericBtn.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
}.isRequired;

export default GenericBtn;
