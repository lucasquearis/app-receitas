import React from 'react';
import rockGlass from '../images/rockGlass.svg';

export default function Loading() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glasss
      </object>
    </div>
  );
}
