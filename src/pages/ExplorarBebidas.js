import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import Context from '../context/Context';
import Header from '../components/Header/Header';
import MenuInferior from '../components/MenuInferior';

export default function ExplorarBebidas() {
  const { exploreByArea } = useContext(Context);
  const history = useHistory();
  const renderButton = () => {
    if (exploreByArea === 'on') {
      return (
        <button
          data-testid="explore-by-area"
          type="button"
          onClick={ () => history.push('explorar/comidas') }
        >
          Por Local de Origem
        </button>
      );
    } return (
      <p>
        Por Local de Origem
      </p>
    );
  };
  return (
    <div>
      <Header>
        <h4>
          Explorar Bebidas
        </h4>
      </Header>

      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      {renderButton()}
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ () => history.push('explore/surpresas') } // Este path aponta para qual componente? Requisito 70.
      >
        Me Surpreenda!
      </button>
      <MenuInferior />
    </div>
  );
}
