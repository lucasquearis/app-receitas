import React from 'react';
import PropTypes from 'prop-types';

const VideoDetails = ({ linkVideo }) => {
  const newLink = linkVideo.replace('watch?v=', 'embed/');
  console.log(linkVideo);
  return (
    <div className="component-details">
      <h1>Video</h1>
      {/** iframe retirado do próprio youtube,
      indo em um video, clicando em "compartilhar", escolhendo a opção "incorporar". */}
      <iframe
        width="340"
        height="160"
        src={ newLink }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
        autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
VideoDetails.propTypes = {
  linkVideo: PropTypes.string.isRequired,
};

export default VideoDetails;
