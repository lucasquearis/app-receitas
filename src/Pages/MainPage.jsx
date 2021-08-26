import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import CategoryFoodButtons from '../Components/categoryFoddButtons';

function MainPage() {
  return (
    <>
      <Header title="Comidas" loading />
      <CategoryFoodButtons />
      <Footer />
    </>
  );
}
export default MainPage;
