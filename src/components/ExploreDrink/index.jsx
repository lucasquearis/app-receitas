import React, { useContext } from 'react';
import { RecipesContext } from '../../context/RecipesContext';
import { ExploreWrapper, ExploreButtons } from '../../pages/explorar/styles';

function ExploreDrink() {
  const { history } = useContext(RecipesContext);
  return (
    <ExploreWrapper>
      <ExploreButtons
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
      </ExploreButtons>
      <ExploreButtons
        onClick={ () => history.push('/explorar/comidas/surprise-me') }
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </ExploreButtons>
    </ExploreWrapper>
  );
}

export default ExploreDrink;
