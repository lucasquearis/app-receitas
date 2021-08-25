import React, { useState, useEffect } from 'react';

import { getFavorites } from '../../services/localStorage';
import Header from '../../components/Header';
import Filter from './Components/Filter';
import Card from '../../components/Card';

function Favorites() {
  const [currentFavorites, setCurrentFavorites] = useState();
  const [filteredList, setFilteredList] = useState([]);
  console.log(filteredList);
  useEffect(() => {
    const data = getFavorites();
    setCurrentFavorites(data);
    setFilteredList(data);
  }, [setCurrentFavorites, setFilteredList]);
  return (
    <div className="favorite-page">
      <Header title="Receitas Favoritas" renderSearchIcon={ false } />
      <Filter setFilteredList={ setFilteredList } list={ currentFavorites } />
    </div>
  );
}

export default Favorites;
