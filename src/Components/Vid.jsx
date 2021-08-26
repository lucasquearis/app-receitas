import React from 'react';

function Vid(props) {
  return (
    <video controls>
      <source { ...props } />
      <track kind="captions" />
    </video>
  );
}
export default Vid;
