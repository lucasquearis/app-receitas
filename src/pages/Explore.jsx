import React from 'react';
import { Link } from 'react-router-dom';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import { Header, Footer } from '../components';
import { ExploreContent, ExploreBtn } from '../UI globalStyles';

function Explore() {
  return (
    <div>
      <Header title="Explorar" />
      <ExploreContent>
        <ExploreBtn>
          <Link data-testid="explore-food" to="/explorar/comidas">
            <RestaurantIcon />
            <p>Explorar Comidas</p>
          </Link>
        </ExploreBtn>
        <ExploreBtn>
          <Link data-testid="explore-drinks" to="/explorar/bebidas">
            <LocalBarIcon />
            <p>Explorar Bebidas</p>
          </Link>
        </ExploreBtn>
      </ExploreContent>
      <Footer />
    </div>
  );
}

export default Explore;
