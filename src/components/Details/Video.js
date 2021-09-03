import React from 'react';
import { string } from 'prop-types';

export default function Video(props) {
  const { src } = props;
  return (
    <div>
      <h2>Video</h2>
      <iframe title="video" width="420" height="315" src={ src } data-testid="video" />
    </div>
  );
}

Video.propTypes = {
  src: string.isRequired,
};
