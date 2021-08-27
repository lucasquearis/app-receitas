import React, { useState, useEffect, useContext } from 'react';

import Context from '../../context';
import Header from '../../components/Header';
import Filter from './components/Filter';
import FavoriteCard from './components/Card';

function Favorites() {
  const { favoriteList } = useContext(Context);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    setFilteredList(favoriteList);
  }, [setFilteredList, favoriteList]);

  return (
    <div className="favorite-page">
      <Header title="Receitas Favoritas" renderSearchIcon={ false } />
      <Filter setFilteredList={ setFilteredList } list={ favoriteList } />
      {
        filteredList.map((item, index) => (
          <FavoriteCard
            key={ item.id }
            item={ item }
            index={ index }
          />
        ))
      }

    </div>
  );
}

export default Favorites;
