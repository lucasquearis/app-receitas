async function fetchAPIDetailsDrink(id) {    
    let key = 'drinks';  
  
    // const id = idUrl.replace(/\D/g, "");
  
    try {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(URL);
      const { [key]: results } = await response.json();
      return results[0];
    } catch (error) {
      console.log(error);
    }
  }
  
  export default fetchAPIDetailsDrink;