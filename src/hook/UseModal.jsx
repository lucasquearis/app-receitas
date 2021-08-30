import copy from 'clipboard-copy';
import { useEffect, useState } from 'react';

const maxBar = { cinco: 5, tres: 3 };

const UseModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#0D1117',
      color: 'white',
      border: '3px solid #393F47',
    },
  };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const timeToClose = () => {
      const TIME_TO_CLOSE = 2000;
      setTimeout(() => closeModal(), TIME_TO_CLOSE);
    };
    timeToClose();
  }, [modalIsOpen]);

  function openModal() {
    setIsOpen(true);
  }

  const copyLinkFromDone = (type, id) => {
    const types = type === 'comida' ? 'comidas' : 'bebidas';
    copy(`${window.location.href.toString()
      .split('/', maxBar.tres).join('/')}/${types}/${id}`);
    openModal();
  };

  const copyLink = () => {
    copy(window.location.href.toString().split('/', maxBar.cinco).join('/'));
    openModal();
  };

  return {
    modalIsOpen,
    copyLink,
    copyLinkFromDone,
    closeModal,
    customStyles,
  };
};

export default UseModal;
