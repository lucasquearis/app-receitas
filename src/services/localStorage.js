export const getFavorites = () => {
  const data = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  return data;
};

export const setFavorites = (value) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(value));
};
