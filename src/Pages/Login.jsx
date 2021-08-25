import React, { useState } from 'react';
import InputCard from '../Components/InputCard';
import { loginValidator } from '../helper';
import ButtonCard from '../Components/ButtonCard';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({
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
        <ButtonCard
          page="/comidas"
          testId="login-submit-btn"
          buttonText="Entrar"
          onClick={ handleSubmit }
          disabled={ !loginValidator({ email, password }) }
        />
      </form>
    </main>
  );
}
export default Login;
