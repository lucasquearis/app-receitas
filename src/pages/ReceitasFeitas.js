import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';

function ReceitasFeitas() {
  return (
    <div>
      <Header title="Receitas Feitas" renderSearch={ false } />
      <main>
        <div className="button-container">
          <Button
            text="All"
            onClick={ () => { }}
            testId="filter-by-all-btn"
            />
          <Button
            text="Food"
            onClick={ () => { }}
            testId="filter-by-food-btn"
            />
          <Button
            text="Drinks"
            onClick={ () => { }}
            testId="filter-by-drink-btn"
            />
        </div>
      </main>
    </div>
  );
}

export default ReceitasFeitas;
