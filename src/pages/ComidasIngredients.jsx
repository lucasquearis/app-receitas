import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ComidasIngredients() {
  const props = this.props;
  console.log(props);
  return (
    <div>
      <Header titulo="Comidas" pesquisa="true" />
      <h1>olaaaaaaaaaaaaaaaaaaaaa</h1>
      <Footer />
    </div>
  );
}

export default ComidasIngredients;
