import copy from 'clipboard-copy';
import { useEffect, useState } from 'react';

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

  const copyLink = () => {
    const nOmAgIcNuUuMbEr = 5;
    copy(window.location.href.toString().split('/', nOmAgIcNuUuMbEr).join('/'));
    console.log();
    openModal();
  };

  return {
    modalIsOpen,
    copyLink,
    closeModal,
    customStyles,
  };
};

export default UseModal;
