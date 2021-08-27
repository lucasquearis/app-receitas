import React from 'react';
import { Redirect } from 'react-router-dom';

import { InputGroup, FormControl, Button } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);
  const [shouldRedirect, setShouldRedirect] = React.useState(false);

  React.useEffect(() => {
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Regular expression from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript"
    const PASSWORD_MIN_CHARS = 6;

    setIsValid(EMAIL_REGEX.test(email) && password.length > PASSWORD_MIN_CHARS);
  }, [password, email]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      email,
    };

    const inProgress = localStorage.getItem('InProgressRecipes');
    if (!inProgress) {
      const defaultValue = { cocktails: {}, meals: {} };

      localStorage.setItem('inProgressRecipes', JSON.stringify(defaultValue));
    }

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(user));
    setShouldRedirect(true);
  };

  if (shouldRedirect) return <Redirect to="/comidas" />;

  return (
    <form className="px-3 py-4" onSubmit={ (event) => handleSubmit(event) }>
      <InputGroup className="mb-2">
        <FormControl
          data-testid="email-input"
          placeholder="Email"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <FormControl
          data-testid="password-input"
          placeholder="Password"
          value={ password }
          onChange={ ({ target: { value } }) => setPassword(value) }
        />
      </InputGroup>
      <Button
        data-testid="login-submit-btn"
        type="submit"
        disabled={ !isValid }
        variant="primary"
        className="btn-block"
      >
        Entrar
      </Button>
    </form>
  );
}

export default Login;
