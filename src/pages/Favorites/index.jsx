import React, { useState, useEffect } from 'react';

import { getFavorites } from '../../services/localStorage';
import Header from '../../components/Header';
import Filter from './components/Filter';
import FavoriteCard from './components/Card';

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
      {filteredList.map((item) => <FavoriteCard key={ item.id } item={ item } />)}
    </div>
  );
}

export default Favorites;
