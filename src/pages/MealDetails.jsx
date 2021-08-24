import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function MealDetails() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'CLEAR' });
  }, [dispatch]);
  return (
    <div>
      Tela de detalhes de uma receita de comida
    </div>
  );
}

export default MealDetails;
