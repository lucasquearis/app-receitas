import React from 'react';
import { createBrowserHistory } from 'history';

import HeaderSearch from '../components/HeaderSearch';
import Footer from '../components/Footer';
import Cards from '../components/Cards';

import useAPI from '../hooks/useAPI';

function Foods() {
  const [data, functions] = useAPI();
  const history = createBrowserHistory();
  let list;

  if (history.location.pathname === '/comidas') {
    list = data.foods;
  } else {
    list = data.drinks;
  }

  return (
    <div>
      <HeaderSearch title="Comidas" functions={ functions } />
      <Cards list={ list } />
      <Footer />
    </div>
  );
}

export default Foods;
