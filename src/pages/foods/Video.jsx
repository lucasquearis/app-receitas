import React from 'react';
import { string } from 'prop-types';

export default function Video({ src }) {
  const allow = `accelerometer; autoplay; clipboard-write; 
  encrypted-media; gyroscope; picture-in-picture`;
  const videoReplace = src
    ? src.replace(/watch\?v=/, 'embed/') : '';

  return (
    <section>
      <iframe
        src={ videoReplace }
        title="YouTube video player"
        frameBorder="0"
        allow={ allow }
        allowFullScreen
        data-testid="video"
      />
    </section>
  );
}

Video.propTypes = {
  src: string.isRequired,
};
