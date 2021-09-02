import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PublicIcon from '@material-ui/icons/Public';
import RandomLink from './RandomLink/RandomLink';
import { ExploreLinksContent, ImgExplore } from './styles';
import foodIngredientsIcon from '../../images/ingredients-svgrepo-com.svg';
import drinkIngredientsIcon from '../../images/drinks-bottles-svgrepo-com.svg';
import { ExploreBtn } from '../../UI globalStyles';

const COMIDAS_PATH = '/explorar/comidas';

function ExploreLinks({ path }) {
  if (path === COMIDAS_PATH) {
    return (
      <ExploreLinksContent comida>
        <ExploreBtn>
          <Link
            data-testid="explore-by-ingredient"
            to="/explorar/comidas/ingredientes"
          >
            <ImgExplore src={ foodIngredientsIcon } />
            <p>Por Ingredientes</p>
          </Link>
        </ExploreBtn>
        <ExploreBtn>
          <Link
            data-testid="explore-by-area"
            to="/explorar/comidas/area"
          >
            <PublicIcon />
            <p>Por Local de Origem</p>
          </Link>
        </ExploreBtn>
        <RandomLink path={ path } />
      </ExploreLinksContent>
    );
  }
  return (
    <ExploreLinksContent>
      <ExploreBtn>
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/bebidas/ingredientes"
        >
          <ImgExplore src={ drinkIngredientsIcon } />
          <p>Por Ingredientes</p>
        </Link>
      </ExploreBtn>
      <RandomLink path={ path } />
    </ExploreLinksContent>
  );
}

ExploreLinks.propTypes = {
  path: PropTypes.string.isRequired,
};

export default ExploreLinks;
