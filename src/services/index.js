export const emailRegex = /^[a-z0-9_.-]+@[a-z]+\.[a-z]{2,3}(?:.[a-z]{2})?$/;

export function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export const titleGenerator = (routeParams) => {
  if (routeParams[1] === 'area') return (capitalizeFirstLetter('origem'));
  if (routeParams[1] !== undefined) return (capitalizeFirstLetter(routeParams[1]));
  if (routeParams[0] !== undefined) return (capitalizeFirstLetter(routeParams[0]));
  return '';
};
