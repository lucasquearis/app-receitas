import React from 'react';

export default function Explorar() {
  return (
    <div>
      <button
        data-testid="explore-food"
      >
        Explorar Comidas 
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
      >
        Explorar Bebidas
      </button>
    </div>
  );
}
