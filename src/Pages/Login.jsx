import React, { useState } from 'react';
import InputCard from '../Components/InputCard';
import { loginValidator } from '../helper';
import ButtonCard from '../Components/ButtonCard';
import '../styles/Login.css';

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
    <main className="log-container">
      <div className="none" />
      <form className="form">
        <h2>Cooky</h2>
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
      <div className="none" />
    </main>
  );
}
export default Login;
