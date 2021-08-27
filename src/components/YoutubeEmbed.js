// conteúdo aprendido em https://dev.to/bravemaster619/simplest-way-to-embed-a-youtube-video-in-your-react-app-3bk2
import React from 'react';
import PropTypes from 'prop-types';

const YoutubeEmbed = ({ videoId }) => (
  <iframe
    allow="accelerometer; picture-in-picture; encrypted-media; clipboard-write"
    allowFullScreen
    data-testid="video"
    frameBorder="0"
    height="480"
    src={ `https://www.youtube.com/embed/${videoId}` }
    title="Youtube Video"
    width="853"
  />
);

YoutubeEmbed.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
