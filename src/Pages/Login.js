import React, { useState, useContext, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import logoreceitapp from '../images/logoreceitapp.png';

function Login() {
  const { setUserEmail } = useContext(AppContext);
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [formValidation, setFormValidation] = useState(true);
  const [redirectValidation, setRedirectValidation] = useState(false);

  useEffect(() => {
    const handleValidation = () => {
      const length = 6;
      const emailDefault = /^(.*)@(.*)[.](com)$/;
      let emailValidation = false;
      let passwordValidation = false;

      if (password.length > length) {
        passwordValidation = true;
      }
      if (emailDefault.test(email)) {
        emailValidation = true;
      }
      if (passwordValidation && emailValidation) {
        setFormValidation(false);
      }
    };
    handleValidation();
  }, [email, password]);

  const handleSubmit = () => {
    setUserEmail(email);

    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    setRedirectValidation(true);
  };

  return (
    <section className="login-page">
      { redirectValidation && <Redirect to="/comidas" /> }
      <Form className="login">
        <img src={ logoreceitapp } alt="logo" className="logo" />
        <Form.Group className="mb-1" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={ (event) => setMail(event.target.value) }
            data-testid="email-input"
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={ (event) => setPassword(event.target.value) }
            data-testid="password-input"
          />
        </Form.Group>
        <button
          className="button-general mb-3"
          type="button"
          data-testid="login-submit-btn"
          disabled={ formValidation }
          onClick={ handleSubmit }
        >
          Entrar
        </button>
      </Form>
    </section>
  );
}

export default Login;
