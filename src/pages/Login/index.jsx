import React from 'react';

import { InputGroup, FormControl, Button } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <form className="p-3">
      <InputGroup className="mb-2">
        <FormControl
          data-testid="email-input"
          placeholder="Email"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
        />
      </InputGroup>
      <InputGroup className="mb-2">
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
        variant="dark"
        className="btn-block"
        disabled="true"
      >
        Block level button
      </Button>
    </form>
  );
}

export default Login;
