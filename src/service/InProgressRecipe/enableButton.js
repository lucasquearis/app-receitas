const enableButton = (ingredientsAPI, ingredientsLocalState) => {
  if (ingredientsAPI.length === ingredientsLocalState.length) {
    return false;
  }
  return true;
};

export default enableButton;
