import React from 'react';
import loadingIcon from '../../images/loadingIcon.svg';

const Loading = () => (
  <div className="d-flex justify-content-center align-items-center list">
    <img
      src={ loadingIcon }
      alt="Carregando..."
      className="m-auto"
    />
  </div>
);

export default Loading;
