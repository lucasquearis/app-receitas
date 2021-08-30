import React, { useContext } from 'react';
import { ContextApp } from '../../Context/ContextApp';
import Header from '../../Components/Header';
import RecipesContainer from '../../Components/RecipesContainer';
import Footer from '../../Components/Footer/BottomMenu';

function Foods() {
  const { loading } = useContext(ContextApp);
  return (
    <div>
      <Header title="Comidas" />
      {!loading && <RecipesContainer />}
      <Footer />
    </div>
  );
}

export default Foods;
