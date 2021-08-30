import React from 'react';
import PropTypes from 'prop-types';

export default function Video({ video }) {
  return (
    <section data-testid="video">
      <h2>Video</h2>
      <video width="320" height="240" controls data-testid="video">
        <source src={ video } type="video/mp4" />
        <track src={ video } kind="captions" srcLang="en" label="English" />
      </video>
    </section>
  );
}

Video.propTypes = {
  video: PropTypes.string.isRequired,
};
