import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { changeFilterType } from '../redux/actions/filterAction';
import {
  requestByFirstLetter,
  requestByName,
  requestByIngredient,
} from '../redux/actions/fetchActions';

function UseSearchBar() {
  const [searchObj, setSearchObj] = useState({ searchText: '', searchRadio: '' });
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  function handleChange({ target }) {
    const { name, value } = target;
    setSearchObj({
      ...searchObj,
      [name]: value,
    });
  }

  function handleClick() {
    const { searchText, searchRadio } = searchObj;
    if (searchRadio === 'ingredient') {
      dispatch(requestByIngredient(searchText, pathname));
    }
    if (searchRadio === 'name') {
      dispatch(requestByName(searchText, pathname));
    }
    if (searchRadio === 'firstLetter') {
      if (searchText.length === 1) {
        dispatch(requestByFirstLetter(searchText, pathname));
      } else {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
    }
    dispatch(changeFilterType('searchBar'));
  }
  return { searchObj, handleChange, handleClick };
}

export default UseSearchBar;
