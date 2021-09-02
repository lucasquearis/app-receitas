import React from 'react';
import './style.css';

import { useHistory } from 'react-router-dom';
import Header from '../../Components/Header';
import BottomMenu from '../../Components/Footer/BottomMenu';
import Btn from '../../Components/Btn';

function Explore() {
  const history = useHistory();
  return (
    <div className="page-explore">
      <Header title="Explorar" searchButton={ false } />
      <div className="explore-buttons">
        <Btn
          className="default-button"
          name="Explorar Comidas"
          data-testid="explore-food"
          variant="contained"
          onClick={ () => history.push('/explorar/comidas') }
        />
        <Btn
          className="default-button"
          name="Explorar Bebidas"
          data-testid="explore-drinks"
          variant="contained"
          onClick={ () => history.push('/explorar/bebidas') }
        />
      </div>
      <BottomMenu />
    </div>
  );
}

export default Explore;
