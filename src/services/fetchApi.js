export default async function fetchApi(url) {
  try {
    const response = await fetch(url);
    return response.ok ? Promise
      .resolve(response.json()) : Promise.reject(response.status);
  } catch (error) {
    console.log(error);
  }
}
