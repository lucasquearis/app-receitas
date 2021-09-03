import { useState } from 'react';

const quatro = 5;
const tres = 3;
const useCopy = () => {
  const [copy, setCopy] = useState('Compartilhar');

  const share = (id, type) => {
    if (typeof id !== 'object') {
      let link = window.location.href;
      link = link.split('/', tres);
      link.push(type === 'Comida' ? 'bebidas' : 'comidas');
      link.push(id);
      navigator.clipboard.writeText(link.join('/'));
      setCopy('Link copiado!');
      return;
    }
    let link = window.location.href;
    link = link.split('/', quatro).join('/');
    navigator.clipboard.writeText(link);
    setCopy('Link copiado!');
  };
  return {
    copy,
    share,
  };
};

export default useCopy;
