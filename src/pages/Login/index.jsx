import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Login({ history }) {
  const [user, setUser] = useState({ email: '', password: '' });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const { email } = user;
    const userr = { email };
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(userr));
    history.push('/comidas');
  };

  const enableButton = () => {
    const { email, password } = user;
    const minPassword = 6;
    if (password.length > minPassword) {
      const regex = /^[a-z0-9_.-]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
      if (regex.test(email)) return true;
    }
    return false;
  };

  return (
    <section className="login-page">
      <h2 className="h2-title">Login</h2>
      <div className="form-group">
        <label className="label-login" htmlFor="email">
          Email
          <input
            name="email"
            onChange={ (e) => handleChange(e) }
            value={ user.email }
            type="email"
            data-testid="email-input"
            className="form-control"
          />
        </label>
      </div>
      <label className="label-login" htmlFor="password">
        Password
        <input
          name="password"
          onChange={ (e) => handleChange(e) }
          data-testid="password-input"
          type="password"
          className="form-control"
          value={ user.password }
        />
      </label>
      <div className="form-group">
        <button
          type="button"
          text="Entrar"
          onClick={ () => handleSubmit() }
          data-testid="login-submit-btn"
          className="btn btn-primary"
          disabled={ !enableButton() }
        >
          Entrar
        </button>
      </div>
    </section>

  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
