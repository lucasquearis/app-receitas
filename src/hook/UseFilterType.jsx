import { useState } from 'react';

function UseFilterType() {
  const [filterType, setFilterType] = useState('');
  function setFilter(string) {
    setFilterType(string);
  }
  return { filterType, setFilter };
}

export default UseFilterType;
