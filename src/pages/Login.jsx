import React, { useEffect, useContext } from 'react';
import FetchFood from '../fetchs/FetchFood';
import myContext from '../context/MyContext';

function Login() {
  console.log(useContext(myContext));
  return (
    <section>
      <button
        type="button"
        onClick={ () => FetchFood('procuraComida', 'rice') }
      >
        ABC
      </button>
    </section>
  );
}

export default Login;
