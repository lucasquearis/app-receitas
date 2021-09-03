import React from 'react';
import loadingGif from '../images/loading.gif';

function Loading() {
  return (
    <div className="main-details">
      <div className="loadingContainer">
        <img className="loadingGif" src={ loadingGif } alt="Loading..." />
      </div>
    </div>
  );
}

export default Loading;
