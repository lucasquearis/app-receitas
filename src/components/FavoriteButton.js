// import React, { useState } from 'react';
// import whiteHeart from '../images/whiteHeartIcon.svg';
// import blackHeart from '../images/blackHeartIcon.svg';

// function FavoriteButton() {
//   const [favorite, setFavorite] = useState({});
//   const [heart, setHeart] = useState(whiteHeart);

//   const favoriteClick = () => {
//     if (localStorage.favoriteRecipes) {
//       const json = JSON.parse(localStorage.getItem('favoriteRecipes'));
//       const newLocalStorage = [...json, favorite];
//       localStorage.setItem('favoriteRecipes', JSON.stringify(newLocalStorage));
//     }
//   };

//   const correctHeart = () => {
//     favoriteClick();
//     const img = heart === whiteHeart ? setHeart(blackHeart) : setHeart(whiteHeart);
//     return img;
//   };

//   return (
//     <input
//       classeName="favorite-btn"
//       data-testid="favorite-btn"
//       type="image"
//       src={ heart }
//       alt={ heart }
//       onClick={ correctHeart() }
//     />
//   );
// }

// export default FavoriteButton;
