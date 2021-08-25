export default async function fetchCategories(callback, endpoint, meals) {
  try {
    const result = await fetch(endpoint).then((r) => r.json());
    if (meals) {
      callback(result.meals);
    } else {
      callback(result.drinks);
    }
  } catch (err) {
    console.log(err);
  }
}
