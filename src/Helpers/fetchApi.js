const fetchApi = async (url, type, searchInput = '') => {
  const request = await fetch(`${url}${type}${searchInput}`);
  const response = await request.json();
  return response;
};

export default fetchApi;
