import React from 'react';
import { string } from 'prop-types';

const Iframe = (props) => {
  const { link } = props;

  const convertVideoLink = () => {
    const stringLink = link;
    const re = 'watch?v=';
    const convertedLink = stringLink.replace(re, 'embed/');
    return convertedLink;
  };

  const convertedLink = convertVideoLink();

  return (
    <iframe
      title="Video"
      data-testid="video"
      width="420"
      height="315"
      frameBorder="0"
      allowFullScreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
      src={ convertedLink }
    />
  );
};

Iframe.propTypes = {
  link: string,
}.isRequired;

export default Iframe;
