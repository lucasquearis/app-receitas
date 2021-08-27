import React, { useEffect } from 'react';

function CategoryFood() {
  useEffect(() => {
    const foodEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const foodCategoriesEndpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

  //   fetch(foodEndpoint)
  //     .then((res) => res.json())
  //     .then(({ meals }) => setFoodRecipes(meals));

  //   fetch(foodCategoriesEndpoint)
  //     .then((res) => res.json())
  //     .then(({ meals }) => setFoodCategories(meals));
  }, []);

  return (
    <div>
      <p>Categories</p>
    </div>
  );
}

export default CategoryFood;
