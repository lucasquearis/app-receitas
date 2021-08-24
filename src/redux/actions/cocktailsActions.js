export const SEND_COCKTAIL_DATA = 'SEND_COCKTAIL_DATA';

export const sendCocktailData = (info) => ({
  type: SEND_COCKTAIL_DATA, info,
});
