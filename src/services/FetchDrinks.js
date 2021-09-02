export const fetchDrinks = () => (
  fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .then((res) => res.json())
    .then((response) => response)
);
export default fetchDrinks;
