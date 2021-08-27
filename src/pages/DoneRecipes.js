import React from "react";
import Header from "../components/Header";

function FoodAreaExp() {
  return (
    <div>
      <Header name="Receitas Feitas" search={false} />
      <h2>Receitas Feitas</h2>
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
        >
          Drinks
        </button>
      </div>
    </div>
  );
}

export default FoodAreaExp;
