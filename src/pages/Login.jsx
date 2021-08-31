import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import palmirinha from '../images/turma-12-palmirinha.png'
import '../styles/Login.css'

function Login() {
  const SEIS = 6;
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    setUser({
      ...user,
      [target.name]: target.value,
    });
  };

  const emailIsValid = (email) => {
    const pattern = /\S+@\S+\.\S+/;
    return pattern.test(email);
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({
      email: user.email,
    }));
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/comidas" />;
  }

  return (
    <div className="login-container">
      <h1>Palmirinha App</h1>
      <img className="palmirinha-img" src={ palmirinha } />
      <input
        className="input-login"
        data-testid="email-input"
        placeholder="E-mail"
        id="standard-name"
        label="Email"
        value={ user.email }
        name="email"
        onChange={ handleChange }
      />
      <input
        className="input-login"
        data-testid="password-input"
        placeholder="Senha"
        id="standard-password-input"
        label="Password"
        value={ user.password }
        name="password"
        onChange={ handleChange }
        type="password"
      />
      <Button
        className="btn-login"
        type="submit"
        variant="contained"
        disabled={ !(emailIsValid(user.email) && user.password.length > SEIS) }
        color="primary"
        data-testid="login-submit-btn"
        onClick={ () => handleClick() }
      >
        Entrar
      </Button>
    </div>
  );
}

export default Login;
