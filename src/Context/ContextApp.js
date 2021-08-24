import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import LoginHook from '../Hooks/LoginHook';

export const ContextApp = createContext();

export const AppProvider = ({ children }) => {
  const { handleInput, Login, disabled, handleClick, redirect } = LoginHook();

  const ContProps = {
    disabled,
    handleInput,
    Login,
    handleClick,
    redirect,
  };

  return (
    <ContextApp.Provider value={ { ...ContProps } }>
      {children}
    </ContextApp.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
