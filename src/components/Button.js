import React from 'react';
import { Link } from 'react-router-dom';
import { string, func, bool } from 'prop-types';

function Button(props) {
  const { link, testId, name, onClick, disabled } = props;
  if (link !== '') {
    return (
      <div>
        <Link to={ link }>
          <button
            type="button"
            data-testid={ testId }
            onClick={ onClick }
            disabled={ disabled }
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
};

Button.defaultProps = {
  link: '',
  testId: '',
  onClick: null,
};

export default Button;
