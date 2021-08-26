import React from 'react';
import Header from '../components/Header';
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
);

export default Explorer;
