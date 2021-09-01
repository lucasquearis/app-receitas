import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const handleValidation = () => {
      const MIN_PASSWORD = 6;
      const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (password.length <= MIN_PASSWORD || !email.match(regex)) {
        return setButtonDisabled(true);
      }
      return setButtonDisabled(false);
    };
    handleValidation();
  }, [email, password]);

  const handleChange = async (func, { target: { value } }) => {
    func(value);
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Login</h1>
      <input
        type="email"
        data-testid="email-input"
        className="inputs"
        placeholder="E-mail"
        onChange={ (e) => handleChange(setEmail, e) }
      />
      <input
        type="password"
        data-testid="password-input"
        className="inputs password"
        placeholder="Password"
        onChange={ (e) => handleChange(setPassword, e) }
      />
      <Link to="/comidas">
        <button
          type="button"
          data-testid="login-submit-btn"
          className="enter-button"
          disabled={ buttonDisabled }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </Link>
    </div>
  );
}

export default Login;
