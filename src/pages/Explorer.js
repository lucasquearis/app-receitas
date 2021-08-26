import React from 'react';
import Header from '../components/Header';
<<<<<<< HEAD
import Button from '../components/Button';

const Explorer = () => (
  <div>
    <Header title="Explorar" />
    <Button
      className="explore-food"
      buttonText="Explorar Comidas"
      type="button"
      isDisable={ false }
      onClick
      pathname="/explorar/comidas"
    />
    <Button
      className="explore-drinks"
      buttonText="Explorar Bebidas"
      type="button"
      isDisable={ false }
      onClick
      pathname="/explorar/bebidas"
    />
  </div>
=======

const Explorer = () => (
  <Header title="Explorar" />
>>>>>>> main-group-11
);

export default Explorer;
