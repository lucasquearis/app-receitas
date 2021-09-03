import React, { useContext } from 'react';
import { RecipesContext } from '../../context/RecipesContext';
import { ExploreWrapper, ExploreButtons } from '../../pages/explorar/styles';

function ExploreFood() {
  const { history } = useContext(RecipesContext);
  return (
    <ExploreWrapper>
      <ExploreButtons
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </ExploreButtons>
      <ExploreButtons
        onClick={ () => history.push('/explorar/comidas/area') }
        data-testid="explore-by-area"
      >
        Por Local de Origem
      </ExploreButtons>
      <ExploreButtons
        onClick={ () => history.push('/explorar/comidas/surprise-me') }
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </ExploreButtons>
    </ExploreWrapper>);
}

export default ExploreFood;
