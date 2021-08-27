import { func } from 'prop-types';
import React from 'react';
import Button from '../Button';

function Filters({ setFilter }) {
  return (
    <div className="rd-btns-container">
      <Button
        type="button"
        name="All"
        testId="filter-by-all-btn"
        className="rd-btn"
        onClick={ () => setFilter('All') }
      />
      <Button
        type="button"
        name="Food"
        testId="filter-by-food-btn"
        className="rd-btn"
        onClick={ () => setFilter('Food') }
      />
      <Button
        type="button"
        name="Drink"
        testId="filter-by-drink-btn"
        className="rd-btn"
        onClick={ () => setFilter('Drink') }
      />
    </div>
  );
}

Filters.propTypes = {
  setFilter: func.isRequired,
};

export default Filters;
