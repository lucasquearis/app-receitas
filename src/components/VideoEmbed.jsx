import React from 'react';
import '../cssPages/Detalhes.css';

function VideoEmbed(videoData) {
  const { url, recipeName } = videoData;
  const allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;'
      + 'picture-in-picture';

  if (!url) return null;

  return (
    <iframe
      height="480"
      width="853"
      src={ url.replace('/watch?v=', '/embed/') }
      frameBorder="0"
      allow={ allow }
      allowFullScreen
      ng-show="showvideo"
      title={ `${recipeName} Video` }
      data-testid="video"
    />
  );
}

export default VideoEmbed;
