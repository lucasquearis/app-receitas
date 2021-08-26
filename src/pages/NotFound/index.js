import React from 'react';
import { useHistory } from 'react-router-dom';

export default function NotFound() {
  const history = useHistory();

  const fiveSeconds = 5000;
  setTimeout(() => history.push('/comidas'), fiveSeconds);

  return <h1>Not Found</h1>;
}
