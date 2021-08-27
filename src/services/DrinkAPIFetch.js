const url = "https://www.themealdb.com/api/json/v1/1/search.php?s="

export async function fetchAPI() {
    try {
        const response = await fetch(url);
        const resolve = await response.json()
        return resolve.meals;
    }
    catch(error) {
        return console.log(error);
    }
}