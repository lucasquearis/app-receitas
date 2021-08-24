import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function DrinkDetails() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'CLEAR' });
  }, [dispatch]);
  return (
    <div>
      Tela de detalhes de uma receita de bebida
    </div>
  );
}

export default DrinkDetails;
