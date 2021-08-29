import React from 'react';
import PropTypes from 'prop-types';

export default function Video(props) {
  const { url, title } = props;
  const correctUrl = url.replace('watch?v=', 'embed/');
  return (
    <iframe
      className="recipe-video"
      data-testid="video"
      title={ title }
      width="420"
      height="315"
      src={ correctUrl }
    />);
}
Video.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
