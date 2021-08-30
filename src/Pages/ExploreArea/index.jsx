import React from 'react';

import Header from '../../Components/Header';
import BottomMenu from '../../Components/Footer/BottomMenu';

function ExploreArea() {
  return (
    <div>
      <Header
        title="Explorar Ingredientes"
        searchButton={ false }
      />
      <div>
        <select data-testid="explore-by-area-dropdown">
          <option>Brasil</option>
        </select>
        <div>
          oi
        </div>
      </div>
      <BottomMenu />
    </div>
  );
}

export default ExploreArea;
