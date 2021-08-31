import { useState } from 'react';

const copy = require('clipboard-copy');

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'lightGrey',
  },
};

const ModalHook = () => {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleCopy = () => {
    console.log(window.location.href);
    copy(window.location.href);
    openModal();
  };

  return {
    handleCopy,
    closeModal,
    modal,
    modalStyles,
  };
};

export default ModalHook;
