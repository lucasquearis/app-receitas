import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  requestAreaList,
  requestByArea,
  requestDefault } from '../../redux/actions/fetchActions';
import SelectArea from './SelectArea/SelectArea';
import RecipeList from '../RecipeList/RecipeList';

function ExploreArea() {
  const dispatch = useDispatch();
  const [area, setArea] = useState('All');
  useEffect(() => {
    dispatch(requestAreaList());
    if (area === 'All') {
      dispatch(requestDefault('/comidas'));
    } else {
      dispatch(requestByArea(area));
    }
  });

  return (
    <main>
      <SelectArea setArea={ setArea } />
      <RecipeList />
    </main>
  );
}

export default ExploreArea;
