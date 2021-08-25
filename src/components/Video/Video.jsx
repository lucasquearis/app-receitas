import React from 'react';
import propTypes from 'prop-types';

function Video({ recipe }) {
  const videoURL = recipe.strYoutube.replace('watch?v=', 'embed/');
  return (
    <iframe
      data-testid="video"
      src={ videoURL }
      title="teste"
      width="320"
      height="220"
      frameBorder="0"
      allowFullScreen
    />
  );
}

Video.propTypes = {
  recipe: propTypes.shape({
    strYoutube: propTypes.string,
  }).isRequired,
};

export default Video;
