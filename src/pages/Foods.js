import React from 'react';
import MenuInferior from '../components/MenuInferior';
import Header from '../components/Header';

export default function Foods() {
  return (
    <main>
      <Header title="Comidas" name="meal" search />
      <MenuInferior />
    </main>
  );
}
