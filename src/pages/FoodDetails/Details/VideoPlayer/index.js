import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

import { useDetailsContext } from '../../../../context/DetailsProvider';

export default function VideoPlayer({ strYoutube }) {
  const { type } = useDetailsContext();

  return (
    type === 'food' && (
      <ReactPlayer
        url={ strYoutube }
        controls
        data-testid="video"
      />)
  );
}

VideoPlayer.propTypes = {
  strYoutube: PropTypes.string.isRequired,
};
