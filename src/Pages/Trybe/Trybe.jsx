import React from 'react';
import './Trybe.css';
import rockGlass from '../../images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function Trybe() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
    </div>
  );
}

export default Trybe;
