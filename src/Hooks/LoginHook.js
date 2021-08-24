import { useState, useEffect } from 'react';

const reg = /^[a-z0-9_.-]+@[a-z]+\.[a-z]{2,3}(?:.[a-z]{2})?$/;
const SEIS = 6;
const INITIAL_LOGIN = {
  Email: '',
  Password: '',
};
const bana = true;

const LoginHook = () => {
  const [Login, setLogin] = useState(INITIAL_LOGIN);
  const [disabled, setDisable] = useState(bana);

  const handleInput = (({ target: { name, value } }) => {
    setLogin({ ...Login, [name]: value });
  });

  useEffect(() => {
    const { Email, Password } = Login;
    const logica = (!reg.test(Email) || Password.length <= SEIS);
    setDisable(logica);
  }, [Login]);

  return {
    Login,
    handleInput,
    disabled,
  };
};

export default LoginHook;
