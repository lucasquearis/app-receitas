export const FILTER_CHANGE = 'FILTER_CHANGE';

export const changeFilterType = (str) => ({
  type: FILTER_CHANGE,
  filter: str,
});
