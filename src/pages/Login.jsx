import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

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
    <div>
      <input
        data-testid="email-input"
        id="standard-name"
        label="Email"
        value={ user.email }
        name="email"
        onChange={ handleChange }
      />
      <input
        data-testid="password-input"
        id="standard-password-input"
        label="Password"
        value={ user.password }
        name="password"
        onChange={ handleChange }
        type="password"
      />
      <Button
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
