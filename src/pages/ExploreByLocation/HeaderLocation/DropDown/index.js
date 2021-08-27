import React, { useCallback, useEffect, useState } from 'react';
import { useDataContext } from '../../../../context/DataProvider';
import { fetchAreas } from '../../../../services';

export default function DropDown() {
  const { areas } = useDataContext();
  const { setLocationData, setLoading } = useDataContext();

  const [selected, setSelected] = useState('');
  const [applyArea, setApplyArea] = useState(false);

  const handleSetSelected = ({ target: { value } }) => {
    setSelected(value);
    setApplyArea(true);
  };

  const getCategoriesData = useCallback(async () => {
    if (applyArea) {
      setLoading(true);
      const { meals } = await fetchAreas(selected);
      setLoading(false);
      setLocationData(meals);
      setApplyArea(false);
    }
  }, [applyArea, selected, setLoading, setLocationData]);

  useEffect(() => { getCategoriesData(); }, [getCategoriesData]);

  const createButtons = () => areas.map(({ strArea }) => (
    <option
      key={ strArea }
      data-testid={ `${strArea}-option` }
      value={ strArea }
    >
      {strArea}
    </option>
  ));

  return (
    <select
      value={ selected }
      data-testid="explore-by-area-dropdown"
      onChange={ handleSetSelected }
    >
      { createButtons() }
      <option
        value=""
        data-testid="All-option"
      >
        All
      </option>
    </select>
  );
}
