import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  requestFoods,
  requestAreas,
  getRecipes,
} from '../redux/actions/recipesActions';
import { getDataByArea } from '../services/api';

export default function useArea(setRedirect) {
  const [data, setData] = useState([]);
  const [area, setArea] = useState('All');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAreas());
  }, [dispatch]);

  useEffect(() => {
    if (area === 'All') {
      dispatch(requestFoods());
    } else if (area) {
      setRedirect(false);
      getDataByArea(area)
        .then((response) => setData(response.meals));
    }
  }, [area, setRedirect, dispatch]);

  useEffect(() => {
    if (data.length > 0) {
      dispatch(getRecipes(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (data && data.length === 1) {
      setRedirect(true);
    }
  }, [data, dispatch, setRedirect]);

  return {
    setArea,
    area,
  };
}
