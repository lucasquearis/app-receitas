import React from 'react';
import PropTypes from 'prop-types';

const VideoDetails = ({ linkVideo }) => (
  <div>
    {linkVideo}
  </div>
);

VideoDetails.propTypes = {
  linkVideo: PropTypes.string.isRequired,
};

export default VideoDetails;
