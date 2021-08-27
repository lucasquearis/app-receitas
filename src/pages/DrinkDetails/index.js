import React from 'react';
import { useLocation } from 'react-router';

import CopyButton from '../../components/CopyButton';
import FavoriteButton from '../../components/FavoriteButton';

export default function DrinkDetails() {
  const location = useLocation();
  return (
    <div>
      <CopyButton path={ location.pathname } />
      <FavoriteButton />
    </div>
  );
}
