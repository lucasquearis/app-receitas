import React, { useContext } from 'react';
import myContext from '../context/myContext';

export default function Intructions() {
  const { recipe } = useContext(myContext);
  const key = 'strInstructions';
  if (!recipe) return '';
  return (
    <div className="instructions-container">
      <h3 className="title-instructions">Instruções</h3>
      <p
        data-testid="instructions"
        className="instructions"
      >
        { recipe[key] }
      </p>
    </div>
  );
}
