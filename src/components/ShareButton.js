import React from 'react';
import { Link } from 'react-router-dom';
import { string, func, bool, objectOf } from 'prop-types';

function Button(props) {
  const { link, testId, name, onClick, disabled, style } = props;
  if (link !== '') {
    return (
      <div>
        <Link to={ link }>
          <button
            type="button"
            data-testid={ testId }
            onClick={ onClick }
            disabled={ disabled }
            style={ style }
          >
            { name }
          </button>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <button
        type="button"
        data-testid={ testId }
        onClick={ onClick }
        disabled={ disabled }
        style={ style }
      >
        { name }
      </button>
    </div>
  );
}

Button.propTypes = {
  link: string,
  testId: string,
  name: string.isRequired,
  onClick: func,
  disabled: bool.isRequired,
  style: objectOf(string),
};

Button.defaultProps = {
  link: '',
  testId: '',
  onClick: null,
  style: {},
};

export default Button;
