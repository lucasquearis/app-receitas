import React from 'react';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Fetch from './fetchs/FetchFood';

function App() {
  return (
    <div className="meals">
      <button type="button" onClick={ Fetch() }>teste </button>
    </div>
  );
}

export default App;
