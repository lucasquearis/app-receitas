function getMeasure(drinkDetails, setMeasures) {
  const measuresArr = drinkDetails.map((item) => Object.entries(item)
    .filter((i) => i[0]
      .includes('Measure') && i[1] !== null && i[1] !== 'undefined' && i[1] !== 'null'));
  const measuresOnly = measuresArr.map((item) => item
    .map((i) => i.pop())).map((item) => item);
  setMeasures(measuresOnly);
}

export default getMeasure;
