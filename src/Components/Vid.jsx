import React from 'react';

function Vid(props) {
  return (
    <iframe title="video" { ...props } />
  );
}
export default Vid;
