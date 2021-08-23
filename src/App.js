import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import recipesProvider from './context/recipesProvider';

function App() {
  return (
    <recipesProvider.Provider>
      <div className="meals">
        Olá
      </div>
    </recipesProvider.Provider>
  );
}

export default App;
