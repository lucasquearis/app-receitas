import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  requestAreaList,
  requestByArea,
  requestDefault } from '../../redux/actions/fetchActions';
import SelectArea from './SelectArea/SelectArea';
import RecipeList from '../RecipeList/RecipeList';
import { ExploreAreaBackGround } from './styles';

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
    <ExploreAreaBackGround>
      <SelectArea setArea={ setArea } />
      <RecipeList />
    </ExploreAreaBackGround>
  );
}

export default ExploreArea;
