import React from 'react';
import Footer from '../components/Footer';
import CategoryFood from '../components/CategoryFood';

function RecipeList() {
  return (
    <div>
      <p>Recipe List</p>
      <CategoryFood />
      <Footer />
    </div>
  );
}

export default RecipeList;
