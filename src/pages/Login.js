import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import Button from '../components/Button';
import './login.css';

function Login({ history }) {
  const [loginState, setLoginState] = useState({ email: '', password: '' });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const Validations = () => {
      const SIX = 6;
      const eRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const { email, password } = loginState;

      const emailVerification = () => eRegex.test(email);

      const passwordVerification = () => password.length > SIX;

      if (emailVerification() && passwordVerification() === true) setDisabled(false);

      if (eRegex.test(email) === false || password.length <= SIX) setDisabled(true);
    };
    Validations();
  }, [loginState]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setLoginState({
      ...loginState,
      [name]: value,
    });
  };

  const handleClick = () => {
    const { email } = loginState;
    const user = { email };
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/comidas');
  };

  return (
    <div className="container-root">
      <div className="login-container">
        <Input
          type="text"
          name="email"
          datatestId="email-input"
          placeH="Insira o seu e-mail:"
          onChange={ (e) => handleChange(e) }
        />
        <Input
          type="password"
          name="password"
          datatestId="password-input"
          placeH="Insira a sua senha:"
          onChange={ (e) => handleChange(e) }
        />
        <Button
          btnText="Entrar"
          disabled={ disabled }
          onClick={ () => handleClick() }
          datatestId="login-submit-btn"
        />
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
