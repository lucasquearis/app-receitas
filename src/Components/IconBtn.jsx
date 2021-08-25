import { Button } from '@material-ui/core';
import React from 'react';

function IconBtn(props) {
  return (
    <Button { ...props }><props.icon /></Button>
  );
}

export default IconBtn;
