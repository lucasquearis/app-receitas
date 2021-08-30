const copy = require('clipboard-copy');

const clipboardCopy = (type, id) => {
  copy(`${window.location.origin}/${type}s/${id}`)
    .then(() => {
      document
        .querySelector(`#share-text${id}`)
        .innerHTML = 'Link copiado!';
    });
};

export default clipboardCopy;
