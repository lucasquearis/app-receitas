import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import fetchFoods from '../fetchs/FetchFood';

function Login() {
  const { handleClick, data, name, setName } = useContext(MyContext);
  console.log(data);
  return (
    <section>
      <input type="text" onChange={ (event) => setName(event.target.value) } />
      <button
        type="button"
        onClick={ () => handleClick('procuraComida', name) }
      >
        ABC
      </button>
    </section>
  );
}

export default Login;
