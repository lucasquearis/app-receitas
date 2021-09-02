import React from 'react';
import { string } from 'prop-types';

export default function Video(props) {
  const { src } = props;
  let url = '';
  if (src) url = src.replace('watch?v=', 'embed/');

  return (
    <div>
      <h2>Video</h2>
      <iframe
        width="360"
        height="250"
        src={ url }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture"
        allowFullScreen
        data-testid="video"
        style={ { 'border-radius': '6px' } }
      />
    </div>
  );
}

Video.propTypes = {
  src: string.isRequired,
};
