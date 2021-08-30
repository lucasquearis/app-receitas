import exploreArea from '../../services/ExploreArea';

export const EXPLORE_AREA = 'EXPLORE_AREA';
export const getFoodArea = (response) => ({
  type: EXPLORE_AREA,
  payload: response,
});

export const getFoodAreaThunk = () => async (dispatch) => {
  const response = await exploreArea();
  dispatch(getFoodArea(response));
};
