import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useHistory, useParams } from 'react-router-dom';

import { useDetailsContext } from '../../context/DetailsProvider';
import { getDetails } from '../../services';

import Details from './Details';
import CopyButton from '../../components/CopyButton';
import FavoriteButton from '../../components/FavoriteButton';

export default function FoodDetails() {
  const {
    setItemDetails,
    setLoading,
    itemDetails,
    setType,
    type } = useDetailsContext();

  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  if (history.location.pathname.includes('/comidas/')) {
    setType('food');
  } else {
    setType('drinks');
  }

  useEffect(() => {
    const getItem = async (itemType, itemID) => {
      const item = await getDetails(itemType, itemID);
      setItemDetails(item);
      setLoading(false);
    };
    getItem(type, id);
  }, [id, setItemDetails, setLoading, type]);

  return (
    <div>
      <CopyButton path={ location.pathname } />
      <FavoriteButton />
      {itemDetails && <Details item={ itemDetails } />}
    </div>
  );
}
