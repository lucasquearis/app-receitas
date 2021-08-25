import React from 'react';
import MenuInferior from '../components/MenuInferior';
import Header from '../components/Header';

export default function Foods() {
  return (
    <div>
      <Header name="Comidas" search />
      <MenuInferior />
    </div>
  );
}
