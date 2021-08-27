import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const DetailsContext = createContext();
export const useDetailsContext = () => useContext(DetailsContext);

export default function DetailsProvider({ children }) {
  const [itemDetails, setItemDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const contextValue = {
    itemDetails,
    loading,
    type,
    recommendations,
    setItemDetails,
    setLoading,
    setType,
    setRecommendations,
  };

  return (
    <DetailsContext.Provider value={ contextValue }>
      {children}
    </DetailsContext.Provider>
  );
}

DetailsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
