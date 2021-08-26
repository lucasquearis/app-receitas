import React from 'react';
import PropTypes from 'prop-types';

import './Video.css';

function Video({ src }) {
  const INDEX_START_CODE = 32;
  const videoCode = src && src.slice(INDEX_START_CODE);
  return (
    <div>
      <h3>Video</h3>
      <iframe
        className="video"
        data-testid="video"
        title="recipe-video"
        src={ `http://www.youtube.com/embed/${videoCode}` }
        allowFullScreen
      />

    </div>
  );
}

Video.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Video;
