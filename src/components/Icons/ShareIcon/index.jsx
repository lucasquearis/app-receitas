import React from 'react';
import { Image } from 'react-bootstrap';
import copy from 'clipboard-copy';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import share from '../../../images/shareIcon.svg';

function ShareIcon({ onClick, dataTestId, url }) {
  const { pathname } = useLocation();
  const handleClick = () => {
    const copyUrl = url ? `http://localhost:3000${url}` : `http://localhost:3000${pathname}`;
    copy(copyUrl);
    onClick();
  };
  return (
    <button
      type="button"
      onClick={ handleClick }
    >
      <Image
        data-testid={ dataTestId }
        className="header-icon"
        src={ share }
        alt="share-icon"
      />
    </button>
  );
}

ShareIcon.defaultProps = {
  onClick: () => {},
  url: null,
};

ShareIcon.propTypes = {
  onClick: PropTypes.func,
  dataTestId: PropTypes.string.isRequired,
  url: PropTypes.string,
};

export default ShareIcon;
