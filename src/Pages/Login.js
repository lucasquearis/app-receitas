import React, { useState, useContext, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import AppContext from '../Context/AppContext';

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
        <Form.Group className="mb-1" controlId="formBasicEmail">

          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={ (event) => setMail(event.target.value) }
            data-testid="email-input"
          />
          <Form.Text className="text-muted" />
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
        <Button
          className="mb-3"
          variant="primary"
          type="button"
          data-testid="login-submit-btn"
          disabled={ formValidation }
          onClick={ handleSubmit }
        >
          Entrar
        </Button>
      </Form>
    </section>
  );
}

export default Login;
