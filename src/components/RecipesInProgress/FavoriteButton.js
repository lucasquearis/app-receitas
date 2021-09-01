/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteButton(props) {
  const { infos } = props;
  const { id } = infos;
  console.log(infos);
  // const [favorite, setFavorite] = useState();

  const getFavorite = () => JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const removeFavorite = (favoritesRemove, idRemove) => favoritesRemove
    .filter((favorite) => favorite.id !== idRemove);
  const addFavorite = (itens) => localStorage
    .setItem('favoriteRecipes', JSON.stringify(itens));

  // useEffect para setar o estado do favorite através do LS.
  // useEffect(() => setFavorite(getFavorite()
  //   .find(({ id: id2 }) => id === id2)), [setFavorite, id]);

  return (
    <Button
      variant="success"
      data-testid="favorite-btn"
      type="button"
      onClick={ () => {
        const favorites = getFavorite();
        if (favorites.length !== 0) { // condicional se ainda n existe nenhum favorito
          addFavorite([infos]);
        } else { // se existe
          const exist = favorites.find((favorite) => favorite.id === id);
          if (exist) { // se já existir o id ele vai remover
            const favoriteFilter = removeFavorite(favorites, id);
            addFavorite(favoriteFilter);
          } else { // se n ele vai add o novo id
            addFavorite([...favorites, infos]);
          }
        }
      } }

    >
      <img src={ whiteHeartIcon } alt="favorite-icon" />
    </Button>
  );
}

// FavoriteButton.propTypes = {
//   infos: infos.PropTypes.shape({
//     id: PropTypes.number.isRequired,
//   }).isRequired,
// };

export default FavoriteButton;

// const favoriteRecipes = [{
//   id,
//   type,
//   area,
//   category,
//   alcoholicOrNot,
//   name,
//   image,
// }];
