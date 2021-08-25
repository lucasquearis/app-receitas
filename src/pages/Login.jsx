import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';

export default function Login() {
  const [state, setState] = useState({ email: '', password: '' });

  const handleChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const emailIsValid = (email) => {
    // https://ui.dev/validate-email-address-javascript/
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const passwordIsValid = (password) => {
    const minLength = 6;
    return password.length > minLength;
  };

  const loginIsValid = () => {
    const { email, password } = state;
    return emailIsValid(email) && passwordIsValid(password);
  };

  const handleClick = () => {
    const { email } = state;
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  return (
    <form>
      <Input
        textLabel="Email"
        id="email-input"
        name="email"
        type="email"
        value={ state.email }
        onChange={ handleChange }
        placeholder="email@email.com"
      />
      <Input
        textLabel="Senha"
        id="password-input"
        name="password"
        type="password"
        value={ state.password }
        onChange={ handleChange }
      />
      <Link to="/comidas">
        <button
          data-testid="login-submit-btn"
          type="button"
          onClick={ handleClick }
          disabled={ !loginIsValid() }
        >
          Entrar
        </button>
      </Link>
    </form>
  );
}
