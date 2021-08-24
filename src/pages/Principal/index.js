import React, { useContext, useEffect } from 'react';
import Header from '../../components/Header';
import BarraDeBusca from '../../components/BarraDeBusca';
import AppContext from '../../context/AppContext';

function Principal() {
  const { showBar, setShowBar } = useContext(AppContext);
  useEffect(() => () => setShowBar(false), [setShowBar]); // willUnmount. Muda o estado G. pra false de novo ao sair de "comidas"
  return (
    <div>
      <Header nomeDaPagina="Comidas" />
      { showBar ? <BarraDeBusca /> : null }
    </div>
  );
}

export default Principal;
