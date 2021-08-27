import React from 'react';
import { string, objectOf, arrayOf } from 'prop-types';
import full from '../../images/blackHeartIcon.svg';
import { useData } from '../../Context/DataContext';

function FavBtn({ favList, id, testId, className }) {
  const { setFav } = useData();

  const handleFavorite = () => {
    const newList = favList.filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
    setFav(newList);
  };

  return (
    <button
      type="button"
      data-testid={ testId }
      className={ className }
      onClick={ handleFavorite }
      src={ full }
    >
      <img
        src={ full }
        alt="favorite"
        width="30px"
      />
    </button>
  );
}

FavBtn.propTypes = {
  favList: arrayOf(objectOf(string)).isRequired,
  id: string.isRequired,
  testId: string.isRequired,
  className: string,
};

FavBtn.defaultProps = {
  className: '',
};

export default FavBtn;
