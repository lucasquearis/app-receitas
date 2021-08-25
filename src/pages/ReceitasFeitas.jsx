import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import '../cssPages/ReceitasF.css';
import meals, { drinks } from '../mocks/foodsEdrinks';

function ReceitasFeitas() {
  return (
    <div>
      <Header titulo="Receitas Feitas" pesquisa="false" />
      <div className="buttons">
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>

    </div>
  );
}

export default ReceitasFeitas;
