import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function Redirecting(props) {
  const { match } = props;
  const { id, type } = match.params;
  return (
    <Redirect to={ `/${type}/${id}` } />
  );
}

Redirecting.propTypes = {
  match: PropTypes.arrayOf([
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ]).isRequired,
};

export default Redirecting;
