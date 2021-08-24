import React from 'react';
import { string } from 'prop-types';

function Title(props) {
  let { title } = props;
  title = title.replace('/', '').replace('-', ' ');
  if (title) title = (title[0].toUpperCase() + title.substr(1));
  return <div>{title}</div>;
}

Title.propTypes = {
  title: string.isRequired,
};
export default Title;
