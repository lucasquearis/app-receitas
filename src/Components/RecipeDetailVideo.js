import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function RecipeDetailVideo({ videoSource }) {
  const [videoID, setVideoID] = useState('');

  useEffect(() => {
    if (videoSource !== undefined) {
      setVideoID((videoSource.split('='))[1]);
    }
  }, [videoSource]);

  return (
    <div className="videoContainer">
      <h3>Video</h3>
      <iframe
        data-testid="video"
        width="100%"
        src={ `https://www.youtube.com/embed/${videoID}` }
        frameBorder="0"
        allow="accelerometer;
        autoplay; clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}

RecipeDetailVideo.propTypes = {
  videoSource: PropTypes.string.isRequired,
};

export default RecipeDetailVideo;
