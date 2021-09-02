import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  requestAreaList,
  requestByArea,
  requestDefault } from '../../redux/actions/fetchActions';
import SelectArea from './SelectArea/SelectArea';
import RecipeList from '../RecipeList/RecipeList';
import Loading from '../Loading/Loading';
import { ExploreAreaBackGround } from './styles';
import { MainBackGround } from '../../UI globalStyles';

function ExploreArea() {
  const dispatch = useDispatch();
  const areaList = useSelector(({ meals }) => meals.areas);
  const [area, setArea] = useState('All');
  useEffect(() => {
    dispatch(requestAreaList());
    if (area === 'All') {
      dispatch(requestDefault('/comidas'));
    } else {
      dispatch(requestByArea(area));
    }
  });
  if (!areaList.meals) {
    return (
      <div>
        <MainBackGround>
          <Loading />
        </MainBackGround>
      </div>
    );
  }
  return (
    <ExploreAreaBackGround>
      <SelectArea setArea={ setArea } />
      <RecipeList />
    </ExploreAreaBackGround>
  );
}

export default ExploreArea;
