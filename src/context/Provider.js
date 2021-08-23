import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState({
    disabled: true,
  });

  const validButton = () => {
    const { email, password } = user;
    const { disabled } = buttonDisabled;
    const rgeex = /(.*)@(.*).com/;
    const magicNumber = 6;
    const ifRegex = rgeex.test(email) && (password.length >= magicNumber);
    console.log(ifRegex);
    if (rgeex.test(email) && (password.length >= magicNumber)) {
      setButtonDisabled({
        disabled: false,
      });
    }
    return disabled;
  };

  const handleInputs = ({ target }) => {
    const { name, value } = target;
    console.log(value);
    setUser({
      ...user,
      [name]: value,
    });
    validButton();
  };

  const context = {
    buttonDisabled,
    handleInputs,
    user,
  };
  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
