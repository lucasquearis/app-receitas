import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputCard from '../Components/InputCard';
import { loginValidator } from '../helper';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => {
    localStorage.setItem('email', JSON.stringify({
      email,
    }));
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('mealsToken', 1);
  };
  return (
    <main>
      <form>
        <InputCard
          id="email"
          name="email"
          type="text"
          testId="email-input"
          onChange={ ({ target: { value } }) => setEmail(value) }
        />
        <InputCard
          id="login"
          name="login"
          type="text"
          testId="password-input"
          onChange={ ({ target: { value } }) => setPassword(value) }
        />
        <Link
          to="/mainpage"
        >
          <button
            type="button"
            disabled={ !loginValidator({ email, password }) }
            onClick={ handleSubmit }
          >
            Entrar
          </button>
        </Link>
      </form>
    </main>
  );
}
export default Login;
