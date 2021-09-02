import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeFilterType } from '../../../redux/actions/filterAction';
import { requestRandom } from '../../../redux/actions/fetchActions';
import { ExploreBtn } from '../../../UI globalStyles';
import diceIcon from '../../../images/dice-svgrepo-com.svg';
import { ImgExplore } from '../styles';

function RandomLink({ path }) {
  const dispatch = useDispatch();
  function pathCheck(pathname) {
    if (pathname === '/explorar/comidas') {
      return ('/comidas');
    }
    return ('/bebidas');
  }
  function handleClick() {
    dispatch(changeFilterType('searchBar'));
    if (path === '/explorar/comidas') {
      dispatch(requestRandom('/comidas'));
    } else {
      dispatch(requestRandom('/bebidas'));
    }
  }
  return (
    <ExploreBtn>
      <Link
        data-testid="explore-surprise"
        to={ pathCheck(path) }
        onClick={ handleClick }
      >
        <ImgExplore src={ diceIcon } />
        <p>Me Surpreenda!</p>
      </Link>
    </ExploreBtn>
  );
}

RandomLink.propTypes = {
  path: PropTypes.string.isRequired,
};

export default RandomLink;
