import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeFilterType } from '../../../redux/actions/filterAction';
import { requestRandom } from '../../../redux/actions/fetchActions';

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
    <Link
      data-testid="explore-surprise"
      to={ pathCheck(path) }
      onClick={ handleClick }
    >
      Me Surpreenda!
    </Link>
  );
}

RandomLink.propTypes = {
  path: PropTypes.string.isRequired,
};

export default RandomLink;
