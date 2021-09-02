export const fetchFood = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then((res) => res.json())
    .then((response) => response)
);

export default fetchFood;
