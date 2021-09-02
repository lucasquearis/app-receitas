const useHeaderTitle = (path) => {
  let title = 'Título não encontrado';
  if (path.includes('explorar')) {
    title = 'Explorar';
    if (path.includes('ingredientes')) {
      title += ' Ingredientes';
    } else if (path.includes('area')) {
      title += ' Origem';
    } else if (path.includes('comidas')) {
      title += ' Comidas';
    } else if (path.includes('bebidas')) {
      title += ' Bebidas';
    }
  } else if (path === '/comidas') {
    title = 'Comidas';
  } else if (path === '/bebidas') {
    title = 'Bebidas';
  } else if (path === '/perfil') {
    title = 'Perfil';
  } else if (path === '/receitas-feitas') {
    title = 'Receitas Feitas';
  } else if (path === '/receitas-favoritas') {
    title = 'Receitas Favoritas';
  }

  return [title];
};

export default useHeaderTitle;
