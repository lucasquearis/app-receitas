import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OriginSelector from '../components/OriginSelector';
import RecipesByArea from '../components/RecipesByArea';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';

function ComidasArea() {
  const { area } = useContext(RecipesContext);
  return (
    <div>
      <Header title="Explorar Origem" />
      <OriginSelector />
      {area === 'All' ? <Recipes food ingredientes={ false } /> : <RecipesByArea />}
      <Footer />
    </div>
  );
}

export default ComidasArea;
