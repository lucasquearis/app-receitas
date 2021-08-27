import React from 'react';
import Button from '../Button';

function ButtonsExplore() {
  return (
    <div className="container">

      <Button
        link="/explorar/comidas"
        className="myButton"
        testId="explore-food"
        type="button"
        name="Explorar Comidas"
      />

      <Button
        link="/explorar/bebidas"
        className="myButton2"
        testId="explore-drinks"
        type="button"
        name="Explorar Bebidas"
      />
    </div>
  );
}

export default ButtonsExplore;
