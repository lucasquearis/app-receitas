const INITIAL_STATE = {
  email: '',
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'TMP':
    return { ...state, item: action.item };
  default:
    return state;
  }
};

export default reducer;
