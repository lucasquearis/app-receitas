const getMeasures = (recipe) => {
  const measuresKeys = Object.keys(recipe).filter((key) => key.includes('Measure'));
  const measuresList = measuresKeys.map((measure) => recipe[measure]);
  return (measuresList.filter((item) => item));
};

export default getMeasures;
