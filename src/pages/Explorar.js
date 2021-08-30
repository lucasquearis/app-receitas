import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header/Header';
import MenuInferior from '../components/MenuInferior';
import styles from './Explorar.module.css';

export default function Explorar() {
  const history = useHistory();
  return (
    <div>
      <Header>
        Explorar
      </Header>
      <div className={ styles.explorar }>
        <button
          type="button"
          data-testid="explore-food"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explorar Bebidas
        </button>
      </div>
      <MenuInferior />
    </div>
  );
}
