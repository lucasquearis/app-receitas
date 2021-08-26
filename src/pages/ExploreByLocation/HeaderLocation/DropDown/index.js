import React from 'react';
import { useAreaContext } from '../../../../context/AreasProvider';
import { useDataContext } from '../../../../context/DataProvider';

export default function DropDown() {
  const { areas } = useDataContext();
  const { handleSetSelected, selected } = useAreaContext();

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
