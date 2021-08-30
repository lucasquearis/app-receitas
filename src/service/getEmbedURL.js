export default function getEmbedURL(food) {
  const url = food.strYoutube;
  const minIndex = 24;
  const maxIndex = 31;
  let embededURL = '';
  if (url.length !== 0) {
    const splitedURL = url.split('');
    splitedURL.forEach((word, index) => {
      if (index === minIndex) {
        embededURL += 'embed/';
      }
      if (index < minIndex || index > maxIndex) {
        embededURL += word;
      }
    });
  }
  return embededURL;
}
