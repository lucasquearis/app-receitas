import React from 'react';
import Header from '../components/Header/Header';

const Drinks = (props) => {
  console.log(props);
  return (
    <>
      <Header page="drinks" />
      <h1>Im Drinks</h1>
    </>
  );
};

export default Drinks;
