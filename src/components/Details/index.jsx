import React from 'react';
import PropTypes from 'prop-types';

import InProgress from './InProgress';
import DetailsComp from './Details';

function Details({ type, routeParams }) {
  if (routeParams[1] === 'in-progress') {
    return <InProgress type={ type } routeParams={ routeParams } />;
  }
  return <DetailsComp type={ type } routeParams={ routeParams } />;
}

Details.propTypes = {
  type: PropTypes.string.isRequired,
  routeParams: PropTypes.arrayOf(String).isRequired,
};

export default Details;
