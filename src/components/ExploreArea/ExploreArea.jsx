import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestAreaList, requestByArea } from '../../redux/actions/fetchActions';
import SelectArea from './SelectArea/SelectArea';

function ExploreArea() {
  const dispatch = useDispatch();
  const [area, setArea] = useState('American');
  useEffect(() => {
    dispatch(requestAreaList());
    dispatch(requestByArea(area));
  });

  return (<SelectArea setArea={ setArea } />);
}

export default ExploreArea;
