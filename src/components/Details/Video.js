import React from 'react';
import { string } from 'prop-types';

export default function Video(props) {
  const { src } = props;
  let url = '';
  if (src) url = src.replace('watch?v=', 'embed/');
  return (
    <div>
      <h5 style={ { margin: '5px 0' } }>Video</h5>
      <iframe
        width="350"
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
        style={ { borderRadius: '6px' } }
      />
    </div>
  );
}

Video.propTypes = {
  src: string.isRequired,
};
